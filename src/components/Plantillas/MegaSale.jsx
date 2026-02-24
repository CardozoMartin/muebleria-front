import React, { useEffect, useState, useRef } from "react";
import fondo from "./../../assets/fondo1.jpeg";
import logo from "./../../assets/logo.png";

// ─────────────────────────────────────────────
// PRODUCTOS — editá este array para agregar/quitar
// ─────────────────────────────────────────────
import comedor from "./../../assets/comedor.png";
import burstart from "./../../assets/burstart.webp";
import juego4 from './../../assets/comedor4.png';
import redondo from './../../assets/redonda.png';

const PRODUCTOS = [
  {
    id: 1,
    nombre: 'Juego de',
    nombreDestacado: 'Comedor',
    subtitulo: 'Mesa + 6 Sillas · Madera Sólida',
    descripcion: [
      'Mesa extensible con 6 sillas tapizadas en tela premium.',
      'Estructura de roble macizo, acabado laqueado mate.',
      'Diseño moderno apto para ambientes de 12 m² o más.',
    ],
    precioViejo: '$ 299.999',
    precioNuevo: '$ 199.999',
    descuento: '33% OFF',
    cuotas: '12 cuotas sin interés',
    imagen:
      'https://res.cloudinary.com/dcwgnl9ud/image/upload/v1771902544/muebleria/productos/ngh3qb4awv8vwdmb4qpn.png',
  },
  {
    id: 2,
    nombre: 'juego de ',
    nombreDestacado: 'Comedor',
    subtitulo: 'Mesa + 4 Sillas · Madera Sólida',
    descripcion: [
      'Mesa extensible con 6 sillas tapizadas en tela premium.',
      'Estructura de roble macizo, acabado laqueado mate.',
      'Diseño moderno apto para ambientes de 12 m² o más.',
    ],
    precioViejo: '$ 189.999',
    precioNuevo: '$ 129.999',
    descuento: '31% OFF',
    cuotas: '6 cuotas sin interés',
    imagen:
      'https://res.cloudinary.com/dcwgnl9ud/image/upload/v1771902739/muebleria/productos/ciwty78qprpy8shd2447.png',
  },
  {
    id: 3,
    nombre: 'juego de',
    nombreDestacado: 'Comedor',
    subtitulo: 'Mesa redonda + 4 Sillas · Madera Sólida',
    descripcion: [
      'Set completo de dormitorio en madera laqueada.',
      'Cama doble con cajones inferiores incluidos.',
      'Terminación Premium, colores a elección.',
    ],
    precioViejo: '$ 450.000',
    precioNuevo: '$ 299.999',
    descuento: '33% OFF',
    cuotas: '18 cuotas sin interés',
    imagen: redondo,
  },
];

const DURACION = 5000; // ms entre productos

