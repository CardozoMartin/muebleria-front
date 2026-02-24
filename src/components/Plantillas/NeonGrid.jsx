import React, { useEffect, useState, useRef } from 'react';
import logo from './../../assets/logo.png';
import comedor from './../../assets/comedor.png';
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
    descuento: '33',
    cuotas: '12 cuotas sin interés',
    imagen: comedor,
    accentColor: '#00f5ff',
    accentRgb: '0,245,255',
  },
  {
    id: 2,
    nombre: 'Juego de',
    nombreDestacado: 'Comedor',
    subtitulo: 'Mesa + 4 Sillas · Madera Sólida',
    descripcion: [
      'Mesa extensible con 4 sillas tapizadas en tela premium.',
      'Estructura de roble macizo, acabado laqueado mate.',
      'Ideal para ambientes compactos y modernos.',
    ],
    precioViejo: '$ 189.999',
    precioNuevo: '$ 129.999',
    descuento: '31',
    cuotas: '6 cuotas sin interés',
    imagen: juego4,
    accentColor: '#ff2dce',
    accentRgb: '255,45,206',
  },
  {
    id: 3,
    nombre: 'Juego de',
    nombreDestacado: 'Comedor',
    subtitulo: 'Mesa Redonda + 4 Sillas · Madera Sólida',
    descripcion: [
      'Set completo de comedor en madera laqueada.',
      'Mesa redonda extensible con sillas incluidas.',
      'Terminación Premium, colores a elección.',
    ],
    precioViejo: '$ 450.000',
    precioNuevo: '$ 299.999',
    descuento: '33',
    cuotas: '18 cuotas sin interés',
    imagen: redondo,
    accentColor: '#aaff00',
    accentRgb: '170,255,0',
  },
];

const DURACION = 5500;

