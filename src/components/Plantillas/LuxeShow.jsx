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
    descuento: '33% OFF',
    cuotas: '12 cuotas sin interés',
    imagen: comedor,
    tag: 'Colección Roble',
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
    descuento: '31% OFF',
    cuotas: '6 cuotas sin interés',
    imagen: juego4,
    tag: 'Colección Nogal',
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
    descuento: '33% OFF',
    cuotas: '18 cuotas sin interés',
    imagen: redondo,
    tag: 'Colección Vintage',
  },
];

const DURACION = 6000;

export default function LuxeShow() {
  const [mounted, setMounted] = useState(false);
  const [indice, setIndice] = useState(0);
  const [fase, setFase] = useState('idle');
  const [progreso, setProgreso] = useState(0);
  const [curtain, setCurtain] = useState(false);
  const intervaloRef = useRef(null);
  const progressRef = useRef(null);

  const producto = PRODUCTOS[indice];

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 200);
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
    setCurtain(true);
    setTimeout(() => {
      setFase('saliendo');
      setTimeout(() => {
        setIndice(getNext);
        setFase('entrando');
        setTimeout(() => {
          setFase('idle');
          setCurtain(false);
        }, 800);
      }, 350);
    }, 280);
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
        href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Jost:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />
      <style>{`
        *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }

        .ls { width:100vw; height:100vh; position:relative; overflow:hidden; font-family:'Jost',sans-serif; background:#f5f0e8; }

        .ls-bg {
          position:absolute; inset:0; z-index:0;
          background:
            radial-gradient(ellipse 120% 80% at 100% 100%, #e8dcc8 0%, transparent 55%),
            radial-gradient(ellipse 80% 60% at 0% 0%, #efe8d8 0%, transparent 50%),
            #f5f0e8;
        }
        .ls-wood {
          position:absolute; inset:0; z-index:0; opacity:.4;
          background-image: repeating-linear-gradient(168deg,
            transparent 0px, transparent 18px,
            rgba(180,140,90,.06) 18px, rgba(180,140,90,.06) 19px,
            transparent 19px, transparent 38px,
            rgba(160,120,70,.04) 38px, rgba(160,120,70,.04) 39px);
        }
        .ls-panel { position:absolute; top:0; left:0; bottom:0; width:7px; background:linear-gradient(to bottom,#5c3d1e,#8b5e2f,#5c3d1e); z-index:2; }
        .ls-band { position:absolute; top:-10%; right:44%; width:2px; height:130%; background:linear-gradient(to bottom,transparent,rgba(140,90,40,.15) 30%,rgba(140,90,40,.15) 70%,transparent); transform:rotate(12deg); z-index:1; }
        .ls-band-2 { position:absolute; top:-10%; right:42%; width:1px; height:130%; background:linear-gradient(to bottom,transparent,rgba(140,90,40,.07) 30%,rgba(140,90,40,.07) 70%,transparent); transform:rotate(12deg); z-index:1; }

        .ls-curtain { position:absolute; inset:0; z-index:30; pointer-events:none; }
        .ls-curtain-fill { position:absolute; inset:0; background:#2a1a0a; transform:scaleY(0); transform-origin:top; transition:transform 0.32s cubic-bezier(.77,0,.18,1); }
        .ls-curtain.active .ls-curtain-fill { transform:scaleY(1); }

        .ls-logo { position:absolute; top:5vh; left:6vw; z-index:10; opacity:0; transform:translateY(-12px); transition:opacity .8s ease .4s,transform .8s ease .4s; }
        .ls-logo.on { opacity:1; transform:translateY(0); }
        .ls-logo img { height:clamp(36px,4.5vh,68px); width:auto; }

        .ls-num { position:absolute; top:50%; right:5vw; transform:translateY(-50%); z-index:2; font-family:'Libre Baskerville',serif; font-size:clamp(120px,18vw,260px); font-weight:700; color:transparent; -webkit-text-stroke:1.5px rgba(100,65,30,.09); line-height:1; pointer-events:none; letter-spacing:-8px; }

        .ls-layout { position:absolute; inset:0; z-index:5; display:grid; grid-template-columns:52% 1fr; }

        .ls-left { display:flex; flex-direction:column; justify-content:center; padding:8vh 4vw 8vh 7vw; gap:2.2vh; }

        .ls-tag { display:inline-flex; align-items:center; gap:10px; width:fit-content; opacity:0; transform:translateX(-16px); transition:opacity .6s ease,transform .6s ease; }
        .ls-tag.on { opacity:1; transform:translateX(0); }
        .ls-tag-dash { width:28px; height:1.5px; background:#8b5e2f; }
        .ls-tag-txt { font-size:clamp(10px,.85vw,14px); font-weight:500; letter-spacing:4px; text-transform:uppercase; color:#8b5e2f; }

        .ls-titulo { font-family:'Libre Baskerville',serif; font-size:clamp(36px,5.2vw,86px); line-height:.92; letter-spacing:-1px; color:#1a0f05; }
        .ls-titulo-dest { display:block; font-style:italic; color:#6b3d10; }

        .ls-sub { display:flex; align-items:center; gap:14px; }
        .ls-sub::before { content:''; display:block; width:36px; height:1px; background:rgba(100,60,20,.3); flex-shrink:0; }
        .ls-sub-txt { font-size:clamp(11px,.95vw,16px); font-weight:400; letter-spacing:2px; text-transform:uppercase; color:rgba(60,35,10,.45); }

        .ls-desc { font-size:clamp(13px,1.15vw,19px); color:rgba(30,18,5,.55); line-height:1.75; font-weight:300; max-width:460px; }

        .ls-orn { display:flex; align-items:center; gap:12px; }
        .ls-orn-line { flex:1; max-width:80px; height:1px; background:rgba(100,60,20,.25); }
        .ls-orn-leaf { font-size:14px; opacity:.4; color:#5c3d1e; }

        .ls-price-area { display:flex; align-items:flex-end; gap:2vw; }
        .ls-price-old { font-size:clamp(13px,1.1vw,19px); color:rgba(30,18,5,.3); text-decoration:line-through; font-weight:500; letter-spacing:1px; margin-bottom:2px; }
        .ls-price-new { font-family:'Libre Baskerville',serif; font-size:clamp(46px,6.5vw,100px); font-weight:700; color:#2a1a0a; line-height:1; letter-spacing:-2px; }
        .ls-price-cuotas { font-size:clamp(12px,.95vw,16px); color:rgba(30,18,5,.45); font-weight:400; margin-top:6px; letter-spacing:.5px; }
        .ls-price-cuotas strong { color:#5c3d1e; font-weight:600; }

        .ls-off { display:flex; flex-direction:column; align-items:center; justify-content:center; background:#2a1a0a; color:#f5e8c8; padding:12px 18px; margin-bottom:12px; min-width:80px; gap:2px; }
        .ls-off-pct { font-family:'Libre Baskerville',serif; font-size:clamp(24px,2.8vw,42px); font-weight:700; line-height:1; color:#e8c870; }
        .ls-off-label { font-size:clamp(9px,.7vw,12px); letter-spacing:4px; font-weight:500; text-transform:uppercase; color:rgba(245,232,200,.5); }

        .ls-chips { display:flex; gap:10px; flex-wrap:wrap; }
        .ls-chip { font-size:clamp(10px,.8vw,13px); font-weight:500; letter-spacing:1.5px; text-transform:uppercase; padding:7px 16px; border:1px solid rgba(100,60,20,.25); color:rgba(30,18,5,.5); background:rgba(255,255,255,.4); }

        .ls-right { position:relative; display:flex; align-items:center; justify-content:center; overflow:hidden; }
        .ls-circle-bg { position:absolute; width:75%; height:75%; border-radius:50%; background:radial-gradient(ellipse,rgba(220,180,110,.18) 0%,transparent 70%); pointer-events:none; }
        .ls-corner { position:absolute; z-index:2; pointer-events:none; width:36px; height:36px; border-color:rgba(100,60,20,.3); border-style:solid; }
        .ls-corner.tl { top:6vh; left:2vw; border-width:2px 0 0 2px; }
        .ls-corner.tr { top:6vh; right:4vw; border-width:2px 2px 0 0; }
        .ls-corner.bl { bottom:6vh; left:2vw; border-width:0 0 2px 2px; }
        .ls-corner.br { bottom:6vh; right:4vw; border-width:0 2px 2px 0; }
        .ls-shadow { position:absolute; bottom:14%; left:50%; transform:translateX(-50%); width:55%; height:4%; background:radial-gradient(ellipse,rgba(80,45,10,.2) 0%,transparent 70%); pointer-events:none; z-index:2; }

        .ls-img-wrap { position:relative; z-index:3; opacity:0; transform:translateY(24px) scale(.94); transition:opacity 1s ease .5s,transform 1s cubic-bezier(.34,1.4,.64,1) .5s; }
        .ls-img-wrap.on { opacity:1; transform:translateY(0) scale(1); }
        .ls-img-wrap.out { opacity:0!important; transform:translateY(20px) scale(.92)!important; transition:opacity .3s ease,transform .3s ease!important; }
        .ls-img-wrap.in { opacity:0; transform:translateY(-20px) scale(.92)!important; transition:opacity .5s ease .1s,transform .7s cubic-bezier(.34,1.4,.64,1) .1s!important; }
        .ls-img { max-height:62vh; max-width:36vw; object-fit:contain; filter:drop-shadow(0 24px 48px rgba(60,30,5,.25)); animation:lsFloat 7s ease-in-out infinite; }
        @keyframes lsFloat { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-10px);} }

        .ls-content { transition:opacity .3s ease,transform .3s ease; display:flex; flex-direction:column; gap:2.2vh; }
        .ls-content.out { opacity:0; transform:translateX(-28px); }
        .ls-content.in { opacity:0; transform:translateX(28px); transition:opacity .5s ease .12s,transform .6s cubic-bezier(.22,1,.36,1) .12s; }
        .ls-content.idle { opacity:1; transform:translateX(0); }

        .ls-static { opacity:0; transform:translateY(12px); transition:opacity .7s ease,transform .7s ease; }
        .ls-static.on { opacity:1; transform:translateY(0); }

        .ls-dots { position:absolute; bottom:5.5vh; left:50%; transform:translateX(-50%); z-index:10; display:flex; gap:12px; align-items:center; }
        .ls-dot { width:8px; height:8px; border-radius:50%; border:1.5px solid rgba(100,60,20,.4); background:transparent; cursor:pointer; transition:background .3s,transform .3s,border-color .3s; }
        .ls-dot.active { background:#5c3d1e; border-color:#5c3d1e; transform:scale(1.35); }

        .ls-progress { position:absolute; bottom:0; left:0; right:0; z-index:6; height:3px; background:rgba(100,60,20,.1); }
        .ls-progress-bar { height:100%; background:linear-gradient(to right,#5c3d1e,#c8943a); transition:none; }
      `}</style>

      <div className="ls">
        <div className="ls-bg" />
        <div className="ls-wood" />
        <div className="ls-panel" />
        <div className="ls-band" />
        <div className="ls-band-2" />
        <div className="ls-num">0{indice + 1}</div>

        <div className={`ls-curtain ${curtain ? 'active' : ''}`}>
          <div className="ls-curtain-fill" />
        </div>

        <div className={`ls-logo ${mounted ? 'on' : ''}`}>
          <img src={logo} alt="Logo" />
        </div>

        <div className="ls-layout">
          <div className="ls-left">
            <div
              className={`ls-tag ls-static ${mounted ? 'on' : ''}`}
              style={{ transitionDelay: '.3s' }}
            >
              <div className="ls-tag-dash" />
              <span className="ls-tag-txt">Oferta Especial</span>
            </div>

            <div
              className={`ls-content ${fase === 'saliendo' ? 'out' : fase === 'entrando' ? 'in' : 'idle'}`}
            >
              <div className="ls-titulo">
                {producto.nombre}
                <span className="ls-titulo-dest">{producto.nombreDestacado}</span>
              </div>
              <div className="ls-sub">
                <span className="ls-sub-txt">{producto.subtitulo}</span>
              </div>
              <p className="ls-desc">{producto.descripcion}</p>
              <div className="ls-orn">
                <div className="ls-orn-line" />
                <span className="ls-orn-leaf">✦</span>
                <div className="ls-orn-line" style={{ maxWidth: '40px' }} />
              </div>
              <div className="ls-price-area">
                <div>
                  <div className="ls-price-old">{producto.precioViejo}</div>
                  <div className="ls-price-new">{producto.precioNuevo}</div>
                  <div className="ls-price-cuotas">
                    Hasta <strong>{producto.cuotas}</strong>
                  </div>
                </div>
                <div className="ls-off">
                  <span className="ls-off-pct">{producto.descuento.replace(' OFF', '')}</span>
                  <span className="ls-off-label">OFF</span>
                </div>
              </div>
            </div>

            <div
              className={`ls-chips ls-static ${mounted ? 'on' : ''}`}
              style={{ transitionDelay: '1.4s' }}
            >
              <span className="ls-chip">✓ Envío gratis</span>
              <span className="ls-chip">⏳ Oferta limitada</span>
              <span className="ls-chip">★ {producto.tag}</span>
            </div>
          </div>

          <div className="ls-right">
            {['tl', 'tr', 'bl', 'br'].map((pos) => (
              <div key={pos} className={`ls-corner ${pos}`} />
            ))}
            <div className="ls-circle-bg" />
            <div className="ls-shadow" />
            <div
              className={`ls-img-wrap ${fase === 'saliendo' ? 'out' : fase === 'entrando' ? 'in on' : mounted ? 'on' : ''}`}
            >
              <img className="ls-img" src={producto.imagen} alt={producto.nombreDestacado} />
            </div>
          </div>
        </div>

        <div className="ls-dots">
          {PRODUCTOS.map((_, i) => (
            <div
              key={i}
              className={`ls-dot ${i === indice ? 'active' : ''}`}
              onClick={() => ir(i)}
            />
          ))}
        </div>
        <div className="ls-progress">
          <div className="ls-progress-bar" style={{ width: `${progreso}%` }} />
        </div>
      </div>
    </>
  );
}
