import React, { useEffect, useState } from 'react';
import logo from './../../assets/logo.png';
import comedor from './../../assets/comedor.png';

export default function ModeloCasaVivaAzul({
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
        href="https://fonts.googleapis.com/css2?family=Rubik:wght@700;800;900&family=Space+Grotesk:wght@500;600;700&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap"
        rel="stylesheet"
      />
      <style>{`
        *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }

        .az {
          width:100%; height:100%;
          position:relative; overflow:hidden;
          font-family:'DM Sans',sans-serif;
          background:#f0f6ff;
        }

        /* ── FONDO ── */
        .az-bg {
          position:absolute; inset:0; z-index:0;
          background: #f4f8ff;
        }

        /* Noise grain overlay */
        .az-grain {
          position:absolute; inset:0; z-index:0; opacity:.025; pointer-events:none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-size: 200px 200px;
        }

        /* Blob gigante derecha azul */
        .az-blob-right {
          position:absolute; right:-15vw; top:-20vh;
          width:70vw; height:130vh;
          border-radius:63% 37% 54% 46% / 55% 48% 52% 45%;
          z-index:1; pointer-events:none;
          transition: background 1.2s ease;
          animation:azBlobMorph 20s ease-in-out infinite;
        }
        @keyframes azBlobMorph {
          0%,100%{border-radius:63% 37% 54% 46% / 55% 48% 52% 45%;}
          33%{border-radius:50% 50% 33% 67% / 47% 55% 45% 53%;}
          66%{border-radius:73% 27% 62% 38% / 65% 38% 62% 35%;}
        }

        /* Blob secundario izquierda */
        .az-blob-left {
          position:absolute; left:-20vw; bottom:-25vh;
          width:60vw; height:80vh;
          border-radius:40% 60% 55% 45% / 60% 44% 56% 40%;
          z-index:1; pointer-events:none;
          animation:azBlobLeft 18s ease-in-out infinite reverse;
          transition: background 1.2s ease;
        }
        @keyframes azBlobLeft {
          0%,100%{border-radius:40% 60% 55% 45% / 60% 44% 56% 40%; transform:rotate(0deg);}
          50%{border-radius:60% 40% 40% 60% / 50% 60% 40% 50%; transform:rotate(8deg);}
        }

        /* Orbe flotante top center */
        .az-orb-top {
          position:absolute; left:30vw; top:-12vh;
          width:40vw; height:40vw;
          border-radius:50%; z-index:1; pointer-events:none;
          filter:blur(60px); opacity:.12;
          transition: background 1.2s ease;
          animation:azOrbFloat 13s ease-in-out infinite;
        }
        @keyframes azOrbFloat {
          0%,100%{transform:translate(0,0) scale(1);}
          50%{transform:translate(-30px,20px) scale(1.1);}
        }

        /* Líneas diagonales futuristas */
        .az-diag-lines {
          position:absolute; inset:0; z-index:1; opacity:.04; pointer-events:none;
          background: repeating-linear-gradient(
            -65deg,
            #0057FF 0px, #0057FF 1px,
            transparent 1px, transparent 80px
          );
        }

        /* Puntos grid finos */
        .az-dots {
          position:absolute; inset:0; z-index:1; opacity:.07; pointer-events:none;
          background-image: radial-gradient(circle, #0057FF 1px, transparent 1px);
          background-size: 40px 40px;
        }

        /* Arco decorativo grande */
        .az-arc {
          position:absolute; left:-5vw; top:50%; transform:translateY(-50%);
          width:55vw; height:90vh;
          border-radius:50%;
          z-index:1; pointer-events:none;
          border: 1px solid rgba(0,87,255,.08);
          transition: border-color 1s ease;
        }
        .az-arc2 {
          position:absolute; left:-15vw; top:50%; transform:translateY(-50%);
          width:70vw; height:110vh;
          border-radius:50%;
          z-index:1; pointer-events:none;
          border: 1px solid rgba(0,87,255,.05);
        }

        /* Chispa / sparkle decorativo */
        .az-spark {
          position:absolute; z-index:3; pointer-events:none;
          font-size:clamp(18px,2vw,32px);
          opacity:0; 
          animation:azSparkPop 3s ease-in-out infinite;
          transition: color 1s ease;
        }
        .az-spark-1 { top:18vh; right:28vw; animation-delay:0s; }
        .az-spark-2 { top:72vh; right:18vw; animation-delay:1.2s; }
        .az-spark-3 { top:45vh; right:8vw; animation-delay:2.1s; }
        .az-spark-4 { top:25vh; left:12vw; animation-delay:.7s; }
        @keyframes azSparkPop {
          0%,100%{opacity:0; transform:scale(.5) rotate(0deg);}
          40%,60%{opacity:.7; transform:scale(1.2) rotate(20deg);}
        }

        /* ── LOGO ── */
        .az-logo {
          position:absolute; top:3vh; right:3.5vw; z-index:10;
          opacity:0; transform:translateY(-24px) scale(.8);
          transition:opacity 1s ease .3s, transform 1s cubic-bezier(.34,1.56,.64,1) .3s;
        }
        .az-logo.on { opacity:1; transform:translateY(0) scale(1); }
        .az-logo img { height:clamp(90px,10.5vh,140px); width:auto; }

        /* ── BADGE AMBIENTE ── */
        .az-badge-env {
          position:absolute; top:5vh; left:5.5vw; z-index:10;
          display:flex; align-items:center; gap:10px;
          padding:9px 20px; border-radius:100px;
          background:rgba(255,255,255,.9);
          backdrop-filter:blur(12px);
          border: 1.5px solid rgba(0,87,255,.15);
          box-shadow: 0 4px 24px rgba(0,87,255,.1);
          opacity:0; transform:translateX(-30px) scale(.9);
          transition:opacity .8s ease .9s, transform .8s cubic-bezier(.34,1.3,.64,1) .9s;
        }
        .az-badge-env.on { opacity:1; transform:translateX(0) scale(1); }
        .az-env-dot { width:8px; height:8px; border-radius:50%; transition:background .8s ease; }
        .az-env-txt {
          font-size:clamp(10px,.8vw,13px); letter-spacing:3.5px;
          text-transform:uppercase; font-weight:600; color:#1a3a7a;
        }

        /* ── LAYOUT ── */
        .az-layout {
          position:absolute; inset:0; z-index:5;
          display:grid;
          grid-template-columns:52% 1fr;
        }

        /* ── IZQUIERDA (imagen) ── */
        .az-left {
          position:relative; display:flex;
          align-items:center; justify-content:center;
          z-index:2; padding:4vh 2vw 4vh 3vw;
        }

        /* Glow imagen */
        .az-img-glow {
          position:absolute; width:70%; height:55%;
          border-radius:50%;
          filter:blur(70px); opacity:.25;
          transition:background 1.2s ease;
          animation:azGlowPulse 6s ease-in-out infinite;
        }
        @keyframes azGlowPulse {
          0%,100%{transform:scale(1); opacity:.25;}
          50%{transform:scale(1.15); opacity:.35;}
        }

        /* Sombra suelo */
        .az-floor {
          position:absolute; bottom:8%; left:50%; transform:translateX(-50%);
          width:70%; height:3.5%;
          border-radius:50%; pointer-events:none; z-index:2;
          transition: background 1s ease;
        }

        /* Anillo decorativo imagen */
        .az-ring {
          position:absolute; border-radius:50%; pointer-events:none; z-index:2;
          border: 1.5px solid; opacity:.15;
          transition: border-color 1s ease;
          animation:azRingSpin 30s linear infinite;
        }
        .az-ring-1 { width:80%; height:80%; inset:10%; }
        .az-ring-2 { width:96%; height:96%; inset:2%; animation-direction:reverse; animation-duration:20s; opacity:.07; }
        @keyframes azRingSpin {
          from{transform:rotate(0deg);} to{transform:rotate(360deg);}
        }

        /* Imagen wrap */
        .az-img-wrap {
          position:relative; z-index:3;
          width:100%; height:90%;
          display:flex; align-items:center; justify-content:center;
          opacity:0; transform:translateX(-60px) translateY(20px) scale(.7);
          transition:opacity 1.2s ease .5s, transform 1.2s cubic-bezier(.34,1.56,.64,1) .5s;
        }
        .az-img-wrap.on { opacity:1; transform:translateX(0) translateY(0) scale(1); }
        .az-img-wrap.out { opacity:0!important; transform:translateX(-70px) translateY(-15px) scale(.8) rotate(-5deg)!important; transition:opacity .38s ease, transform .38s cubic-bezier(.6,-.28,.74,.05)!important; }
        .az-img-wrap.in { opacity:0; transform:translateX(70px) translateY(20px) scale(.75) rotate(5deg)!important; transition:opacity .6s ease .15s, transform .9s cubic-bezier(.34,1.56,.64,1) .15s!important; }

        .az-img {
          width:100%; height:100%; max-height:none; max-width:none;
          object-fit:contain;
          animation:azFloat 8s ease-in-out infinite;
        }
        @keyframes azFloat { 0%,100%{transform:translateY(0) rotate(0deg);} 50%{transform:translateY(-18px) rotate(.5deg);} }

        /* ── DERECHA (texto) ── */
        .az-right {
          display:flex; flex-direction:column; justify-content:center;
          align-items:center;
          padding:8vh 5vw 8vh 2vw; gap:2.2vh; z-index:2;
          position:relative;
        }

        /* Tag oferta */
        .az-tag {
          display:inline-flex; align-items:center; gap:10px; align-self:center;
          animation: azTagBounce 1.8s cubic-bezier(.34,.85,.64,1) .5s backwards, azTagPulse 2s ease-in-out 2.3s infinite;
        }
        @keyframes azTagBounce {
          0% { opacity:0; transform:translateY(-120px) scale(.3); }
          20% { opacity:1; transform:translateY(10px) scale(1.35); }
          35% { transform:translateY(-25px) scale(1.1); }
          50% { transform:translateY(5px) scale(1.28); }
          65% { transform:translateY(-12px) scale(1.15); }
          80% { transform:translateY(3px) scale(1.23); }
          90% { transform:translateY(-5px) scale(1.18); }
          100% { opacity:1; transform:translateY(0) scale(1.2); }
        }
        @keyframes azTagPulse {
          0%, 100% { transform:translateY(0) scale(1.2); }
          50% { transform:translateY(0) scale(1.28); }
        }
        .az-tag-inner {
          display:flex; align-items:center; gap:12px;
          padding:14px 28px; border-radius:100px;
          position:relative; overflow:hidden;
          box-shadow: 0 0 40px rgba(0,87,255,.4), 0 0 80px rgba(0,170,255,.3), 0 8px 32px rgba(0,87,255,.25);
          transition: background 1s ease;
        }
        .az-tag-inner::before {
          content:''; position:absolute; inset:0;
          background:radial-gradient(circle at 30% 30%, rgba(255,255,255,.25) 0%, transparent 60%);
          pointer-events:none;
        }
        .az-tag-dot { width:10px; height:10px; border-radius:50%; background:#fff; animation:azDotBlink 1.5s ease-in-out infinite; }
        @keyframes azDotBlink { 0%,100%{opacity:1; transform:scale(1);} 50%{opacity:.4; transform:scale(.8);} }
        .az-tag-txt {
          font-family:'Rubik',sans-serif;
          font-size:clamp(18px,1.6vw,26px); letter-spacing:4px;
          text-transform:uppercase; font-weight:900;
          color:#fff;
          text-shadow: 0 2px 8px rgba(0,0,0,.3), 0 0 20px rgba(255,255,255,.2);
        }

        /* Contenido dinámico */
        .az-content {
          display:flex; flex-direction:column; gap:2vh;
          transition:opacity .35s ease, transform .35s ease;
        }
        .az-content.out { opacity:0; transform:translateX(28px); }
        .az-content.in { opacity:0; transform:translateX(-28px); transition:opacity .5s ease .1s, transform .65s cubic-bezier(.22,1,.36,1) .1s; }
        .az-content.idle { opacity:1; transform:translateX(0); }

        /* Título */
        .az-titulo {
          font-family:'Space Grotesk',sans-serif;
          font-size:clamp(56px,8vw,130px);
          line-height:.92; letter-spacing:-1px;
          color:#08165a;
          text-align:center;
          opacity:0; transform:translateX(80px) scale(.85) rotate(3deg);
          transition:opacity .8s ease .05s, transform .9s cubic-bezier(.34,1.8,.64,1) .05s;
        }
        .az-content.idle .az-titulo { opacity:1; transform:translateX(0) scale(1) rotate(0); }
        .az-titulo-dest {
          display:block;
          transition:color 1.2s ease;
          animation:azTituloSlide 1s cubic-bezier(.34,1.9,.64,1) .15s backwards;
        }
        .az-titulo-normal { color:#08165a; }
        @keyframes azTituloSlide {
          0%{opacity:0; transform:translateX(80px) skewX(-15deg);}
          100%{opacity:1; transform:translateX(0) skewX(0);}
        }

        /* Subtitulo */
        .az-subtitulo {
          display:inline-flex; align-items:center; gap:12px;
          align-self:center;
          background:rgba(0,87,255,.06); border-radius:12px;
          padding:10px 16px;
          border: 1px solid rgba(0,87,255,.1);
          opacity:0; transform:translateX(60px);
          transition:opacity .7s ease .2s, transform .8s cubic-bezier(.34,1.6,.64,1) .2s;
        }
        .az-content.idle .az-subtitulo { opacity:1; transform:translateX(0); }
        .az-sub-bar { width:3px; height:22px; border-radius:2px; flex-shrink:0; transition:background 1s ease; }
        .az-sub-txt { font-size:clamp(13px,1vw,16px); letter-spacing:1.5px; text-transform:uppercase; font-weight:500; color:#3a5aaa; }

        /* Descripción */
        .az-desc-wrap {
          position:relative;
          opacity:0; transform:translateX(-60px) skewX(5deg);
          transition:opacity .75s ease .3s, transform .85s cubic-bezier(.34,1.7,.64,1) .3s;
        }
        .az-content.idle .az-desc-wrap { opacity:1; transform:translateX(0) skewX(0); }
        .az-desc-accent {
          position:absolute; left:-14px; top:0; bottom:0; width:4px; border-radius:4px;
          transition:background 1s ease;
        }
        .az-desc {
          font-size:clamp(14px,1.2vw,19px); line-height:1.75;
          color:#4a5e8a; font-weight:300;
          padding-left:4px;
          text-align:center;
        }

        /* Precio */
        .az-price-wrap {
          display:flex; flex-direction:column; align-items:center; gap:20px;
          opacity:0; transform:translateY(60px) scale(.85);
          transition:opacity .8s ease .4s, transform .9s cubic-bezier(.34,1.9,.64,1) .4s;
        }
        .az-content.idle .az-price-wrap { opacity:1; transform:translateY(0) scale(1); }

        .az-price-main {
          display:flex; flex-direction:column; gap:4px;
          align-items:center;
        }
        .az-price-old-wrap {
          display:flex; align-items:center; gap:8px;
          justify-content:center;
        }
        .az-price-old-label {
          font-size:clamp(11px,.9vw,14px); color:#8aabdd;
          text-transform:uppercase; letter-spacing:2px; font-weight:600;
        }
        .az-price-old {
          font-size:clamp(24px,3.2vw,36px); color:#a0b0cc;
          text-decoration:line-through; font-weight:400;
        }
        .az-price-new {
          font-family:'Space Grotesk',sans-serif;
          font-size:clamp(42px,5.5vw,78px);
          line-height:1; letter-spacing:-1px;
          color:#08165a;
        }
        .az-cuotas {
          font-size:clamp(13px,1vw,16px); color:#6a80aa; font-weight:400;
        }
        .az-cuotas strong { font-weight:700; transition:color 1s ease; }

        /* OFF badge */
        .az-off {
          display:flex; flex-direction:column; align-items:center; justify-content:center;
          padding:14px 18px; border-radius:20px;
          position:relative; overflow:hidden;
          transition:background 1.2s ease, box-shadow 1.2s ease;
          flex-shrink:0;
          box-shadow: 0 0 40px rgba(0,87,255,.4), 0 0 80px rgba(0,170,255,.3), 0 8px 32px rgba(0,87,255,.25);
        }
        .az-off::before {
          content:''; position:absolute; inset:0;
          background:radial-gradient(circle at 30% 30%, rgba(255,255,255,.25) 0%, transparent 60%);
          pointer-events:none;
        }
        /* Contenedor badges flotantes */
        .az-badges-wrapper {
          position:absolute; right:8%; top:6%;
          display:flex; flex-direction:column; gap:8px;
          z-index:5;
        }
        /* Badge flotante DESCUENTO IMPERDIBLE */
        .az-badge-promo {
          display:flex; flex-direction:row; align-items:center; justify-content:center;
          gap:6px;
          padding:10px 20px; border-radius:0;
          background:#fff;
          box-shadow: 0 8px 32px rgba(0,87,255,.2), 0 0 60px rgba(0,170,255,.15);
          opacity:0; transform:translateX(40px) rotate(8deg) scale(.8);
          transition:opacity .9s ease 1.2s, transform .9s cubic-bezier(.34,1.56,.64,1) 1.2s;
          position:relative;
          z-index:2;
        }
        .az-badge-promo.on { opacity:1; transform:translateX(0) rotate(0deg) scale(1); }
        .az-badge-promo-txt1 {
          font-family:'Space Grotesk',sans-serif;
          font-size:clamp(12px,1.1vw,17px); line-height:1; font-weight:700;
          color:#08165a;
          text-transform:uppercase; letter-spacing:1.5px;
        }
        .az-badge-promo-txt2 {
          font-family:'Space Grotesk',sans-serif;
          font-size:clamp(12px,1.1vw,17px); line-height:1; font-weight:700;
          color:#00AAFF;
          text-transform:uppercase; letter-spacing:1.5px;
        }
        /* OFF badge flotante en imagen */
        .az-off-floating {
          display:flex; flex-direction:row; align-items:center; justify-content:center;
          gap:8px;
          padding:12px 22px; border-radius:100px;
          overflow:hidden;
          transition:background 1.2s ease, box-shadow 1.2s ease, opacity .9s ease 1.4s, transform .9s cubic-bezier(.34,1.56,.64,1) 1.4s;
          opacity:0; transform:translateX(40px) rotate(8deg) scale(.8);
          box-shadow: 0 0 50px rgba(0,87,255,.5), 0 0 100px rgba(0,170,255,.4), 0 12px 40px rgba(0,87,255,.3);
          animation: azOffZoom 2s ease-in-out 2.3s infinite;
        }
        .az-off-floating.on { opacity:1; transform:translateX(0) rotate(0deg) scale(1); }
        @keyframes azOffZoom {
          0%, 100% { transform:translateX(0) rotate(0deg) scale(1); }
          50% { transform:translateX(0) rotate(0deg) scale(1.1); }
        }
        .az-off-floating::before {
          content:''; position:absolute; inset:0;
          background:radial-gradient(circle at 30% 30%, rgba(255,255,255,.3) 0%, transparent 60%);
          pointer-events:none;
        }
        .az-off-pct {
          font-family:'Space Grotesk',sans-serif;
          font-size:clamp(24px,2.8vw,44px); line-height:1; color:#fff; font-weight:700;
        }
        .az-off-lbl {
          font-family:'Space Grotesk',sans-serif;
          font-size:clamp(24px,2.8vw,44px); line-height:1; font-weight:700;
          text-transform:uppercase; color:#fff;
        }

        /* Divisor con chispa */
        .az-divider {
          display:flex; align-items:center; gap:12px;
          opacity:0; transform:scaleX(0);
          transform-origin:center;
          transition:opacity .6s ease .5s, transform .7s cubic-bezier(.34,1.4,.64,1) .5s;
        }
        .az-content.idle .az-divider { opacity:1; transform:scaleX(1); }
        .az-div-line { flex:1; height:1px; transition:background 1s ease; }
        .az-div-gem { font-size:14px; }

        /* Chips features */
        .az-chips {
          display:flex; gap:8px; flex-wrap:wrap;
          justify-content:center;
          opacity:0; transform:translateY(30px);
          transition:opacity 1s ease 1.6s, transform 1s cubic-bezier(.34,1.8,.64,1) 1.6s;
        }
        .az-chips.on { opacity:1; transform:translateY(0); }
        .az-chip {
          font-size:clamp(10px,.78vw,13px); font-weight:600; letter-spacing:1px;
          text-transform:uppercase; padding:8px 16px; border-radius:100px;
          background:rgba(255,255,255,.85);
          border: 1.5px solid rgba(0,87,255,.15);
          color:#0057FF;
          box-shadow: 0 2px 12px rgba(0,87,255,.08);
          transition: border-color 1s ease, color 1s ease;
          backdrop-filter:blur(4px);
        }

        /* WhatsApp */
        .az-wa {
          display:inline-flex; align-items:center; gap:14px;
          padding:16px 30px; border-radius:100px;
          background:#25D366;
          color:#fff;
          font-size:clamp(16px,1.4vw,22px);
          font-weight:700; letter-spacing:.5px;
          box-shadow: 0 8px 28px rgba(37,211,102,.4);
          align-self:center;
          opacity:0; transform:translateY(30px);
          transition:opacity 1s ease 1.9s, transform 1s cubic-bezier(.34,1.8,.64,1) 1.9s;
        }
        .az-wa.on { opacity:1; transform:translateY(0); }
        .az-wa-icon { width:clamp(24px,1.8vw,32px); height:clamp(24px,1.8vw,32px); fill:#fff; }

        /* ── BARRA PROGRESO ── */
        .az-progress-wrap {
          position:absolute; bottom:0; left:0; right:0; z-index:10;
          height:5px; background:rgba(0,87,255,.08);
        }
        .az-progress {
          height:100%; transition:width .1s linear, background 1s ease;
          border-radius:0 4px 4px 0;
        }

        /* ── DOTS NAVEGACION ── */
        .az-nav-dots {
          position:absolute; bottom:4.5vh; left:52%; transform:translateX(-50%); z-index:10;
          display:flex; gap:10px; align-items:center;
        }
        .az-nav-dot {
          cursor:pointer; border-radius:100px;
          background:rgba(0,87,255,.2); border:none; outline:none;
          transition:background .3s, width .4s cubic-bezier(.34,1.8,.64,1), transform .3s;
          height:9px; width:9px;
        }
        .az-nav-dot.active {
          width:32px; background:#0057FF;
        }

        /* ── FRANJA INFERIOR ── */
        .az-bottom {
          position:absolute; bottom:28px; right:3vw; z-index:6;
          display:flex; gap:8px; pointer-events:none;
        }
        .az-bottom-pill {
          display:flex; align-items:center; gap:8px;
          padding:9px 18px; border-radius:100px;
          background:rgba(255,255,255,.85);
          backdrop-filter:blur(8px);
          border: 1px solid rgba(0,87,255,.1);
          box-shadow: 0 4px 16px rgba(0,87,255,.06);
        }
        .az-bottom-icon { font-size:15px; }
        .az-bottom-txt { font-size:clamp(10px,.78vw,13px); font-weight:600; color:#2a4a8a; letter-spacing:.5px; }
        /* OFF badge en franja inferior */
        .az-bottom-off {
          display:flex; flex-direction:row; align-items:center; justify-content:center;
          gap:8px;
          padding:10px 20px; border-radius:100px;
          overflow:hidden;
          position:relative;
          box-shadow: 0 0 40px rgba(0,87,255,.4), 0 0 80px rgba(0,170,255,.3), 0 8px 32px rgba(0,87,255,.25);
        }
        .az-bottom-off::before {
          content:''; position:absolute; inset:0;
          background:radial-gradient(circle at 30% 30%, rgba(255,255,255,.3) 0%, transparent 60%);
          pointer-events:none;
        }
        .az-bottom-off-pct {
          font-family:'Space Grotesk',sans-serif;
          font-size:clamp(20px,2.2vw,36px); line-height:1; color:#fff; font-weight:700;
        }
        .az-bottom-off-lbl {
          font-family:'Space Grotesk',sans-serif;
          font-size:clamp(20px,2.2vw,36px); line-height:1; font-weight:700;
          text-transform:uppercase; color:#fff;
        }

        /* Línea vertical separadora */
        .az-vline {
          position:absolute; top:12vh; bottom:12vh; left:52%;
          width:1px; z-index:2; pointer-events:none;
          background:linear-gradient(to bottom, transparent, rgba(0,87,255,.1) 20%, rgba(0,87,255,.1) 80%, transparent);
        }

        /* Texto decorativo rotado */
        .az-rotated-txt {
          position:absolute; left:-1vw; bottom:22vh;
          z-index:3; pointer-events:none;
          writing-mode:vertical-rl; text-orientation:mixed;
          font-size:clamp(9px,.7vw,11px); letter-spacing:4px; text-transform:uppercase;
          font-weight:600; color:rgba(0,87,255,.25);
          transform:rotate(180deg);
        }
      `}</style>

      <div className="az">
        {/* FONDO */}
        <div className="az-bg" />
        <div className="az-grain" />
        <div className="az-diag-lines" />
        <div className="az-dots" />

        {/* Blobs */}
        <div
          className="az-blob-right"
          style={{ background: 'linear-gradient(160deg, #e0eeff 0%, rgba(0,170,255,.08) 60%, transparent 100%)' }}
        />
        <div
          className="az-blob-left"
          style={{ background: 'radial-gradient(ellipse, rgba(0,87,255,.07) 0%, transparent 70%)' }}
        />
        <div
          className="az-orb-top"
          style={{ background: 'radial-gradient(circle, rgba(0,170,255,1) 0%, rgba(0,87,255,.3) 60%, transparent 100%)' }}
        />

        {/* Arcos */}
        <div className="az-arc" style={{ borderColor: 'rgba(0,87,255,.08)' }} />
        <div className="az-arc2" />

        {/* Línea vertical */}
        <div className="az-vline" />

        {/* Chispas */}
        <div className="az-spark az-spark-1" style={{ color: '#00AAFF' }}>✦</div>
        <div className="az-spark az-spark-2" style={{ color: '#0057FF' }}>◆</div>
        <div className="az-spark az-spark-3" style={{ color: '#00AAFF' }}>✦</div>
        <div className="az-spark az-spark-4" style={{ color: '#0057FF' }}>◆</div>

        {/* Texto rotado */}
        <div className="az-rotated-txt">Casa Viva · Muebles · Ofertas Especiales</div>

        {/* LOGO */}
        <div className={`az-logo ${mounted ? 'on' : ''}`}>
          <img src={logo} alt="Logo" />
        </div>

        {/* BADGE AMBIENTE */}
        <div className={`az-badge-env ${mounted ? 'on' : ''}`}>
          <div className="az-env-dot" style={{ background: '#00AAFF' }} />
          <span className="az-env-txt">{categoria}</span>
        </div>

        {/* LAYOUT */}
        <div className="az-layout">

          {/* IZQUIERDA: imagen */}
          <div className="az-left">
            <div className="az-ring az-ring-1" style={{ borderColor: '#0057FF' }} />
            <div className="az-ring az-ring-2" style={{ borderColor: '#00AAFF' }} />

            <div
              className="az-img-glow"
              style={{ background: 'radial-gradient(ellipse, rgba(0,170,255,.8) 0%, rgba(0,87,255,.4) 50%, transparent 70%)' }}
            />
            <div
              className="az-floor"
              style={{ background: 'radial-gradient(ellipse, rgba(0,87,255,.18) 0%, transparent 70%)' }}
            />

            <div
              className={`az-img-wrap ${mounted ? 'on' : ''}`}
            >
              <img
                className="az-img"
                src={imagenProducto}
                alt={titulo}
                style={{
                  filter: 'drop-shadow(0 28px 56px rgba(0,87,255,.25)) drop-shadow(0 0 60px rgba(0,170,255,.15))',
                }}
              />
            </div>

            {/* Badges flotantes */}
            <div className="az-badges-wrapper">
              {/* Badge DESCUENTO IMPERDIBLE */}
              <div
                className={`az-badge-promo ${mounted ? 'on' : ''}`}
              >
                <span className="az-badge-promo-txt1">DESCUENTO</span>
                <span className="az-badge-promo-txt2">IMPERDIBLE</span>
              </div>

              {/* Badge descuento flotante */}
              <div
                className={`az-off-floating ${mounted ? 'on' : ''}`}
                style={{ background: 'linear-gradient(135deg, #0057FF 0%, #00AAFF 100%)' }}
              >
                <span className="az-off-pct">{porcentajeDescuento}%</span>
                <span className="az-off-lbl">OFF</span>
              </div>
            </div>
          </div>

          {/* DERECHA: texto */}
          <div className="az-right">
            {/* Tag oferta */}
            <div className="az-tag">
              <div
                className="az-tag-inner"
                style={{ background: 'linear-gradient(135deg, #0057FF 0%, #00AAFF 100%)' }}
              >
                <div className="az-tag-dot" />
                <span className="az-tag-txt">SUPER SALE !</span>
              </div>
            </div>

            {/* Contenido dinámico */}
            <div className="az-content idle">

              {/* Título */}
              <div className="az-titulo">
                <span className="az-titulo-dest" style={{ color: '#0057FF' }}>
                  {titulo}
                </span>
              </div>

              {/* Subtítulo */}
                <div className="az-subtitulo" style={{ background: 'rgba(0,87,255,.05)', borderColor: 'rgba(0,87,255,.12)' }}>
                <div className="az-sub-bar" style={{ background: '#00AAFF' }} />
                <span className="az-sub-txt">{categoria}</span>
              </div>

              {/* Descripción */}
              <div className="az-desc-wrap">
                <div className="az-desc-accent" style={{ background: 'linear-gradient(to bottom, #00AAFF, #0057FF)' }} />
                <p className="az-desc">{descripcion}</p>
              </div>

              {/* Divisor */}
              <div className="az-divider">
                <div className="az-div-line" style={{ background: 'linear-gradient(to right, rgba(0,87,255,.25), transparent)' }} />
                <span className="az-div-gem" style={{ color: '#00AAFF' }}>◆</span>
                <div className="az-div-line" style={{ background: 'linear-gradient(to left, rgba(0,87,255,.15), transparent)' }} />
              </div>

              {/* Precio */}
              <div className="az-price-wrap">
                <div className="az-price-main">
                  <div className="az-price-old-wrap">
                    <span className="az-price-old-label">Precio anterior</span>
                    <div className="az-price-old">{formatPrecio(precioLista)}</div>
                  </div>
                  <div className="az-price-new" style={{ color: '#08165a' }}>{formatPrecio(precioOferta)}</div>
                  <div className="az-cuotas">
                    Hasta <strong style={{ color: '#0057FF' }}>12 cuotas sin interés</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Chips */}
            <div className={`az-chips ${mounted ? 'on' : ''}`}>
              <span className="az-chip" style={{ borderColor: 'rgba(0,87,255,.2)', color: '#0057FF' }}>✓ Envío gratis</span>
              <span className="az-chip" style={{ borderColor: 'rgba(0,87,255,.2)', color: '#0057FF' }}>★ Alta calidad</span>
              <span className="az-chip" style={{ borderColor: 'rgba(0,87,255,.2)', color: '#0057FF' }}>⏳ Stock limitado</span>
            </div>

            {/* WhatsApp */}
            <div className={`az-wa ${mounted ? 'on' : ''}`}>
              <svg className="az-wa-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <span>381 2108473</span>
            </div>
          </div>
        </div>

        {/* FRANJA INFERIOR */}
        <div className="az-bottom">
          <div className="az-bottom-pill" style={{ borderColor: 'rgba(0,87,255,.12)' }}>
            <span className="az-bottom-icon">🚚</span>
            <span className="az-bottom-txt">Envío gratis</span>
          </div>
          <div className="az-bottom-pill" style={{ borderColor: 'rgba(0,87,255,.12)' }}>
            <span className="az-bottom-icon">🛡️</span>
            <span className="az-bottom-txt">Garantía 1 año</span>
          </div>
          <div className="az-bottom-pill" style={{ borderColor: 'rgba(0,87,255,.12)' }}>
            <span className="az-bottom-icon">💳</span>
            <span className="az-bottom-txt">Sin interés</span>
          </div>
        </div>


      </div>
    </>
  );
}