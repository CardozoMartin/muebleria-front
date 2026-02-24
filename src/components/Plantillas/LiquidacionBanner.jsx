import React, { useEffect, useState, useRef } from "react";

const PRODUCTOS = [
  {
    id: 1,
    categoria: "¡LIQUIDACIÓN!",
    titulo1: "JUEGO DE",
    titulo2: "COMEDOR",
    motivo: "FIN DE TEMPORADA",
    detalle: "Mesa + 6 Sillas · Madera Maciza",
    precioViejo: "$ 299.999",
    precioNuevo: "$ 149.999",
    descuento: "50% OFF",
    stock: "¡Últimas 3 unidades!",
    imagen: "https://res.cloudinary.com/dcwgnl9ud/image/upload/v1771902544/muebleria/productos/ngh3qb4awv8vwdmb4qpn.png",
  },
  {
    id: 2,
    categoria: "¡PRECIO ROTO!",
    titulo1: "JUEGO DE",
    titulo2: "COMEDOR",
    motivo: "LIQUIDAMOS TODO",
    detalle: "Mesa + 4 Sillas · Pino Natural",
    precioViejo: "$ 189.999",
    precioNuevo: "$ 99.999",
    descuento: "47% OFF",
    stock: "¡Solo 5 disponibles!",
    imagen: "https://res.cloudinary.com/dcwgnl9ud/image/upload/v1771902739/muebleria/productos/ciwty78qprpy8shd2447.png",
  },
  {
    id: 3,
    categoria: "¡OFERTA BRUTAL!",
    titulo1: "MESA",
    titulo2: "REDONDA",
    motivo: "STOCK LIMITADO",
    detalle: "Mesa Redonda + 4 Sillas · Roble",
    precioViejo: "$ 450.000",
    precioNuevo: "$ 229.999",
    descuento: "49% OFF",
    stock: "¡Solo 2 unidades!",
    imagen: "https://res.cloudinary.com/dcwgnl9ud/image/upload/v1771902544/muebleria/productos/ngh3qb4awv8vwdmb4qpn.png",
  },
];

const DURACION = 6000;

// Rayos SVG de fondo
const RayosFondo = () => (
  <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice"
    style={{position:"absolute",inset:0,width:"100%",height:"100%",zIndex:1,pointerEvents:"none"}}>
    {[...Array(12)].map((_,i) => (
      <line key={i}
        x1="400" y1="300"
        x2={400 + Math.cos((i/12)*Math.PI*2)*900}
        y2={300 + Math.sin((i/12)*Math.PI*2)*700}
        stroke="rgba(180,0,0,0.07)" strokeWidth="60"
      />
    ))}
  </svg>
);

