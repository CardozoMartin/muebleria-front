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
    descripcion:
      'Mesa extensible con 6 sillas tapizadas en tela premium. Estructura de roble macizo, acabado laqueado mate.',
    precioViejo: '$ 299.999',
    precioNuevo: '$ 199.999',
    descuento: '33',
    cuotas: '12',
    imagen: comedor,
    ambiente: 'Comedor · Familiar',
    color: '#d4845a',
    colorRgb: '212,132,90',
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
    color: '#7aab7a',
    colorRgb: '122,171,122',
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
    color: '#c4a05a',
    colorRgb: '196,160,90',
  },
];

const DURACION = 5500;

export default function CasaViva() {
  const [mounted, setMounted] = useState(false);
  const [indice, setIndice] = useState(0);
  const [fase, setFase] = useState('idle');
  const [progreso, setProgreso] = useState(0);
  const [reveal, setReveal] = useState(false);
  const intervaloRef = useRef(null);
  const progressRef = useRef(null);

  const producto = PRODUCTOS[indice];
  const color = producto.color;
  const rgb = producto.colorRgb;

  useEffect(() => {
    const t = setTimeout(() => {
      setMounted(true);
      setReveal(true);
    }, 200);
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

  const runTransition = (getNext) => {
    setReveal(false);
    setFase('saliendo');
    setTimeout(() => {
      setIndice(getNext);
      setFase('entrando');
      setTimeout(() => {
        setFase('idle');
        setReveal(true);
      }, 700);
    }, 420);
  };

  useEffect(() => {
    if (!mounted) return;
    intervaloRef.current = setInterval(
      () => runTransition((prev) => (prev + 1) % PRODUCTOS.length),
      DURACION
    );
    return () => clearInterval(intervaloRef.current);
  }, [mounted]);

  const ir = (i) => {
    if (i === indice) return;
    clearInterval(intervaloRef.current);
    runTransition(i);
    intervaloRef.current = setInterval(
      () => runTransition((prev) => (prev + 1) % PRODUCTOS.length),
      DURACION
    );
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />
      <style>{`
        *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }

        .cv {
          width:100vw; height:100vh;
          position:relative; overflow:hidden;
          font-family:'DM Sans',sans-serif;
          background:#1a1208;
        }

        /* ── FONDO ── */
        .cv-bg {
          position:absolute; inset:0; z-index:0;
          background:
            radial-gradient(ellipse 90% 70% at 65% 50%, rgba(50,32,12,.0) 0%, rgba(10,7,2,1) 75%),
            #1a1208;
        }

        /* Textura sutil */
        .cv-noise {
          position:absolute; inset:0; z-index:0; opacity:.025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-size: 200px 200px;
        }

        /* Líneas horizontales muy sutiles */
        .cv-lines {
          position:absolute; inset:0; z-index:0; opacity:.06;
          background-image: repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,220,160,.3) 40px, rgba(255,220,160,.3) 41px);
        }

        /* ── SPOTLIGHT ── */
        .cv-spot {
          position:absolute; z-index:1; pointer-events:none;
          border-radius:50%;
          filter:blur(60px);
          transition:background 1.2s ease, width 1.2s ease, height 1.2s ease;
          top:50%; right:20%; transform:translate(50%,-50%);
          width:55vh; height:70vh;
          opacity: .55;
        }

        /* Viñeta */
        .cv-vignette {
          position:absolute; inset:0; z-index:2; pointer-events:none;
          background:radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(5,3,1,.7) 100%);
        }

        /* ── FRANJA LATERAL IZQUIERDA ── */
        .cv-stripe {
          position:absolute; top:0; left:0; bottom:0; width:5px; z-index:3;
          transition:background 1.2s ease;
        }

        /* ── LOGO ── */
        .cv-logo {
          position:absolute; top:5vh; left:5.5vw; z-index:10;
          opacity:0; transform:translateY(-10px);
          transition:opacity .8s ease .3s,transform .8s ease .3s;
        }
        .cv-logo.on { opacity:1; transform:translateY(0); }
        .cv-logo img { height:clamp(34px,4vh,62px); width:auto; filter:brightness(0) invert(1); opacity:.9; }

        /* ── AMBIENTE BADGE ── */
        .cv-ambiente {
          position:absolute; top:5vh; right:5.5vw; z-index:10;
          display:flex; align-items:center; gap:8px;
          opacity:0; transform:translateX(14px);
          transition:opacity .7s ease .6s,transform .7s ease .6s;
        }
        .cv-ambiente.on { opacity:1; transform:translateX(0); }
        .cv-amb-dot { width:7px; height:7px; border-radius:50%; transition:background 1s ease; }
        .cv-amb-txt {
          font-size:clamp(10px,.85vw,14px); letter-spacing:4px;
          text-transform:uppercase; font-weight:500;
          color:rgba(255,255,255,.35);
        }

        /* ── LAYOUT ── */
        .cv-layout {
          position:absolute; inset:0; z-index:5;
          display:grid;
          grid-template-columns:48% 1fr;
        }

        /* ── IZQUIERDA ── */
        .cv-left {
          display:flex; flex-direction:column; justify-content:center;
          padding:9vh 3vw 9vh 6vw; gap:2vh;
        }

        /* Eyebrow */
        .cv-eyebrow {
          display:flex; align-items:center; gap:12px;
          opacity:0; transform:translateX(-12px);
          transition:opacity .6s ease,transform .6s ease;
        }
        .cv-eyebrow.on { opacity:1; transform:translateX(0); }
        .cv-ey-line { width:32px; height:1.5px; transition:background 1s ease; }
        .cv-ey-txt { font-size:clamp(10px,.85vw,14px); letter-spacing:4px; text-transform:uppercase; font-weight:500; color:rgba(255,255,255,.4); }

        /* Título */
        .cv-titulo {
          font-family:'DM Serif Display',serif;
          font-size:clamp(38px,5.8vw,94px);
          line-height:.9; letter-spacing:-1px;
          color:rgba(255,248,235,.92);
        }
        .cv-titulo-dest { display:block; font-style:italic; transition:color 1.2s ease; }

        /* Divider */
        .cv-divider {
          display:flex; align-items:center; gap:14px; margin-top:.5vh;
        }
        .cv-div-line { height:1px; width:48px; transition:background 1s ease; }
        .cv-div-txt { font-size:clamp(10px,.9vw,15px); letter-spacing:3px; text-transform:uppercase; color:rgba(255,248,235,.35); font-weight:400; }

        /* Descripción */
        .cv-desc {
          font-size:clamp(13px,1.15vw,19px); line-height:1.75; font-weight:300;
          color:rgba(255,248,235,.45); max-width:440px;
        }

        /* Precio */
        .cv-price-wrap { display:flex; flex-direction:column; gap:3px; }
        .cv-price-label {
          font-size:clamp(9px,.75vw,13px); letter-spacing:4px; text-transform:uppercase;
          color:rgba(255,248,235,.3); font-weight:500;
        }
        .cv-price-old { font-size:clamp(14px,1.2vw,20px); color:rgba(255,248,235,.25); text-decoration:line-through; font-weight:500; letter-spacing:1px; }
        .cv-price-row { display:flex; align-items:flex-end; gap:18px; flex-wrap:wrap; }
        .cv-price-new {
          font-family:'DM Serif Display',serif;
          font-size:clamp(52px,7.5vw,118px);
          line-height:1; letter-spacing:-2px;
          color:rgba(255,248,235,.95);
          transition:text-shadow 1.2s ease;
        }

        /* Badge OFF */
        .cv-off-pill {
          display:flex; flex-direction:column; align-items:center;
          padding:10px 16px; margin-bottom:10px;
          border-radius:4px; min-width:72px;
          transition:background 1.2s ease;
        }
        .cv-off-pct { font-family:'DM Serif Display',serif; font-size:clamp(22px,2.8vw,42px); line-height:1; color:#fff; font-weight:400; }
        .cv-off-lbl { font-size:clamp(9px,.7vw,12px); letter-spacing:4px; font-weight:500; text-transform:uppercase; color:rgba(255,255,255,.5); }

        /* Cuotas */
        .cv-cuotas {
          font-size:clamp(12px,1vw,17px); color:rgba(255,248,235,.4);
          font-weight:400; letter-spacing:.5px;
        }
        .cv-cuotas strong { color:rgba(255,248,235,.75); font-weight:600; }

        /* Features */
        .cv-features { display:flex; gap:10px; flex-wrap:wrap; }
        .cv-feat {
          font-size:clamp(10px,.8vw,13px); font-weight:500; letter-spacing:1.5px;
          text-transform:uppercase; padding:7px 16px;
          border:1px solid rgba(255,248,235,.12);
          color:rgba(255,248,235,.4);
          background:rgba(255,248,235,.03);
        }

        /* ── DERECHA ── */
        .cv-right {
          position:relative; display:flex;
          align-items:center; justify-content:center;
          overflow:hidden;
        }

        /* Círculo glow imagen */
        .cv-img-glow {
          position:absolute; width:60%; height:55%;
          border-radius:50%; pointer-events:none;
          filter:blur(50px); opacity:.3;
          transition:background 1.2s ease;
        }

        /* Sombra suelo */
        .cv-floor { position:absolute; bottom:13%; left:50%; transform:translateX(-50%); width:60%; height:3.5%; background:radial-gradient(ellipse,rgba(0,0,0,.6) 0%,transparent 70%); pointer-events:none; z-index:2; }

        /* Línea horizontal deco */
        .cv-h-line {
          position:absolute; bottom:22%; left:8%; right:8%;
          height:1px; z-index:2;
          background:linear-gradient(to right, transparent, rgba(255,255,255,.06) 20%, rgba(255,255,255,.06) 80%, transparent);
        }

        /* Número producto deco */
        .cv-prod-num {
          position:absolute; bottom:5vh; right:5vw; z-index:2;
          font-family:'DM Serif Display',serif;
          font-size:clamp(60px,9vw,130px); font-weight:400;
          color:transparent; -webkit-text-stroke:1px rgba(255,255,255,.07);
          line-height:1; pointer-events:none;
        }

        /* Imagen */
        .cv-img-wrap {
          position:relative; z-index:3;
          opacity:0; transform:translateX(30px) scale(.93);
          transition:opacity 1s ease .45s,transform 1s cubic-bezier(.34,1.3,.64,1) .45s;
        }
        .cv-img-wrap.on { opacity:1; transform:translateX(0) scale(1); }
        .cv-img-wrap.out { opacity:0!important; transform:translateX(40px) scale(.9)!important; transition:opacity .35s ease,transform .35s ease!important; }
        .cv-img-wrap.in { opacity:0; transform:translateX(-30px) scale(.9)!important; transition:opacity .5s ease .08s,transform .75s cubic-bezier(.34,1.3,.64,1) .08s!important; }

        .cv-img { max-height:63vh; max-width:40vw; object-fit:contain; animation:cvFloat 6s ease-in-out infinite; }
        @keyframes cvFloat { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-12px);} }

        /* ── CONTENIDO DINÁMICO ── */
        .cv-content { display:flex; flex-direction:column; gap:2vh; transition:opacity .35s ease,transform .35s ease; }
        .cv-content.out { opacity:0; transform:translateX(-30px); }
        .cv-content.in { opacity:0; transform:translateX(30px); transition:opacity .5s ease .1s,transform .65s cubic-bezier(.22,1,.36,1) .1s; }
        .cv-content.idle { opacity:1; transform:translateX(0); }

        /* Estáticos */
        .cv-static { opacity:0; transform:translateY(10px); transition:opacity .7s ease,transform .7s ease; }
        .cv-static.on { opacity:1; transform:translateY(0); }

        /* ── BARRA LATERAL PROGRESO ── */
        .cv-side-progress {
          position:absolute; left:0; top:12vh; bottom:12vh; z-index:6;
          width:3px; background:rgba(255,255,255,.06);
          display:flex; flex-direction:column; justify-content:flex-end;
        }
        .cv-side-bar { width:100%; transition:height .1s linear, background 1s ease; }

        /* ── DOTS ── */
        .cv-dots {
          position:absolute; bottom:5.5vh; left:6vw; z-index:10;
          display:flex; gap:20px; align-items:center;
        }
        .cv-dot-item { display:flex; align-items:center; gap:8px; cursor:pointer; opacity:.3; transition:opacity .3s; }
        .cv-dot-item.active { opacity:1; }
        .cv-dot-tick { width:24px; height:1.5px; background:rgba(255,255,255,.5); transition:width .3s ease; }
        .cv-dot-item.active .cv-dot-tick { width:42px; }
        .cv-dot-num { font-size:clamp(10px,.8vw,13px); font-weight:500; letter-spacing:2px; color:rgba(255,255,255,.5); }
      `}</style>

      <div className="cv">
        {/* FONDO */}
        <div className="cv-bg" />
        <div className="cv-noise" />
        <div className="cv-lines" />

        {/* SPOTLIGHT dinámico */}
        <div
          className="cv-spot"
          style={{ background: `radial-gradient(ellipse, rgba(${rgb},.35) 0%, transparent 70%)` }}
        />
        <div className="cv-vignette" />

        {/* FRANJA COLOR */}
        <div
          className="cv-stripe"
          style={{ background: `linear-gradient(to bottom,${color}aa,${color},${color}aa)` }}
        />

        {/* NÚMERO DECO */}
        <div className="cv-prod-num">0{indice + 1}</div>

        {/* LOGO */}
        <div className={`cv-logo ${mounted ? 'on' : ''}`}>
          <img src={logo} alt="Logo" />
        </div>

        {/* BADGE AMBIENTE */}
        <div className={`cv-ambiente ${mounted ? 'on' : ''}`}>
          <div className="cv-amb-dot" style={{ background: color }} />
          <span className="cv-amb-txt">{producto.ambiente}</span>
        </div>

        {/* LAYOUT */}
        <div className="cv-layout">
          {/* IZQUIERDA */}
          <div className="cv-left">
            <div
              className={`cv-eyebrow cv-static ${mounted ? 'on' : ''}`}
              style={{ transitionDelay: '.3s' }}
            >
              <div className="cv-ey-line" style={{ background: color }} />
              <span className="cv-ey-txt">Oferta Especial</span>
            </div>

            <div
              className={`cv-content ${fase === 'saliendo' ? 'out' : fase === 'entrando' ? 'in' : 'idle'}`}
            >
              <div className="cv-titulo">
                {producto.nombre}
                <span className="cv-titulo-dest" style={{ color }}>
                  {producto.nombreDestacado}
                </span>
              </div>

              <div className="cv-divider">
                <div
                  className="cv-div-line"
                  style={{ background: `linear-gradient(to right,${color},transparent)` }}
                />
                <span className="cv-div-txt">{producto.subtitulo}</span>
              </div>

              <p className="cv-desc">{producto.descripcion}</p>

              <div className="cv-price-wrap">
                <span className="cv-price-label">Precio oferta</span>
                <div className="cv-price-old">{producto.precioViejo}</div>
                <div className="cv-price-row">
                  <div
                    className="cv-price-new"
                    style={{ textShadow: `0 4px 30px rgba(${rgb},.25)` }}
                  >
                    {producto.precioNuevo}
                  </div>
                  <div
                    className="cv-off-pill"
                    style={{ background: `rgba(${rgb},.2)`, border: `1px solid rgba(${rgb},.3)` }}
                  >
                    <span className="cv-off-pct">{producto.descuento}%</span>
                    <span className="cv-off-lbl">OFF</span>
                  </div>
                </div>
                <div className="cv-cuotas">
                  Hasta <strong>{producto.cuotas} cuotas sin interés</strong>
                </div>
              </div>
            </div>

            <div
              className={`cv-features cv-static ${mounted ? 'on' : ''}`}
              style={{ transitionDelay: '1.5s' }}
            >
              <span className="cv-feat">✓ Envío gratis</span>
              <span className="cv-feat">★ Alta calidad</span>
              <span className="cv-feat">⏳ Stock limitado</span>
            </div>
          </div>

          {/* DERECHA */}
          <div className="cv-right">
            <div
              className="cv-img-glow"
              style={{ background: `radial-gradient(ellipse,rgba(${rgb},1) 0%,transparent 70%)` }}
            />
            <div className="cv-h-line" />
            <div className="cv-floor" />
            <div
              className={`cv-img-wrap ${fase === 'saliendo' ? 'out' : fase === 'entrando' ? 'in on' : mounted ? 'on' : ''}`}
            >
              <img
                className="cv-img"
                src={producto.imagen}
                alt={producto.nombreDestacado}
                style={{
                  filter: `drop-shadow(0 30px 60px rgba(0,0,0,.6)) drop-shadow(0 0 40px rgba(${rgb},.12))`,
                }}
              />
            </div>
          </div>
        </div>

        {/* BARRA PROGRESO LATERAL */}
        <div className="cv-side-progress">
          <div className="cv-side-bar" style={{ height: `${progreso}%`, background: color }} />
        </div>

        {/* DOTS */}
        <div className="cv-dots">
          {PRODUCTOS.map((p, i) => (
            <div
              key={i}
              className={`cv-dot-item ${i === indice ? 'active' : ''}`}
              onClick={() => ir(i)}
            >
              <div className="cv-dot-tick" style={i === indice ? { background: p.color } : {}} />
              <span className="cv-dot-num">0{i + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