export default function MegaSale() {
  const [mounted, setMounted] = useState(false);
  const [indice, setIndice] = useState(0);
  const [fase, setFase] = useState("idle"); // idle | saliendo | entrando
  const [progreso, setProgreso] = useState(0);
  const intervaloRef = useRef(null);
  const progressRef = useRef(null);

  const producto = PRODUCTOS[indice];

  // Montar animación inicial
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Barra de progreso
  useEffect(() => {
    if (!mounted) return;
    setProgreso(0);
    const start = performance.now();
    const tick = (now) => {
      const elapsed = now - start;
      const pct = Math.min((elapsed / DURACION) * 100, 100);
      setProgreso(pct);
      if (pct < 100) progressRef.current = requestAnimationFrame(tick);
    };
    progressRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(progressRef.current);
  }, [indice, mounted]);

  // Rotación de productos
  useEffect(() => {
    if (!mounted) return;
    intervaloRef.current = setInterval(() => {
      // 1. Salida
      setFase("saliendo");
      setTimeout(() => {
        // 2. Cambiar producto
        setIndice((prev) => (prev + 1) % PRODUCTOS.length);
        setFase("entrando");
        // 3. Quitar clase entrando después de que termina la animación
        setTimeout(() => setFase("idle"), 700);
      }, 500);
    }, DURACION);
    return () => clearInterval(intervaloRef.current);
  }, [mounted]);

  const ir = (i) => {
    if (i === indice) return;
    clearInterval(intervaloRef.current);
    setFase("saliendo");
    setTimeout(() => {
      setIndice(i);
      setFase("entrando");
      setTimeout(() => setFase("idle"), 700);
      // Reanudar carrusel
      intervaloRef.current = setInterval(() => {
        setFase("saliendo");
        setTimeout(() => {
          setIndice((prev) => (prev + 1) % PRODUCTOS.length);
          setFase("entrando");
          setTimeout(() => setFase("idle"), 700);
        }, 500);
      }, DURACION);
    }, 500);
  };

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:wght@400;600;700;900&display=swap" rel="stylesheet" />
      <style>{`
        *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }

        .mw {
          width: 100vw; height: 100vh;
          position: relative; overflow: hidden;
          font-family: 'Montserrat', sans-serif;
          background: #111;
        }

        /* ── FONDO ── */
        .mw-bg {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover; object-position: left center;
          z-index: 0;
          opacity: 0; transform: scale(1.06);
          transition: opacity 1.2s ease, transform 1.6s ease;
        }
        .mw-bg.on { opacity: 1; transform: scale(1); }

        /* ── FLASH ── */
        .flash {
          position: absolute; inset: 0; z-index: 20;
          background: white; pointer-events: none;
          animation: flashAnim 0.6s ease forwards;
        }
        @keyframes flashAnim { from { opacity:.7; } to { opacity:0; } }

        /* ── PARTÍCULAS ── */
        .particles { position:absolute; inset:0; z-index:1; pointer-events:none; }
        .particle {
          position: absolute; border-radius: 50%;
          background: radial-gradient(circle, rgba(255,150,0,0.5), transparent);
          animation: floatUp linear infinite; opacity: 0;
        }
        @keyframes floatUp {
          0%   { transform:translateY(0) scale(1); opacity:0; }
          10%  { opacity:.5; }
          90%  { opacity:.12; }
          100% { transform:translateY(-110vh) scale(.3); opacity:0; }
        }

        /* ── LAYOUT ── */
        .mw-layout {
          position: absolute; inset: 0; z-index: 2;
          display: grid;
          grid-template-columns: 28% 1fr;
          height: 100%;
        }
        .mw-left {}
        .mw-right {
          display: flex; flex-direction: column;
          justify-content: center;
          padding: 5vh 6vw 5vh 4vw;
          gap: 1.8vh;
        }

        /* ── LOGO ── */
        .mw-logo {
          position: absolute; top: 4vh; right: 5vw; z-index: 5;
          opacity: 0; transform: translateY(-20px);
          transition: opacity .7s ease .4s, transform .7s ease .4s;
        }
        .mw-logo.on { opacity:1; transform:translateY(0); }
        .mw-logo img { height: clamp(40px,5vh,80px); width:auto; }

        /* ── BARRA DE PROGRESO ── */
        .mw-progress {
          position: absolute; bottom: 0; left: 0; right: 0; z-index: 6;
          height: 5px;
          background: rgba(255,255,255,0.15);
        }
        .mw-progress-bar {
          height: 100%;
          background: linear-gradient(to right, #e63500, #ff9900);
          transition: none;
          box-shadow: 0 0 10px rgba(255,120,0,0.6);
        }

        /* ── DOTS ── */
        .mw-dots {
          position: absolute; bottom: 22px; left: 50%; transform: translateX(-50%);
          z-index: 6; display: flex; gap: 10px;
        }
        .mw-dot {
          width: 10px; height: 10px; border-radius: 50%;
          background: rgba(255,255,255,0.35);
          border: 2px solid rgba(255,255,255,0.5);
          cursor: pointer;
          transition: background .3s, transform .3s;
        }
        .mw-dot.active {
          background: #ff6600;
          border-color: #ff9900;
          transform: scale(1.3);
        }

        /* ── IMAGEN PRODUCTO ── */
        .mw-img-wrap {
          position: absolute; right: 4vw; top: 50%;
          transform: translateY(-50%) scale(1);
          z-index: 3;
          opacity: 0;
          transition: opacity 1s ease .9s, transform 1s cubic-bezier(.34,1.56,.64,1) .9s;
        }
        .mw-img-wrap.on { opacity:1; transform:translateY(-50%) scale(1); }

        /* Salida imagen */
        .mw-img-wrap.out {
          opacity: 0 !important;
          transform: translateY(-50%) scale(0.85) translateX(60px) !important;
          transition: opacity .4s ease, transform .4s ease !important;
        }
        /* Entrada imagen */
        .mw-img-wrap.in {
          opacity: 0;
          transform: translateY(-50%) scale(0.85) translateX(-60px) !important;
          transition: opacity .5s ease, transform .6s cubic-bezier(.34,1.56,.64,1) !important;
        }
        .mw-img-wrap.in.on {
          opacity: 1;
          transform: translateY(-50%) scale(1) translateX(0) !important;
        }

        .mw-img {
          max-height: 55vh; max-width: 32vw;
          object-fit: contain;
          filter: drop-shadow(0 20px 50px rgba(0,0,0,.3));
          animation: floatImg 5s ease-in-out infinite;
        }
        @keyframes floatImg {
          0%,100% { transform:translateY(0); }
          50%      { transform:translateY(-16px); }
        }

        /* ── CONTENIDO DINÁMICO ── */
        .mw-content {
          transition: opacity .4s ease, transform .4s ease;
        }
        .mw-content.out {
          opacity: 0 !important;
          transform: translateX(-50px) !important;
        }
        .mw-content.in {
          opacity: 0;
          transform: translateX(50px);
          transition: opacity .5s ease .1s, transform .6s cubic-bezier(.22,1,.36,1) .1s;
        }
        .mw-content.idle {
          opacity: 1; transform: translateX(0);
        }

        /* ── BADGE ── */
        .mw-badge {
          display: inline-flex; align-items: center; gap: 10px;
          background: linear-gradient(135deg, #e63500, #ff8800);
          color: #fff;
          font-weight: 900;
          font-size: clamp(14px,1.2vw,22px);
          letter-spacing: 3px; text-transform: uppercase;
          padding: 10px 28px; border-radius: 50px;
          width: fit-content;
          box-shadow: 0 6px 30px rgba(230,53,0,.5);
          position: relative; overflow: hidden;
          opacity: 0; transform: translateX(-30px);
          transition: opacity .6s ease .5s, transform .6s ease .5s;
        }
        .mw-badge.on { opacity:1; transform:translateX(0); }
        .mw-badge::after {
          content:''; position:absolute; top:0; left:-100%; width:60%; height:100%;
          background: linear-gradient(90deg,transparent,rgba(255,255,255,.35),transparent);
          animation: shine 3.5s infinite 2.5s;
        }
        @keyframes shine { 0%{left:-100%;} 55%,100%{left:160%;} }
        .mw-dot-blink {
          width:10px; height:10px; background:#fff; border-radius:50%;
          animation: blink 1.2s infinite;
        }
        @keyframes blink { 0%,100%{opacity:1;} 50%{opacity:.1;} }

        /* FIJO: badge no cambia */

        /* ── NOMBRE ── */
        .mw-nombre {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(44px,6.5vw,110px);
          color: #1a1a1a;
          line-height: 0.95; letter-spacing: 2px;
        }
        .mw-nombre-dest {
          color: #e63500;
          display: inline-block; position: relative;
          /* Efecto neón suave continuo */
          animation: nombreGlow 3s ease-in-out infinite 2s;
        }
        @keyframes nombreGlow {
          0%,100% { text-shadow: none; }
          50%      { text-shadow: 0 0 40px rgba(230,53,0,.5), 0 0 80px rgba(255,120,0,.2); }
        }

        /* ── LÍNEA DECO ── */
        .mw-deco {
          display: flex; align-items: center; gap: 16px;
        }
        .mw-deco::before {
          content:''; width:60px; height:4px;
          background: linear-gradient(to right,#e63500,#ff9900);
          border-radius:2px; flex-shrink:0;
        }
        .mw-deco-txt {
          font-size: clamp(11px,1vw,16px);
          font-weight:700; letter-spacing:4px;
          text-transform:uppercase; color:#888;
        }

        /* ── DESCRIPCIÓN ── */
        .mw-desc {
          font-size: clamp(14px,1.2vw,20px);
          color: #333; line-height:1.7; font-weight:500; max-width:580px;
        }

        /* ── PRECIO ── */
        .mw-price-block {
          display: flex; align-items: flex-end; gap: 20px; flex-wrap: wrap;
        }
        .mw-price-old {
          font-size: clamp(16px,1.6vw,26px);
          font-weight:700; color:#aaa; text-decoration:line-through; margin-bottom:6px;
        }

        /* PRECIO NUEVO — grande y llamativo */
        .mw-price-new {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(60px,8.5vw,130px);
          line-height: 1; letter-spacing: 1px;
          /* Gradiente en el texto */
          background: linear-gradient(135deg, #e63500 0%, #ff6600 40%, #ffaa00 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          /* Sombra/glow */
          filter: drop-shadow(0 4px 20px rgba(230,80,0,.45));
          animation: pricePulse 3s ease-in-out infinite 2s;
        }
        @keyframes pricePulse {
          0%,100% { filter: drop-shadow(0 4px 20px rgba(230,80,0,.45)); }
          50%      { filter: drop-shadow(0 4px 40px rgba(230,80,0,.8)); }
        }

        .mw-price-right { display:flex; flex-direction:column; gap:8px; justify-content:flex-end; margin-bottom:8px; }

        /* Badge descuento — muy visible */
        .mw-descuento {
          display: inline-flex; align-items:center; justify-content:center;
          background: linear-gradient(135deg, #e63500, #ff8800);
          color: white;
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(22px,2.5vw,40px);
          letter-spacing: 2px;
          padding: 6px 20px;
          border-radius: 10px;
          box-shadow: 0 6px 25px rgba(230,53,0,.5);
          animation: descuentoPulse 2s ease-in-out infinite 2.5s;
        }
        @keyframes descuentoPulse {
          0%,100% { transform: scale(1); box-shadow: 0 6px 25px rgba(230,53,0,.5); }
          50%      { transform: scale(1.06); box-shadow: 0 8px 35px rgba(230,53,0,.75); }
        }

        .mw-cuotas {
          font-size: clamp(13px,1.1vw,18px);
          color: #555; font-weight:600;
        }
        .mw-cuotas strong { color:#1a1a1a; font-weight:900; }

        /* ── TAGS ── */
        .mw-tags { display:flex; gap:12px; flex-wrap:wrap; }
        .mw-tag {
          font-size: clamp(11px,.9vw,16px);
          font-weight:700; letter-spacing:1px;
          padding: 8px 18px; border-radius:6px; text-transform:uppercase;
        }
        .tag-dark  { background:rgba(20,20,40,.85); color:#00e5ff; border:1.5px solid #00e5ff55; backdrop-filter:blur(4px); }
        .tag-green { background:rgba(232,245,233,.9); color:#2e7d32; border:1.5px solid #a5d6a7; }
        .tag-orange{ background:rgba(255,243,224,.9); color:#e65100; border:1.5px solid #ffcc80; }

        /* ── ESTÁTICO INICIAL ── */
        .mw-static {
          opacity:0; transform:translateX(-30px);
          transition: opacity .6s ease, transform .6s ease;
        }
        .mw-static.on { opacity:1; transform:translateX(0); }
      `}</style>

      <div className="mw">

        {mounted && <div className="flash" />}

        {/* FONDO */}
        <img className={`mw-bg ${mounted ? "on" : ""}`} src={fondo} alt="" aria-hidden="true" />

        {/* PARTÍCULAS */}
        <div className="particles">
          {[...Array(14)].map((_, i) => (
            <div key={i} className="particle" style={{
              width:  `${8 + Math.random() * 18}px`,
              height: `${8 + Math.random() * 18}px`,
              left:   `${2 + Math.random() * 24}%`,
              bottom: `-${10 + Math.random() * 15}%`,
              animationDuration: `${7 + Math.random() * 8}s`,
              animationDelay:    `${Math.random() * 6}s`,
            }} />
          ))}
        </div>

        {/* LOGO */}
        <div className={`mw-logo ${mounted ? "on" : ""}`}>
          <img src={logo} alt="Logo" />
        </div>

        {/* IMAGEN DEL PRODUCTO */}
        <div className={`mw-img-wrap ${fase === "saliendo" ? "out" : fase === "entrando" ? "in on" : mounted ? "on" : ""}`}>
          <img className="mw-img" src={producto.imagen} alt={producto.nombreDestacado} />
        </div>

        {/* LAYOUT */}
        <div className="mw-layout">
          <div className="mw-left" />
          <div className="mw-right">

            {/* BADGE — fijo, no cambia */}
            <div className={`mw-badge mw-static ${mounted ? "on" : ""}`}>
              <span className="mw-dot-blink" />
              ⚡ Mega Ofertas
            </div>

            {/* CONTENIDO DINÁMICO */}
            <div className={`mw-content ${fase === "saliendo" ? "out" : fase === "entrando" ? "in" : "idle"}`}>

              <div className="mw-nombre">
                {producto.nombre}<br />
                <span className="mw-nombre-dest">{producto.nombreDestacado}</span>
              </div>

              <div className="mw-deco" style={{marginTop:"1vh"}}>
                <span className="mw-deco-txt">{producto.subtitulo}</span>
              </div>

              <p className="mw-desc" style={{marginTop:"1.2vh"}}>
                {producto.descripcion.map((l, i) => (
                  <React.Fragment key={i}>{l}{i < producto.descripcion.length - 1 && <br />}</React.Fragment>
                ))}
              </p>

              <div className="mw-price-block" style={{marginTop:"1.5vh"}}>
                <div>
                  <div className="mw-price-old">{producto.precioViejo}</div>
                  <div className="mw-price-new">{producto.precioNuevo}</div>
                </div>
                <div className="mw-price-right">
                  <div className="mw-descuento">{producto.descuento}</div>
                  <div className="mw-cuotas">Hasta <strong>{producto.cuotas}</strong></div>
                </div>
              </div>

            </div>

            {/* TAGS — fijos */}
            <div className={`mw-tags mw-static ${mounted ? "on" : ""}`} style={{transitionDelay:"1.6s"}}>
              <span className="mw-tag tag-dark">🛍 Mega Ofertas</span>
              <span className="mw-tag tag-green">✓ Envío gratis</span>
              <span className="mw-tag tag-orange">⏳ Últimas unidades</span>
            </div>

          </div>
        </div>

        {/* DOTS NAVEGACIÓN */}
        <div className="mw-dots">
          {PRODUCTOS.map((_, i) => (
            <div key={i} className={`mw-dot ${i === indice ? "active" : ""}`} onClick={() => ir(i)} />
          ))}
        </div>

        {/* BARRA DE PROGRESO */}
        <div className="mw-progress">
          <div className="mw-progress-bar" style={{ width: `${progreso}%` }} />
        </div>

      </div>
    </>
  );
}
