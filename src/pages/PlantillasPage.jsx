import React, { useEffect, useRef, useState } from 'react';
import LuxeShow from '../components/Plantillas/LuxeShow';
import MegaSale from '../components/Plantillas/MegaSale';
import CasaViva from '../components/Plantillas/CasaViva';
import HotSale from '../components/Plantillas/HotSale';

const PLANTILLAS = [
  {
    id: 'megasale',
    nombre: 'Mega Sale',
    descripcion: 'Energético · Naranja · Impacto',
    component: MegaSale,
    dot: 'bg-orange-500',
  },
  {
    id: 'luxeshow',
    nombre: 'Super Sale',
    descripcion: 'En tonos azules · Elegante · Sofisticado',
    component: LuxeShow,
    dot: 'bg-blue-500',
  },
  {
    id: 'casaviva',
    nombre: 'Oferta Especial',
    descripcion: 'En tonos verdes · Natural · Acogedor',
    component: CasaViva,
    dot: 'bg-green-500',
  },
  {
    id: 'hotsale',
    nombre: 'Hot Sale',
    descripcion: 'Dinámico · con tonos rojos, naranjas y amarillos · Llamativo ',
    component: HotSale,
    dot: 'bg-red-600',
  },
];

// Dimensiones de referencia del template
const TMPL_W = 1280;
const TMPL_H = 720;

function MiniCard({ plantilla, onClick }) {
  const wrapRef = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const update = () => {
      if (wrapRef.current) {
        setScale(wrapRef.current.offsetWidth / TMPL_W);
      }
    };
    update();
    const ro = new ResizeObserver(update);
    if (wrapRef.current) ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, []);

  const Comp = plantilla.component;

  return (
    <div className="flex flex-col gap-2 cursor-pointer group" onClick={onClick}>
      {/* Nombre arriba */}
      <div className="flex items-center gap-2 px-1">
        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${plantilla.dot}`} />
        <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">
          {plantilla.nombre}
        </span>
        <span className="text-xs text-gray-400 truncate">· {plantilla.descripcion}</span>
      </div>

      {/* Mini preview */}
      <div
        ref={wrapRef}
        className="relative w-full overflow-hidden rounded-xl border-2 border-gray-200 group-hover:border-gray-400 group-hover:shadow-xl transition-all duration-200"
        style={{ aspectRatio: `${TMPL_W}/${TMPL_H}` }}
      >
        {/* Overlay clicable encima para capturar el click sin interferir con el componente */}
        <div className="absolute inset-0 z-10" />

        {/* Template escalado */}
        <div
          style={{
            width: TMPL_W,
            height: TMPL_H,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            pointerEvents: 'none',
          }}
        >
          <Comp key={plantilla.id} />
        </div>

        {/* Hover hint */}
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-all duration-200 rounded-xl">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/70 text-white text-sm font-semibold px-4 py-2 rounded-lg backdrop-blur">
            Ver en pantalla completa
          </span>
        </div>
      </div>
    </div>
  );
}

function FullscreenModal({ plantilla, onClose }) {
  const containerRef = useRef(null);
  const onCloseRef = useRef(onClose);
  useEffect(() => { onCloseRef.current = onClose; });
  const Comp = plantilla.component;

  // Intentar fullscreen real del navegador
  useEffect(() => {
    const el = containerRef.current;
    if (el && el.requestFullscreen) {
      el.requestFullscreen().catch(() => {});
    }
    const onFsChange = () => {
      if (!document.fullscreenElement) onCloseRef.current();
    };
    document.addEventListener('fullscreenchange', onFsChange);
    return () => {
      document.removeEventListener('fullscreenchange', onFsChange);
      if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    };
  }, []);

  // Cerrar con ESC si el fullscreen del nav no funciona
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onCloseRef.current(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-black"
      style={{ width: '100vw', height: '100vh' }}
    >
      <Comp key={plantilla.id} />
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-[60] px-4 py-2 bg-black/60 hover:bg-black/90 text-white text-sm font-semibold rounded-lg backdrop-blur flex items-center gap-2 transition-all"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
        Salir
      </button>
    </div>
  );
}

export const Plantillas = () => {
  const [abierta, setAbierta] = useState(null);

  return (
    <div className="w-full min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-1">Plantillas Publicitarias</h1>
          <p className="text-gray-500 text-sm">
            Hacé click en una plantilla para verla en pantalla completa · Optimizadas para 32" o más
          </p>
        </div>

        {/* Grid 3 por fila */}
        <div className="grid grid-cols-3 gap-6">
          {PLANTILLAS.map((p) => (
            <MiniCard key={p.id} plantilla={p} onClick={() => setAbierta(p)} />
          ))}
        </div>
      </div>

      {/* Modal fullscreen */}
      {abierta && (
        <FullscreenModal plantilla={abierta} onClose={() => setAbierta(null)} />
      )}
    </div>
  );
};
