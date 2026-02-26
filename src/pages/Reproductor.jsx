import { useState, useMemo } from "react";
import { usetGetAllProducts } from "../hooks/useProducts";
import SlideShowPlayer from "../components/Slider/Slideshowplayer";
import Logo from "../assets/logo.png";
import "../css/reproductor.css";

const DURACION_DEFAULT = 8;

// ── Configuración visual por categoría ─────────────────────────────────────
const CATEGORIA_CONFIG = {
  living: {
    label: "Living",
    gradient: "from-red-700 via-red-800 to-red-900",
    accent: "#ef4444",
    icon: (
      <svg viewBox="0 0 80 80" fill="none" className="w-full h-full" strokeLinecap="round" strokeLinejoin="round">
        {/* Sofá */}
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
    gradient: "from-gray-700 via-gray-800 to-gray-900",
    accent: "#6b7280",
    icon: (
      <svg viewBox="0 0 80 80" fill="none" className="w-full h-full" strokeLinecap="round" strokeLinejoin="round">
        {/* Cama */}
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
    gradient: "from-red-600 via-red-700 to-red-900",
    accent: "#ef4444",
    icon: (
      <svg viewBox="0 0 80 80" fill="none" className="w-full h-full" strokeLinecap="round" strokeLinejoin="round">
        {/* Olla */}
        <ellipse cx="40" cy="56" rx="24" ry="12" fill="white" fillOpacity="0.18" stroke="white" strokeWidth="2.5"/>
        <path d="M16 56 L16 46 Q16 34 40 34 Q64 34 64 46 L64 56" fill="white" fillOpacity="0.12" stroke="white" strokeWidth="2.5"/>
        <line x1="10" y1="44" x2="4"  y2="44" stroke="white" strokeWidth="3.5" strokeLinecap="round"/>
        <line x1="70" y1="44" x2="76" y2="44" stroke="white" strokeWidth="3.5" strokeLinecap="round"/>
        <rect x="32" y="24" width="16" height="12" rx="3" fill="white" fillOpacity="0.22" stroke="white" strokeWidth="2.5"/>
        {/* Vapor */}
        <path d="M30 20 Q28 15 30 10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <path d="M40 20 Q38 15 40 10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <path d="M50 20 Q48 15 50 10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  jardin: {
    label: "Jardín",
    gradient: "from-gray-600 via-gray-700 to-gray-900",
    accent: "#4b5563",
    icon: (
      <svg viewBox="0 0 80 80" fill="none" className="w-full h-full" strokeLinecap="round" strokeLinejoin="round">
        {/* Árbol */}
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
    gradient: "from-red-900 via-gray-900 to-black",
    accent: "#ef4444",
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
  const key = nombre?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return (
    CATEGORIA_CONFIG[key] || {
      label: nombre,
      gradient: "from-gray-700 to-gray-900",
      accent: "#6b7280",
      icon: (
        <svg viewBox="0 0 80 80" fill="none" className="w-full h-full" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="14" y="14" width="52" height="52" rx="5" fill="white" fillOpacity="0.15" stroke="white"/>
          <line x1="14" y1="40" x2="66" y2="40"/>
          <line x1="40" y1="14" x2="40" y2="66"/>
        </svg>
      ),
    }
  );
}

// Lista fija de las 5 categorías siempre visibles
const TODAS_CATEGORIAS = ["living", "dormitorio", "cocina", "jardin", "varios"];

export default function Reproductor() {
  const { data: allProducts = [], isLoading, isError } = usetGetAllProducts();

  const [categoriaActiva, setCategoriaActiva] = useState(null);
  const [slideshowAbierto, setSlideshowAbierto] = useState(false);
  const [duracionGlobal] = useState(DURACION_DEFAULT);

  // Agrupar productos activos por categoría (solo los que tienen plantilla)
  const productosPorCategoria = useMemo(() => {
    const activos = allProducts.filter((p) => p.productoActivo && p.plantillaId);
    return activos.reduce((acc, producto) => {
      const cat = (producto.categoria || "varios")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(producto);
      return acc;
    }, {});
  }, [allProducts]);

  const categorias = Object.keys(productosPorCategoria);

  const productosCategoria = categoriaActiva
    ? productosPorCategoria[categoriaActiva] ?? []
    : [];

  const abrirSlideshow = (categoria) => {
    setCategoriaActiva(categoria);
    setSlideshowAbierto(true);
  };

  // ── Loading ──────────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center gap-5">
        <img src={Logo} alt="Logo" className="h-20 object-contain" />
        <div className="flex gap-3">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="repro-dot w-4 h-4 rounded-full bg-red-600 animate-bounce"
            />
          ))}
        </div>
        <p className="text-gray-500 text-base tracking-widest uppercase font-medium">
          Cargando catálogo...
        </p>
      </div>
    );
  }

  // ── Error ────────────────────────────────────────────────────────────────
  if (isError) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center gap-4">
        <img src={Logo} alt="Logo" className="h-20 object-contain" />
        <p className="text-red-600 font-bold text-xl">Error al cargar el catálogo.</p>
        <p className="text-gray-400 text-base">Verificá tu conexión e intentá de nuevo.</p>
      </div>
    );
  }

  // ── Main ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      {/* ── Header ── */}
      <header className="bg-gray-900 border-b-4 border-red-600 px-16 py-8 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-10">
          <img src={Logo} alt="Logo" className="h-20 object-contain" />
          <div className="w-px h-16 bg-red-600/50" />
          <div className="flex flex-col gap-3">
            <p className="text-white text-4xl font-extrabold tracking-wide leading-none">
              Catálogo Digital
            </p>
            <p className="text-red-400 text-base tracking-widest uppercase font-medium">
              Seleccioná una categoría para reproducir
            </p>
          </div>
        </div>
        <div className="hidden sm:block text-white/25 text-base uppercase tracking-widest">
          {categorias.length} categoría{categorias.length !== 1 ? "s" : ""}
        </div>
      </header>

      {/* ── Body ── */}
      <main className="flex-1 flex flex-col items-center justify-center px-8 py-14">

        {/* ── Grid de 5 cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 w-full max-w-[1700px]">
          {TODAS_CATEGORIAS.map((categoriaKey) => {
            const productos = productosPorCategoria[categoriaKey] ?? [];
            const config = getCategoriaConfig(categoriaKey);
            const tieneProductos = productos.length > 0;

            return (
              <button
                key={categoriaKey}
                onClick={() => tieneProductos && abrirSlideshow(categoriaKey)}
                className="group relative overflow-hidden rounded-3xl shadow-2xl focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-offset-4 focus:ring-offset-gray-100 transition-all duration-250 hover:-translate-y-2 hover:shadow-black/40 active:scale-95 cursor-pointer"
              >
                {/* Degradado de fondo */}
                <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient}`} />

                {/* Puntos decorativos */}
                <div className="repro-card-dots absolute inset-0 opacity-[0.07]" />

                {/* Franja gris oscura izquierda */}
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gray-700 group-hover:w-2.5 transition-all duration-200" />

                {/* Contenido */}
                <div className="relative z-10 flex flex-col items-center justify-center gap-7 px-10 pt-16 pb-28">

                  {/* Icono */}
                  <div className="w-28 h-28 drop-shadow-2xl">
                    {config.icon}
                  </div>

                  {/* Nombre */}
                  <div className="text-center space-y-2">
                    <h2 className="text-white text-4xl font-extrabold tracking-widest uppercase drop-shadow">
                      {config.label}
                    </h2>
                    <p className="text-white/50 text-sm tracking-widest font-medium">
                      {productos.length} producto{productos.length !== 1 ? "s" : ""}
                    </p>
                  </div>

                  {/* Botón — solo ícono play */}
                  <div className={`flex items-center justify-center w-16 h-16 rounded-full shadow-xl transition-colors duration-200 ${
                    tieneProductos
                      ? "bg-white group-hover:bg-gray-100"
                      : "bg-white/30"
                  }`}>
                    <svg className={`w-8 h-8 translate-x-0.5 ${ tieneProductos ? "fill-black" : "fill-white/50"}`} viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>

                </div>
              </button>
            );
          })}
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="bg-gray-200 border-t border-gray-300 py-4 text-center">
        <p className="text-gray-400 text-xs tracking-widest uppercase">
          Catálogo Digital — Mueblería
        </p>
      </footer>

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