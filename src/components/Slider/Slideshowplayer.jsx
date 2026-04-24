/**
 * SlideShowPlayer — con estrategia "precargar todo antes de reproducir"
 *
 * Flujo:
 *  1. Al montar, extrae todas las URLs de imágenes de los productos
 *  2. Muestra pantalla de carga con barra de progreso
 *  3. Solo cuando progress === 100 arranca el slideshow
 *  4. Cada <img> usa resolveUrl() → blob URL desde memoria (acceso instantáneo)
 *
 * Requisitos:
 *  - useImageCache del archivo useImageCache.js (versión optimizada)
 *  - Las fuentes (Rubik, Bebas Neue) deben estar en el <head> del index.html
 *    como <link rel="preload"> para no bloquear el primer render
 */

import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import Logo from '../../assets/logo.png';
import { useImageCache } from '../../hooks/useImageCache';
import { PLANTILLAS } from '../../constants/plantillas';
import { Loader2, X } from 'lucide-react';

// Importar fondos para que Vite los procese correctamente
import bgMegaOferta from '../../assets/canva/megaoferta.png';
import bgFlashSale from '../../assets/canva/flashsale.png';
import bgHotSale from '../../assets/canva/hotsale.png';
import bgBlackFriday from '../../assets/canva/blackfriday.png';
import bgFeria from '../../assets/canva/feriadedescuentos.png';
import bgMegaSale from '../../assets/canva/megasale.png';

// Mapeo de backgrounds importados
const BACKGROUNDS_MAP = {
  canva: bgMegaOferta,
  canva2: bgFlashSale,
  canva3: bgHotSale,
  blackfriday: bgBlackFriday,
  feriadedescuentos: bgFeria,
  megasale: bgMegaSale,
};

// Dynamically create the map from the central plantillas constant
const PLANTILLAS_MAP = PLANTILLAS.reduce((acc, p) => {
  acc[p.id] = p.component;
  return acc;
}, {});

/* ─────────────────────────────────────────────────────────────
   Extrae todas las URLs de imágenes de un producto
   Ajustá los campos según tu modelo de datos real
───────────────────────────────────────────────────────────── */
function extractImageUrls(productos) {
  const urls = [];
  for (const p of productos) {
    if (p.imagenUrl) urls.push(p.imagenUrl);
    if (p.imagen) urls.push(p.imagen);
    if (p.imagenProducto) urls.push(p.imagenProducto);
    // Si hay galería de imágenes:
    if (Array.isArray(p.imagenes)) urls.push(...p.imagenes.filter(Boolean));
  }
  return [...new Set(urls.filter(Boolean))];
}

