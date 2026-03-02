import { useState, useMemo } from "react";
import '../css/productos.css';
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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '160px', color: '#999999', fontSize: '13px' }}>
        Cargando productos...
      </div>
    );
  }

  if (isError) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '160px', color: '#ef4444', fontSize: '13px' }}>
        Error al cargar productos.
      </div>
    );
  }

  return (
    <div className="offers-page">
      {/* Header */}
      <div className="offers-header">
        <div className="offers-title">
          <h1>OFERTAS</h1>
          <p>
            Reproducir por categoría
          </p>
        </div>

        {/* Duración global configurable */}
        <div className="offers-duration-control">
          <label className="duration-label">Seg. por slide</label>
          <input
            type="number"
            min={2}
            max={60}
            value={duracionGlobal}
            onChange={(e) => setDuracionGlobal(Number(e.target.value))}
            className="duration-input"
          />
        </div>
      </div>

      {/* Sin categorías configuradas */}
      {categorias.length === 0 && (
        <div className="offers-empty-state">
          <p className="offers-empty-text">No hay productos con plantilla asignada.</p>
          <p className="offers-empty-subtext">
            Asigná un <code>plantilla</code> a tus productos para verlos acá.
          </p>
        </div>
      )}

      {/* Grid de categorías */}
      <div className="offers-grid">
        {categorias.map((categoria) => {
          const productos = productosPorCategoria[categoria];
          return (
            <div
              key={categoria}
              className="offer-card"
            >
              {/* Nombre categoría + cantidad */}
              <div className="offer-card-header">
                <h2 className="offer-card-title">{categoria}</h2>
                <span className="offer-card-badge">
                  {productos.length} producto{productos.length !== 1 ? "s" : ""}
                </span>
              </div>

              {/* Preview de productos */}
              <div className="offer-products-list">
                {productos.slice(0, 3).map((p) => (
                  <div key={p._id} className="offer-product-item">
                    <img
                      src={p.imagenProducto}
                      alt={p.titulo}
                      className="offer-product-image"
                    />
                    <div className="offer-product-info">
                      <p className="offer-product-name">{p.titulo}</p>
                      <p className="offer-product-template">{p.plantilla}</p>
                    </div>
                    <span className="offer-product-price">
                      ${p.precioActual?.toLocaleString()}
                    </span>
                  </div>
                ))}
                {productos.length > 3 && (
                  <p className="offer-products-more">
                    +{productos.length - 3} más...
                  </p>
                )}
              </div>

              {/* Botón reproducir */}
              <button
                onClick={() => abrirSlideshow(categoria)}
                className="offer-play-button"
              >
                <svg className="offer-play-button-icon" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" fill="currentColor" />
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