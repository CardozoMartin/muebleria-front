import React, { useEffect, useRef, useState } from 'react';
import PlantillaCanva from '../components/Plantillas/MegaOferta';
import PlantillaCanva2 from '../components/Plantillas/FlashSale';
import PlantillaCanva3 from '../components/Plantillas/HotSale';
import PlantillaCanva4 from '../components/Plantillas/BlackFriday';
import PlantillaCanva5 from '../components/Plantillas/FeriaDescuentos';
import PlantillaCanva6 from '../components/Plantillas/MegaSale';

// Importar fondos para las demos
import bgMegaOferta from '../assets/canva/megaoferta.png';
import bgFlashSale from '../assets/canva/flashsale.png';
import bgHotSale from '../assets/canva/hotsale.png';
import bgBlackFriday from '../assets/canva/blackfriday.png';
import bgFeria from '../assets/canva/feriadedescuentos.png';
import bgMegaSale from '../assets/canva/megasale.png';

const MOCK_DATA = {
  nombreProducto: 'Juego de Comedor',
  descripcion: 'Mesa de madera maciza para 6 personas con sillas tapizadas en pana antimanchas. Diseño moderno y minimalista.',
  precioLista: 185000,
  precioOferta: 148000,
  porcentajeDescuento: 20,
  imagenProducto: 'https://images.unsplash.com/photo-1592078615290-033ee584e277?q=80&w=1000&auto=format&fit=crop',
};


const PLANTILLAS = [
  {
    id: 'megaoferta',
    nombre: 'Mega Oferta',
    descripcion: 'Dinámico · con tonos rojos, amarillos y azules · Moderno ',
    component: PlantillaCanva,
    dot: 'bg-purple-600',
    background: bgMegaOferta,
  },
  {
    id: 'flashsale',
    nombre: 'Flash Sale',
    descripcion: 'Llamativo · con tonos amarillos y rojos · Dinámico',
    component: PlantillaCanva2,
    dot: 'bg-red-600',
    background: bgFlashSale,
  },
  {
    id: 'hotsale',
    nombre: 'Hot Sale',
    descripcion: 'Dinámico · con tonos rojos · Llamativo ',
    component: PlantillaCanva3,
    dot: 'bg-yellow-300',
    background: bgHotSale,
  },
  {
    id: 'blackfriday',
    nombre: 'Black Friday',
    descripcion: 'Impactante · con contrastes entre blanco, negro y amarillo · Dinámico',
    component: PlantillaCanva4,
    dot: 'bg-gray-800',
    background: bgBlackFriday,
  },
  {
    id: 'feriadedescuentos',
    nombre: 'Feria de Descuentos',
    descripcion: 'Alegre · con colores fuertes y vibrantes · Moderno',
    component: PlantillaCanva5,
    dot: 'bg-blue-600',
    background: bgFeria,
  },
  {
    id: 'megasale',
    nombre: 'Mega Sale',
    descripcion: 'Dinámico · con tonos verdes y amarillos · Atractivo',
    component: PlantillaCanva6,
    dot: 'bg-green-500',
    background: bgMegaSale,
  }
];

// Dimensiones de referencia del template (coinciden con BASE_W/BASE_H de los componentes)
const TMPL_W = 1200;
const TMPL_H = 600;

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
        <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors whitespace-nowrap">
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
          <Comp
            key={plantilla.id}
            preview
            {...MOCK_DATA}
            backgroundUrl={plantilla.background}
          />
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
      <Comp
        key={plantilla.id}
        {...MOCK_DATA}
        backgroundUrl={plantilla.background}
      />
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
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="border-l-4 border-red-600 pl-4">
        <h1 className="text-2xl font-extrabold text-gray-900 tracking-wider uppercase leading-none mb-2">Plantillas Publicitarias</h1>
        <p className="text-red-600 text-xs font-semibold tracking-[0.2em] uppercase">
          Hacé click en una plantilla para verla en pantalla completa · Optimizadas para 32" o más
        </p>
      </div>

      {/* Grid 3 por fila */}
      <div className="grid grid-cols-3 gap-6 auto-rows-max">
        {PLANTILLAS.map((p) => (
          <MiniCard key={p.id} plantilla={p} onClick={() => setAbierta(p)} />
        ))}
      </div>

      {/* Modal fullscreen */}
      {abierta && (
        <FullscreenModal plantilla={abierta} onClose={() => setAbierta(null)} />
      )}
    </div>
  );
};
