import React, { useEffect, useState } from 'react'
import { PLANTILLAS } from '../../constants/plantillas'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

const ModalVideo = ({ product, setShowVideo }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Cerrar con tecla ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setShowVideo(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [setShowVideo]);

  // Normalizar imagenProducto a array
  const imagenes = Array.isArray(product?.imagenProducto) 
    ? product.imagenProducto 
    : product?.imagenProducto 
      ? [product.imagenProducto] 
      : [];

  // Rotación automática de imágenes cada 4 segundos
  useEffect(() => {
    if (imagenes.length <= 1) return; // No rotar si solo hay 1 imagen
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => {
        const nextIndex = (prev + 1) % imagenes.length;
        console.log(`🖼️ Rotando imagen: ${prev + 1} → ${nextIndex + 1}/${imagenes.length}`);
        return nextIndex;
      });
    }, 4000); // Cambiar cada 4 segundos

    return () => clearInterval(interval);
  }, [imagenes.length]);

  if (!product) return null;

  // Buscar la plantilla correspondiente al producto
  const plantillaInfo = PLANTILLAS.find(p => p.id === product.plantillaId);
  const TemplateComponent = plantillaInfo?.component;

  // Imagen actual para pasar a la plantilla
  const imagenActual = imagenes[currentImageIndex] || '';

  // Navegación manual de imágenes
  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? imagenes.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % imagenes.length);
  };

  return (
    <div 
      className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
      onClick={() => setShowVideo(false)}
    >
      <div 
        className="relative w-full max-w-7xl bg-black rounded-lg overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header con botón de cerrar */}
        <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-gradient-to-b from-black/80 to-transparent">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
            <h2 className="text-white font-semibold text-lg">
              Vista previa: {product.titulo}
            </h2>
            {plantillaInfo && (
              <span className="text-white/60 text-sm">
                · Plantilla: {plantillaInfo.nombre}
              </span>
            )}
            {imagenes.length > 1 && (
              <span className="text-white/60 text-sm">
                · Imagen {currentImageIndex + 1}/{imagenes.length}
              </span>
            )}
          </div>
          <button 
            onClick={() => setShowVideo(false)}
            className="text-white/80 hover:text-white hover:bg-white/10 p-2 rounded-lg transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Contenedor de la plantilla simulando pantalla de TV */}
        <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
          {TemplateComponent ? (
            <div className="w-full h-full">
              <TemplateComponent 
                titulo={product.titulo}
                descripcion={product.descripcion}
                imagenProducto={imagenActual}
                precioLista={product.precioLista}
                precioOferta={product.precioOferta}
                porcentajeDescuento={product.porcentajeDescuento}
                categoria={product.categoria}
              />
            </div>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gray-900 text-white">
              <div className="text-center space-y-4">
                <div className="text-6xl">📺</div>
                <h3 className="text-2xl font-bold">
                  {product.plantillaId ? 'Plantilla no encontrada' : 'Sin plantilla asignada'}
                </h3>
                <p className="text-gray-400 max-w-md">
                  {product.plantillaId 
                    ? `No se encontró la plantilla "${product.plantillaId}"`
                    : 'Este producto no tiene una plantilla asignada. Edita el producto y selecciona una plantilla para ver la previsualización.'}
                </p>
              </div>
            </div>
          )}

          {/* Controles de navegación de imágenes (solo si hay más de 1) */}
          {imagenes.length > 1 && (
            <>
              {/* Botón anterior */}
              <button
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-50 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all backdrop-blur-sm"
                title="Imagen anterior"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Botón siguiente */}
              <button
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-50 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all backdrop-blur-sm"
                title="Imagen siguiente"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Indicadores de imagen (dots) */}
              <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-50 flex gap-2">
                {imagenes.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentImageIndex 
                        ? 'bg-white w-8' 
                        : 'bg-white/40 hover:bg-white/60'
                    }`}
                    title={`Ver imagen ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Footer con información adicional */}
        <div className="absolute bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-t from-black/80 to-transparent">
          <div className="flex items-center justify-between text-white/60 text-sm">
            <div className="flex items-center gap-4">
              <span>💡 Presiona ESC o haz clic fuera para cerrar</span>
              {imagenes.length > 1 && (
                <span>🔄 Las imágenes rotan automáticamente cada 4s</span>
              )}
            </div>
            <span>Resolución: 1280x720 (16:9)</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalVideo