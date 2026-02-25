import React, { useEffect, useState, useRef } from "react";

const PRODUCTOS = [
  {
    id: 1,
    categoria: "pagá cómodo",
    titulo1: "JUEGO DE",
    titulo2: "COMEDOR",
    cuotasNum: "12",
    cuotasMonto: "$ 16.666",
    cuotasLabel: "cuotas sin interés",
    precioTotal: "$ 199.999",
    precioViejo: "$ 299.999",
    descuento: "33% OFF",
    detalle: "Mesa + 6 Sillas · Madera Maciza",
    imagen: "https://res.cloudinary.com/dcwgnl9ud/image/upload/v1771902544/muebleria/productos/ngh3qb4awv8vwdmb4qpn.png",
  },
  {
    id: 2,
    categoria: "llevalo hoy",
    titulo1: "JUEGO DE",
    titulo2: "COMEDOR",
    cuotasNum: "6",
    cuotasMonto: "$ 21.666",
    cuotasLabel: "cuotas sin interés",
    precioTotal: "$ 129.999",
    precioViejo: "$ 189.999",
    descuento: "31% OFF",
    detalle: "Mesa + 4 Sillas · Pino Natural",
    imagen: "https://res.cloudinary.com/dcwgnl9ud/image/upload/v1771902739/muebleria/productos/ciwty78qprpy8shd2447.png",
  },
  {
    id: 3,
    categoria: "súper precio",
    titulo1: "MESA",
    titulo2: "REDONDA",
    cuotasNum: "18",
    cuotasMonto: "$ 16.666",
    cuotasLabel: "cuotas sin interés",
    precioTotal: "$ 299.999",
    precioViejo: "$ 450.000",
    descuento: "33% OFF",
    detalle: "Mesa Redonda + 4 Sillas · Roble",
    imagen: "https://res.cloudinary.com/dcwgnl9ud/image/upload/v1771902544/muebleria/productos/ngh3qb4awv8vwdmb4qpn.png",
  },
];

const DURACION = 6000;

