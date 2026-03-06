import { useEffect, useRef, useCallback } from 'react';

/**
 * Hook para cachear imágenes en memoria y en IndexedDB
 * Evita re-descargas innecesarias de imágenes en slideshows
 */
export const useImageCache = () => {
  const cacheRef = useRef(new Map());
  const dbRef = useRef(null);

  // Inicializar IndexedDB
  useEffect(() => {
    if (!('indexedDB' in window)) return;

    const request = indexedDB.open('ImageCache', 1);

    request.onerror = () => console.warn('IndexedDB no disponible');

    request.onsuccess = (event) => {
      dbRef.current = event.target.result;
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('images')) {
        db.createObjectStore('images', { keyPath: 'url' });
      }
    };
  }, []);

  // Obtener imagen desde caché o red
  const preloadImage = useCallback(async (url) => {
    if (!url) return null;

    // 1. Buscar en caché en memoria
    if (cacheRef.current.has(url)) {
      return cacheRef.current.get(url);
    }

    // 2. Buscar en IndexedDB
    if (dbRef.current) {
      try {
        const tx = dbRef.current.transaction('images', 'readonly');
        const store = tx.objectStore('images');
        const request = store.get(url);

        return new Promise((resolve) => {
          request.onsuccess = () => {
            if (request.result) {
              const blob = request.result.blob;
              const blobUrl = URL.createObjectURL(blob);
              cacheRef.current.set(url, blobUrl);
              resolve(blobUrl);
            } else {
              resolve(null);
            }
          };
          request.onerror = () => resolve(null);
        });
      } catch (error) {
        console.warn('Error leyendo IndexedDB:', error);
      }
    }

    return null;
  }, []);

  // Descargar y cachear imagen
  const cacheImage = useCallback(async (url) => {
    if (!url) return url;

    // Si ya está en caché, devolverlo
    if (cacheRef.current.has(url)) {
      return cacheRef.current.get(url);
    }

    try {
      // Descargar la imagen
      const response = await fetch(url);
      const blob = await response.blob();

      // Guardar en IndexedDB para persistencia entre sesiones
      if (dbRef.current) {
        try {
          const tx = dbRef.current.transaction('images', 'readwrite');
          const store = tx.objectStore('images');
          await new Promise((resolve, reject) => {
            const request = store.put({ url, blob });
            request.onsuccess = resolve;
            request.onerror = reject;
          });
        } catch (error) {
          console.warn('Error guardando en IndexedDB:', error);
        }
      }

      // Crear URL de blob y guardar en caché de memoria
      const blobUrl = URL.createObjectURL(blob);
      cacheRef.current.set(url, blobUrl);

      return blobUrl;
    } catch (error) {
      console.warn(`Error cacheando imagen ${url}:`, error);
      return url; // Devolver URL original si hay error
    }
  }, []);

  // Precarga múltiples imágenes en paralelo
  const preloadImages = useCallback(async (urls) => {
    const validUrls = urls.filter(Boolean);
    return Promise.allSettled(validUrls.map(cacheImage));
  }, [cacheImage]);

  // Limpiar URLs de blob cuando se desmonte
  useEffect(() => {
    return () => {
      cacheRef.current.forEach((blobUrl) => {
        if (blobUrl.startsWith('blob:')) {
          URL.revokeObjectURL(blobUrl);
        }
      });
    };
  }, []);

  return {
    cacheImage,
    preloadImage,
    preloadImages,
    isCached: (url) => cacheRef.current.has(url),
  };
};
