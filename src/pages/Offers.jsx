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

  const categorias = Object.keys(productosPorCategoria).sort((a, b) =>
    a.localeCompare(b, 'es', { sensitivity: 'base' })
  );

  const productosCategoria = categoriaActiva
    ? productosPorCategoria[categoriaActiva] ?? []
    : [];

  const abrirSlideshow = (categoria) => {
    setCategoriaActiva(categoria);
    setSlideshowAbierto(true);
  };

  // Configuración local de iconos (copiada de Reproductor.jsx para evitar export)
  const CATEGORIA_CONFIG = {
    living: {
      label: "Living",
      icon: (
        <svg viewBox="0 0 80 80" fill="none" className="w-full h-full" strokeLinecap="round" strokeLinejoin="round">
          <rect x="12" y="38" width="56" height="20" rx="5" fill="white" fillOpacity="0.18" stroke="white" strokeWidth="2.5"/>
          <rect x="7"  y="32" width="13" height="26" rx="4" fill="white" fillOpacity="0.18" stroke="white" strokeWidth="2.5"/>
          <rect x="60" y="32" width="13" height="26" rx="4" fill="white" fillOpacity="0.18" stroke="white" strokeWidth="2.5"/>
          <rect x="18" y="24" width="44" height="16" rx="4" fill="white" fillOpacity="0.22" stroke="white" strokeWidth="2.5"/>
          <line x1="24" y1="58" x2="24" y2="66" stroke="white" strokeWidth="2.5"/>
          <line x1="56" y1="58" x2="56" y2="66" stroke="white" strokeWidth="2.5"/>
        </svg>
      ),
    },
    dormitorio: {
      label: "Dormitorio",
      icon: (
        <svg viewBox="0 0 80 80" fill="none" className="w-full h-full" strokeLinecap="round" strokeLinejoin="round">
          <rect x="8"  y="42" width="64" height="18" rx="4" fill="white" fillOpacity="0.18" stroke="white" strokeWidth="2.5"/>
          <rect x="8"  y="28" width="26" height="16" rx="4" fill="white" fillOpacity="0.22" stroke="white" strokeWidth="2.5"/>
          <path d="M34 42 C34 34 72 34 72 42" fill="white" fillOpacity="0.1" stroke="white" strokeWidth="2.5"/>
          <line x1="8"  y1="60" x2="8"  y2="68" stroke="white" strokeWidth="2.5"/>
          <line x1="72" y1="60" x2="72" y2="68" stroke="white" strokeWidth="2.5"/>
        </svg>
      ),
    },
    cocina: {
      label: "Cocina",
      icon: (
        <svg viewBox="0 0 80 80" fill="none" className="w-full h-full" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="40" cy="56" rx="24" ry="12" fill="white" fillOpacity="0.18" stroke="white" strokeWidth="2.5"/>
          <path d="M16 56 L16 46 Q16 34 40 34 Q64 34 64 46 L64 56" fill="white" fillOpacity="0.12" stroke="white" strokeWidth="2.5"/>
          <line x1="10" y1="44" x2="4"  y2="44" stroke="white" strokeWidth="3.5" strokeLinecap="round"/>
          <line x1="70" y1="44" x2="76" y2="44" stroke="white" strokeWidth="3.5" strokeLinecap="round"/>
          <rect x="32" y="24" width="16" height="12" rx="3" fill="white" fillOpacity="0.22" stroke="white" strokeWidth="2.5"/>
          <path d="M30 20 Q28 15 30 10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          <path d="M40 20 Q38 15 40 10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          <path d="M50 20 Q48 15 50 10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
    },
    jardin: {
      label: "Jardín",
      icon: (
        <svg viewBox="0 0 80 80" fill="none" className="w-full h-full" strokeLinecap="round" strokeLinejoin="round">
          <line x1="40" y1="70" x2="40" y2="38" stroke="white" strokeWidth="3" strokeLinecap="round"/>
          <ellipse cx="40" cy="26" rx="20" ry="18" fill="white" fillOpacity="0.18" stroke="white" strokeWidth="2.5"/>
          <ellipse cx="25" cy="38" rx="13" ry="10" fill="white" fillOpacity="0.12" stroke="white" strokeWidth="2.5"/>
          <ellipse cx="55" cy="38" rx="13" ry="10" fill="white" fillOpacity="0.12" stroke="white" strokeWidth="2.5"/>
          <line x1="24" y1="70" x2="56" y2="70" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      ),
    },
    varios: {
      label: "Varios",
      icon: (
        <svg viewBox="0 0 80 80" fill="none" className="w-full h-full" strokeLinecap="round" strokeLinejoin="round">
          <rect x="8"  y="8"  width="28" height="28" rx="4" fill="white" fillOpacity="0.22" stroke="white" strokeWidth="2.5"/>
          <rect x="44" y="8"  width="28" height="28" rx="4" fill="white" fillOpacity="0.16" stroke="white" strokeWidth="2.5"/>
          <rect x="8"  y="44" width="28" height="28" rx="4" fill="white" fillOpacity="0.16" stroke="white" strokeWidth="2.5"/>
          <rect x="44" y="44" width="28" height="28" rx="4" fill="white" fillOpacity="0.22" stroke="white" strokeWidth="2.5"/>
        </svg>
      ),
    },
  };

  function getCategoriaConfig(nombre) {
    const key = nombre?.toLowerCase().normalize("NFD").replace(/[^a-z0-9]/g, "");
    return (
      CATEGORIA_CONFIG[key] || {
        label: nombre,
        icon: (
          <svg viewBox="0 0 80 80" fill="none" className="w-full h-full" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="14" y="14" width="52" height="52" rx="5" fill="white" fillOpacity="0.15" stroke="white"/>
            <line x1="14" y1="40" x2="66" y2="40"/>
            <line x1="40" y1="14" x2="40" y2="66"/>
          </svg>
        ),
      }
    );
  }

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
          <h1>Vista previa de plantillas</h1>
          <p>
            Reproducir por categoría
          </p>
        </div>

        {/* Duración global configurable */}
        <div className="offers-duration-control">
          <label className="duration-label">Duracion de cada presentacion</label>
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
              {/* Icono representativo de la categoría */}
              <div className="offer-card-icon">{getCategoriaConfig(categoria).icon}</div>
              {/* Nombre categoría + cantidad */}
              <div className="offer-card-header">
                <h2 className="offer-card-title">{categoria}</h2>
                <span className="offer-card-badge">
                  {productos.length} producto{productos.length !== 1 ? "s" : ""}
                </span>
              </div>

              {/* Preview de productos
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
              </div> */}

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