export default function NeonGrid() {
  const [mounted, setMounted] = useState(false);
  const [indice, setIndice] = useState(0);
  const [fase, setFase] = useState('idle');
  const [progreso, setProgreso] = useState(0);
  const [glitch, setGlitch] = useState(false);
  const intervaloRef = useRef(null);
  const progressRef = useRef(null);

  const producto = PRODUCTOS[indice];
  const acc = producto.accentColor;
  const accRgb = producto.accentRgb;

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 150);
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

  const triggerTransition = (nextIndex) => {
    setGlitch(true);
    setFase('saliendo');
    setTimeout(() => {
      setIndice(
        typeof nextIndex === 'number' ? nextIndex : (prev) => (prev + 1) % PRODUCTOS.length
      );
      setFase('entrando');
      setTimeout(() => {
        setFase('idle');
        setGlitch(false);
      }, 700);
    }, 450);
  };

  useEffect(() => {
    if (!mounted) return;
    intervaloRef.current = setInterval(() => triggerTransition(), DURACION);
    return () => clearInterval(intervaloRef.current);
  }, [mounted]);

  const ir = (i) => {
    if (i === indice) return;
    clearInterval(intervaloRef.current);
    triggerTransition(i);
    intervaloRef.current = setInterval(() => triggerTransition(), DURACION);
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Exo+2:wght@300;400;600;800&display=swap"
        rel="stylesheet"
      />
      <style>{`
        *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }

        .ng {
          width: 100vw; height: 100vh;
          position: relative; overflow: hidden;
          background: #080c10;
          font-family: 'Exo 2', sans-serif;
        }

        /* ── FONDO GRID ── */
        .ng-bg {
          position: absolute; inset: 0; z-index: 0;
        }
        .ng-grid-h {
          position: absolute; inset: 0;
          background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 100% 60px;
        }
        .ng-grid-v {
          position: absolute; inset: 0;
          background-image: linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 80px 100%;
        }
        /* Perspectiva bottom */
        .ng-grid-persp {
          position: absolute; bottom: 0; left: 0; right: 0;
          height: 40%;
          background-image:
            linear-gradient(rgba(0,245,255,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,245,255,0.04) 1px, transparent 1px);
          background-size: 100% 30px, 60px 100%;
          transform: perspective(600px) rotateX(60deg);
          transform-origin: bottom center;
          opacity: .5;
          transition: background-image .5s ease;
        }

        /* Glow radial dinámico */
        .ng-glow-bg {
          position: absolute;
          width: 70%; height: 70%;
          top: 15%; left: 30%;
          border-radius: 50%;
          pointer-events: none;
          transition: background .8s ease;
          filter: blur(80px);
          opacity: .15;
        }

        /* ── SCANLINES ── */
        .ng-scan {
          position: absolute; inset: 0; z-index: 1; pointer-events: none;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0,0,0,0.08) 2px,
            rgba(0,0,0,0.08) 4px
          );
        }

        /* ── GLITCH OVERLAY ── */
        .ng-glitch {
          position: absolute; inset: 0; z-index: 25; pointer-events: none;
          opacity: 0;
          transition: opacity .1s;
        }
        .ng-glitch.active { opacity: 1; animation: glitchAnim .45s steps(1) forwards; }
        @keyframes glitchAnim {
          0%   { clip-path: inset(0 0 85% 0); transform: translateX(-4px); background: rgba(0,245,255,.04); }
          20%  { clip-path: inset(40% 0 30% 0); transform: translateX(4px); background: rgba(255,45,206,.04); }
          40%  { clip-path: inset(70% 0 10% 0); transform: translateX(-2px); }
          60%  { clip-path: inset(20% 0 60% 0); transform: translateX(3px); }
          80%  { clip-path: inset(55% 0 5% 0); transform: translateX(-1px); }
          100% { clip-path: inset(0 0 100% 0); transform: translateX(0); opacity: 0; }
        }

        /* ── LOGO ── */
        .ng-logo {
          position: absolute; top: 4vh; left: 5vw; z-index: 10;
          opacity: 0; transform: translateY(-10px);
          transition: opacity .6s ease .3s, transform .6s ease .3s;
        }
        .ng-logo.on { opacity: 1; transform: translateY(0); }
        .ng-logo img { height: clamp(32px, 4vh, 60px); width: auto; filter: brightness(0) invert(1); opacity: .85; }

        /* ── BADGE ESQUINA ── */
        .ng-corner-badge {
          position: absolute; top: 4vh; right: 5vw; z-index: 10;
          opacity: 0; transform: translateX(20px);
          transition: opacity .7s ease .5s, transform .7s ease .5s;
        }
        .ng-corner-badge.on { opacity: 1; transform: translateX(0); }
        .ng-corner-badge-inner {
          display: flex; flex-direction: column; align-items: flex-end;
          gap: 4px;
        }
        .ng-live-dot {
          display: flex; align-items: center; gap: 8px;
        }
        .ng-live-blink {
          width: 8px; height: 8px; border-radius: 50%;
          animation: ngBlink 1s infinite;
          transition: background .5s ease;
        }
        @keyframes ngBlink { 0%,100%{opacity:1;} 50%{opacity:.1;} }
        .ng-live-txt {
          font-family: 'Orbitron', sans-serif;
          font-size: clamp(9px, .7vw, 12px);
          letter-spacing: 4px;
          color: rgba(255,255,255,0.4);
          text-transform: uppercase;
        }

        /* ── LAYOUT ── */
        .ng-layout {
          position: absolute; inset: 0; z-index: 5;
          display: grid;
          grid-template-columns: 1fr 45%;
          height: 100%;
        }

        /* ── COLUMNA IZQUIERDA ── */
        .ng-left {
          display: flex; flex-direction: column;
          justify-content: center;
          padding: 8vh 3vw 8vh 6vw;
          gap: 2vh;
        }

        /* ── TAG SISTEMA ── */
        .ng-sys-tag {
          display: flex; align-items: center; gap: 10px;
          opacity: 0; transform: translateX(-15px);
          transition: opacity .6s ease .2s, transform .6s ease .2s;
        }
        .ng-sys-tag.on { opacity: 1; transform: translateX(0); }
        .ng-sys-bracket {
          font-family: 'Orbitron', sans-serif;
          font-size: clamp(10px, .8vw, 14px);
          color: rgba(255,255,255,0.2);
        }
        .ng-sys-txt {
          font-family: 'Orbitron', sans-serif;
          font-size: clamp(9px, .75vw, 13px);
          letter-spacing: 4px; text-transform: uppercase;
          transition: color .5s ease;
        }

        /* ── TÍTULO ── */
        .ng-titulo {
          font-family: 'Orbitron', sans-serif;
          font-size: clamp(36px, 5.5vw, 90px);
          font-weight: 900;
          line-height: .9;
          letter-spacing: -2px;
        }
        .ng-titulo-normal { color: rgba(255,255,255,0.9); }
        .ng-titulo-dest {
          display: block;
          transition: color .5s ease, text-shadow .5s ease;
        }

        /* ── SEPARADOR ── */
        .ng-sep {
          display: flex; align-items: center; gap: 12px;
        }
        .ng-sep-line {
          height: 1px; width: 50px;
          transition: background .5s ease;
        }
        .ng-sep-txt {
          font-family: 'Exo 2', sans-serif;
          font-size: clamp(11px, .9vw, 15px);
          letter-spacing: 3px; text-transform: uppercase;
          color: rgba(255,255,255,0.4);
        }

        /* ── DESCRIPCIÓN ── */
        .ng-desc {
          font-size: clamp(13px, 1.1vw, 18px);
          color: rgba(255,255,255,0.45);
          line-height: 1.7;
          font-weight: 300;
          max-width: 460px;
        }

        /* ── PRECIO ── */
        .ng-price-block {
          display: flex; flex-direction: column; gap: 4px;
        }
        .ng-price-old {
          font-family: 'Exo 2', sans-serif;
          font-size: clamp(14px, 1.2vw, 20px);
          color: rgba(255,255,255,0.25);
          text-decoration: line-through;
          font-weight: 600;
          letter-spacing: 2px;
        }
        .ng-price-main {
          display: flex; align-items: flex-end; gap: 16px;
        }
        .ng-price-new {
          font-family: 'Orbitron', sans-serif;
          font-size: clamp(50px, 7.5vw, 120px);
          font-weight: 900;
          line-height: 1;
          letter-spacing: -2px;
          transition: color .5s ease, text-shadow .5s ease;
        }
        .ng-off-block {
          display: flex; flex-direction: column; align-items: center;
          margin-bottom: 10px; gap: 2px;
        }
        .ng-off-num {
          font-family: 'Orbitron', sans-serif;
          font-size: clamp(28px, 3.5vw, 52px);
          font-weight: 900;
          line-height: 1;
          transition: color .5s ease;
        }
        .ng-off-label {
          font-family: 'Orbitron', sans-serif;
          font-size: clamp(10px, .8vw, 14px);
          letter-spacing: 3px;
          color: rgba(255,255,255,0.3);
        }
        .ng-cuotas {
          font-size: clamp(12px, 1vw, 16px);
          color: rgba(255,255,255,0.4);
          letter-spacing: 1px;
          font-weight: 600;
        }

        /* ── CHIPS ── */
        .ng-chips { display: flex; gap: 10px; flex-wrap: wrap; }
        .ng-chip {
          font-family: 'Exo 2', sans-serif;
          font-size: clamp(10px, .8vw, 13px);
          font-weight: 700; letter-spacing: 2px; text-transform: uppercase;
          padding: 6px 14px;
          border: 1px solid;
          background: rgba(255,255,255,0.03);
          backdrop-filter: blur(4px);
          transition: border-color .5s ease, color .5s ease;
        }

        /* ── COLUMNA DERECHA - IMAGEN ── */
        .ng-right {
          position: relative;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden;
        }

        /* Líneas verticales deco */
        .ng-vlines {
          position: absolute; inset: 0; pointer-events: none;
          display: flex; justify-content: space-around;
        }
        .ng-vline {
          width: 1px;
          background: linear-gradient(to bottom, transparent, rgba(255,255,255,.04) 40%, rgba(255,255,255,.04) 60%, transparent);
        }

        /* Círculo de fondo */
        .ng-circle {
          position: absolute;
          width: 55vh; height: 55vh;
          border-radius: 50%;
          border: 1px solid;
          transition: border-color .5s ease;
          opacity: .15;
        }
        .ng-circle-2 {
          position: absolute;
          width: 42vh; height: 42vh;
          border-radius: 50%;
          border: 1px solid;
          opacity: .08;
          transition: border-color .5s ease;
          animation: rotateSlow 20s linear infinite;
        }
        @keyframes rotateSlow { to { transform: rotate(360deg); } }

        /* Corner brackets */
        .ng-bracket {
          position: absolute; z-index: 2; pointer-events: none;
          width: 30px; height: 30px;
          transition: border-color .5s ease;
          border-style: solid;
        }
        .ng-bracket.tl { top: 5vh; left: 3vw; border-width: 2px 0 0 2px; }
        .ng-bracket.tr { top: 5vh; right: 3vw; border-width: 2px 2px 0 0; }
        .ng-bracket.bl { bottom: 5vh; left: 3vw; border-width: 0 0 2px 2px; }
        .ng-bracket.br { bottom: 5vh; right: 3vw; border-width: 0 2px 2px 0; }

        /* Imagen */
        .ng-img-wrap {
          position: relative; z-index: 3;
          opacity: 0; transform: scale(.88) translateX(30px);
          transition: opacity .9s ease .5s, transform .9s cubic-bezier(.34,1.56,.64,1) .5s;
        }
        .ng-img-wrap.on { opacity: 1; transform: scale(1) translateX(0); }
        .ng-img-wrap.out {
          opacity: 0 !important;
          transform: scale(.85) translateX(50px) !important;
          transition: opacity .35s ease, transform .35s ease !important;
        }
        .ng-img-wrap.in {
          opacity: 0;
          transform: scale(.85) translateX(-40px) !important;
          transition: opacity .5s ease .1s, transform .7s cubic-bezier(.34,1.56,.64,1) .1s !important;
        }
        .ng-img {
          max-height: 58vh; max-width: 38vw;
          object-fit: contain;
          transition: filter .5s ease;
          animation: ngFloat 5s ease-in-out infinite;
        }
        @keyframes ngFloat {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-14px); }
        }

        /* ── CONTENIDO DINÁMICO ── */
        .ng-content {
          transition: opacity .35s ease, transform .35s ease;
        }
        .ng-content.out { opacity: 0; transform: translateX(-40px); }
        .ng-content.in {
          opacity: 0; transform: translateX(40px);
          transition: opacity .5s ease .1s, transform .6s cubic-bezier(.22,1,.36,1) .1s;
        }
        .ng-content.idle { opacity: 1; transform: translateX(0); }

        /* ── DOTS ── */
        .ng-dots {
          position: absolute; bottom: 4.5vh; left: 50%; transform: translateX(-50%);
          z-index: 10; display: flex; gap: 8px; align-items: center;
        }
        .ng-dot {
          width: 28px; height: 3px;
          background: rgba(255,255,255,0.15);
          cursor: pointer;
          transition: background .3s, width .3s;
        }
        .ng-dot.active { width: 50px; }

        /* ── PROGRESO ── */
        .ng-progress {
          position: absolute; bottom: 0; left: 0; right: 0; z-index: 6;
          height: 3px; background: rgba(255,255,255,0.05);
        }
        .ng-progress-bar {
          height: 100%;
          transition: background .5s ease, none;
          box-shadow: 0 0 8px;
        }

        /* Estáticos */
        .ng-static {
          opacity: 0; transform: translateY(12px);
          transition: opacity .6s ease, transform .6s ease;
        }
        .ng-static.on { opacity: 1; transform: translateY(0); }
      `}</style>

      <div className="ng">
        {/* FONDO */}
        <div className="ng-bg">
          <div className="ng-grid-h" />
          <div className="ng-grid-v" />
          <div
            className="ng-grid-persp"
            style={{
              backgroundImage: `linear-gradient(rgba(${accRgb},.06) 1px, transparent 1px), linear-gradient(90deg, rgba(${accRgb},.04) 1px, transparent 1px)`,
            }}
          />
        </div>

        {/* GLOW RADIAL */}
        <div
          className="ng-glow-bg"
          style={{ background: `radial-gradient(ellipse, rgba(${accRgb},1) 0%, transparent 70%)` }}
        />

        {/* SCANLINES */}
        <div className="ng-scan" />

        {/* GLITCH */}
        <div className={`ng-glitch ${glitch ? 'active' : ''}`} />

        {/* LOGO */}
        <div className={`ng-logo ${mounted ? 'on' : ''}`}>
          <img src={logo} alt="Logo" />
        </div>

        {/* BADGE ESQUINA */}
        <div className={`ng-corner-badge ${mounted ? 'on' : ''}`}>
          <div className="ng-corner-badge-inner">
            <div className="ng-live-dot">
              <div className="ng-live-blink" style={{ background: acc }} />
              <span className="ng-live-txt">Mega Ofertas</span>
            </div>
          </div>
        </div>

        {/* LAYOUT */}
        <div className="ng-layout">
          {/* COLUMNA IZQUIERDA */}
          <div className="ng-left">
            {/* Tag sistema - fijo */}
            <div
              className={`ng-sys-tag ng-static ${mounted ? 'on' : ''}`}
              style={{ transitionDelay: '.2s' }}
            >
              <span className="ng-sys-bracket">[</span>
              <span className="ng-sys-txt" style={{ color: acc }}>
                OFERTA_ESPECIAL
              </span>
              <span className="ng-sys-bracket">]</span>
            </div>

            {/* Contenido dinámico */}
            <div
              className={`ng-content ${fase === 'saliendo' ? 'out' : fase === 'entrando' ? 'in' : 'idle'}`}
            >
              <div className="ng-titulo">
                <span className="ng-titulo-normal">{producto.nombre}</span>
                <span
                  className="ng-titulo-dest"
                  style={{
                    color: acc,
                    textShadow: `0 0 30px rgba(${accRgb},.5), 0 0 60px rgba(${accRgb},.2)`,
                  }}
                >
                  {producto.nombreDestacado}
                </span>
              </div>

              <div className="ng-sep" style={{ marginTop: '1.5vh' }}>
                <div
                  className="ng-sep-line"
                  style={{ background: `linear-gradient(to right, ${acc}, transparent)` }}
                />
                <span className="ng-sep-txt">{producto.subtitulo}</span>
              </div>

              <p className="ng-desc" style={{ marginTop: '1.5vh' }}>
                {producto.descripcion[0]}
              </p>

              <div className="ng-price-block" style={{ marginTop: '2vh' }}>
                <div className="ng-price-old">{producto.precioViejo}</div>
                <div className="ng-price-main">
                  <div
                    className="ng-price-new"
                    style={{ color: acc, textShadow: `0 0 40px rgba(${accRgb},.6)` }}
                  >
                    {producto.precioNuevo}
                  </div>
                  <div className="ng-off-block">
                    <span className="ng-off-num" style={{ color: acc }}>
                      {producto.descuento}%
                    </span>
                    <span className="ng-off-label">OFF</span>
                  </div>
                </div>
                <div className="ng-cuotas">{producto.cuotas}</div>
              </div>
            </div>

            {/* Chips - fijos */}
            <div
              className={`ng-chips ng-static ${mounted ? 'on' : ''}`}
              style={{ transitionDelay: '1.4s' }}
            >
              <span className="ng-chip" style={{ borderColor: `rgba(${accRgb},.3)`, color: acc }}>
                ✓ Envío gratis
              </span>
              <span
                className="ng-chip"
                style={{ borderColor: `rgba(255,255,255,.1)`, color: 'rgba(255,255,255,.4)' }}
              >
                ⏳ Últimas unidades
              </span>
            </div>
          </div>

          {/* COLUMNA DERECHA */}
          <div className="ng-right">
            <div className="ng-vlines">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="ng-vline" />
              ))}
            </div>
            <div className="ng-circle" style={{ borderColor: acc }} />
            <div className="ng-circle-2" style={{ borderColor: acc }} />

            {/* Brackets */}
            {['tl', 'tr', 'bl', 'br'].map((pos) => (
              <div
                key={pos}
                className={`ng-bracket ${pos}`}
                style={{ borderColor: `rgba(${accRgb},.4)` }}
              />
            ))}

            <div
              className={`ng-img-wrap ${fase === 'saliendo' ? 'out' : fase === 'entrando' ? 'in on' : mounted ? 'on' : ''}`}
            >
              <img
                className="ng-img"
                src={producto.imagen}
                alt={producto.nombreDestacado}
                style={{
                  filter: `drop-shadow(0 20px 50px rgba(0,0,0,.5)) drop-shadow(0 0 30px rgba(${accRgb},.2))`,
                }}
              />
            </div>
          </div>
        </div>

        {/* DOTS */}
        <div className="ng-dots">
          {PRODUCTOS.map((p, i) => (
            <div
              key={i}
              className={`ng-dot ${i === indice ? 'active' : ''}`}
              style={
                i === indice ? { background: acc, boxShadow: `0 0 8px rgba(${accRgb},.6)` } : {}
              }
              onClick={() => ir(i)}
            />
          ))}
        </div>

        {/* PROGRESO */}
        <div className="ng-progress">
          <div
            className="ng-progress-bar"
            style={{
              width: `${progreso}%`,
              background: acc,
              boxShadow: `0 0 10px rgba(${accRgb},.8)`,
              transition: 'none',
            }}
          />
        </div>
      </div>
    </>
  );
}
