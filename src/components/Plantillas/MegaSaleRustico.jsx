import React, { useEffect, useState, useRef } from "react";

const PRODUCTOS = [
  {
    id: 1,
    nombre: "Juego de",
    nombreDestacado: "Comedor",
    subtitulo: "Mesa + 6 Sillas · Madera Maciza",
    descripcion: [
      "Mesa extensible con 6 sillas tapizadas en tela premium.",
      "Estructura de roble macizo, acabado laqueado mate.",
      "Diseño clásico apto para ambientes de 12 m² o más.",
    ],
    precioViejo: "$ 299.999",
    precioNuevo: "$ 199.999",
    descuento: "33% OFF",
    cuotas: "12 cuotas sin interés",
    imagen:
      "https://res.cloudinary.com/dcwgnl9ud/image/upload/v1771902544/muebleria/productos/ngh3qb4awv8vwdmb4qpn.png",
    etiqueta: "MÁS VENDIDO",
  },
  {
    id: 2,
    nombre: "Juego de",
    nombreDestacado: "Comedor",
    subtitulo: "Mesa + 4 Sillas · Madera Maciza",
    descripcion: [
      "Mesa extensible con 4 sillas tapizadas en tela resistente.",
      "Madera de pino tratada, acabado cera natural.",
      "Ideal para comedor familiar, fácil de limpiar.",
    ],
    precioViejo: "$ 189.999",
    precioNuevo: "$ 129.999",
    descuento: "31% OFF",
    cuotas: "6 cuotas sin interés",
    imagen:
      "https://res.cloudinary.com/dcwgnl9ud/image/upload/v1771902739/muebleria/productos/ciwty78qprpy8shd2447.png",
    etiqueta: "OFERTA",
  },
  {
    id: 3,
    nombre: "Juego de",
    nombreDestacado: "Comedor",
    subtitulo: "Mesa Redonda + 4 Sillas · Madera Maciza",
    descripcion: [
      "Mesa redonda en madera maciza con 4 sillas tapizadas.",
      "Terminación Premium en color nogal.",
      "Ideal para espacios acogedores y familiares.",
    ],
    precioViejo: "$ 450.000",
    precioNuevo: "$ 299.999",
    descuento: "33% OFF",
    cuotas: "18 cuotas sin interés",
    imagen:
      "https://res.cloudinary.com/dcwgnl9ud/image/upload/v1771902544/muebleria/productos/ngh3qb4awv8vwdmb4qpn.png",
    etiqueta: "NUEVO",
  },
];

const DURACION = 5500;

