import React, { useRef, useState, useEffect } from 'react';
import ModeloMegaSale from '../components/ModelosPlantillas/ModeloMegaSale';
import ModeloLuxeShow from '../components/ModelosPlantillas/ModeloLuxeShow';
import ModeloCasaViva from '../components/ModelosPlantillas/ModeloCasaViva';



const PLANTILLAS = [
  {
    id: 'megasale',
    nombre: 'Mega Sale',
    descripcion: 'Energético · Naranja · Impacto',
    component: ModeloMegaSale,
    dot: 'bg-orange-500',
  },
  {
    id: 'luxeshow',
    nombre: 'Luxe Show',
    descripcion: 'Clásico · Madera clara · Sereno',
    component: ModeloLuxeShow,
    dot: 'bg-amber-700',
  },
  {
    id: 'casaviva',
    nombre: 'Casa Viva',
    descripcion: 'Cinematográfico · Oscuro · Cálido',
    component: ModeloCasaViva,
    dot: 'bg-orange-300',
  },
];

export const Plantillas = () => {
  const previewRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [plantillaActiva, setPlantillaActiva] = useState('megasale');

  const Activa = PLANTILLAS.find((p) => p.id === plantillaActiva)?.component ?? ModeloMegaSale;

  const handleFullscreen = async () => {
    if (!previewRef.current) return;
    try {
      if (!document.fullscreenElement) {
        await previewRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (error) {
      console.error('Error al activar pantalla completa:', error);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-1">Plantillas Publicitarias</h1>
          <p className="text-gray-500 text-sm">
            Diseños para pantallas de showroom · Optimizados para 32" o más
          </p>
        </div>

        {/* Selector */}
        <div className="mb-5 flex flex-wrap gap-3">
          {PLANTILLAS.map((p) => (
            <button
              key={p.id}
              onClick={() => setPlantillaActiva(p.id)}
              className={`flex items-center gap-3 px-5 py-3 rounded-xl border-2 transition-all duration-200 text-sm font-semibold ${
                plantillaActiva === p.id
                  ? 'bg-gray-800 border-gray-800 text-white shadow-lg scale-105'
                  : 'bg-white border-gray-200 text-gray-700 hover:border-gray-400 hover:shadow-sm'
              }`}
            >
              <span className={`w-2.5 h-2.5 rounded-full ${p.dot}`} />
              {p.nombre}
              <span
                className={`font-normal ${plantillaActiva === p.id ? 'text-gray-400' : 'text-gray-400'}`}
              >
                · {p.descripcion}
              </span>
            </button>
          ))}
        </div>

        {/* Controles */}
        <div className="mb-5 flex gap-4 items-center">
          <button
            onClick={handleFullscreen}
            className="px-5 py-2.5 bg-gray-800 hover:bg-gray-900 text-white font-semibold rounded-lg shadow transition-all duration-200 flex items-center gap-2 text-sm"
          >
            {isFullscreen ? (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Salir de Pantalla Completa
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                  />
                </svg>
                Ver en Pantalla Completa
              </>
            )}
          </button>
          <span className="text-sm text-gray-400">
            Presioná{' '}
            <kbd className="px-2 py-0.5 bg-white border border-gray-300 rounded text-xs font-mono">
              ESC
            </kbd>{' '}
            para salir
          </span>
        </div>

        {/* Preview */}
        <div
          ref={previewRef}
          className={`relative bg-black rounded-xl overflow-hidden shadow-2xl ${
            isFullscreen ? '' : 'border-4 border-gray-200'
          }`}
          style={{
            aspectRatio: isFullscreen ? 'auto' : '16/9',
            height: isFullscreen ? '100vh' : 'auto',
          }}
        >
          {isFullscreen && (
            <button
              onClick={handleFullscreen}
              className="absolute top-6 right-6 z-50 px-4 py-2 bg-black/60 hover:bg-black/80 text-white text-sm font-semibold rounded-lg backdrop-blur transition-all duration-200 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Salir
            </button>
          )}
          <Activa key={plantillaActiva} />
        </div>

        {/* Info cards */}
        {!isFullscreen && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {PLANTILLAS.map((p) => (
              <div
                key={p.id}
                onClick={() => setPlantillaActiva(p.id)}
                className={`p-4 rounded-xl cursor-pointer transition-all duration-200 border-2 ${
                  plantillaActiva === p.id
                    ? 'border-gray-700 bg-gray-800 text-white'
                    : 'border-transparent bg-white text-gray-800 hover:border-gray-300 hover:shadow-sm'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className={`w-2.5 h-2.5 rounded-full ${p.dot}`} />
                  <h3 className="font-semibold text-sm">{p.nombre}</h3>
                </div>
                <p
                  className={`text-xs ${plantillaActiva === p.id ? 'text-gray-400' : 'text-gray-400'}`}
                >
                  {p.descripcion}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
