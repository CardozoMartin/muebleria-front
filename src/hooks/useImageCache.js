import { useCallback, useEffect, useRef, useState } from 'react';

const DB_NAME = 'ImageCacheV2';
const DB_VERSION = 1;
const STORE_NAME = 'images';
const CACHE_INDEX_KEY = 'imageCacheIndex'; // localStorage key para índice de URLs cacheadas

function openDB() {
  return new Promise((resolve, reject) => {
    if (!('indexedDB' in window)) return resolve(null);
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onerror = () => resolve(null); // silencioso, no es crítico
    req.onsuccess = (e) => resolve(e.target.result);
    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'url' });
      }
    };
  });
}

// Registro en localStorage de qué URLs están cacheadas en IDB
function getCachedUrls() {
  try {
    const cached = localStorage.getItem(CACHE_INDEX_KEY);
    return cached ? JSON.parse(cached) : {};
  } catch {
    return {};
  }
}

function markAsCached(url) {
  try {
    const cached = getCachedUrls();
    cached[url] = true;
    localStorage.setItem(CACHE_INDEX_KEY, JSON.stringify(cached));
  } catch {
    // silencioso
  }
}

function isCachedLocally(url) {
  return getCachedUrls()[url] === true;
}

async function getFromDB(db, url) {
  if (!db) return null;
  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const req = tx.objectStore(STORE_NAME).get(url);
      req.onsuccess = () => {
        if (req.result?.blob) {
          resolve(URL.createObjectURL(req.result.blob));
        } else {
          resolve(null);
        }
      };
      req.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
}

async function saveToDB(db, url, blob) {
  if (!db) return;
  try {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).put({ url, blob });
    // Registrar en localStorage que está cacheada
    markAsCached(url);
  } catch {
    // silencioso
  }
}

const MAX_BLOB_CACHE = 25; // Límite de imágenes guardadas en RAM (Blob URLs) a la vez

/**
 * Hook de caché de imágenes optimizado para TV/Chromecast
 * Uso:
 *   const { resolveUrl, preloadAll, progress, ready, cacheOne } = useImageCache();
 */
export const useImageCache = () => {
  // mem cache: url original → blob URL (ya en memoria, acceso O(1))
  const memCache = useRef(new Map());
  const dbRef = useRef(null);
  const [progress, setProgress] = useState(0); // 0–100
  const [ready, setReady] = useState(false);

  useEffect(() => {
    openDB().then((db) => {
      dbRef.current = db;
    });
    return () => {
      // Revocar todos los blob URLs al desmontar
      memCache.current.forEach((blobUrl) => {
        if (blobUrl?.startsWith('blob:')) URL.revokeObjectURL(blobUrl);
      });
    };
  }, []);

  /** Devuelve la URL cacheada si existe, o la original como fallback */
  const resolveUrl = useCallback((url) => {
    if (!url) return url;
    return memCache.current.get(url) ?? url;
  }, []);

  /** Cachea una imagen (mem → IDB → red). Devuelve blob URL. */
  const cacheOne = useCallback(async (url) => {
    if (!url) return url;

    // 1. Memoria
    if (memCache.current.has(url)) return memCache.current.get(url);

    // Evicción (FIFO protect limit para evitar desbordar RAM en Chromecast)
    if (memCache.current.size >= MAX_BLOB_CACHE) {
      const firstKey = memCache.current.keys().next().value;
      const oldUrl = memCache.current.get(firstKey);
      if (oldUrl?.startsWith('blob:')) URL.revokeObjectURL(oldUrl);
      memCache.current.delete(firstKey);
    }

    // 2. IndexedDB - primero checar en localStorage para optimizar
    if (isCachedLocally(url)) {
      const fromDB = await getFromDB(dbRef.current, url);
      if (fromDB) {
        memCache.current.set(url, fromDB);
        return fromDB;
      }
    }

    // 3. Red - con timeout agresivo
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 20000); // 20 segundos timeout

      const res = await fetch(url, {
        cache: 'force-cache',
        signal: controller.signal,
        credentials: 'omit', // No enviar cookies, más rápido
      });
      clearTimeout(timeoutId);

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const blob = await res.blob();

      // Guardar en IDB en background (no bloqueante) - esto también registra en localStorage
      saveToDB(dbRef.current, url, blob);

      const blobUrl = URL.createObjectURL(blob);
      memCache.current.set(url, blobUrl);
      return blobUrl;
    } catch (error) {
      // Si falla la red, devolver URL original para que el browser intente
      console.warn(`Error cacheando ${url}:`, error.message);
      memCache.current.set(url, url);
      return url;
    }
  }, []);

  /**
   * Precarga progresiva. Inicia tras cargar las primeras 3 imágenes para
   * no bloquear el Chromecast, y prosigue en background.
   */
  const preloadAll = useCallback(
    async (urls, concurrency = 2) => {
      const validUrls = [...new Set(urls.filter(Boolean))];
      if (validUrls.length === 0) {
        setReady(true);
        return;
      }

      console.log(`[Cache] Empieza pre-carga progresiva de ${validUrls.length} imágenes (concurrencia ${concurrency})`);
      setProgress(0);
      setReady(false);
      
      const PRELOAD_START = Math.min(3, validUrls.length);

      // Cachear los primeros N para arrancar la app al instante
      for (let i = 0; i < PRELOAD_START; i++) {
        await cacheOne(validUrls[i]);
        setProgress(Math.round(((i + 1) / validUrls.length) * 100));
      }
      
      // ✅ Todo listo para iniciar (Arranca reproductor con las primeras imágenes)
      console.log('[Cache] ✨ Lote inicial completado -> Iniciando Slideshow!');
      setReady(true);

      // Background loading - Rellenar IndexedDB (sin bloquear la UI principal)
      let done = PRELOAD_START;
      const backgroundLoad = async () => {
         for (let i = PRELOAD_START; i < validUrls.length; i += concurrency) {
           const batch = validUrls.slice(i, i + Math.min(concurrency, 3)); // Max 3 descargas simultáneas en Chromecast para IDB
           
           // No esperamos el resultado entero con Promise.allSettled bloqueando fuerte.
           // Usamos el map directamente
           await Promise.allSettled(batch.map(cacheOne));
           
           done += batch.length;
           const newProgress = Math.round((done / validUrls.length) * 100);
           // Actualizamos progress por si acaso algún componente lo usa en tiempo real
           setProgress(newProgress);
           
           // Respirar para darle GPU al hilo visual (vital en TV)
           await new Promise(res => setTimeout(res, 250));
         }
         console.log('[Cache] ✅ Caché de background IDB completado.');
      };
      
      backgroundLoad();
    },
    [cacheOne]
  );

  return {
    resolveUrl,
    cacheOne,
    preloadAll,
    progress,
    ready,
    isCached: (url) => memCache.current.has(url),
  };
};