export default function CuotasBanner() {
  const [mounted, setMounted] = useState(false);
  const [indice, setIndice] = useState(0);
  const [fase, setFase] = useState("idle");
  const [progreso, setProgreso] = useState(0);
  const [zoom, setZoom] = useState(false);
  const intervaloRef = useRef(null);
  const progressRef = useRef(null);

  const p = PRODUCTOS[indice];

  useEffect(() => {
    const t = setTimeout(() => {
      setMounted(true);
      setTimeout(() => setZoom(true), 600);
    }, 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    setProgreso(0);
    const start = performance.now();
    const tick = (now) => {
      const pct = Math.min(((now - start) / DURACION) * 100, 100);
      setProgreso(pct);
      if (pct < 100) progressRef.current = requestAnimationFrame(tick);
    };
    progressRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(progressRef.current);
  }, [indice, mounted]);

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

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Anton&family=Dancing+Script:wght@700&family=Barlow:wght@400;600;700;900&display=swap" rel="stylesheet"/>
      <style>{`
        *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }

        .cb {
          width: 100vw; height: 100vh;
          background: #f7faf7;
          position: relative; overflow: hidden;
          font-family: 'Barlow', sans-serif;
        }

        /* ── FONDO VERDE IZQUIERDO ── */
        .cb-fondo-verde {
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 52%;
          background: linear-gradient(145deg, #1a5c2e 0%, #1e7a3a 50%, #166228 100%);
          clip-path: polygon(0 0, 100% 0, 88% 100%, 0 100%);
          z-index: 0;
          opacity: 0;
          transition: opacity 1s ease;
        }
        .cb-fondo-verde.on { opacity: 1; }

        /* Patrón sutil en el verde */
        .cb-fondo-verde::after {
          content: '';
          position: absolute; inset: 0;
          background-image:
            radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 28px 28px;
        }

        /* ── FRANJA DIAGONAL BLANCA ── */
        .cb-franja {
          position: absolute;
          left: 46%; top: 0; bottom: 0;
          width: 8%;
          background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0) 100%);
          z-index: 1;
          transform: skewX(-8deg);
        }

        /* ── IMAGEN DEL PRODUCTO ── */
        .cb-img-wrap {
          position: absolute;
          left: 2%; bottom: 10%;
          width: 50%;
          z-index: 3;
          display: flex;
          justify-content: center;
          align-items: flex-end;
        }

        .cb-img {
          max-height: 68vh;
          max-width: 44vw;
          object-fit: contain;
          filter: drop-shadow(0 20px 50px rgba(0,0,0,0.5));
          transform: scale(0.88);
          opacity: 0;
          transition: transform 4.5s cubic-bezier(.25,.46,.45,.94), opacity 0.7s ease;
        }
        .cb-img.visible { opacity: 1; }
        .cb-img.zoom    { transform: scale(1.0); }
        .cb-img.saliendo { opacity: 0 !important; transform: scale(0.9) translateX(-30px) !important; transition: opacity 0.4s ease, transform 0.4s ease !important; }
        .cb-img.entrando { opacity: 0; transform: scale(0.9) translateX(30px); transition: opacity 0.5s ease 0.1s, transform 0.6s cubic-bezier(.22,1,.36,1) 0.1s !important; }

        /* Sombra bajo el mueble */
        .cb-img-sombra {
          position: absolute;
          bottom: -6px; left: 50%;
          transform: translateX(-50%);
          width: 60%; height: 20px;
          background: radial-gradient(ellipse, rgba(0,0,0,0.35) 0%, transparent 70%);
          filter: blur(8px);
          z-index: 2;
        }

        /* ── PANEL DERECHO ── */
        .cb-panel {
          position: absolute;
          right: 0; top: 0; bottom: 0;
          width: 52%;
          z-index: 5;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 4vh 5vw 4vh 3vw;
          gap: 1.6vh;
        }

        /* ── CATEGORÍA CURSIVA ── */
        .cb-cat {
          font-family: 'Dancing Script', cursive;
          font-size: clamp(20px, 2.4vw, 40px);
          color: #1e7a3a;
          line-height: 1;
        }

        /* ── TÍTULO ── */
        .cb-titulo {
          font-family: 'Anton', sans-serif;
          font-size: clamp(56px, 8.5vw, 140px);
          line-height: 0.85;
          color: #1a1a1a;
          letter-spacing: 2px;
        }
        .cb-titulo span {
          display: block;
          color: #1e7a3a;
        }

        /* ── DETALLE ── */
        .cb-detalle {
          font-size: clamp(11px, 0.9vw, 15px);
          color: #888;
          letter-spacing: 3px;
          text-transform: uppercase;
          font-weight: 600;
          border-left: 3px solid #1e7a3a;
          padding-left: 12px;
        }

        /* ── BLOQUE CUOTAS — protagonista ── */
        .cb-cuotas-bloque {
          background: #1e7a3a;
          border-radius: 16px;
          padding: 20px 28px;
          display: flex;
          align-items: center;
          gap: 16px;
          box-shadow: 0 8px 32px rgba(30,122,58,0.35);
          position: relative;
          overflow: hidden;
        }
        /* brillo interno */
        .cb-cuotas-bloque::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0;
          height: 50%;
          background: linear-gradient(to bottom, rgba(255,255,255,0.08), transparent);
          border-radius: 16px 16px 0 0;
        }

        .cb-cuotas-num {
          font-family: 'Anton', sans-serif;
          font-size: clamp(60px, 8vw, 120px);
          line-height: 1;
          color: #fff;
          text-shadow: 0 4px 20px rgba(0,0,0,0.2);
          animation: cuotasPulse 2.5s ease-in-out infinite 2s;
          flex-shrink: 0;
        }
        @keyframes cuotasPulse {
          0%,100% { transform: scale(1); }
          50%      { transform: scale(1.04); }
        }

        .cb-cuotas-texto {
          display: flex; flex-direction: column; gap: 2px;
        }
        .cb-cuotas-de {
          font-size: clamp(11px, 0.9vw, 15px);
          color: rgba(255,255,255,0.7);
          letter-spacing: 3px;
          text-transform: uppercase;
          font-weight: 600;
        }
        .cb-cuotas-monto {
          font-family: 'Anton', sans-serif;
          font-size: clamp(28px, 3.8vw, 62px);
          color: #fff;
          line-height: 1;
          letter-spacing: 1px;
        }
        .cb-cuotas-label {
          font-size: clamp(13px, 1.1vw, 18px);
          color: rgba(255,255,255,0.85);
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        /* ── PRECIO TOTAL ── */
        .cb-precio-bloque {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }
        .cb-precio-label {
          font-size: clamp(10px, 0.8vw, 13px);
          color: #aaa;
          letter-spacing: 3px;
          text-transform: uppercase;
          font-weight: 700;
        }
        .cb-precio-viejo {
          font-size: clamp(14px, 1.4vw, 22px);
          color: #bbb;
          text-decoration: line-through;
          font-weight: 600;
        }
        .cb-precio-nuevo {
          font-family: 'Anton', sans-serif;
          font-size: clamp(40px, 5.5vw, 88px);
          line-height: 1;
          color: #1a1a1a;
          letter-spacing: 1px;
        }
        .cb-descuento {
          background: #ff3c00;
          color: #fff;
          font-family: 'Anton', sans-serif;
          font-size: clamp(14px, 1.4vw, 24px);
          letter-spacing: 2px;
          padding: 5px 14px;
          border-radius: 6px;
          box-shadow: 0 4px 14px rgba(255,60,0,0.35);
        }

        /* ── MARCA ── */
        .cb-marca {
          display: flex; align-items: center; gap: 14px;
          padding-top: 4px;
        }
        .cb-marca-btn {
          display: flex; align-items: center; gap: 10px;
          border: 2px solid #1e7a3a;
          padding: 7px 20px; border-radius: 50px;
        }
        .cb-marca-arrow {
          width: 24px; height: 24px; border-radius: 50%;
          background: #1e7a3a;
          display: flex; align-items: center; justify-content: center;
          font-size: 12px; color: #fff; font-weight: 900;
        }
        .cb-marca-nombre {
          font-family: 'Anton', sans-serif;
          font-size: clamp(13px, 1.1vw, 18px);
          letter-spacing: 5px;
          color: #1a1a1a;
        }
        .cb-marca-web {
          font-size: clamp(9px, 0.7vw, 12px);
          color: #aaa;
          letter-spacing: 2px;
        }

        /* ── ANIMACIONES ENTRADA/SALIDA ── */
        .cb-anim {
          transition: opacity 0.4s ease, transform 0.4s ease;
        }
        .cb-anim.out { opacity: 0 !important; transform: translateX(30px) !important; transition: opacity 0.35s ease, transform 0.35s ease !important; }
        .cb-anim.in  { opacity: 0; transform: translateX(-30px); }
        .cb-anim.idle { opacity: 1; transform: translateX(0); }

        .cb-anim.in.d1  { transition: opacity 0.5s ease 0.05s, transform 0.55s cubic-bezier(.22,1,.36,1) 0.05s; }
        .cb-anim.in.d2  { transition: opacity 0.5s ease 0.12s, transform 0.55s cubic-bezier(.22,1,.36,1) 0.12s; }
        .cb-anim.in.d3  { transition: opacity 0.5s ease 0.19s, transform 0.55s cubic-bezier(.22,1,.36,1) 0.19s; }
        .cb-anim.in.d4  { transition: opacity 0.5s ease 0.26s, transform 0.55s cubic-bezier(.22,1,.36,1) 0.26s; }
        .cb-anim.in.d5  { transition: opacity 0.5s ease 0.33s, transform 0.55s cubic-bezier(.22,1,.36,1) 0.33s; }

        /* estáticos */
        .cb-static {
          opacity: 0; transform: translateY(8px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .cb-static.on { opacity: 1; transform: translateY(0); }

        /* ── DOTS ── */
        .cb-dots {
          position: absolute; bottom: 26px;
          left: 50%; transform: translateX(-50%);
          z-index: 10; display: flex; gap: 9px; align-items: center;
        }
        .cb-dot {
          width: 9px; height: 9px; border-radius: 50%;
          background: rgba(30,122,58,0.2);
          border: 1.5px solid rgba(30,122,58,0.4);
          cursor: pointer;
          transition: background 0.3s, transform 0.3s;
        }
        .cb-dot.active {
          background: #1e7a3a;
          transform: scale(1.4);
          box-shadow: 0 0 8px rgba(30,122,58,0.5);
        }

        /* ── PROGRESO ── */
        .cb-progress {
          position: absolute; bottom: 0; left: 0; right: 0; z-index: 10;
          height: 4px; background: rgba(30,122,58,0.1);
        }
        .cb-progress-bar {
          height: 100%;
          background: linear-gradient(to right, #1e7a3a, #5cb85c);
          box-shadow: 0 0 10px rgba(30,122,58,0.5);
          transition: none;
        }

        /* ── LOGO ESQUINA ── */
        .cb-logo {
          position: absolute; top: 3.5vh; right: 4vw; z-index: 10;
          text-align: right;
          opacity: 0; transform: translateY(-10px);
          transition: opacity 0.7s ease 0.5s, transform 0.7s ease 0.5s;
        }
        .cb-logo.on { opacity: 1; transform: translateY(0); }
        .cb-logo-nombre {
          font-family: 'Anton', sans-serif;
          font-size: clamp(16px, 1.5vw, 26px);
          letter-spacing: 5px;
          color: #1e7a3a;
        }
        .cb-logo-sub {
          font-size: clamp(9px, 0.65vw, 11px);
          letter-spacing: 4px;
          color: #bbb;
          text-transform: uppercase;
          margin-top: 2px;
        }

        /* ── BADGE ENVÍO ── */
        .cb-envio {
          position: absolute; top: 3.5vh; left: 3vw; z-index: 10;
          background: #1e7a3a;
          color: #fff;
          font-weight: 700;
          font-size: clamp(10px, 0.8vw, 13px);
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 6px 16px;
          border-radius: 50px;
          box-shadow: 0 4px 14px rgba(30,122,58,0.4);
          opacity: 0; transition: opacity 0.6s ease 1.2s;
        }
        .cb-envio.on { opacity: 1; }
      `}</style>

      <div className="cb">
        {/* FONDO */}
        <div className={`cb-fondo-verde ${mounted ? "on" : ""}`} />
        <div className="cb-franja" />

        {/* LOGO + ENVIO */}
        <div className={`cb-logo ${mounted ? "on" : ""}`}>
          <div className="cb-logo-nombre">AURA</div>
          <div className="cb-logo-sub">Mueblería</div>
        </div>
        <div className={`cb-envio ${mounted ? "on" : ""}`}>✓ Envío gratis a todo el país</div>

        {/* IMAGEN */}
        <div className="cb-img-wrap">
          <div className="cb-img-sombra" />
          <img
            className={`cb-img ${mounted ? "visible" : ""} ${zoom ? "zoom" : ""} ${isOut ? "saliendo" : isIn ? "entrando" : ""}`}
            src={p.imagen}
            alt={p.titulo2}
          />
        </div>

        {/* PANEL DERECHO */}
        <div className="cb-panel">

          <div className={`cb-anim d1 ${isOut?"out":isIn?"in":"idle"}`}>
            <div className="cb-cat">{p.categoria}</div>
          </div>

          <div className={`cb-anim d2 ${isOut?"out":isIn?"in":"idle"}`}>
            <div className="cb-titulo">
              {p.titulo1}
              <span>{p.titulo2}</span>
            </div>
          </div>

          <div className={`cb-anim d3 ${isOut?"out":isIn?"in":"idle"}`}>
            <div className="cb-detalle">{p.detalle}</div>
          </div>

          {/* BLOQUE CUOTAS — ESTRELLA */}
          <div className={`cb-anim d4 ${isOut?"out":isIn?"in":"idle"}`}>
            <div className="cb-cuotas-bloque">
              <div className="cb-cuotas-num">{p.cuotasNum}</div>
              <div className="cb-cuotas-texto">
                <span className="cb-cuotas-de">cuotas de</span>
                <span className="cb-cuotas-monto">{p.cuotasMonto}</span>
                <span className="cb-cuotas-label">{p.cuotasLabel}</span>
              </div>
            </div>
          </div>

          {/* PRECIO TOTAL */}
          <div className={`cb-anim d5 ${isOut?"out":isIn?"in":"idle"}`}>
            <div className="cb-precio-bloque">
              <div>
                <div className="cb-precio-label">Precio final</div>
                <div style={{display:"flex", alignItems:"center", gap:"12px", flexWrap:"wrap"}}>
                  <div className="cb-precio-viejo">{p.precioViejo}</div>
                  <div className="cb-precio-nuevo">{p.precioTotal}</div>
                  <div className="cb-descuento">{p.descuento}</div>
                </div>
              </div>
            </div>
          </div>

          {/* MARCA */}
          <div className={`cb-static ${mounted ? "on" : ""}`} style={{transitionDelay:"1.5s"}}>
            <div className="cb-marca">
              <div>
                <div className="cb-marca-btn">
                  <div className="cb-marca-arrow">›</div>
                  <div className="cb-marca-nombre">AURA</div>
                </div>
                <div className="cb-marca-web">www.muebleriaaura.com</div>
              </div>
            </div>
          </div>

        </div>

        {/* DOTS */}
        <div className="cb-dots">
          {PRODUCTOS.map((_,i) => (
            <div key={i} className={`cb-dot ${i===indice?"active":""}`} onClick={()=>ir(i)} />
          ))}
        </div>

        <div className="cb-progress">
          <div className="cb-progress-bar" style={{width:`${progreso}%`}} />
        </div>
      </div>
    </>
  );
}