export default function MegaSaleRustico() {
  const [mounted, setMounted] = useState(false);
  const [indice, setIndice] = useState(0);
  const [fase, setFase] = useState("idle");
  const [progreso, setProgreso] = useState(0);
  const [zoomActivo, setZoomActivo] = useState(false);
  const intervaloRef = useRef(null);
  const progressRef = useRef(null);

  const producto = PRODUCTOS[indice];

  useEffect(() => {
    const t = setTimeout(() => {
      setMounted(true);
      setTimeout(() => setZoomActivo(true), 400);
    }, 100);
    return () => clearTimeout(t);
  }, []);

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

  useEffect(() => {
    if (!mounted) return;
    intervaloRef.current = setInterval(() => {
      setFase("saliendo");
      setZoomActivo(false);
      setTimeout(() => {
        setIndice((prev) => (prev + 1) % PRODUCTOS.length);
        setFase("entrando");
        setTimeout(() => { setFase("idle"); setZoomActivo(true); }, 700);
      }, 500);
    }, DURACION);
    return () => clearInterval(intervaloRef.current);
  }, [mounted]);

  const ir = (i) => {
    if (i === indice) return;
    clearInterval(intervaloRef.current);
    setFase("saliendo");
    setZoomActivo(false);
    setTimeout(() => {
      setIndice(i);
      setFase("entrando");
      setTimeout(() => {
        setFase("idle");
        setZoomActivo(true);
        intervaloRef.current = setInterval(() => {
          setFase("saliendo");
          setZoomActivo(false);
          setTimeout(() => {
            setIndice((prev) => (prev + 1) % PRODUCTOS.length);
            setFase("entrando");
            setTimeout(() => { setFase("idle"); setZoomActivo(true); }, 700);
          }, 500);
        }, DURACION);
      }, 700);
    }, 500);
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Lato:wght@300;400;700&family=Cinzel:wght@400;700&display=swap"
        rel="stylesheet"
      />
      <style>{`
        *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }

        .rs {
          width: 100vw; height: 100vh;
          position: relative; overflow: hidden;
          font-family: 'Lato', sans-serif;
          background: #1C1008;
        }

        /* ── FONDO TEXTURA MADERA SVG ── */
        .rs-wood-bg {
          position: absolute; inset: 0; z-index: 0;
          background:
            repeating-linear-gradient(
              88deg,
              transparent 0px,
              rgba(255,200,120,0.018) 1px,
              transparent 2px,
              transparent 14px
            ),
            repeating-linear-gradient(
              92deg,
              transparent 0px,
              rgba(180,100,30,0.015) 1px,
              transparent 3px,
              transparent 22px
            ),
            linear-gradient(160deg,
              #2A1A08 0%,
              #1C1008 30%,
              #160D06 60%,
              #1E1208 100%
            );
          opacity: 0;
          transition: opacity 1.4s ease;
        }
        .rs-wood-bg.on { opacity: 1; }

        /* Veta diagonal sutil */
        .rs-wood-veta {
          position: absolute; inset: 0; z-index: 0;
          background:
            repeating-linear-gradient(
              170deg,
              transparent 0px,
              rgba(160,90,20,0.04) 1px,
              transparent 2px,
              transparent 60px
            );
          opacity: 0;
          transition: opacity 2s ease 0.5s;
        }
        .rs-wood-veta.on { opacity: 1; }

        /* ── LUZ CÁLIDA CENTRAL ── */
        .rs-luz {
          position: absolute; z-index: 1;
          top: -10%; left: 10%;
          width: 80%; height: 120%;
          background: radial-gradient(
            ellipse 70% 70% at 45% 45%,
            rgba(220,140,50,0.12) 0%,
            rgba(180,90,20,0.06) 40%,
            transparent 70%
          );
          pointer-events: none;
          opacity: 0;
          transition: opacity 1.8s ease 0.8s;
        }
        .rs-luz.on { opacity: 1; }

        /* Luz derecha (donde está el mueble) */
        .rs-luz-producto {
          position: absolute; z-index: 1;
          top: 0; right: 0;
          width: 55%; height: 100%;
          background: radial-gradient(
            ellipse 80% 90% at 65% 50%,
            rgba(210,130,40,0.10) 0%,
            transparent 65%
          );
          pointer-events: none;
          opacity: 0;
          transition: opacity 2s ease 1s;
        }
        .rs-luz-producto.on { opacity: 1; }

        /* ── BORDE ORNAMENTAL ── */
        .rs-borde {
          position: absolute; inset: 16px; z-index: 2;
          border: 1px solid rgba(180,120,50,0.2);
          pointer-events: none;
          opacity: 0;
          transition: opacity 1s ease 1s;
        }
        .rs-borde.on { opacity: 1; }
        .rs-borde::before {
          content: '';
          position: absolute; inset: 6px;
          border: 1px solid rgba(180,120,50,0.08);
        }

        /* Esquinas ornamentales */
        .rs-corner {
          position: absolute; z-index: 3;
          width: 30px; height: 30px;
          opacity: 0;
          transition: opacity 1s ease 1.2s;
        }
        .rs-corner.on { opacity: 1; }
        .rs-corner svg { width: 100%; height: 100%; }
        .rs-corner-tl { top: 10px; left: 10px; }
        .rs-corner-tr { top: 10px; right: 10px; transform: rotate(90deg); }
        .rs-corner-bl { bottom: 10px; left: 10px; transform: rotate(-90deg); }
        .rs-corner-br { bottom: 10px; right: 10px; transform: rotate(180deg); }

        /* ── FRANJA LATERAL IZQUIERDA ── */
        .rs-franja {
          position: absolute; left: 0; top: 0; bottom: 0;
          width: 5px; z-index: 4;
          background: linear-gradient(
            to bottom,
            transparent 0%,
            rgba(180,120,40,0.6) 20%,
            rgba(200,140,60,0.8) 50%,
            rgba(180,120,40,0.6) 80%,
            transparent 100%
          );
          opacity: 0;
          transition: opacity 1.2s ease 0.8s;
        }
        .rs-franja.on { opacity: 1; }

        /* ── LOGO ── */
        .rs-logo {
          position: absolute; top: 3.5vh; right: 4vw; z-index: 10;
          text-align: right;
          opacity: 0; transform: translateY(-12px);
          transition: opacity 0.8s ease 0.6s, transform 0.8s ease 0.6s;
        }
        .rs-logo.on { opacity: 1; transform: translateY(0); }
        .rs-logo-nombre {
          font-family: 'Cinzel', serif;
          font-size: clamp(18px, 1.8vw, 30px);
          letter-spacing: 5px;
          color: #C8902A;
          text-transform: uppercase;
        }
        .rs-logo-sub {
          font-family: 'Lato', sans-serif;
          font-size: clamp(9px, 0.7vw, 12px);
          letter-spacing: 6px;
          color: rgba(180,130,60,0.5);
          text-transform: uppercase;
          margin-top: 3px;
        }

        /* ── IMAGEN ── */
        .rs-img-wrap {
          position: absolute;
          right: 3vw; top: 50%;
          transform: translateY(-50%) scale(0.78);
          z-index: 5;
          opacity: 0;
          transition: opacity 1s ease 0.9s, transform 1.2s cubic-bezier(.22,1,.36,1) 0.9s;
        }
        .rs-img-wrap.on {
          opacity: 1;
          transform: translateY(-50%) scale(1);
        }
        .rs-img-wrap.zoom {
          transform: translateY(-50%) scale(1.07);
          transition: transform 5s ease-in-out !important;
        }
        .rs-img-wrap.out {
          opacity: 0 !important;
          transform: translateY(-50%) scale(0.82) translateX(70px) !important;
          transition: opacity 0.4s ease, transform 0.4s ease !important;
        }
        .rs-img-wrap.in {
          opacity: 0;
          transform: translateY(-50%) scale(0.85) translateX(-70px) !important;
          transition: opacity 0.5s ease, transform 0.6s cubic-bezier(.22,1,.36,1) !important;
        }
        .rs-img-wrap.in.on {
          opacity: 1;
          transform: translateY(-50%) scale(1) !important;
        }

        .rs-img {
          max-height: 60vh;
          max-width: 40vw;
          object-fit: contain;
          filter:
            drop-shadow(0 30px 60px rgba(0,0,0,0.9))
            drop-shadow(0 0 40px rgba(180,100,30,0.15));
        }

        /* Piso / sombra bajo el mueble */
        .rs-img-sombra {
          position: absolute;
          bottom: -8px; left: 50%;
          transform: translateX(-50%);
          width: 75%; height: 18px;
          background: radial-gradient(ellipse, rgba(0,0,0,0.6) 0%, transparent 70%);
          filter: blur(6px);
        }

        /* Etiqueta sobre imagen */
        .rs-etiqueta {
          position: absolute;
          top: 0; left: -10px;
          background: #8B4513;
          color: #F5DEB3;
          font-family: 'Lato', sans-serif;
          font-weight: 700;
          font-size: clamp(9px, 0.75vw, 12px);
          letter-spacing: 3px;
          padding: 5px 14px;
          text-transform: uppercase;
          border-radius: 2px;
          box-shadow: 0 3px 12px rgba(0,0,0,0.4);
        }
        .rs-etiqueta::after {
          content: '';
          position: absolute;
          bottom: -6px; left: 0;
          border-left: 5px solid #5C2E00;
          border-bottom: 6px solid transparent;
        }

        /* ── LAYOUT ── */
        .rs-layout {
          position: absolute; inset: 0; z-index: 6;
          display: flex;
          align-items: center;
          padding: 0 0 0 8vw;
          height: 100%;
        }

        .rs-col {
          display: flex;
          flex-direction: column;
          gap: 2.2vh;
          max-width: 520px;
        }

        /* ── SELLO "OFERTA" ── */
        .rs-sello {
          display: inline-flex; align-items: center; gap: 10px;
          border: 1.5px solid rgba(180,120,50,0.4);
          background: rgba(120,70,20,0.3);
          backdrop-filter: blur(4px);
          color: #D4A050;
          font-family: 'Lato', sans-serif;
          font-weight: 700;
          font-size: clamp(10px, 0.85vw, 14px);
          letter-spacing: 6px;
          text-transform: uppercase;
          padding: 8px 22px;
          width: fit-content;
          opacity: 0; transform: translateX(-20px);
          transition: opacity 0.7s ease 0.7s, transform 0.7s ease 0.7s;
        }
        .rs-sello.on { opacity: 1; transform: translateX(0); }
        .rs-sello-dot {
          width: 7px; height: 7px;
          background: #C8902A;
          border-radius: 50%;
          animation: rusticBlink 1.8s ease-in-out infinite;
          box-shadow: 0 0 6px #C8902A;
        }
        @keyframes rusticBlink { 0%,100%{opacity:1;} 50%{opacity:0.2;} }

        /* ── NOMBRE ── */
        .rs-nombre {
          font-family: 'Playfair Display', serif;
          font-size: clamp(46px, 6.8vw, 112px);
          line-height: 0.9;
          color: #F5E6C8;
          font-weight: 900;
        }
        .rs-nombre-dest {
          display: block;
          color: #C8902A;
          font-style: italic;
          text-shadow: 0 2px 30px rgba(180,100,20,0.3);
          animation: warmGlow 4s ease-in-out infinite 2s;
        }
        @keyframes warmGlow {
          0%,100% { text-shadow: 0 2px 20px rgba(180,100,20,0.2); }
          50%      { text-shadow: 0 2px 50px rgba(200,130,30,0.5), 0 0 80px rgba(180,100,20,0.15); }
        }

        /* ── SEPARADOR ORNAMENTAL ── */
        .rs-ornamento {
          display: flex; align-items: center; gap: 12px;
        }
        .rs-ornamento-line {
          flex: 1; max-width: 60px;
          height: 1px;
          background: linear-gradient(to right, #8B5E20, transparent);
        }
        .rs-ornamento-centro {
          color: #8B5E20;
          font-size: 14px;
          letter-spacing: 2px;
        }
        .rs-ornamento-sub {
          font-family: 'Lato', sans-serif;
          font-size: clamp(10px, 0.85vw, 14px);
          letter-spacing: 4px;
          text-transform: uppercase;
          color: rgba(180,130,60,0.6);
          font-weight: 300;
        }

        /* ── DESCRIPCIÓN ── */
        .rs-desc {
          font-family: 'Lato', sans-serif;
          font-size: clamp(13px, 1.05vw, 17px);
          color: rgba(200,170,110,0.65);
          line-height: 1.85;
          font-weight: 300;
          border-left: 2px solid rgba(140,80,20,0.4);
          padding-left: 16px;
        }
        .rs-desc strong { color: rgba(220,190,130,0.85); font-weight: 400; }

        /* ── PRECIO ── */
        .rs-precio-bloque {
          display: flex;
          align-items: flex-end;
          gap: 20px;
          flex-wrap: wrap;
        }

        .rs-precio-viejo {
          font-family: 'Lato', sans-serif;
          font-size: clamp(14px, 1.3vw, 22px);
          color: rgba(180,130,60,0.35);
          text-decoration: line-through;
          margin-bottom: 4px;
          font-weight: 300;
        }

        .rs-precio-nuevo {
          font-family: 'Playfair Display', serif;
          font-size: clamp(58px, 8.5vw, 128px);
          line-height: 1;
          font-weight: 900;
          color: #D4A050;
          filter: drop-shadow(0 3px 20px rgba(180,100,20,0.35));
          animation: precioCaido 3.5s ease-in-out infinite 2.5s;
        }
        @keyframes precioCaido {
          0%,100% { filter: drop-shadow(0 3px 20px rgba(180,100,20,0.35)); }
          50%      { filter: drop-shadow(0 3px 40px rgba(200,130,30,0.65)); }
        }

        .rs-precio-lado {
          display: flex; flex-direction: column; gap: 9px;
          justify-content: flex-end; margin-bottom: 8px;
        }

        .rs-descuento {
          background: #8B4513;
          color: #F5DEB3;
          font-family: 'Cinzel', serif;
          font-size: clamp(16px, 1.8vw, 30px);
          letter-spacing: 2px;
          padding: 6px 18px;
          border-radius: 2px;
          width: fit-content;
          box-shadow: 0 4px 20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,220,150,0.2);
          animation: badgeRustic 2.5s ease-in-out infinite 3s;
        }
        @keyframes badgeRustic {
          0%,100% { transform: scale(1); }
          50%      { transform: scale(1.04); box-shadow: 0 6px 28px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,220,150,0.2); }
        }

        .rs-cuotas {
          font-family: 'Lato', sans-serif;
          font-size: clamp(11px, 0.9vw, 15px);
          color: rgba(180,130,60,0.5);
          font-weight: 300;
          letter-spacing: 1px;
        }
        .rs-cuotas strong { color: #C8902A; font-weight: 700; }

        /* ── SELLOS INFERIORES ── */
        .rs-sellos {
          display: flex; gap: 10px; flex-wrap: wrap;
        }
        .rs-sello-mini {
          font-family: 'Lato', sans-serif;
          font-weight: 700;
          font-size: clamp(9px, 0.75vw, 13px);
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 6px 14px;
          border: 1px solid rgba(140,90,30,0.35);
          color: rgba(180,130,60,0.6);
          background: rgba(60,30,10,0.5);
          border-radius: 2px;
        }

        /* ── CONTENIDO DINÁMICO ── */
        .rs-content {
          transition: opacity 0.4s ease, transform 0.4s ease;
        }
        .rs-content.out { opacity: 0 !important; transform: translateX(-45px) !important; }
        .rs-content.in {
          opacity: 0;
          transform: translateX(45px);
          transition: opacity 0.55s ease 0.1s, transform 0.65s cubic-bezier(.22,1,.36,1) 0.1s;
        }
        .rs-content.idle { opacity: 1; transform: translateX(0); }

        /* ── STATIC ── */
        .rs-static {
          opacity: 0; transform: translateY(10px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .rs-static.on { opacity: 1; transform: translateY(0); }

        /* ── DOTS ── */
        .rs-dots {
          position: absolute; bottom: 30px; left: 8vw;
          z-index: 10; display: flex; gap: 10px; align-items: center;
        }
        .rs-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: rgba(180,120,50,0.25);
          border: 1px solid rgba(180,120,50,0.35);
          cursor: pointer;
          transition: background 0.3s, transform 0.3s;
        }
        .rs-dot.active {
          background: #C8902A;
          border-color: #D4A050;
          transform: scale(1.35);
          box-shadow: 0 0 8px rgba(200,144,42,0.4);
        }

        /* ── CONTADOR ── */
        .rs-counter {
          position: absolute; bottom: 24px; right: 5vw; z-index: 10;
          font-family: 'Cinzel', serif;
          font-size: clamp(11px, 0.9vw, 15px);
          letter-spacing: 4px;
          color: rgba(140,90,30,0.35);
        }
        .rs-counter em { color: rgba(200,144,42,0.5); font-style: normal; }

        /* ── PROGRESO ── */
        .rs-progress {
          position: absolute; bottom: 0; left: 0; right: 0; z-index: 10;
          height: 3px;
          background: rgba(180,120,50,0.1);
        }
        .rs-progress-bar {
          height: 100%;
          background: linear-gradient(to right, #8B4513, #D4A050);
          box-shadow: 0 0 10px rgba(180,100,20,0.5);
          transition: none;
        }
      `}</style>

      <div className="rs">
        {/* FONDOS */}
        <div className={`rs-wood-bg ${mounted ? "on" : ""}`} />
        <div className={`rs-wood-veta ${mounted ? "on" : ""}`} />
        <div className={`rs-luz ${mounted ? "on" : ""}`} />
        <div className={`rs-luz-producto ${mounted ? "on" : ""}`} />

        {/* MARCO ORNAMENTAL */}
        <div className={`rs-borde ${mounted ? "on" : ""}`} />
        {["tl","tr","bl","br"].map(pos => (
          <div key={pos} className={`rs-corner rs-corner-${pos} ${mounted ? "on" : ""}`}>
            <svg viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 28 L2 2 L28 2" stroke="rgba(180,120,50,0.5)" strokeWidth="1.5" fill="none"/>
              <path d="M2 14 L14 2" stroke="rgba(180,120,50,0.25)" strokeWidth="0.8" fill="none"/>
              <circle cx="2" cy="2" r="2" fill="rgba(180,120,50,0.5)"/>
            </svg>
          </div>
        ))}
        <div className={`rs-franja ${mounted ? "on" : ""}`} />

        {/* LOGO */}
        <div className={`rs-logo ${mounted ? "on" : ""}`}>
          <div className="rs-logo-nombre">Mueblería</div>
          <div className="rs-logo-sub">Artesanal · Desde 1985</div>
        </div>

        {/* IMAGEN */}
        <div
          className={`rs-img-wrap ${
            fase === "saliendo"
              ? "out"
              : fase === "entrando"
              ? "in on"
              : mounted
              ? "on" + (zoomActivo ? " zoom" : "")
              : ""
          }`}
        >
          <div className="rs-etiqueta">{producto.etiqueta}</div>
          <img className="rs-img" src={producto.imagen} alt={producto.nombreDestacado} />
          <div className="rs-img-sombra" />
        </div>

        {/* CONTENIDO */}
        <div className="rs-layout">
          <div className="rs-col">

            {/* SELLO FIJO */}
            <div className={`rs-sello rs-static ${mounted ? "on" : ""}`} style={{transitionDelay:"0.7s"}}>
              <span className="rs-sello-dot" />
              Mega Ofertas
            </div>

            {/* DINÁMICO */}
            <div className={`rs-content ${fase === "saliendo" ? "out" : fase === "entrando" ? "in" : "idle"}`}>

              <div className="rs-nombre">
                {producto.nombre}
                <span className="rs-nombre-dest">{producto.nombreDestacado}</span>
              </div>

              <div className="rs-ornamento">
                <div className="rs-ornamento-line" />
                <span className="rs-ornamento-centro">✦</span>
                <span className="rs-ornamento-sub">{producto.subtitulo}</span>
              </div>

              <p className="rs-desc">
                {producto.descripcion.map((l, i) => (
                  <React.Fragment key={i}>
                    {i === 0 ? <strong>{l}</strong> : l}
                    {i < producto.descripcion.length - 1 && <br />}
                  </React.Fragment>
                ))}
              </p>

              <div className="rs-precio-bloque">
                <div>
                  <div className="rs-precio-viejo">{producto.precioViejo}</div>
                  <div className="rs-precio-nuevo">{producto.precioNuevo}</div>
                </div>
                <div className="rs-precio-lado">
                  <div className="rs-descuento">{producto.descuento}</div>
                  <div className="rs-cuotas">Hasta <strong>{producto.cuotas}</strong></div>
                </div>
              </div>

            </div>

            {/* SELLOS FIJOS */}
            <div className={`rs-sellos rs-static ${mounted ? "on" : ""}`} style={{transitionDelay:"1.4s"}}>
              <span className="rs-sello-mini">✓ Envío gratis</span>
              <span className="rs-sello-mini">⏳ Últimas unidades</span>
              <span className="rs-sello-mini">★ Garantía</span>
            </div>

          </div>
        </div>

        {/* DOTS */}
        <div className="rs-dots">
          {PRODUCTOS.map((_, i) => (
            <div key={i} className={`rs-dot ${i === indice ? "active" : ""}`} onClick={() => ir(i)} />
          ))}
        </div>

        <div className="rs-counter">
          <em>0{indice + 1}</em> · 0{PRODUCTOS.length}
        </div>

        <div className="rs-progress">
          <div className="rs-progress-bar" style={{ width: `${progreso}%` }} />
        </div>
      </div>
    </>
  );
}