/* ─────────────────────────────────────────────────────────────
   Pantalla de precarga — visible mientras se cachean las imágenes
───────────────────────────────────────────────────────────── */
function LoadingScreen({ progress, logoSrc }) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#111',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 40,
      }}
    >
      {logoSrc && <img src={logoSrc} alt="Logo" style={{ height: 80, objectFit: 'contain' }} />}

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 20,
          width: 400,
        }}
      >
        <p
          style={{
            color: '#aaa',
            fontFamily: 'sans-serif',
            fontSize: 16,
            letterSpacing: 3,
            textTransform: 'uppercase',
            margin: 0,
            fontWeight: 600,
          }}
        >
          Preparando Catálogo
        </p>

        {/* Barra de progreso mejorada */}
        <div
          style={{
            width: '100%',
            height: 8,
            background: 'rgba(255,255,255,0.1)',
            borderRadius: 3,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #ef4444, #f97316)',
              borderRadius: 3,
              transition: 'width 0.3s ease',
            }}
          />
        </div>

        <p
          style={{
            color: '#ff6600',
            fontFamily: 'sans-serif',
            fontSize: 28,
            margin: 0,
            fontWeight: 'bold',
          }}
        >
          {progress}%
        </p>
        <p
          style={{ color: '#666', fontFamily: 'sans-serif', fontSize: 12, margin: 0, marginTop: 8 }}
        >
          {progress === 100 ? '✓ Listo para reproducir' : 'Cargando imágenes...'}
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   SlideShowPlayer
───────────────────────────────────────────────────────────── */
export default function SlideShowPlayer({
  productos = [],
  duracionSegundos = 15, // ⚠️ 15 segundos por slide
  tvMode = false,
  onClose,
}) {
  const { resolveUrl, preloadAll, progress, ready, cacheOne } = useImageCache();
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef(null);
  const containerRef = useRef(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  });

  // ⚠️ MEMOIZAR productos para evitar re-renders cuando allProducts cambia en Reproductor
  const productosMemo = useMemo(
    () => productos,
    [productos.length, productos.map((p) => p.id).join(',')]
  );

  // ── Paso 1: precargar todas las imágenes al montar ──────────
  useEffect(() => {
    if (productosMemo.length === 0) return;
    const urls = extractImageUrls(productosMemo);

    // Agregar los fondos de las plantillas
    const fondosCanva = [
      '/assets/canva/blackfriday.png',
      '/assets/canva/feriadedescuentos.png',
      '/assets/canva/flashsale.png',
      '/assets/canva/hotsale.png',
      '/assets/canva/megasale.png',
      '/assets/canva/megaoferta.png',
    ];

    const allUrls = [...urls, ...fondosCanva];
    console.log(
      `[SlideShow] Starting to preload ${allUrls.length} images from ${productosMemo.length} products`
    );
    preloadAll(allUrls); // Usa default de 6 descargas paralelas (optimizado para TV)
  }, [productosMemo, preloadAll]);

  // ── Paso 2: arrancar el timer SOLO cuando ready === true ────
  useEffect(() => {
    if (!ready || productosMemo.length === 0) return;

    // Empezar desde el primer slide
    setCurrentIndex(0);

    const tick = () => {
      setCurrentIndex((prev) => (prev + 1) % productosMemo.length);
    };

    timerRef.current = setInterval(tick, duracionSegundos * 1000);
    return () => clearInterval(timerRef.current);
  }, [ready, productosMemo, duracionSegundos]);

  // ── Cerrar con ESC en modo TV ────────────────────────────────
  useEffect(() => {
    if (!tvMode) return;
    const handler = (e) => {
      if (e.key === 'Escape' || e.key === 'Backspace') onClose?.();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [tvMode, onClose]);

  // ── Fullscreen real del navegador en modo TV ──────────────────────────
  useEffect(() => {
    if (!tvMode) return;

    const el = containerRef.current;
    if (el?.requestFullscreen) {
      el.requestFullscreen().catch(() => {});
    }

    const onFsChange = () => {
      if (!document.fullscreenElement) onCloseRef.current?.();
    };

    document.addEventListener('fullscreenchange', onFsChange);
    return () => {
      document.removeEventListener('fullscreenchange', onFsChange);
      if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    };
  }, [tvMode]);

  // ── Precarga JIT (Just In Time) para uso de RAM acotado ────────
  useEffect(() => {
    if (!ready || productosMemo.length === 0) return;

    // Queremos tener siempre listos el índice actual y los dos siguientes.
    const productsToWarm = [
      productosMemo[currentIndex],
      productosMemo[(currentIndex + 1) % productosMemo.length],
      productosMemo[(currentIndex + 2) % productosMemo.length],
    ].filter(Boolean);

    // Extraemos sus URLs y las forzamos a ingresar al cache de memoria 
    const urlsToWarm = extractImageUrls(productsToWarm);
    
    // También precargar los fondos de las plantillas que se van a usar
    productsToWarm.forEach(p => {
      const bg = BACKGROUNDS_MAP[p.plantillaId] || BACKGROUNDS_MAP['canva'];
      if (bg) urlsToWarm.push(bg);
    });

    [...new Set(urlsToWarm)].forEach((url) => cacheOne(url));
  }, [currentIndex, ready, productosMemo, cacheOne]);

  // ── Loading screen ───────────────────────────────────────────
  const producto = productosMemo[currentIndex];
  const Plantilla = PLANTILLAS_MAP[producto?.plantillaId] ?? PLANTILLAS_MAP['canva'];

  // Resolver background desde cache usando el mapa de importaciones
  const bgPath = BACKGROUNDS_MAP[producto?.plantillaId] || BACKGROUNDS_MAP['canva'];
  const resolvedBackground = resolveUrl(bgPath);

  return (
    <div
      ref={containerRef}
      style={{ position: 'fixed', inset: 0, zIndex: 9998, background: '#000', width: '100vw', height: '100vh', overflow: 'hidden' }}
      onClick={tvMode ? undefined : onClose}
    >
      {!ready ? (
        <LoadingScreen progress={progress} logoSrc={Logo} />
      ) : (
        <Suspense fallback={<div className="w-full h-full bg-black flex items-center justify-center"><Loader2 className="animate-spin text-white" /></div>}>
          <Plantilla
            key={currentIndex}
            nombreProducto={producto?.titulo || 'Producto'}
            descripcion={producto?.descripcion || ''}
            imagenProducto={resolveUrl(producto?.imagenProducto)}
            backgroundUrl={resolvedBackground}
            precioLista={producto?.precioLista || 0}
            precioOferta={producto?.precioOferta || 0}
            porcentajeDescuento={producto?.porcentajeDescuento || 0}
          />
        </Suspense>
      )}

      {/* Indicador de slide (opcional, útil para debug) */}
      {!tvMode && ready && (
        <div
          style={{
            position: 'absolute',
            bottom: 16,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 8,
          }}
        >
          {productosMemo.map((_, i) => (
            <div
              key={i}
              style={{
                width: i === currentIndex ? 24 : 8,
                height: 8,
                borderRadius: 4,
                background: i === currentIndex ? '#ef4444' : 'rgba(255,255,255,0.3)',
                transition: 'width 0.3s ease',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
