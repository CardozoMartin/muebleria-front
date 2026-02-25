import React, { useEffect, useRef, useState } from "react";
import fondo from "./../../assets/fondo1.jpeg";
import logo from "./../../assets/logo.png";
import comedor from "./../../assets/comedor.png";
import juego4 from "./../../assets/comedor4.png";
import redondo from "./../../assets/redonda.png";

// ── DATOS DE PRODUCTOS (misma estructura que ModeloLuxeShow) ──────────────
const DEFAULT_PRODUCTOS = [
  {
    id: 1,
    nombre: 'Juego de',
    nombreDestacado: 'Comedor',
    subtitulo: 'Mesa + 6 Sillas · Madera Sólida',
    descripcion:
      'Mesa extensible con 6 sillas tapizadas en tela premium. Estructura de roble macizo, acabado laqueado mate.',
    precioViejo: '$ 299.999',
    precioNuevo: '$ 199.999',
    descuento: '33',
    cuotas: '12',
    imagen: comedor,
    ambiente: 'Comedor · Familiar',
  },
  {
    id: 2,
    nombre: 'Juego de',
    nombreDestacado: 'Comedor',
    subtitulo: 'Mesa + 4 Sillas · Madera Sólida',
    descripcion:
      'Mesa extensible con 4 sillas tapizadas en tela premium. Ideal para ambientes compactos y modernos.',
    precioViejo: '$ 189.999',
    precioNuevo: '$ 129.999',
    descuento: '31',
    cuotas: '6',
    imagen: juego4,
    ambiente: 'Comedor · Compacto',
  },
  {
    id: 3,
    nombre: 'Juego de',
    nombreDestacado: 'Comedor',
    subtitulo: 'Mesa Redonda + 4 Sillas · Madera Sólida',
    descripcion:
      'Set completo de comedor en madera laqueada. Mesa redonda extensible con sillas incluidas. Terminación Premium.',
    precioViejo: '$ 450.000',
    precioNuevo: '$ 299.999',
    descuento: '33',
    cuotas: '18',
    imagen: redondo,
    ambiente: 'Comedor · Premium',
  },
];

const DURACION = 5500;

/**
 * MegaSale — plantilla publicitaria
 * Acepta un array `products` con la misma estructura que ModeloLuxeShow.
 * Si no se pasa, usa DEFAULT_PRODUCTOS.
 */
