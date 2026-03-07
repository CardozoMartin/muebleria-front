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

/**
 * Hook de caché de imágenes con estrategia "preload all → then play"
 *
 * Uso:
 *   const { resolveUrl, preloadAll, progress, ready } = useImageCache();
 *
 *   // Antes de mostrar el slideshow:
 *   await preloadAll(listaDeUrls);
 *
 *   // Al renderizar cada imagen:
 *   <img src={resolveUrl(url)} />
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
   * Precarga TODAS las imágenes antes de iniciar el slideshow.
   * Actualiza `progress` (0-100) y setea `ready` al terminar.
   *
   * @param {string[]} urls - lista de URLs a precargar
   * @param {number} concurrency - descargas paralelas (default 6 para TV - mejor red local)
   */
  const preloadAll = useCallback(
    async (urls, concurrency = 6) => {
      const validUrls = [...new Set(urls.filter(Boolean))];
      if (validUrls.length === 0) {
        setReady(true);
        return;
      }

      console.log(`[Cache] Preloading ${validUrls.length} images with concurrency ${concurrency}`);
      setProgress(0);
      setReady(false);
      let done = 0;

      // Procesar en lotes para optimizar la red de la TV
      for (let i = 0; i < validUrls.length; i += concurrency) {
        const batch = validUrls.slice(i, i + concurrency);
        await Promise.allSettled(batch.map(cacheOne));
        done += batch.length;
        const newProgress = Math.round((done / validUrls.length) * 100);
        setProgress(newProgress);
        console.log(`[Cache] Progress: ${newProgress}% (${done}/${validUrls.length})`);
      }

      console.log('[Cache] ✅ All images cached and ready to play');
      setReady(true);
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
