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

import { useEffect, useRef, useState } from 'react';
import Logo from '../../assets/logo.png';
import { useImageCache } from '../../hooks/useImageCache';

// Importar plantillas
import PlantillaCanva4 from '../Plantillas/BlackFriday';
import PlantillaCanva5 from '../Plantillas/FeriaDescuentos';
import PlantillaCanva2 from '../Plantillas/FlashSale';
import PlantillaCanva3 from '../Plantillas/HotSale';
import PlantillaCanva from '../Plantillas/MegaOferta';
import PlantillaCanva6 from '../Plantillas/MegaSale';

const PLANTILLAS_MAP = {
  canva: PlantillaCanva,
  canva2: PlantillaCanva2,
  canva3: PlantillaCanva3,
  blackfriday: PlantillaCanva4,
  feriadedescuentos: PlantillaCanva5,
  megasale: PlantillaCanva6,
};

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
        gap: 32,
      }}
    >
      {logoSrc && <img src={logoSrc} alt="Logo" style={{ height: 80, objectFit: 'contain' }} />}

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
          width: 360,
        }}
      >
        <p
          style={{
            color: '#aaa',
            fontFamily: 'sans-serif',
            fontSize: 15,
            letterSpacing: 4,
            textTransform: 'uppercase',
            margin: 0,
          }}
        >
          Preparando catálogo...
        </p>

        {/* Barra de progreso */}
        <div
          style={{
            width: '100%',
            height: 6,
            background: '#333',
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

        <p style={{ color: '#555', fontFamily: 'monospace', fontSize: 13, margin: 0 }}>
          {progress}%
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
  duracionSegundos = 8,
  tvMode = false,
  onClose,
}) {
  const { resolveUrl, preloadAll, progress, ready } = useImageCache();
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef(null);

  // ── Paso 1: precargar todas las imágenes al montar ──────────
  useEffect(() => {
    if (productos.length === 0) return;
    const urls = extractImageUrls(productos);

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
    preloadAll(allUrls, 3); // 3 descargas en paralelo — no sofocar la TV
  }, [productos, preloadAll]);

  // ── Paso 2: arrancar el timer SOLO cuando ready === true ────
  useEffect(() => {
    if (!ready || productos.length === 0) return;

    // Empezar desde el primer slide
    setCurrentIndex(0);

    const tick = () => {
      setCurrentIndex((prev) => (prev + 1) % productos.length);
    };

    timerRef.current = setInterval(tick, duracionSegundos * 1000);
    return () => clearInterval(timerRef.current);
  }, [ready, productos, duracionSegundos]);

  // ── Cerrar con ESC en modo TV ────────────────────────────────
  useEffect(() => {
    if (!tvMode) return;
    const handler = (e) => {
      if (e.key === 'Escape' || e.key === 'Backspace') onClose?.();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [tvMode, onClose]);

  // ── Loading screen ───────────────────────────────────────────
  if (!ready) {
    return <LoadingScreen progress={progress} logoSrc={Logo} />;
  }

  // ── Slideshow ────────────────────────────────────────────────
  const producto = productos[currentIndex];
  const Plantilla = PLANTILLAS_MAP[producto?.plantillaId] ?? PlantillaCanva;

  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 9998, background: '#000' }}
      onClick={tvMode ? undefined : onClose}
    >
      <Plantilla
        nombreProducto={producto?.titulo || 'Producto'}
        descripcion={producto?.descripcion || ''}
        imagenProducto={resolveUrl(producto?.imagenProducto)}
        precioLista={producto?.precioLista || 0}
        precioOferta={producto?.precioOferta || 0}
        porcentajeDescuento={producto?.porcentajeDescuento || 0}
      />

      {/* Indicador de slide (opcional, útil para debug) */}
      {!tvMode && (
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
          {productos.map((_, i) => (
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
