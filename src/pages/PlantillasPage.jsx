import React, { useRef, useState, useEffect } from 'react'
import MegaSale from '../components/Plantillas/MegaSale'

export const Plantillas = () => {
  const previewRef = useRef(null)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Función para entrar en pantalla completa
  const handleFullscreen = async () => {
    if (!previewRef.current) return
    
    try {
      if (!document.fullscreenElement) {
        await previewRef.current.requestFullscreen()
        setIsFullscreen(true)
      } else {
        await document.exitFullscreen()
        setIsFullscreen(false)
      }
    } catch (error) {
      console.error('Error al activar pantalla completa:', error)
    }
  }

  // Detectar cambios en el estado de fullscreen (cuando presionan ESC)
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [])

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Plantillas de Ofertas
          </h1>
          <p className="text-gray-600">
            Vista previa de tus diseños publicitarios - Optimizados para pantallas de 32" o más
          </p>
        </div>

        {/* Controles */}
        <div className="mb-6 flex gap-4 items-center">
          <button
            onClick={handleFullscreen}
            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-lg shadow-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 flex items-center gap-2"
          >
            {isFullscreen ? (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Salir de Pantalla Completa
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
                Ver en Pantalla Completa
              </>
            )}
          </button>
          
          <span className="text-sm text-gray-500">
            💡 Presiona <kbd className="px-2 py-1 bg-white border border-gray-300 rounded text-xs">ESC</kbd> para salir
          </span>
        </div>

        {/* Vista previa con contenedor fullscreen */}
        <div 
          ref={previewRef}
          className={`relative bg-black rounded-lg overflow-hidden shadow-2xl ${
            isFullscreen ? '' : 'border-4 border-gray-300'
          }`}
          style={{
            aspectRatio: isFullscreen ? 'auto' : '16/9',
            height: isFullscreen ? '100vh' : 'auto'
          }}
        >
          {/* Botón de salir en fullscreen */}
          {isFullscreen && (
            <button
              onClick={handleFullscreen}
              className="absolute top-6 right-6 z-50 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-xl transition-all duration-200 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Salir
            </button>
          )}
          
          {/* Componente MegaSale */}
          <div className={isFullscreen ? 'w-full h-full' : 'w-full h-full'}>
            <MegaSale />
          </div>
        </div>

        {/* Información adicional */}
        {!isFullscreen && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-bold text-gray-800 mb-2">📺 Resolución óptima</h3>
              <p className="text-sm text-gray-600">1920x1080 (Full HD) o superior</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-bold text-gray-800 mb-2">🖥️ Tamaño de pantalla</h3>
              <p className="text-sm text-gray-600">32 pulgadas o más grande</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-bold text-gray-800 mb-2">⚡ Uso recomendado</h3>
              <p className="text-sm text-gray-600">Displays publicitarios en tienda</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

