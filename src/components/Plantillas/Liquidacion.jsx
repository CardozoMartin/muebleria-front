import React, { useEffect, useState } from 'react';
import logo from './../../assets/logo.png';
import comedor from './../../assets/comedor.png';
import fondoliquidacion from './../../assets/fondoliquidacion.png';


export default function Liquidacion({
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
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Bebas+Neue&family=Nunito:wght@400;600;700;800;900&display=swap"
        rel="stylesheet"
      />
      <style>{`
        *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }

        .lq {
          width:100%; height:100%;
          position:relative; overflow:hidden;
          font-family:'Nunito',sans-serif;
          background: linear-gradient(155deg, #fff7e0 0%, #fff3cc 40%, #ffe8a0 100%);
        }

        /* ── Fondo: ondas / círculos solares ── */
        .lq-sun-bg {
          position:absolute; right:-18%; top:-22%;
          width:72%; height:72%;
          border-radius:50%;
          background: radial-gradient(circle at 40% 40%,
            rgba(255,210,0,.55) 0%,
            rgba(255,160,0,.28) 40%,
            transparent 70%);
          z-index:0; pointer-events:none;
          animation: lqSunSpin 18s linear infinite;
        }
        .lq-sun-ring {
          position:absolute; right:-22%; top:-26%;
          width:80%; height:80%;
          border-radius:50%;
          border: 3px solid rgba(255,180,0,.22);
          z-index:0; pointer-events:none;
          animation: lqSunSpin 28s linear infinite reverse;
        }
        .lq-sun-ring2 {
          position:absolute; right:-26%; top:-30%;
          width:90%; height:90%;
          border-radius:50%;
          border: 1.5px dashed rgba(255,140,0,.18);
          z-index:0; pointer-events:none;
          animation: lqSunSpin 40s linear infinite;
        }
        @keyframes lqSunSpin {
          from { transform:rotate(0deg); }
          to   { transform:rotate(360deg); }
        }

        /* Rayos de sol (líneas diagonales) */
        .lq-rays {
          position:absolute; inset:0; z-index:0; pointer-events:none;
          background: repeating-linear-gradient(
            -55deg,
            transparent,
            transparent 60px,
            rgba(255,200,50,.07) 60px,
            rgba(255,200,50,.07) 90px
          );
          animation: lqRaysShift 8s ease-in-out infinite alternate;
        }
        .lq-bg-img {
          position: absolute; inset: 0; z-index: 0;
          width: 100%; height: 100%; object-fit: cover; pointer-events: none;
          opacity: 0.18; filter: brightness(0.95) saturate(0.95);
        }
        @keyframes lqRaysShift {
          from { background-position: 0 0; }
          to   { background-position: 90px 0; }
        }

        /* Ondas decorativas abajo */
        .lq-wave {
          position:absolute; top:0; left:0; right:0; z-index:8;
          padding: 18px 40px;
          background: linear-gradient(90deg, #ff8c00 0%, #ffcc00 50%, #ff6b00 100%);
          font-family:'Bebas Neue',sans-serif;
          font-size: clamp(30px,4vw,72px);
          letter-spacing:6px; color:#fff; text-align:center;
          font-weight:900;
          text-shadow: 0 4px 14px rgba(180,60,0,.45);
          box-shadow: 0 6px 40px rgba(255,140,0,.6), 0 0 100px rgba(255,200,0,.3);
          opacity:0; transform:translateY(-100%);
          transition: opacity .6s ease, transform .7s cubic-bezier(.22,1,.36,1);
          animation: lqFlash .6s ease forwards;
        }
        @keyframes lqFlash { from{opacity:1} to{opacity:0} }

        /* ── BANNER SUPERIOR ── */
        .lq-banner {
          position:absolute; top:0; left:0; right:0; z-index:8;
          padding: 14px 40px;
          background: linear-gradient(90deg, #ff8c00 0%, #ffcc00 50%, #ff6b00 100%);
          font-family:'Bebas Neue',sans-serif;
          font-size: clamp(40px,2.6vw,40px);
          letter-spacing:8px; color:#fff; text-align:center;
          text-shadow: 0 2px 6px rgba(180,60,0,.4);
          box-shadow: 0 4px 30px rgba(255,140,0,.55), 0 0 80px rgba(255,200,0,.25);
          opacity:0; transform:translateY(-100%);
          transition: opacity .6s ease, transform .7s cubic-bezier(.22,1,.36,1);
        }
        .lq-banner.on { opacity:1; transform:translateY(0); }

        /* ── LOGO ── */
        .lq-logo {
          position:absolute; top:0; right:0; left:auto;
          z-index:15;
          width:clamp(180px,20vw,280px); height:clamp(180px,20vw,280px);
          border-radius:0 0 0 24px;
          background:#fff;
          display:flex; align-items:center; justify-content:center;
          box-shadow: 0 0 0 3px #ff8c00, 0 0 30px rgba(255,140,0,.6), 0 0 70px rgba(255,200,0,.3);
          opacity:0; transform:scale(.7) rotate(8deg);
          transition: opacity .6s ease .1s, transform .8s cubic-bezier(.34,1.6,.64,1) .1s;
        }
        .lq-logo.on { opacity:1; transform:scale(1) rotate(0deg); }
        .lq-logo img { width:82%; }

        /* ── LAYOUT ── */
        .lq-layout {
          position:absolute; inset:0; z-index:2;
          display:grid; grid-template-columns:50% 50%; height:100%;
        }

        /* Imagen */
        .lq-left {
          display:flex; align-items:center; justify-content:center;
          padding:clamp(60px,8vh,120px) clamp(10px,2vw,30px) clamp(20px,4vh,60px);
        }

        .lq-img-wrap {
          display:flex; flex-direction:column; align-items:center;
          opacity:0; transform:translateY(80px) scale(.8);
          transition: opacity .9s ease .2s, transform 1s cubic-bezier(.34,1.45,.64,1) .2s;
        }
        .lq-img-wrap.on { opacity:1; transform:translateY(0) scale(1); }

        .lq-img-inner {
          display:inline-block; will-change:transform,filter;
          animation: lqImgZoom 5.5s ease-in-out infinite;
          filter: drop-shadow(0 12px 32px rgba(255,140,0,.4));
          border-radius:12px;
        }
        .lq-img {
          width:clamp(260px,42vw,700px); max-height:76vh; object-fit:contain;
          display:block; transform-origin:center;
          filter: drop-shadow(0 12px 32px rgba(255,140,0,.4));
          animation: lqFloat 4.5s ease-in-out infinite 1.5s;
        }
        @keyframes lqFloat {
          0%,100% { transform:translateY(0) rotate(0deg); }
          50%      { transform:translateY(-16px) rotate(-1deg); }
        }
        @keyframes lqImgZoom {
          0%   { transform:scale(0.97); filter:drop-shadow(0 12px 32px rgba(255,140,0,.4)); }
          50%  { transform:scale(1.04); filter:drop-shadow(0 20px 55px rgba(255,180,0,.65)); }
          100% { transform:scale(0.97); filter:drop-shadow(0 12px 32px rgba(255,140,0,.4)); }
        }

        .lq-img-caption {
          margin-top:14px; font-family:'Bebas Neue',sans-serif;
          font-size:clamp(24px,4vw,48px); color:#ff6b00; font-weight:600;
          letter-spacing:3px; text-transform:uppercase;
          text-shadow: 0 4px 14px rgba(255,140,0,.28);
          animation: lqCaptionPulse 3.2s ease-in-out infinite 0.8s;
        }
        @keyframes lqCaptionPulse {
          0%,100% { transform:scale(1); opacity:.9; }
          50%      { transform:scale(1.07); opacity:1; }
        }

        /* Columna derecha */
        .lq-right {
          display:flex; flex-direction:column; align-items:center; justify-content:center;
          padding:clamp(50px,6vh,90px) clamp(16px,2vw,36px);
          gap:clamp(14px,2vh,28px);
        }

        /* Recuadro derecha */
        .lq-box {
          border:2px solid rgba(255,160,0,.5);
          box-shadow:
            0 0 24px rgba(255,160,0,.35),
            0 0 60px rgba(255,200,0,.15),
            inset 0 0 24px rgba(255,200,0,.07);
          padding:clamp(20px,3vw,48px) clamp(20px,3vw,48px);
          border-radius:20px;
          backdrop-filter:blur(8px);
          background:rgba(255,255,255,.6);
          width:90%;
          display:flex; flex-direction:column; gap:clamp(10px,1.5vh,20px);
          opacity:0; transform:translateX(70px) rotate(2deg);
          transition: opacity .7s ease .2s, transform .85s cubic-bezier(.22,1,.36,1) .2s;
        }
        .lq-box.on { opacity:1; transform:translateX(0) rotate(0deg); }

        /* Categoría */
        .lq-categoria {
          font-size:clamp(10px,.85vw,14px); letter-spacing:4px; text-transform:uppercase;
          color:#ff6b00; font-weight:800;
          opacity:0; transform:translateY(-20px);
          transition: opacity .5s ease .35s, transform .6s cubic-bezier(.34,1.56,.64,1) .35s;
        }
        .lq-categoria.on { opacity:1; transform:translateY(0); }

        /* Título */
        .lq-titulo {
          font-family:'Playfair Display',serif;
          font-size:clamp(36px,5.2vw,72px); line-height:1.02;
          color:#2a1600;
          text-shadow:0 4px 20px rgba(255,160,0,.38);
          opacity:0; transform:translateY(-18px);
          transition: opacity .6s ease .5s, transform .7s cubic-bezier(.34,1.56,.64,1) .5s;
        }
        .lq-titulo.on { opacity:1; transform:translateY(0); }

        /* Descripción */
        .lq-desc {
          font-size:clamp(16px,1.4vw,22px);
          color:rgba(80,40,0,.85); line-height:1.45; font-weight:700;
          opacity:0; transform:translateY(-18px);
          transition: opacity .6s ease .65s, transform .6s cubic-bezier(.34,1.56,.64,1) .65s;
        }
        .lq-desc.on { opacity:1; transform:translateY(0); }

        /* ── BLOQUE PRECIO ── */
        .lq-price-block {
          display:flex; flex-direction:column; gap:6px;
          opacity:0; transform:scale(.7) rotate(-4deg);
          transition: opacity .7s ease .8s, transform .85s cubic-bezier(.34,1.8,.64,1) .8s;
        }
        .lq-price-block.on { opacity:1; transform:scale(1) rotate(0deg); }

        .lq-price-antes {
          font-size: clamp(28px, 4.2vw, 48px);
          color: rgba(160,100,0,.5);
          text-decoration: line-through; font-weight:600; letter-spacing:.5px;
          white-space: nowrap;
        }
        .lq-price-row { display:flex; align-items:center; gap:clamp(16px,2.5vw,50px); }
        .lq-price-nums { display:flex; flex-direction:column; gap:2px; min-width:0; }
        .lq-price-nuevo {
          font-family:'Bebas Neue',sans-serif;
          font-size:clamp(60px,9vw,130px); line-height:1;
          white-space:nowrap;
          background:linear-gradient(90deg, #ff4500 0%, #ff8c00 45%, #ffcc00 100%);
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
          filter:drop-shadow(0 4px 16px rgba(255,120,0,.45));
          animation:lqPricePulse 3s ease-in-out infinite 2s;
        }
        @keyframes lqPricePulse {
          0%,100% { filter:drop-shadow(0 4px 16px rgba(255,120,0,.45)); transform:scale(1); }
          50%      { filter:drop-shadow(0 8px 36px rgba(255,200,0,.8)); transform:scale(1.025); }
        }

        /* Badge OFF */
        .lq-off-badge {
          flex-shrink:0;
          display:flex; flex-direction:column; align-items:center; justify-content:center;
          width:clamp(100px,12vw,170px); height:clamp(100px,12vw,170px);
          border-radius:50%;
          background:radial-gradient(circle at 38% 32%, rgba(255,255,255,.35), transparent 55%),
                     radial-gradient(circle, #ff8c00, #ffcc00, #ff4500);
          border:2px solid rgba(255,255,255,.4);
          box-shadow:
            0 0 25px rgba(255,140,0,.75),
            0 0 60px rgba(255,200,0,.4),
            0 0 100px rgba(255,100,0,.2),
            inset 0 0 20px rgba(255,255,255,.15);
          animation:lqOffPulse 2.5s ease-in-out infinite 2.5s;
        }
        @keyframes lqOffPulse {
          0%,100% { transform:scale(1) rotate(0deg); }
          40%      { transform:scale(1.1) rotate(-3deg); box-shadow:0 0 45px rgba(255,180,0,1),0 0 90px rgba(255,220,0,.6); }
          60%      { transform:scale(1.08) rotate(2deg); }
        }
        .lq-off-pct {
          font-family:'Bebas Neue',sans-serif;
          font-size:clamp(34px,4.5vw,64px); line-height:1;
          color:#fff; font-weight:400; text-shadow:0 2px 8px rgba(120,40,0,.4);
        }
        .lq-off-lbl {
          font-size:clamp(11px,1vw,16px); letter-spacing:3px; font-weight:800;
          text-transform:uppercase; color:rgba(255,255,255,.9);
        }

        /* Cuotas */
        .lq-cuotas {
          font-size:clamp(13px,.95vw,17px); color:rgba(120,60,0,.7); font-weight:600;
          opacity:0; transform:translateY(16px);
          transition: opacity .5s ease 1.1s, transform .6s cubic-bezier(.34,1.56,.64,1) 1.1s;
        }
        .lq-cuotas.on { opacity:1; transform:translateY(0); }
        .lq-cuotas strong { color:#ff6b00; }

        /* WhatsApp */
        .lq-whatsapp {
          display:inline-flex; align-items:center; gap:16px;
          padding:18px 40px; border-radius:50px;
          background:rgba(0,200,80,.12); border:1.5px solid rgba(0,200,80,.35);
          color:rgba(0,120,50,.95); font-weight:900;
          font-size:clamp(22px,2.2vw,34px); width:fit-content; align-self:center;
          margin-top:clamp(20px,3vh,42px);
          opacity:0; transform:scale(.7) translateY(30px);
          transition: opacity .5s ease 1.3s, transform .7s cubic-bezier(.34,1.6,.64,1) 1.3s;
        }
        .lq-whatsapp.on { opacity:1; transform:scale(1) translateY(0); }
        .lq-wa-icon { width:clamp(30px,2.6vw,44px); height:clamp(30px,2.6vw,44px); fill:rgba(0,180,80,.95); flex-shrink:0; }

        /* Tags */
        .lq-tags {
          position:absolute; bottom:clamp(14px,2.5vh,30px); left:0; right:0; z-index:8;
          display:flex; justify-content:center; gap:12px; flex-wrap:wrap; padding:0 20px;
          opacity:0; transform:translateY(40px);
          transition: opacity .7s ease 1.5s, transform .8s cubic-bezier(.34,1.56,.64,1) 1.5s;
        }
        .lq-tags.on { opacity:1; transform:translateY(0); }
        .lq-tag {
          font-size:clamp(13px,1.05vw,18px); font-weight:900;
          letter-spacing:1px; text-transform:uppercase; padding:10px 22px; border-radius:10px;
        }
        .lq-tag-fire { background:rgba(255,100,0,.15); color:#cc3d00; border:1.5px solid rgba(255,120,0,.4); box-shadow:0 0 12px rgba(255,120,0,.25); }
        .lq-tag-sun  { background:rgba(255,200,0,.2); color:#995500; border:1.5px solid rgba(255,180,0,.45); box-shadow:0 0 12px rgba(255,200,0,.3); }
        .lq-tag-green { background:rgba(0,200,80,.12); color:#007730; border:1.5px solid rgba(0,200,80,.3); box-shadow:0 0 12px rgba(0,200,80,.18); }

        /* Etiqueta diagonal "LIQUIDACIÓN" */
        .lq-stamp {
          position:absolute; top:clamp(85px,10vw,140px); left:-8px; z-index:10;
          background: linear-gradient(90deg, #ff4500, #ff8c00);
          color:#fff; font-family:'Bebas Neue',sans-serif;
          font-size:clamp(14px,1.4vw,22px); letter-spacing:4px;
          padding:8px 32px 8px 20px; border-radius:0 6px 6px 0;
          box-shadow: 3px 3px 16px rgba(255,100,0,.45);
          opacity:0; transform:translateX(-100%);
          transition: opacity .5s ease .9s, transform .7s cubic-bezier(.34,1.4,.64,1) .9s;
        }
        .lq-stamp.on { opacity:1; transform:translateX(0); }
        .lq-stamp::after {
          content:'';
          position:absolute; right:-10px; top:0; bottom:0;
          border-left:10px solid #ff8c00;
          border-top:50% solid transparent;
          border-bottom:50% solid transparent;
        }
      `}</style>

      <div className="lq">

        {mounted && <div className="lq-flash" />}

        {/* Fondos decorativos */}
        <div className="lq-sun-bg" />
        <div className="lq-sun-ring" />
        <div className="lq-sun-ring2" />
        <div className="lq-rays" />
        <img className="lq-bg-img" src={fondoliquidacion} alt="" aria-hidden="true" />

        {/* Onda inferior */}
        <div className="lq-wave">
          <svg viewBox="0 0 1440 180" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,90 C240,160 480,20 720,90 C960,160 1200,20 1440,90 L1440,180 L0,180 Z" fill="rgba(255,160,0,.13)" />
            <path d="M0,120 C360,60 720,170 1080,100 C1260,70 1380,130 1440,120 L1440,180 L0,180 Z" fill="rgba(255,200,0,.10)" />
          </svg>
        </div>

        {/* Banner */}
        <div className={`lq-banner ${mounted ? 'on' : ''}`}><span>LIQUIDACIÓN TOTAL</span></div>

        {/* Logo */}
        <div className={`lq-logo ${mounted ? 'on' : ''}`}>
          <img src={logo} alt="logo" />
        </div>

        {/* Etiqueta lateral: ahora muestra la categoría */}
        <div className={`lq-stamp ${mounted ? 'on' : ''}`}>{categoria}</div>

        {/* Layout */}
        <div className="lq-layout">

          <div className="lq-right">
            <div className={`lq-box ${mounted ? 'on' : ''}`}>

              {/* categoria moved to stamp on the right */}
              <div className={`lq-titulo ${mounted ? 'on' : ''}`}>{titulo}</div>
              <p className={`lq-desc ${mounted ? 'on' : ''}`}>{descripcion}</p>

              <div className={`lq-price-block ${mounted ? 'on' : ''}`}>
                {formatPrecio(precioLista) && (
                  <div className="lq-price-antes">Antes: {formatPrecio(precioLista)}</div>
                )}
                <div className="lq-price-row">
                  <div className="lq-price-nums">
                    <div className="lq-price-nuevo">{formatPrecio(precioOferta)}</div>
                  </div>
                  {porcentajeDescuento > 0 && (
                    <div className="lq-off-badge">
                      <span className="lq-off-pct">{porcentajeDescuento}%</span>
                      <span className="lq-off-lbl">OFF</span>
                    </div>
                  )}
                </div>
              </div>

              <div className={`lq-cuotas ${mounted ? 'on' : ''}`}>
                Sujeto a Stock • <strong>Consultar medios de Pago</strong>
              </div>

            </div>

            <div className={`lq-whatsapp ${mounted ? 'on' : ''}`}>
              <svg className="lq-wa-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <span>381 2108473</span>
            </div>
          </div>

          <div className="lq-left">
            <div className={`lq-img-wrap ${mounted ? 'on' : ''}`}>
              <div className={`lq-img-inner ${mounted ? 'on' : ''}`}>
                <img src={imagenProducto} alt={titulo} className="lq-img" />
              </div>
              <div className="lq-img-caption">¡Última oportunidad!</div>
            </div>
          </div>

        </div>
        {/* Tags */}
        <div className={`lq-tags ${mounted ? 'on' : ''}`}>
          <span className="lq-tag lq-tag-green">www.mueblesdepinoml.com.ar</span>
        </div>

      </div>
    </>
  );
}