export default function ModeloMegaSale({ products }) {
  const [mounted, setMounted] = useState(false);
  const [indice, setIndice] = useState(0);
  const intervaloRef = useRef(null);

  const PRODUCTOS_LIST = products && products.length ? products : DEFAULT_PRODUCTOS;
  const producto = PRODUCTOS_LIST[indice];

  // Primera entrada
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  // Transición de salida → cambio de producto → entrada
  const runTransition = (getNext) => {
    setMounted(false);
    setTimeout(() => {
      setIndice(getNext);
      setTimeout(() => setMounted(true), 80);
    }, 420);
  };

  // Ciclo automático
  useEffect(() => {
    if (!mounted) return;
    intervaloRef.current = setInterval(
      () => runTransition((prev) => (prev + 1) % PRODUCTOS_LIST.length),
      DURACION
    );
    return () => clearInterval(intervaloRef.current);
  }, [mounted, PRODUCTOS_LIST.length]);

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Rubik:wght@700;800;900&family=Space+Grotesk:wght@600;700&family=Montserrat:wght@400;600;700;900&display=swap"
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

        /* ── LAYOUT ── */
        .mw-layout {
          position: absolute; inset: 0; z-index: 2;
          display: grid;
          grid-template-columns: 28% 1fr;
          height: 100%;
        }
        .mw-right {
          display: flex; flex-direction: column;
          justify-content: flex-start;
          padding: 16vh 6vw 3vh 4vw;
          gap: 1.8vh;
        }

        /* ── LOGO ── */
        .mw-logo {
          position: absolute; top: 50%; left: 2.5vw; z-index: 5;
          transform: translateY(-50%) translateX(-40px) scale(.7); opacity: 0;
          transition: opacity .9s ease .3s, transform .9s cubic-bezier(.34,1.56,.64,1) .3s;
        }
        .mw-logo.on { opacity:1; transform:translateY(-50%) translateX(0) scale(1); }
        .mw-logo-circle {
          width: clamp(230px,28vh,360px);
          height: clamp(230px,28vh,360px);
          border-radius: 50%;
          background: linear-gradient(135deg, #e63500, #ff8800, #ffcc00);
          padding: 5px;
          box-shadow: 0 0 30px rgba(230,100,0,.5), 0 0 60px rgba(255,136,0,.25);
          display: flex; align-items: center; justify-content: center;
        }
        .mw-logo-inner {
          width: 100%; height: 100%;
          border-radius: 50%;
          background: #fff;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden;
        }
        .mw-logo img {
          width: 85%; height: 85%;
          object-fit: contain;
        }

        /* ── IMAGEN DEL PRODUCTO ── */
        .mw-img-wrap {
          position: absolute; right: 0; top: 0;
          width: 35%; height: 100%;
          z-index: 3;
          display: flex; align-items: center; justify-content: flex-end;
          opacity: 0;
          transform: scale(0.5) translateX(120px) rotate(8deg);
          transition: opacity .9s ease .2s, transform 1.1s cubic-bezier(.34,1.62,.64,1) .2s;
        }
        .mw-img-wrap.on {
          opacity: 1;
          transform: scale(1) translateX(0) rotate(0);
        }
        .mw-img {
          width: 80%;
          height: 75%;
          max-height: 90%;
          object-fit: contain;
          filter: drop-shadow(0 30px 70px rgba(0,0,0,.5)) drop-shadow(0 0 50px rgba(230,53,0,.3));
          animation: floatImg 4.5s ease-in-out infinite 1.5s;
        }
        @keyframes floatImg {
          0%,100% { transform:translateY(0) rotate(0deg) scale(1); }
          50%      { transform:translateY(-18px) rotate(1deg) scale(1.07); }
        }

        /* ── CONTENIDO — entra desde izquierda ── */
        .mw-content {
          display: flex; flex-direction: column; gap: 2vh;
        }

        /* ── BADGE MEGA OFERTA (arriba centrado) ── */
        .mw-badge-top {
          position: absolute; top: 5vh; left: 65%; transform: translateX(-50%);
          z-index: 10;
          display: inline-flex; align-items: center; gap: 12px;
          background: linear-gradient(135deg, #e63500, #ff8800);
          color: #fff; font-weight: 900;
          font-family: 'Rubik', sans-serif;
          font-size: clamp(18px,1.6vw,28px);
          letter-spacing: 4px; text-transform: uppercase;
          padding: 16px 40px; border-radius: 60px;
          box-shadow: 0 0 50px rgba(230,53,0,.7), 0 0 100px rgba(255,136,0,.5), 0 10px 40px rgba(230,53,0,.6);
          overflow: hidden;
          animation: mwBadgeBounce 1.8s cubic-bezier(.34,.85,.64,1) .5s backwards, mwBadgePulse 2s ease-in-out 2.3s infinite;
        }
        @keyframes mwBadgeBounce {
          0% { opacity:0; transform:translateX(-50%) translateY(-120px) scale(.3); }
          20% { opacity:1; transform:translateX(-50%) translateY(10px) scale(1.35); }
          35% { transform:translateX(-50%) translateY(-25px) scale(1.1); }
          50% { transform:translateX(-50%) translateY(5px) scale(1.3); }
          65% { transform:translateX(-50%) translateY(-12px) scale(1.15); }
          80% { transform:translateX(-50%) translateY(3px) scale(1.25); }
          90% { transform:translateX(-50%) translateY(-5px) scale(1.18); }
          100% { opacity:1; transform:translateX(-50%) translateY(0) scale(1.2); }
        }
        @keyframes mwBadgePulse {
          0%, 100% { transform:translateX(-50%) scale(1.2); box-shadow: 0 0 50px rgba(230,53,0,.7), 0 0 100px rgba(255,136,0,.5); }
          50% { transform:translateX(-50%) scale(1.28); box-shadow: 0 0 70px rgba(230,53,0,.9), 0 0 120px rgba(255,136,0,.6); }
        }
        .mw-badge-top::before {
          content:''; position:absolute; inset:0;
          background:radial-gradient(circle at 30% 30%, rgba(255,255,255,.25) 0%, transparent 60%);
          pointer-events:none;
        }
        .mw-badge-top::after {
          content:''; position:absolute; top:0; left:-100%; width:60%; height:100%;
          background: linear-gradient(90deg,transparent,rgba(255,255,255,.4),transparent);
          animation: shine 3.5s infinite 2.5s;
        }
        @keyframes shine { 0%{left:-100%;} 55%,100%{left:160%;} }
        .mw-dot-blink {
          width:12px; height:12px; background:#fff; border-radius:50%;
          animation: blink 1.2s infinite;
        }
        @keyframes blink { 0%,100%{opacity:1;} 50%{opacity:.1;} }

        /* ── NOMBRE ── */
        .mw-nombre {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(36px,5vw,86px);
          color: #1a1a1a;
          line-height: 0.92; letter-spacing: 1px;
          opacity: 0; transform: translateX(-120vw) rotate(-8deg) skewX(-12deg);
          transition: opacity .6s ease .9s, transform 1.1s cubic-bezier(.22,1.4,.36,1) .9s;
        }
        .mw-content.on .mw-nombre { opacity:1; transform:translateX(0) rotate(0) skewX(0); }
        .mw-nombre-dest {
          color: #e63500;
          display: inline-block;
          text-shadow: 0 4px 20px rgba(230,53,0,.3);
          animation: nombreGlow 3s ease-in-out infinite 2.5s;
        }
        @keyframes nombreGlow {
          0%,100% { text-shadow: 0 4px 20px rgba(230,53,0,.3); }
          50%      { text-shadow: 0 0 50px rgba(230,53,0,.7), 0 0 90px rgba(255,120,0,.4), 0 4px 30px rgba(230,53,0,.5); }
        }

        /* ── LÍNEA DECO ── */
        .mw-deco { 
          display:flex; align-items:center; gap:16px;
          opacity: 0; transform: translateX(-110vw) skewX(-15deg);
          transition: opacity .5s ease .5s, transform 1s cubic-bezier(.22,1.5,.36,1) .5s;
        }
        .mw-content.on .mw-deco { opacity:1; transform:translateX(0) skewX(0); }
        .mw-deco::before {
          content:''; width:70px; height:4px;
          background: linear-gradient(to right,#e63500,#ff9900);
          border-radius:2px; flex-shrink:0;
          box-shadow: 0 2px 12px rgba(230,53,0,.4);
        }
        .mw-deco-txt {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(12px,1.05vw,17px);
          font-weight:700; letter-spacing:4px;
          text-transform:uppercase; color:#666;
        }

        /* ── DESCRIPCIÓN ── */
        .mw-desc {
          font-size: clamp(15px,1.25vw,21px);
          color: #111; line-height:1.75; font-weight:600; max-width:600px;
          padding: 16px 20px;
          background: rgba(0,0,0,.2);
          border: 1.5px solid rgba(230,53,0,.2);
          border-radius: 12px;
          backdrop-filter: blur(4px);
          opacity: 0; transform: translateX(110vw) skewX(8deg);
          transition: opacity .6s ease 1.4s, transform 1s cubic-bezier(.22,1.4,.36,1) 1.4s;
        }
        .mw-content.on .mw-desc { opacity:1; transform:translateX(0) skewX(0); }

        /* ── PRECIO ── */
        .mw-price-block { 
          display:flex; flex-direction:column; align-items:flex-start; gap:8px;
          opacity: 0; transform: translateX(-110vw) skewX(-10deg);
          transition: opacity .6s ease 1.9s, transform 1.1s cubic-bezier(.22,1.5,.36,1) 1.9s;
        }
        .mw-content.on .mw-price-block { opacity:1; transform:translateX(0) skewX(0); }
        .mw-price-label {
          font-size: clamp(14px,1.2vw,18px);
          font-weight:700; color:#fff; text-transform:uppercase;
          letter-spacing:1px; margin-bottom:4px;
        }
        .mw-price-old {
          font-size: clamp(17px,1.7vw,28px);
          font-weight:700; color:#000; text-decoration:line-through; margin-bottom:6px;
        }
        .mw-price-new-wrap {
          display: inline-block;
          padding: 10px 28px 6px;
          border: 3px solid #fff;
          border-radius: 16px;
          background: rgba(0,0,0,.45);
          backdrop-filter: blur(4px);
          box-shadow: 0 0 24px rgba(255,255,255,.12), inset 0 0 12px rgba(255,255,255,.04);
        }
        .mw-price-new {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(48px,6.5vw,105px);
          line-height: 1;
          background: linear-gradient(135deg, #e63500 0%, #ff6600 40%, #ffaa00 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 6px 24px rgba(230,80,0,.5));
          animation: pricePulse 3s ease-in-out infinite 2.5s;
        }
        @keyframes pricePulse {
          0%,100% { filter: drop-shadow(0 6px 24px rgba(230,80,0,.5)); transform:scale(1); }
          50%      { filter: drop-shadow(0 8px 50px rgba(230,80,0,.9)); transform:scale(1.03); }
        }
        .mw-price-right { display:flex; flex-direction:column; gap:8px; justify-content:flex-end; margin-bottom:10px; }
        .mw-descuento {
          display: inline-flex; align-items:center; justify-content:center;
          background: linear-gradient(135deg, #e63500, #ff8800);
          color: white;
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(26px,2.8vw,46px);
          letter-spacing: 2px;
          padding: 10px 24px; border-radius: 12px;
          box-shadow: 0 0 40px rgba(230,53,0,.6), 0 0 80px rgba(255,136,0,.3), 0 8px 32px rgba(230,53,0,.5);
          animation: descuentoPulse 2s ease-in-out infinite 2.8s;
        }
        @keyframes descuentoPulse {
          0%,100% { transform:scale(1); box-shadow: 0 0 40px rgba(230,53,0,.6), 0 0 80px rgba(255,136,0,.3); }
          50%      { transform:scale(1.1); box-shadow: 0 0 60px rgba(230,53,0,.9), 0 0 100px rgba(255,136,0,.5); }
        }

        /* WhatsApp */
        .mw-whatsapp {
          display:inline-flex; align-items:center; gap:16px;
          padding:18px 32px; border-radius:16px;
          background:#25D366;
          color:#fff;
          font-size:clamp(18px,1.4vw,24px);
          font-weight:700;
          letter-spacing:.6px;
          box-shadow: 0 6px 24px rgba(37,211,102,.35), 0 2px 8px rgba(0,0,0,.1);
          align-self:flex-start;
          margin-top: 2vh;
          opacity:0; transform:translateY(40px) scale(.85);
          transition:opacity 1s ease 2.3s, transform 1s cubic-bezier(.34,1.8,.64,1) 2.3s;
        }
        .mw-whatsapp.on { opacity:1; transform:translateY(0) scale(1); }
        .mw-whatsapp-icon { width:clamp(30px,2.2vw,40px); height:clamp(30px,2.2vw,40px); fill:#fff; }

        /* ── TAGS ── */
        .mw-tags { display:flex; gap:12px; flex-wrap:wrap; }
        .mw-tag {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(11px,.95vw,16px);
          font-weight:700; letter-spacing:1.2px;
          padding: 10px 20px; border-radius:8px; text-transform:uppercase;
          opacity: 0; transform: translateY(30px) scale(.9);
          transition: opacity .8s ease, transform .8s cubic-bezier(.34,1.8,.64,1);
        }
        .mw-tags.on .mw-tag:nth-child(1) { animation: tagBounce .9s cubic-bezier(.34,1.8,.64,1) 2.5s both; }
        .mw-tags.on .mw-tag:nth-child(2) { animation: tagBounce .9s cubic-bezier(.34,1.8,.64,1) 2.7s both; }
        .mw-tags.on .mw-tag:nth-child(3) { animation: tagBounce .9s cubic-bezier(.34,1.8,.64,1) 2.9s both; }
        @keyframes tagBounce {
          0%   { opacity:0; transform:translateY(120px) scale(.6); }
          65%  { transform:translateY(-10px) scale(1.08); }
          100% { opacity:1; transform:translateY(0) scale(1); }
        }
        .tag-dark  { background:rgba(20,20,40,.9); color:#00e5ff; border:2px solid #00e5ff66; backdrop-filter:blur(6px); box-shadow: 0 4px 16px rgba(0,229,255,.2); }
        .tag-green { background:rgba(232,245,233,.95); color:#2e7d32; border:2px solid #a5d6a7; box-shadow: 0 4px 16px rgba(46,125,50,.15); }
        .tag-orange{ background:rgba(255,243,224,.95); color:#e65100; border:2px solid #ffcc80; box-shadow: 0 4px 16px rgba(230,81,0,.15); }
      `}</style>

      <div className="mw">

        {mounted && <div className="flash" />}

        {/* FONDO */}
        <img className={`mw-bg ${mounted ? "on" : ""}`} src={fondo} alt="" aria-hidden="true" />

        {/* LOGO */}
        <div className={`mw-logo ${mounted ? "on" : ""}`}>
          <div className="mw-logo-circle">
            <div className="mw-logo-inner">
              <img src={logo} alt="Logo" />
            </div>
          </div>
        </div>

        {/* BADGE MEGA OFERTA (arriba centrado) */}
        <div className="mw-badge-top">
          <span className="mw-dot-blink" />
          ⚡ MEGA OFERTA
        </div>

        {/* IMAGEN DEL PRODUCTO */}
        <div className={`mw-img-wrap ${mounted ? "on" : ""}`}>
          {producto.imagen && (
            <img className="mw-img" src={producto.imagen} alt={producto.nombreDestacado} />
          )}
        </div>

        {/* LAYOUT */}
        <div className="mw-layout">
          <div />
          <div className="mw-right">

            {/* CONTENIDO DINÁMICO */}
            <div className={`mw-content ${mounted ? "on" : ""}`}>

              <div className="mw-deco">
                <span className="mw-deco-txt">{producto.ambiente}</span>
              </div>

              <div className="mw-nombre" style={{ marginTop: "1.5vh" }}>
                <span className="mw-nombre-dest">{producto.nombre} {producto.nombreDestacado}</span>
              </div>

              {producto.descripcion && (
                <p className="mw-desc" style={{ marginTop: "1vh" }}>
                  {producto.descripcion}
                </p>
              )}

              <div className="mw-price-block" style={{ marginTop: "6vh" }}>
                {producto.precioViejo && (
                  <div style={{ display:"flex", alignItems:"center", gap:"20px", marginBottom:"6px" }}>
                    <div>
                      <div className="mw-price-label">Precio anterior</div>
                      <div className="mw-price-old">{producto.precioViejo}</div>
                    </div>
                    {producto.descuento && (
                      <div className="mw-descuento">{producto.descuento}% OFF</div>
                    )}
                  </div>
                )}
                <div className="mw-price-new-wrap">
                  <div className="mw-price-new">{producto.precioNuevo}</div>
                </div>
              </div>

            </div>

            {/* WhatsApp */}
            <div className={`mw-whatsapp ${mounted ? 'on' : ''}`}>
              <svg className="mw-whatsapp-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <span>381 2108473</span>
            </div>

            {/* TAGS fijos */}
            <div className={`mw-tags ${mounted ? "on" : ""}`} style={{ marginTop: "auto", paddingBottom: "3vh" }}>
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