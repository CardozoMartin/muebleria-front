import React, { useEffect, useState } from 'react';
import logo from './../../assets/logo.png';
import comedor from './../../assets/comedor.png';
import fondorayos from './../../assets/fondorayos.png';

export default function CyberMonday({
  titulo = "Juego de Comedor",
  descripcion = "Mesa extensible con 6 sillas tapizadas en tela premium. Estructura de roble macizo, acabado laqueado mate.",
  imagenProducto = comedor,
  precioLista = 500000,
  precioOferta = 250000,
  porcentajeDescuento = 50,
  categoria = "Living & Comedor",
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setMounted(false), 0);
    const t2 = setTimeout(() => setMounted(true), 80);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [titulo, imagenProducto]);

  const formatPrecio = (n) =>
    n ? `$ ${Number(n).toLocaleString('es-AR')}` : null;

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Orbitron:wght@600;800;900&family=Bebas+Neue&family=Montserrat:wght@400;600;700;800;900&display=swap"
        rel="stylesheet"
      />
      <style>{`
        *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }

        .cm {
          width:100%; height:100%;
          position:relative; overflow:hidden;
          font-family:'Montserrat',sans-serif;
          background: linear-gradient(145deg, #07001a 0%, #0d0028 50%, #060016 100%);
        }

        /* â”€â”€ FONDO: grid animado â”€â”€ */
        .cm-grid {
          position:absolute; inset:0; z-index:0;
          background:
            linear-gradient(rgba(160,0,255,.18) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,210,255,.14) 1px, transparent 1px);
          background-size:55px 55px;
          animation: cmGrid 14s linear infinite;
        }
        @keyframes cmGrid {
          0%   { background-position: 0 0; }
          100% { background-position: 55px 55px; }
        }

        /* Glows de fondo */
        .cm-glow-left {
          position:absolute; left:-10%; top:20%;
          width:55%; height:70%; border-radius:50%;
          background: radial-gradient(circle, rgba(140,0,255,.22) 0%, transparent 65%);
          z-index:0; pointer-events:none;
          animation: cmGlowPulse 6s ease-in-out infinite;
        }
        .cm-glow-right {
          position:absolute; right:-8%; top:10%;
          width:45%; height:80%; border-radius:50%;
          background: radial-gradient(circle, rgba(0,200,255,.18) 0%, transparent 65%);
          z-index:0; pointer-events:none;
          animation: cmGlowPulse 8s ease-in-out infinite reverse;
        }
        @keyframes cmGlowPulse {
          0%,100% { opacity:.7; transform:scale(1); }
          50%      { opacity:1; transform:scale(1.1); }
        }

        /* Fondo rayos */
        .cm-fondo-rayos {
          position:absolute; inset:0; z-index:0;
          width:100%; height:100%; object-fit:cover;
          opacity:0.13; pointer-events:none;
          mix-blend-mode:screen;
        }

        /* Flash de entrada */
        .cm-flash {
          position:absolute; inset:0; z-index:30;
          background: rgba(180,0,255,.45);
          pointer-events:none;
          animation: cmFlash .55s ease forwards;
        }
        @keyframes cmFlash { from{opacity:1} to{opacity:0} }

        /* â”€â”€ BANNER SUPERIOR â”€â”€ */
        .cm-banner {
          position:absolute; top:0; left:0; right:0; z-index:8;
          padding: 14px 40px;
          background: linear-gradient(90deg,#7000ff 0%,#c400ff 40%,#00d4ff 100%);
          font-family:'Orbitron',sans-serif;
          font-size: clamp(22px,2.6vw,40px);
          letter-spacing:6px; color:#fff; text-align:center;
          box-shadow: 0 4px 30px rgba(180,0,255,.6), 0 0 80px rgba(0,200,255,.25);
          opacity:0; transform:translateY(-100%);
          transition: opacity .6s ease, transform .7s cubic-bezier(.22,1,.36,1);
        }
        .cm-banner.on { opacity:1; transform:translateY(0); }

        /* â”€â”€ LOGO â”€â”€ */
        .cm-logo {
          position:absolute; top:0; left:0;
          z-index:15;
          width:clamp(180px,20vw,280px); height:clamp(180px,20vw,280px);
          border-radius:0 0 24px 0; background:#fff;
          display:flex; align-items:center; justify-content:center;
          box-shadow: 0 0 0 3px #c400ff, 0 0 30px rgba(196,0,255,.8), 0 0 70px rgba(0,212,255,.35);
          opacity:0; transform:translateY(-30px) scale(.85);
          transition: opacity .7s ease .15s, transform .7s cubic-bezier(.34,1.56,.64,1) .15s;
        }
        .cm-logo.on { opacity:1; transform:translateY(0) scale(1); }
        .cm-logo img { width:82%; }

        /* â”€â”€ LAYOUT â”€â”€ */
        .cm-layout {
          position:absolute; inset:0; z-index:2;
          display:grid; grid-template-columns:50% 50%; height:100%;
        }

        /* Imagen */
        .cm-left {
          display:flex; align-items:center; justify-content:center;
          padding:clamp(60px,8vh,120px) clamp(10px,2vw,30px) clamp(20px,4vh,60px);
        }

        /* Recuadro neon derecha */
        .cm-box {
          border:2px solid rgba(196,0,255,.6);
          box-shadow:
            0 0 20px rgba(196,0,255,.5),
            0 0 50px rgba(0,200,255,.2),
            inset 0 0 20px rgba(196,0,255,.08);
          padding:clamp(20px,3vw,48px) clamp(20px,3vw,48px);
          border-radius:20px;
          backdrop-filter:blur(10px);
          background:rgba(10,0,30,.5);
          width:90%;
          display:flex; flex-direction:column; gap:clamp(10px,1.5vh,20px);
          opacity:0; transform:translateX(60px);
          transition: opacity .7s ease .2s, transform .8s cubic-bezier(.22,1,.36,1) .2s;
        }
        .cm-box.on { opacity:1; transform:translateX(0); }
        .cm-img-wrap {
          opacity:0; transform:scale(.7) translateX(-60px) rotate(-6deg);
          transition: opacity .9s ease .25s, transform 1.1s cubic-bezier(.34,1.52,.64,1) .25s;
          display:flex; flex-direction:column; align-items:center;
        }
        .cm-img-wrap.on { opacity:1; transform:scale(1) translateX(0) rotate(0); }
        .cm-img-inner {
          display:inline-block; will-change:transform,filter;
          /* Zoom continuo y sutil: independiente de la flotación del elemento interno */
          animation: cmImgZoom 5.5s ease-in-out infinite;
          filter: drop-shadow(0 8px 28px rgba(196,0,255,.45));
          border-radius:12px;
        }
        .cm-img {
          width:clamp(260px,42vw,700px); max-height:76vh; object-fit:contain;
          display:block; transform-origin:center;
          filter: drop-shadow(0 8px 28px rgba(196,0,255,.45));
          animation: cmFloat 4.5s ease-in-out infinite 1.5s;
        }
        @keyframes cmFloat {
          0%,100% { transform:translateY(0) rotate(0deg); }
          50%      { transform:translateY(-18px) rotate(1deg); }
        }

        /* Zoom independiente y sutil: escala ligeramente hacia adentro y hacia afuera */
        @keyframes cmImgZoom {
          0%   { transform:scale(0.98); filter: drop-shadow(0 8px 28px rgba(196,0,255,.45)); }
          50%  { transform:scale(1.04); filter: drop-shadow(0 14px 48px rgba(196,0,255,.65)); }
          100% { transform:scale(0.98); filter: drop-shadow(0 8px 28px rgba(196,0,255,.45)); }
        }

        /* Columna derecha */
        .cm-right {
          display:flex; flex-direction:column; align-items:center; justify-content:center;
          padding:clamp(50px,6vh,90px) clamp(16px,2vw,36px);
          gap:clamp(14px,2vh,28px);
        }

        /* CategorÃ­a */
        .cm-categoria {
          font-size:clamp(10px,.85vw,14px); letter-spacing:4px; text-transform:uppercase;
          color:#00d4ff; font-weight:700;
          opacity:0; transform:translateX(40px);
          transition: opacity .5s ease .3s, transform .6s cubic-bezier(.34,1.56,.64,1) .3s;
        }
        .cm-categoria.on { opacity:1; transform:translateX(0); }

        /* TÃ­tulo */
        .cm-titulo {
          font-family:'Orbitron',sans-serif;
          font-size:clamp(26px,3.2vw,52px); line-height:1.1;
          color:#fff;
          text-shadow:0 0 20px rgba(196,0,255,.8), 0 0 50px rgba(0,200,255,.4);
          opacity:0; transform:translateX(50px);
          transition: opacity .6s ease .45s, transform .7s cubic-bezier(.34,1.56,.64,1) .45s;
        }
        .cm-titulo.on { opacity:1; transform:translateX(0); }

        /* DescripciÃ³n */
        .cm-desc {
          font-size:clamp(16px,1.4vw,22px);
          color:rgba(200,180,255,.95); line-height:1.45; font-weight:800;
          opacity:0; transform:translateX(40px);
          transition: opacity .6s ease .6s, transform .6s cubic-bezier(.34,1.56,.64,1) .6s;
        }
        .cm-desc.on { opacity:1; transform:translateX(0); }

        /* â”€â”€ BLOQUE PRECIO â”€â”€ */
        .cm-price-block {
          display:flex; flex-direction:column; gap:6px;
          opacity:0; transform:translateY(30px) scale(.92);
          transition: opacity .7s ease .75s, transform .8s cubic-bezier(.34,1.8,.64,1) .75s;
        }
        .cm-price-block.on { opacity:1; transform:translateY(0) scale(1); }

        .cm-price-antes {
          font-size: clamp(28px, 4.2vw, 48px);
          color: rgba(200,160,255,.6);
          text-decoration: line-through; font-weight:600; letter-spacing:.5px;
          white-space: nowrap;
        }
        .cm-price-row { display:flex; align-items:center; gap:clamp(16px,2.5vw,50px); }
        .cm-price-nums { display:flex; flex-direction:column; gap:2px; min-width:0; }
        .cm-price-nuevo {
          font-family:'Bebas Neue',sans-serif;
          font-size:clamp(60px,9vw,130px); line-height:1;
          white-space:nowrap;
          background:linear-gradient(90deg,#c400ff 0%,#ff00cc 45%,#00d4ff 100%);
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
          filter:drop-shadow(0 4px 20px rgba(196,0,255,.55));
          animation:cmPricePulse 3s ease-in-out infinite 2s;
        }
        @keyframes cmPricePulse {
          0%,100% { filter:drop-shadow(0 4px 20px rgba(196,0,255,.55)); transform:scale(1); }
          50%      { filter:drop-shadow(0 6px 40px rgba(0,200,255,.9)); transform:scale(1.025); }
        }

        /* Badge OFF */
        .cm-off-badge {
          flex-shrink:0;
          display:flex; flex-direction:column; align-items:center; justify-content:center;
          width:clamp(100px,12vw,170px); height:clamp(100px,12vw,170px);
          border-radius:50%;
          background:radial-gradient(circle at 40% 35%, rgba(255,255,255,.25), transparent 60%),
                     radial-gradient(circle, #9b00ff, #ff00cc, #5500cc);
          border:2px solid rgba(255,255,255,.25);
          box-shadow:
            0 0 25px rgba(196,0,255,.8),
            0 0 60px rgba(196,0,255,.4),
            0 0 100px rgba(0,200,255,.2),
            inset 0 0 20px rgba(255,255,255,.1);
          animation:cmOffPulse 2.5s ease-in-out infinite 2.5s;
        }
        @keyframes cmOffPulse {
          0%,100% { transform:scale(1); }
          50%      { transform:scale(1.1); box-shadow:0 0 45px rgba(196,0,255,1),0 0 90px rgba(0,200,255,.6); }
        }
        .cm-off-pct {
          font-family:'Orbitron',sans-serif;
          font-size:clamp(34px,4.5vw,64px); line-height:1;
          color:#fff; font-weight:900; text-shadow:0 2px 8px rgba(0,0,0,.4);
        }
        .cm-off-lbl {
          font-size:clamp(11px,1vw,16px); letter-spacing:3px; font-weight:800;
          text-transform:uppercase; color:rgba(255,255,255,.85);
        }

        /* Cuotas */
        .cm-cuotas {
          font-size:clamp(13px,.95vw,17px); color:rgba(200,180,255,.7); font-weight:600;
          opacity:0; transform:translateX(30px);
          transition: opacity .5s ease 1.1s, transform .6s cubic-bezier(.34,1.56,.64,1) 1.1s;
        }
        .cm-cuotas.on { opacity:1; transform:translateX(0); }
        .cm-cuotas strong { color:#00d4ff; }

        /* WhatsApp */
        .cm-whatsapp {
          display:inline-flex; align-items:center; gap:14px;
          padding:16px 36px; border-radius:50px;
          background:rgba(0,255,120,.12); border:1.5px solid rgba(0,255,120,.35);
          color:rgba(180,255,210,.95); font-weight:800;
          font-size:clamp(20px,2vw,30px); width:fit-content;
          margin-top:clamp(20px,3vh,42px);
          opacity:0; transform:translateY(28px);
          transition: opacity .5s ease 1.3s, transform .6s cubic-bezier(.34,1.56,.64,1) 1.3s;
        }
        .cm-whatsapp.on { opacity:1; transform:translateY(0); }
        .cm-wa-icon { width:clamp(30px,2.6vw,44px); height:clamp(30px,2.6vw,44px); fill:rgba(0,255,120,.95); flex-shrink:0; }

        .cm-img-caption {
          margin-top:12px; font-family:'Orbitron',sans-serif;
          font-size:clamp(16px,2.4vw,32px); color:#fff; font-weight:800;
          letter-spacing:1.4px; text-transform:uppercase;
          text-shadow: 0 6px 24px rgba(196,0,255,.22), 0 0 8px rgba(0,212,255,.12);
          opacity:0.98; mix-blend-mode:screen;
          /* Animación propia e independiente del zoom de la imagen */
          animation: cmCaptionPulse 3.6s ease-in-out infinite 0.6s;
        }

        @keyframes cmCaptionPulse {
          0%   { transform:scale(1); text-shadow: 0 6px 24px rgba(196,0,255,.22), 0 0 8px rgba(0,212,255,.12); }
          50%  { transform:scale(1.06); text-shadow: 0 12px 44px rgba(196,0,255,.36), 0 0 18px rgba(0,212,255,.2); }
          100% { transform:scale(1); text-shadow: 0 6px 24px rgba(196,0,255,.22), 0 0 8px rgba(0,212,255,.12); }
        }

        /* Tags */
        .cm-tags {
          position:absolute; bottom:clamp(14px,2.5vh,30px); left:0; right:0; z-index:8;
          display:flex; justify-content:center; gap:12px; flex-wrap:wrap; padding:0 20px;
          opacity:0; transform:translateY(30px);
          transition: opacity .7s ease 1.5s, transform .7s cubic-bezier(.34,1.56,.64,1) 1.5s;
        }
        .cm-tags.on { opacity:1; transform:translateY(0); }
        .cm-tag {
          font-size:clamp(11px,.9vw,15px); font-weight:700;
          letter-spacing:1px; text-transform:uppercase; padding:9px 20px; border-radius:8px;
        }
        .cm-tag-cyber { background:rgba(110,0,255,.25); color:#d580ff; border:1.5px solid rgba(196,0,255,.45); box-shadow:0 0 12px rgba(196,0,255,.3); }
        .cm-tag-cyan  { background:rgba(0,180,255,.18); color:#7eeaff; border:1.5px solid rgba(0,200,255,.4); box-shadow:0 0 12px rgba(0,200,255,.25); }
        .cm-tag-green { background:rgba(0,200,100,.15); color:#6fffc0; border:1.5px solid rgba(0,200,100,.35); box-shadow:0 0 12px rgba(0,200,100,.2); }

      `}</style>

      <div className="cm">

        {mounted && <div className="cm-flash" />}

        <img className="cm-fondo-rayos" src={fondorayos} alt="" aria-hidden="true" />
        <div className="cm-grid" />
        <div className="cm-glow-left" />
        <div className="cm-glow-right" />

        {/* Banner */}
        <div className={`cm-banner ${mounted ? 'on' : ''}`}><span>CYBER MONDAY</span></div>

        {/* Logo */}
        <div className={`cm-logo ${mounted ? 'on' : ''}`}>
          <img src={logo} alt="logo" />
        </div>

        {/* Layout */}
        <div className="cm-layout">

          <div className="cm-left">
            <div className={`cm-img-wrap ${mounted ? 'on' : ''}`}>
              <div className={`cm-img-inner ${mounted ? 'on' : ''}`}>
                <img src={imagenProducto} alt={titulo} className="cm-img" />
              </div>
              <div className="cm-img-caption">Oportunidad única</div>
            </div>
          </div>

          <div className="cm-right">
            <div className={`cm-box ${mounted ? 'on' : ''}`}>

            <div className={`cm-categoria ${mounted ? 'on' : ''}`}>{categoria}</div>
            <div className={`cm-titulo ${mounted ? 'on' : ''}`}>{titulo}</div>
            <p className={`cm-desc ${mounted ? 'on' : ''}`}>{descripcion}</p>

            <div className={`cm-price-block ${mounted ? 'on' : ''}`}>
              {formatPrecio(precioLista) && (
                <div className="cm-price-antes">Antes: {formatPrecio(precioLista)}</div>
              )}
              <div className="cm-price-row">
                <div className="cm-price-nums">
                  <div className="cm-price-nuevo">{formatPrecio(precioOferta)}</div>
                </div>
                {porcentajeDescuento > 0 && (
                  <div className="cm-off-badge">
                    <span className="cm-off-pct">{porcentajeDescuento}%</span>
                    <span className="cm-off-lbl">OFF</span>
                  </div>
                )}
              </div>
            </div>

            <div className={`cm-cuotas ${mounted ? 'on' : ''}`}>
              Hasta <strong>12 cuotas sin interés</strong>
            </div>

            </div>{/* /cm-box */}

            <div className={`cm-whatsapp ${mounted ? 'on' : ''}`}>
              <svg className="cm-wa-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <span>381 2108473</span>
            </div>

          </div>
        </div>

        {/* Tags fijos abajo */}
        <div className={`cm-tags ${mounted ? 'on' : ''}`}>
          <span className="cm-tag cm-tag-cyber">âš¡ Cyber Monday</span>
          <span className="cm-tag cm-tag-cyan">ðŸ› Ofertas digitales</span>
          <span className="cm-tag cm-tag-green">âœ“ EnvÃ­o gratis</span>
        </div>

      </div>
    </>
  );
}
