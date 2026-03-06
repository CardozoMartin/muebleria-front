import { useEffect, useRef, useState } from 'react';

import CalidezTV from '../Plantillas/CalidezTV';
import CasaViva from '../Plantillas/Casaviva';
import CyberMonday from '../Plantillas/CyberMonday';
import HotSale from '../Plantillas/HotSale';
import ImpactoTV from '../Plantillas/ImpactoTV';
import ImpactoTV2 from '../Plantillas/ImpactoTV2';
import Liquidacion from '../Plantillas/Liquidacion';
import LuxeShow from '../Plantillas/LuxeShow';
import MegaSale from '../Plantillas/MegaSale';
import ModernTV from '../Plantillas/ModernTV';
import PlantillaCanva from '../Plantillas/PlantillaCanva';
import PlantillaCanva2 from '../Plantillas/PlantillaCanva2';
import PlantillaCanva3 from '../Plantillas/PlantillaCanva3';
import SpotlightTV from '../Plantillas/SpotlightTV';

// import CasaViva from "./Plantillas/CasaViva";

const PLANTILLAS_MAP = {
  megasale: MegaSale,
  luxeshow: LuxeShow,
  casaviva: CasaViva,
  liquidacion: Liquidacion,
  hotsale: HotSale,
  cybermonday: CyberMonday,
  calidez: CalidezTV,
  impactotv: ImpactoTV,
  impactotv2: ImpactoTV2,
  modern: ModernTV,
  spotlight: SpotlightTV,
  canva: PlantillaCanva,
  canva2: PlantillaCanva2,
  canva3: PlantillaCanva3,
};

/**
 * SlideShowPlayer
 * @param {Object[]} productos - productos filtrados por categoría, cada uno con plantillaId
 * @param {number} duracionSegundos - duración por slide (default 8s)
 * @param {Function} onClose - callback para cerrar el modal
 */
export default function SlideShowPlayer({
  productos = [],
  duracionSegundos = 8,
  onClose,
  tvMode = false,
}) {
  const [indiceActual, setIndiceActual] = useState(0);
  const [progreso, setProgreso] = useState(0);
  const [pausado, setPausado] = useState(false);
  const timeoutRef = useRef(null);
  const intervalRef = useRef(null);

  const productoActual = productos[indiceActual];
  const PlantillaComponente = productoActual
    ? (PLANTILLAS_MAP[productoActual.plantillaId] ?? PLANTILLAS_MAP['megasale'])
    : null;

  const avanzar = (indice) => {
    setIndiceActual(indice);
    setProgreso(0);
  };

  // Loop principal
  useEffect(() => {
    if (!productos.length || pausado) return;

    const duracionMs = duracionSegundos * 1000;

    // Barra de progreso cada 50ms
    intervalRef.current = setInterval(() => {
      setProgreso((prev) => Math.min(prev + (50 / duracionMs) * 100, 100));
    }, 50);

    // Avance al siguiente slide
    timeoutRef.current = setTimeout(() => {
      setIndiceActual((prev) => (prev + 1) % productos.length);
      setProgreso(0);
    }, duracionMs);

    return () => {
      clearTimeout(timeoutRef.current);
      clearInterval(intervalRef.current);
    };
  }, [indiceActual, pausado, productos, duracionSegundos]);

  // Pantalla completa al montar, salir al cerrar (siempre)
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

  // Cerrar con ESC, botón Atrás del navegador/TV y teclas de mando
  useEffect(() => {
    // pushState + popstate solo en tvMode
    if (tvMode) {
      history.pushState({ slideshow: true }, '');
    }

    const handleKey = (e) => {
      // ESC + teclas de "Atrás" de Smart TV (LG: 461, Samsung Tizen: 10009)
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

  if (!productoActual) return null;

  return (
    // Overlay fullscreen
    <div className="fixed inset-0 z-50 bg-black flex flex-col">
      {/* Botón cerrar — siempre visible, fuera del HUD, solo en !tvMode */}
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

      {/* Slide actual — ocupa todo */}
      <div className="flex-1 relative overflow-hidden">
        <PlantillaComponente
          titulo={productoActual.titulo}
          descripcion={productoActual.descripcion}
          imagenProducto={productoActual.imagenProducto}
          precioLista={productoActual.precioLista}
          precioOferta={productoActual.precioOferta}
          porcentajeDescuento={productoActual.porcentajeDescuento}
          categoria={productoActual.categoria}
        />

        {/* HUD — controles superpuestos */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Barra de progreso arriba */}
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

          {/* Info top-right */}
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
                  <svg className="w-3.5 h-3.5 text-white fill-white" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                ) : (
                  <svg className="w-3.5 h-3.5 text-white fill-white" viewBox="0 0 24 24">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                )}
              </button>
            )}
          </div>

          {/* Navegación lateral — solo en modo administrador */}
          {!tvMode && (
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
          )}
          {!tvMode && (
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
          )}

          {/* Indicador pausa */}
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
