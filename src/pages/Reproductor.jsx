import { useState, useMemo } from "react";

import { usetGetAllProducts } from "../hooks/useProducts";
import SlideShowPlayer from "../components/Slider/Slideshowplayer";

// Duración por defecto si el producto no tiene una configurada
const DURACION_DEFAULT = 8;

export default function Offers() {
  const { data: allProducts = [], isLoading, isError } = usetGetAllProducts();
  console.log("Productos obtenidos:", allProducts);

  const [categoriaActiva, setCategoriaActiva] = useState(null);
  const [slideshowAbierto, setSlideshowAbierto] = useState(false);
  const [duracionGlobal, setDuracionGlobal] = useState(DURACION_DEFAULT);

  // Agrupar productos activos por categoría (solo los que tienen plantilla)
 const productosPorCategoria = useMemo(() => {
  console.log("useMemo allProducts:", allProducts, Array.isArray(allProducts));
  const activos = allProducts.filter((p) => p.productoActivo && p.plantillaId);
  console.log("activos filtrados:", activos);
  return activos.reduce((acc, producto) => {
    const cat = producto.categoria || "Sin categoría";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(producto);
    return acc;
  }, {});
}, [allProducts]);

console.log("categorias:", Object.keys(productosPorCategoria));

  const categorias = Object.keys(productosPorCategoria);

  const productosCategoria = categoriaActiva
    ? productosPorCategoria[categoriaActiva] ?? []
    : [];

  const abrirSlideshow = (categoria) => {
    setCategoriaActiva(categoria);
    setSlideshowAbierto(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-40 text-gray-400 text-sm">
        Cargando productos...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-40 text-red-400 text-sm">
        Error al cargar productos.
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">OFERTAS</h1>
          <p className="text-sm text-gray-400 mt-0.5">
            Reproducir slideshow por categoría
          </p>
        </div>

        {/* Duración global configurable */}
        <div className="flex items-center gap-2">
          <label className="text-xs text-gray-500 font-medium">Seg. por slide</label>
          <input
            type="number"
            min={2}
            max={60}
            value={duracionGlobal}
            onChange={(e) => setDuracionGlobal(Number(e.target.value))}
            className="w-16 px-2 py-1.5 text-sm border border-gray-200 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Sin categorías configuradas */}
      {categorias.length === 0 && (
        <div className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-gray-200 rounded-xl text-center">
          <p className="text-gray-400 text-sm">No hay productos con plantilla asignada.</p>
          <p className="text-gray-300 text-xs mt-1">
            Asigná un <code className="bg-gray-100 px-1 rounded">plantilla</code> a tus productos para verlos acá.
          </p>
        </div>
      )}

      {/* Grid de categorías */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categorias.map((categoria) => {
          const productos = productosPorCategoria[categoria];
          return (
            <div
              key={categoria}
              className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition"
            >
              {/* Nombre categoría + cantidad */}
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-semibold text-gray-800">{categoria}</h2>
                <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                  {productos.length} producto{productos.length !== 1 ? "s" : ""}
                </span>
              </div>

              {/* Preview de productos */}
              <div className="space-y-2 mb-4">
                {productos.slice(0, 3).map((p) => (
                  <div key={p._id} className="flex items-center gap-2">
                    <img
                      src={p.imagenProducto}
                      alt={p.titulo}
                      className="w-8 h-8 rounded object-cover bg-gray-100 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-700 truncate">{p.titulo}</p>
                      <p className="text-xs text-gray-400">{p.plantilla}</p>
                    </div>
                    <span className="text-xs font-medium text-gray-600">
                      ${p.precioActual?.toLocaleString()}
                    </span>
                  </div>
                ))}
                {productos.length > 3 && (
                  <p className="text-xs text-gray-400 pl-10">
                    +{productos.length - 3} más...
                  </p>
                )}
              </div>

              {/* Botón reproducir */}
              <button
                onClick={() => abrirSlideshow(categoria)}
                className="w-full flex items-center justify-center gap-2 py-2 bg-gray-900 hover:bg-gray-700 text-white text-sm font-semibold rounded-lg transition"
              >
                <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Reproducir
              </button>
            </div>
          );
        })}
      </div>

      {/* SlideShow fullscreen */}
      {slideshowAbierto && productosCategoria.length > 0 && (
        <SlideShowPlayer
          productos={productosCategoria}
          duracionSegundos={duracionGlobal}
          onClose={() => setSlideshowAbierto(false)}
        />
      )}
    </div>
  );
}