export default function LiquidacionBanner() {
  const [mounted, setMounted]   = useState(false);
  const [indice, setIndice]     = useState(0);
  const [fase, setFase]         = useState("idle");
  const [progreso, setProgreso] = useState(0);
  const [zoom, setZoom]         = useState(false);
  const [tick, setTick]         = useState(0); // parpadeo stock
  const intervaloRef  = useRef(null);
  const progressRef   = useRef(null);
  const tickRef       = useRef(null);

  const p = PRODUCTOS[indice];

  // montar
  useEffect(() => {
    const t = setTimeout(() => {
      setMounted(true);
      setTimeout(() => setZoom(true), 500);
    }, 100);
    return () => clearTimeout(t);
  }, []);

  // parpadeo urgencia
  useEffect(() => {
    tickRef.current = setInterval(() => setTick(v => v + 1), 900);
    return () => clearInterval(tickRef.current);
  }, []);

  // progreso
  useEffect(() => {
    if (!mounted) return;
    setProgreso(0);
    const start = performance.now();
    const run = (now) => {
      const pct = Math.min(((now - start) / DURACION) * 100, 100);
      setProgreso(pct);
      if (pct < 100) progressRef.current = requestAnimationFrame(run);
    };
    progressRef.current = requestAnimationFrame(run);
    return () => cancelAnimationFrame(progressRef.current);
  }, [indice, mounted]);

  // carrusel
  useEffect(() => {
    if (!mounted) return;
    intervaloRef.current = setInterval(() => {
      setFase("saliendo"); setZoom(false);
      setTimeout(() => {
        setIndice(prev => (prev + 1) % PRODUCTOS.length);
        setFase("entrando");
        setTimeout(() => { setFase("idle"); setZoom(true); }, 600);
      }, 450);
    }, DURACION);
    return () => clearInterval(intervaloRef.current);
  }, [mounted]);

  const ir = (i) => {
    if (i === indice) return;
    clearInterval(intervaloRef.current);
    setFase("saliendo"); setZoom(false);
    setTimeout(() => {
      setIndice(i); setFase("entrando");
      setTimeout(() => {
        setFase("idle"); setZoom(true);
        intervaloRef.current = setInterval(() => {
          setFase("saliendo"); setZoom(false);
          setTimeout(() => {
            setIndice(prev => (prev + 1) % PRODUCTOS.length);
            setFase("entrando");
            setTimeout(() => { setFase("idle"); setZoom(true); }, 600);
          }, 450);
        }, DURACION);
      }, 600);
    }, 450);
  };

  const isOut = fase === "saliendo";
  const isIn  = fase === "entrando";
  const stockVisible = tick % 2 === 0;

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Anton&family=Dancing+Script:wght@700&family=Barlow:wght@400;600;700;900&display=swap" rel="stylesheet"/>
      <style>{`
        *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }

        .lq {
          width: 100vw; height: 100vh;
          background: #0a0a0a;
          position: relative; overflow: hidden;
          font-family: 'Barlow', sans-serif;
        }

        /* ── FONDO ROJO DIAGONAL ── */
        .lq-fondo-rojo {
          position: absolute;
          right: 0; top: 0; bottom: 0;
          width: 58%;
          background: linear-gradient(150deg, #1a0000 0%, #8b0000 40%, #cc0000 80%, #a00000 100%);
          clip-path: polygon(14% 0, 100% 0, 100% 100%, 0% 100%);
          z-index: 0;
          opacity: 0;
          transition: opacity 1s ease;
        }
        .lq-fondo-rojo.on { opacity: 1; }
        /* Textura sobre el rojo */
        .lq-fondo-rojo::after {
          content:'';
          position: absolute; inset: 0;
          background-image: repeating-linear-gradient(
            45deg,
            rgba(0,0,0,0.06) 0px, rgba(0,0,0,0.06) 1px,
            transparent 1px, transparent 12px
          );
        }

        /* Vignette general */
        .lq-vignette {
          position: absolute; inset: 0; z-index: 2;
          background: radial-gradient(ellipse 90% 90% at 50% 50%, transparent 40%, rgba(0,0,0,0.55) 100%);
          pointer-events: none;
        }

        /* ── IMAGEN ── */
        .lq-img-wrap {
          position: absolute;
          left: 0; bottom: 8%;
          width: 50%;
          z-index: 4;
          display: flex;
          justify-content: center;
          align-items: flex-end;
        }
        .lq-img {
          max-height: 66vh;
          max-width: 42vw;
          object-fit: contain;
          filter: drop-shadow(0 20px 50px rgba(0,0,0,0.9)) drop-shadow(0 0 30px rgba(180,0,0,0.2));
          transform: scale(0.87);
          opacity: 0;
          transition: transform 4.5s cubic-bezier(.25,.46,.45,.94), opacity 0.7s ease;
        }
        .lq-img.visible  { opacity: 1; }
        .lq-img.zoom     { transform: scale(1.0); }
        .lq-img.saliendo { opacity:0!important; transform:scale(0.9) translateX(-30px)!important; transition:opacity 0.4s ease,transform 0.4s ease!important; }
        .lq-img.entrando { opacity:0; transform:scale(0.9) translateX(30px); transition:opacity 0.5s ease 0.1s,transform 0.6s cubic-bezier(.22,1,.36,1) 0.1s!important; }

        .lq-img-sombra {
          position: absolute;
          bottom: -4px; left: 50%;
          transform: translateX(-50%);
          width: 65%; height: 22px;
          background: radial-gradient(ellipse, rgba(180,0,0,0.3) 0%, transparent 70%);
          filter: blur(10px);
          z-index: 3;
        }

        /* ── PANEL DERECHO ── */
        .lq-panel {
          position: absolute;
          right: 0; top: 0; bottom: 0;
          width: 55%;
          z-index: 5;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 4vh 5vw 4vh 4vw;
          gap: 1.5vh;
        }

        /* ── CATEGORÍA ── */
        .lq-cat {
          font-family: 'Anton', sans-serif;
          font-size: clamp(16px, 1.6vw, 28px);
          letter-spacing: 6px;
          color: #ff4444;
          text-transform: uppercase;
          text-shadow: 0 0 20px rgba(255,0,0,0.4);
        }

        /* ── TÍTULO ── */
        .lq-titulo {
          font-family: 'Anton', sans-serif;
          font-size: clamp(54px, 8vw, 130px);
          line-height: 0.85;
          color: #ffffff;
          letter-spacing: 2px;
          text-shadow: 2px 2px 0px rgba(0,0,0,0.5);
        }
        .lq-titulo span {
          display: block;
          color: #ff4444;
          -webkit-text-stroke: 1px rgba(0,0,0,0.3);
        }

        /* ── CINTA MOTIVO ── */
        .lq-motivo {
          display: inline-flex; align-items: center; gap: 10px;
          background: #ff0000;
          color: #fff;
          font-family: 'Anton', sans-serif;
          font-size: clamp(11px, 1vw, 17px);
          letter-spacing: 5px;
          padding: 7px 20px;
          width: fit-content;
          position: relative;
          box-shadow: 0 4px 20px rgba(255,0,0,0.4);
        }
        .lq-motivo::before {
          content: '';
          position: absolute;
          left: -12px; top: 0; bottom: 0;
          border-right: 12px solid #ff0000;
          border-top: 50% solid transparent;
          border-bottom: 50% solid transparent;
        }
        .lq-motivo::after {
          content: '';
          position: absolute;
          right: -12px; top: 0; bottom: 0;
          border-left: 12px solid #ff0000;
          border-top: 50% solid transparent;
          border-bottom: 50% solid transparent;
        }

        /* ── BLOQUE PRECIO — protagonista ── */
        .lq-precio-bloque {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .lq-precio-viejo-wrap {
          display: flex; align-items: center; gap: 14px;
        }
        .lq-precio-viejo {
          font-family: 'Anton', sans-serif;
          font-size: clamp(30px, 3.8vw, 62px);
          color: rgba(255,255,255,0.35);
          position: relative;
          line-height: 1;
        }
        /* tachado rojo dramático */
        .lq-precio-viejo::after {
          content: '';
          position: absolute;
          left: -4px; right: -4px;
          top: 50%; transform: translateY(-50%);
          height: 5px;
          background: #ff0000;
          border-radius: 3px;
          box-shadow: 0 0 12px rgba(255,0,0,0.6);
          transform: translateY(-50%) rotate(-6deg);
        }
        .lq-descuento-grande {
          font-family: 'Anton', sans-serif;
          font-size: clamp(28px, 3.5vw, 58px);
          color: #ff4444;
          letter-spacing: 2px;
          text-shadow: 0 0 20px rgba(255,0,0,0.5);
          animation: descPulse 1.8s ease-in-out infinite;
        }
        @keyframes descPulse {
          0%,100% { transform: scale(1); text-shadow: 0 0 20px rgba(255,0,0,0.5); }
          50%      { transform: scale(1.06); text-shadow: 0 0 40px rgba(255,0,0,0.9); }
        }

        .lq-precio-nuevo {
          font-family: 'Anton', sans-serif;
          font-size: clamp(72px, 11vw, 175px);
          line-height: 0.9;
          color: #ffffff;
          letter-spacing: 2px;
          text-shadow:
            3px 3px 0 #8b0000,
            0 0 40px rgba(255,80,80,0.3);
        }

        .lq-precio-detalle {
          font-size: clamp(11px, 0.85vw, 14px);
          color: rgba(255,255,255,0.4);
          letter-spacing: 4px;
          text-transform: uppercase;
          font-weight: 600;
        }

        /* ── STOCK URGENCIA ── */
        .lq-stock {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: 'Barlow', sans-serif;
          font-weight: 900;
          font-size: clamp(13px, 1.1vw, 18px);
          letter-spacing: 1px;
          color: #fff;
          background: rgba(255,0,0,0.15);
          border: 1.5px solid rgba(255,0,0,0.5);
          padding: 8px 18px;
          border-radius: 4px;
          width: fit-content;
          transition: opacity 0.2s ease;
        }
        .lq-stock-dot {
          width: 9px; height: 9px;
          background: #ff2222;
          border-radius: 50%;
          box-shadow: 0 0 8px #ff0000;
          flex-shrink: 0;
        }

        /* ── MARCA ── */
        .lq-marca {
          display: flex; align-items: center; gap: 14px;
        }
        .lq-marca-btn {
          display: flex; align-items: center; gap: 10px;
          border: 2px solid rgba(255,255,255,0.25);
          padding: 7px 20px; border-radius: 50px;
          width: fit-content;
        }
        .lq-marca-arrow {
          width: 24px; height: 24px; border-radius: 50%;
          background: #ff0000;
          display: flex; align-items: center; justify-content: center;
          font-size: 13px; color: #fff; font-weight: 900;
        }
        .lq-marca-nombre {
          font-family: 'Anton', sans-serif;
          font-size: clamp(13px, 1.1vw, 18px);
          letter-spacing: 5px;
          color: #fff;
        }
        .lq-marca-web {
          font-size: clamp(9px, 0.7vw, 12px);
          color: rgba(255,255,255,0.35);
          letter-spacing: 2px;
          margin-top: 3px;
        }

        /* ── LOGO ── */
        .lq-logo {
          position: absolute; top: 3.5vh; right: 4vw; z-index: 10;
          text-align: right;
          opacity: 0; transform: translateY(-10px);
          transition: opacity 0.7s ease 0.5s, transform 0.7s ease 0.5s;
        }
        .lq-logo.on { opacity: 1; transform: translateY(0); }
        .lq-logo-nombre {
          font-family: 'Anton', sans-serif;
          font-size: clamp(16px, 1.5vw, 26px);
          letter-spacing: 5px;
          color: #ff4444;
          text-shadow: 0 0 15px rgba(255,0,0,0.3);
        }
        .lq-logo-sub {
          font-size: clamp(9px, 0.65vw, 11px);
          letter-spacing: 4px;
          color: rgba(255,255,255,0.3);
          text-transform: uppercase;
          margin-top: 2px;
        }

        /* ── BADGE ESQUINA ── */
        .lq-badge-corner {
          position: absolute; top: 3vh; left: 3vw; z-index: 10;
          background: #ff0000;
          color: #fff;
          font-family: 'Anton', sans-serif;
          font-size: clamp(10px, 0.85vw, 14px);
          letter-spacing: 3px;
          padding: 7px 18px;
          border-radius: 4px;
          box-shadow: 0 4px 16px rgba(255,0,0,0.5);
          opacity: 0; transition: opacity 0.6s ease 1s;
          animation: cornerPulse 2s ease-in-out infinite 2s;
        }
        .lq-badge-corner.on { opacity: 1; }
        @keyframes cornerPulse {
          0%,100% { box-shadow: 0 4px 16px rgba(255,0,0,0.5); }
          50%      { box-shadow: 0 4px 28px rgba(255,0,0,0.85); }
        }

        /* ── ANIMACIONES ENTRADA/SALIDA ── */
        .lq-anim {
          transition: opacity 0.4s ease, transform 0.4s ease;
        }
        .lq-anim.out  { opacity:0!important; transform:translateX(35px)!important; transition:opacity 0.35s ease,transform 0.35s ease!important; }
        .lq-anim.in   { opacity:0; transform:translateX(-35px); }
        .lq-anim.idle { opacity:1; transform:translateX(0); }
        .lq-anim.in.d1 { transition: opacity 0.5s ease 0.04s, transform 0.55s cubic-bezier(.22,1,.36,1) 0.04s; }
        .lq-anim.in.d2 { transition: opacity 0.5s ease 0.10s, transform 0.55s cubic-bezier(.22,1,.36,1) 0.10s; }
        .lq-anim.in.d3 { transition: opacity 0.5s ease 0.17s, transform 0.55s cubic-bezier(.22,1,.36,1) 0.17s; }
        .lq-anim.in.d4 { transition: opacity 0.5s ease 0.24s, transform 0.55s cubic-bezier(.22,1,.36,1) 0.24s; }
        .lq-anim.in.d5 { transition: opacity 0.5s ease 0.31s, transform 0.55s cubic-bezier(.22,1,.36,1) 0.31s; }
        .lq-anim.in.d6 { transition: opacity 0.5s ease 0.38s, transform 0.55s cubic-bezier(.22,1,.36,1) 0.38s; }

        .lq-static {
          opacity:0; transform:translateY(8px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .lq-static.on { opacity:1; transform:translateY(0); }

        /* ── DOTS ── */
        .lq-dots {
          position: absolute; bottom: 26px;
          left: 50%; transform: translateX(-50%);
          z-index: 10; display: flex; gap: 9px; align-items: center;
        }
        .lq-dot {
          width: 9px; height: 9px; border-radius: 50%;
          background: rgba(255,255,255,0.15);
          border: 1.5px solid rgba(255,255,255,0.25);
          cursor: pointer;
          transition: background 0.3s, transform 0.3s;
        }
        .lq-dot.active {
          background: #ff2222;
          border-color: #ff4444;
          transform: scale(1.4);
          box-shadow: 0 0 10px rgba(255,0,0,0.6);
        }

        /* ── PROGRESO ── */
        .lq-progress {
          position: absolute; bottom: 0; left: 0; right: 0; z-index: 10;
          height: 4px; background: rgba(255,0,0,0.1);
        }
        .lq-progress-bar {
          height: 100%;
          background: linear-gradient(to right, #cc0000, #ff4444);
          box-shadow: 0 0 12px rgba(255,0,0,0.6);
          transition: none;
        }
      `}</style>

      <div className="lq">
        {/* FONDOS */}
        <div className={`lq-fondo-rojo ${mounted ? "on" : ""}`} />
        <RayosFondo />
        <div className="lq-vignette" />

        {/* LOGO + BADGE */}
        <div className={`lq-logo ${mounted ? "on" : ""}`}>
          <div className="lq-logo-nombre">AURA</div>
          <div className="lq-logo-sub">Mueblería</div>
        </div>
        <div className={`lq-badge-corner ${mounted ? "on" : ""}`}>
          ⚡ LIQUIDACIÓN TOTAL
        </div>

        {/* IMAGEN */}
        <div className="lq-img-wrap">
          <div className="lq-img-sombra" />
          <img
            className={`lq-img ${mounted ? "visible" : ""} ${zoom ? "zoom" : ""} ${isOut ? "saliendo" : isIn ? "entrando" : ""}`}
            src={p.imagen}
            alt={p.titulo2}
          />
        </div>

        {/* PANEL */}
        <div className="lq-panel">

          <div className={`lq-anim d1 ${isOut?"out":isIn?"in":"idle"}`}>
            <div className="lq-cat">{p.categoria}</div>
          </div>

          <div className={`lq-anim d2 ${isOut?"out":isIn?"in":"idle"}`}>
            <div className="lq-titulo">
              {p.titulo1}
              <span>{p.titulo2}</span>
            </div>
          </div>

          <div className={`lq-anim d3 ${isOut?"out":isIn?"in":"idle"}`}>
            <div className="lq-motivo">{p.motivo}</div>
          </div>

          <div className={`lq-anim d4 ${isOut?"out":isIn?"in":"idle"}`}>
            <div className="lq-precio-bloque">
              <div className="lq-precio-viejo-wrap">
                <div className="lq-precio-viejo">{p.precioViejo}</div>
                <div className="lq-descuento-grande">{p.descuento}</div>
              </div>
              <div className="lq-precio-nuevo">{p.precioNuevo}</div>
              <div className="lq-precio-detalle">{p.detalle}</div>
            </div>
          </div>

          <div className={`lq-anim d5 ${isOut?"out":isIn?"in":"idle"}`}>
            <div className="lq-stock" style={{ opacity: stockVisible ? 1 : 0.3 }}>
              <div className="lq-stock-dot" />
              {p.stock}
            </div>
          </div>

          <div className={`lq-anim d6 ${isOut?"out":isIn?"in":"idle"}`}>
            <div className="lq-static on" style={{transitionDelay:"1.5s"}}>
              <div className="lq-marca">
                <div>
                  <div className="lq-marca-btn">
                    <div className="lq-marca-arrow">›</div>
                    <div className="lq-marca-nombre">AURA</div>
                  </div>
                  <div className="lq-marca-web">www.muebleriaaura.com</div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* DOTS */}
        <div className="lq-dots">
          {PRODUCTOS.map((_,i) => (
            <div key={i} className={`lq-dot ${i===indice?"active":""}`} onClick={()=>ir(i)} />
          ))}
        </div>

        <div className="lq-progress">
          <div className="lq-progress-bar" style={{width:`${progreso}%`}} />
        </div>
      </div>
    </>
  );
}