import { useEffect, useRef, useState } from 'react';
import { useImageCache } from '../../hooks/useImageCache';


import PlantillaCanva from '../Plantillas/MegaOferta';
import PlantillaCanva2 from '../Plantillas/FlashSale';
import PlantillaCanva3 from '../Plantillas/HotSale';
import PlantillaCanva4 from '../Plantillas/BlackFriday';
import PlantillaCanva5 from '../Plantillas/FeriaDescuentos';


const PLANTILLAS_MAP = {
  canva: PlantillaCanva,
  canva2: PlantillaCanva2,
  canva3: PlantillaCanva3,
  canva4: PlantillaCanva4,
  canva5: PlantillaCanva5,
};

export default function SlideShowPlayer({
  productos = [],
  duracionSegundos = 8,
  onClose,
  tvMode = false,
}) {
  const [indiceActual, setIndiceActual] = useState(0);
  const [progreso, setProgreso] = useState(0);
  const [pausado, setPausado] = useState(false);
  const [listoParaReproducir, setListoParaReproducir] = useState(false);

  const timeoutRef = useRef(null);
  const intervalRef = useRef(null);
  const { preloadImages } = useImageCache();

  // ── Pre-renderizar TODAS las plantillas al montar ──────────────────────
  // Las plantillas nunca se desmontan — se muestran/ocultan con CSS visibility.
  // Esto evita re-montajes y re-fetches de imágenes en cada rotación.

  const avanzar = (indice) => {
    setIndiceActual(indice);
    setProgreso(0);
  };

  // Precarga de TODAS las imágenes (producto + fondos de plantilla) antes de arrancar
  useEffect(() => {
    if (productos.length === 0) return;

    const imagenesProducto = productos.map((p) => p.imagenProducto).filter(Boolean);

    // Las imágenes de fondo de Canva se precargan también como Image()
    // para que el browser las tenga en cache HTTP antes de que las plantillas las pidan
    const fondosCanva = [
      '/src/assets/canva/1.png',
      '/src/assets/canva/5.png',
      '/src/assets/canva/6.png',
    ];

    const precargarTodo = async () => {
      // Precargar fondos primero (son las más pesadas)
      await Promise.allSettled(
        fondosCanva.map(
          (src) =>
            new Promise((res) => {
              const img = new Image();
              img.onload = res;
              img.onerror = res; // no bloquear si falla
              img.src = src;
            })
        )
      );

      // Luego imágenes de productos
      await preloadImages(imagenesProducto).catch(() => {});

      setListoParaReproducir(true);
    };

    precargarTodo();
  }, [productos, preloadImages]);

  // Loop principal — solo corre cuando está listo
  useEffect(() => {
    if (!listoParaReproducir || !productos.length || pausado) return;

    const duracionMs = duracionSegundos * 1000;

    intervalRef.current = setInterval(() => {
      setProgreso((prev) => Math.min(prev + (50 / duracionMs) * 100, 100));
    }, 50);

    timeoutRef.current = setTimeout(() => {
      setIndiceActual((prev) => (prev + 1) % productos.length);
      setProgreso(0);
    }, duracionMs);

    return () => {
      clearTimeout(timeoutRef.current);
      clearInterval(intervalRef.current);
    };
  }, [indiceActual, pausado, productos, duracionSegundos, listoParaReproducir]);

  // Pantalla completa
  useEffect(() => {
    const el = document.documentElement;
    const requestFS =
      el.requestFullscreen ||
      el.webkitRequestFullscreen ||
      el.mozRequestFullScreen ||
      el.msRequestFullscreen;
    requestFS?.call(el).catch(() => {});

    return () => {
      const exitFS =
        document.exitFullscreen ||
        document.webkitExitFullscreen ||
        document.mozCancelFullScreen ||
        document.msExitFullscreen;
      if (document.fullscreenElement || document.webkitFullscreenElement) {
        exitFS?.call(document).catch(() => {});
      }
    };
  }, []);

  // Teclado / mando TV
  useEffect(() => {
    if (tvMode) history.pushState({ slideshow: true }, '');

    const handleKey = (e) => {
      const backKeys = ['Escape', 'GoBack', 'BrowserBack'];
      const backCodes = [461, 10009, 10182];
      if (backKeys.includes(e.key) || backCodes.includes(e.keyCode)) {
        e.preventDefault();
        onClose?.();
        return;
      }
      if (e.key === ' ') setPausado((p) => !p);
      if (e.key === 'ArrowRight') avanzar((indiceActual + 1) % productos.length);
      if (e.key === 'ArrowLeft') avanzar((indiceActual - 1 + productos.length) % productos.length);
    };

    const handlePopState = () => onClose?.();

    window.addEventListener('keydown', handleKey);
    if (tvMode) window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('keydown', handleKey);
      if (tvMode) window.removeEventListener('popstate', handlePopState);
    };
  }, [indiceActual, productos.length, onClose, tvMode]);

  if (!productos.length) return null;

  // ── Pantalla de carga mientras se precargan las imágenes ──────────────
  if (!listoParaReproducir) {
    return (
      <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center gap-6">
        <div className="flex gap-3">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{ animationDelay: `${i * 0.15}s` }}
              className="w-4 h-4 rounded-full bg-red-600 animate-bounce"
            />
          ))}
        </div>
        <p className="text-white/50 text-sm tracking-widest uppercase font-medium">
          Preparando imágenes...
        </p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col">
      {!tvMode && (
        <button
          onClick={onClose}
          className="fixed top-5 right-5 z-[60] w-12 h-12 rounded-full bg-black/60 hover:bg-black/80 border-2 border-white/50 flex items-center justify-center transition shadow-xl"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}

      {/* ── SLIDES PRE-RENDERIZADOS — todos montados, solo uno visible ── */}
      <div className="flex-1 relative overflow-hidden">
        {productos.map((producto, i) => {
          const Plantilla = PLANTILLAS_MAP[producto.plantillaId] ?? PLANTILLAS_MAP['megasale'];
          const esActivo = i === indiceActual;

          return (
            <div
              key={`slide-${producto.id ?? i}`}
              style={{
                position: 'absolute',
                inset: 0,
                // Visibilidad pura por CSS — el DOM nunca se desmonta
                opacity: esActivo ? 1 : 0,
                // Solo el activo recibe eventos y captura GPU
                visibility: esActivo ? 'visible' : 'hidden',
                // Transición suave entre slides
                transition: esActivo ? 'opacity 0.4s ease' : 'none',
                // El slide inactivo no consume layer de compositing
                willChange: esActivo ? 'opacity' : 'auto',
              }}
              aria-hidden={!esActivo}
            >
              <Plantilla
                titulo={producto.titulo}
                nombreProducto={producto.titulo}
                descripcion={producto.descripcion}
                imagenProducto={producto.imagenProducto}
                precioLista={producto.precioLista}
                precioOferta={producto.precioOferta}
                porcentajeDescuento={producto.porcentajeDescuento}
                categoria={producto.categoria}
              />
            </div>
          );
        })}

        {/* HUD superpuesto */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Barras de progreso */}
          <div className="absolute top-0 left-0 right-0 flex gap-1 p-3">
            {productos.map((_, i) => (
              <div key={i} className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white rounded-full transition-none"
                  style={{
                    width: i < indiceActual ? '100%' : i === indiceActual ? `${progreso}%` : '0%',
                  }}
                />
              </div>
            ))}
          </div>

          {/* Contador top-right */}
          <div className="absolute top-6 right-6 flex items-center gap-3 pointer-events-auto">
            <span className="text-white/60 text-xs font-mono">
              {indiceActual + 1} / {productos.length}
            </span>
            {!tvMode && (
              <button
                onClick={() => setPausado((p) => !p)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur flex items-center justify-center transition"
              >
                {pausado ? (
                  <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                ) : (
                  <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                )}
              </button>
            )}
          </div>

          {/* Navegación lateral — solo admin */}
          {!tvMode && (
            <>
              <button
                onClick={() => avanzar((indiceActual - 1 + productos.length) % productos.length)}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur flex items-center justify-center transition pointer-events-auto"
              >
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={() => avanzar((indiceActual + 1) % productos.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur flex items-center justify-center transition pointer-events-auto"
              >
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </>
          )}

          {pausado && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-white/10 backdrop-blur rounded-full text-white/60 text-xs font-mono">
              PAUSADO · ESPACIO para reanudar
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
