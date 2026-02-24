import React, { useEffect, useState } from "react";
import fondo from "./../../assets/fondo1.jpeg";
import logo from "./../../assets/logo.png";

/**
 * MegaSale — plantilla publicitaria
 * Recibe un único producto por props. El loop lo maneja SlideShowPlayer.
 *
 * Props:
 *  - titulo          string
 *  - descripcion     string   (texto libre)
 *  - imagenProducto  string   (URL)
 *  - precioLista     number   (precio tachado)
 *  - precioOferta    number   (precio destacado)
 *  - porcentajeDescuento number
 *  - categoria       string
 */
export default function MegaSale({
  titulo = "Producto",
  descripcion = "",
  imagenProducto = "",
  precioLista = 0,
  precioOferta = 0,
  porcentajeDescuento = 0,
  categoria = "",
}) {
  const [mounted, setMounted] = useState(false);

  // Animación de entrada cada vez que cambia el producto
  useEffect(() => {
    setMounted(false);
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, [titulo, imagenProducto]);

  const formatPrecio = (n) =>
    n ? `$ ${Number(n).toLocaleString("es-AR")}` : null;

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:wght@400;600;700;900&display=swap"
        rel="stylesheet"
      />
      <style>{`
        *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }

        .mw {
          width: 100%; height: 100%;
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

        /* ── IMAGEN DEL PRODUCTO ── */
        .mw-img-wrap {
          position: absolute; right: 4vw; top: 50%;
          transform: translateY(-50%) scale(0.85) translateX(-60px);
          z-index: 3;
          opacity: 0;
          transition: opacity .7s ease .3s, transform .7s cubic-bezier(.34,1.56,.64,1) .3s;
        }
        .mw-img-wrap.on {
          opacity: 1;
          transform: translateY(-50%) scale(1) translateX(0);
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

        /* ── CONTENIDO — entra desde izquierda ── */
        .mw-content {
          opacity: 0; transform: translateX(-40px);
          transition: opacity .55s ease .15s, transform .55s cubic-bezier(.22,1,.36,1) .15s;
        }
        .mw-content.on { opacity:1; transform:translateX(0); }

        /* ── BADGE ── */
        .mw-badge {
          display: inline-flex; align-items: center; gap: 10px;
          background: linear-gradient(135deg, #e63500, #ff8800);
          color: #fff; font-weight: 900;
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

        /* ── NOMBRE ── */
        .mw-nombre {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(44px,6.5vw,110px);
          color: #1a1a1a;
          line-height: 0.95; letter-spacing: 2px;
        }
        .mw-nombre-dest {
          color: #e63500;
          display: inline-block;
          animation: nombreGlow 3s ease-in-out infinite 2s;
        }
        @keyframes nombreGlow {
          0%,100% { text-shadow: none; }
          50%      { text-shadow: 0 0 40px rgba(230,53,0,.5), 0 0 80px rgba(255,120,0,.2); }
        }

        /* ── LÍNEA DECO ── */
        .mw-deco { display:flex; align-items:center; gap:16px; }
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
        .mw-price-block { display:flex; align-items:flex-end; gap:20px; flex-wrap:wrap; }
        .mw-price-old {
          font-size: clamp(16px,1.6vw,26px);
          font-weight:700; color:#aaa; text-decoration:line-through; margin-bottom:6px;
        }
        .mw-price-new {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(60px,8.5vw,130px);
          line-height: 1;
          background: linear-gradient(135deg, #e63500 0%, #ff6600 40%, #ffaa00 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 4px 20px rgba(230,80,0,.45));
          animation: pricePulse 3s ease-in-out infinite 2s;
        }
        @keyframes pricePulse {
          0%,100% { filter: drop-shadow(0 4px 20px rgba(230,80,0,.45)); }
          50%      { filter: drop-shadow(0 4px 40px rgba(230,80,0,.8)); }
        }
        .mw-price-right { display:flex; flex-direction:column; gap:8px; justify-content:flex-end; margin-bottom:8px; }
        .mw-descuento {
          display: inline-flex; align-items:center; justify-content:center;
          background: linear-gradient(135deg, #e63500, #ff8800);
          color: white;
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(22px,2.5vw,40px);
          letter-spacing: 2px;
          padding: 6px 20px; border-radius: 10px;
          box-shadow: 0 6px 25px rgba(230,53,0,.5);
          animation: descuentoPulse 2s ease-in-out infinite 2.5s;
        }
        @keyframes descuentoPulse {
          0%,100% { transform:scale(1); }
          50%      { transform:scale(1.06); }
        }

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
            <div
              key={i}
              className="particle"
              style={{
                width:  `${8 + Math.random() * 18}px`,
                height: `${8 + Math.random() * 18}px`,
                left:   `${2 + Math.random() * 24}%`,
                bottom: `-${10 + Math.random() * 15}%`,
                animationDuration: `${7 + Math.random() * 8}s`,
                animationDelay:    `${Math.random() * 6}s`,
              }}
            />
          ))}
        </div>

        {/* LOGO */}
        <div className={`mw-logo ${mounted ? "on" : ""}`}>
          <img src={logo} alt="Logo" />
        </div>

        {/* IMAGEN DEL PRODUCTO */}
        <div className={`mw-img-wrap ${mounted ? "on" : ""}`}>
          {imagenProducto && (
            <img className="mw-img" src={imagenProducto} alt={titulo} />
          )}
        </div>

        {/* LAYOUT */}
        <div className="mw-layout">
          <div />
          <div className="mw-right">

            {/* BADGE fijo */}
            <div className={`mw-badge mw-static ${mounted ? "on" : ""}`} style={{ transitionDelay: ".5s" }}>
              <span className="mw-dot-blink" />
              ⚡ Mega Ofertas
            </div>

            {/* CONTENIDO DINÁMICO */}
            <div className={`mw-content ${mounted ? "on" : ""}`}>

              <div className="mw-nombre">
                <span className="mw-nombre-dest">{titulo}</span>
              </div>

              <div className="mw-deco" style={{ marginTop: "1vh" }}>
                <span className="mw-deco-txt">{categoria}</span>
              </div>

              {descripcion && (
                <p className="mw-desc" style={{ marginTop: "1.2vh" }}>
                  {descripcion}
                </p>
              )}

              <div className="mw-price-block" style={{ marginTop: "1.5vh" }}>
                <div>
                  {precioLista > 0 && (
                    <div className="mw-price-old">{formatPrecio(precioLista)}</div>
                  )}
                  <div className="mw-price-new">{formatPrecio(precioOferta)}</div>
                </div>
                {porcentajeDescuento > 0 && (
                  <div className="mw-price-right">
                    <div className="mw-descuento">{porcentajeDescuento}% OFF</div>
                  </div>
                )}
              </div>

            </div>

            {/* TAGS fijos */}
            <div
              className={`mw-tags mw-static ${mounted ? "on" : ""}`}
              style={{ transitionDelay: "1.6s" }}
            >
              <span className="mw-tag tag-dark">🛍 Mega Ofertas</span>
              <span className="mw-tag tag-green">✓ Envío gratis</span>
              <span className="mw-tag tag-orange">⏳ Últimas unidades</span>
            </div>

          </div>
        </div>

      </div>
    </>
  );
}