import { useCallback, useEffect, useRef, useState } from 'react';

const DB_NAME = 'ImageCacheV2';
const DB_VERSION = 1;
const STORE_NAME = 'images';

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

    // 2. IndexedDB
    const fromDB = await getFromDB(dbRef.current, url);
    if (fromDB) {
      memCache.current.set(url, fromDB);
      return fromDB;
    }

    // 3. Red
    try {
      const res = await fetch(url, { cache: 'force-cache' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const blob = await res.blob();

      // Guardar en IDB en background (no bloqueante)
      saveToDB(dbRef.current, url, blob);

      const blobUrl = URL.createObjectURL(blob);
      memCache.current.set(url, blobUrl);
      return blobUrl;
    } catch {
      // Si falla la red, devolver URL original para que el browser intente
      memCache.current.set(url, url);
      return url;
    }
  }, []);

  /**
   * Precarga TODAS las imágenes antes de iniciar el slideshow.
   * Actualiza `progress` (0-100) y setea `ready` al terminar.
   *
   * @param {string[]} urls - lista de URLs a precargar
   * @param {number} concurrency - descargas paralelas (default 3, no saturar la TV)
   */
  const preloadAll = useCallback(
    async (urls, concurrency = 3) => {
      const validUrls = [...new Set(urls.filter(Boolean))];
      if (validUrls.length === 0) {
        setReady(true);
        return;
      }

      setProgress(0);
      setReady(false);
      let done = 0;

      // Procesar en lotes para no sobrecargar la red de la TV
      for (let i = 0; i < validUrls.length; i += concurrency) {
        const batch = validUrls.slice(i, i + concurrency);
        await Promise.allSettled(batch.map(cacheOne));
        done += batch.length;
        setProgress(Math.round((done / validUrls.length) * 100));
      }

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
