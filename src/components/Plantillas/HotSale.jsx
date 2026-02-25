/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from 'react';
import logo from './../../assets/logo.png';
import comedor from './../../assets/comedor.png';
import fireBg from './../../assets/fire-png.webp';

export default function HotSale({
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
        href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Black+Han+Sans&family=Pacifico&family=Rubik:wght@700;800;900&family=Montserrat:wght@400;600;700;800;900&display=swap"
        rel="stylesheet"
      />
      <style>{`
        *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }

        .hs {
          width: 100%; height: 100%;
          position: relative; overflow: hidden;
          font-family: 'Montserrat', sans-serif;
          background: #0a0a0a;
        }

        /* ── FONDO FUEGO ── */
        .hs-bg {
          position: absolute; inset: 0; z-index: 0;
          background:
            radial-gradient(ellipse 80% 60% at 70% 50%, rgba(220,40,0,.22) 0%, transparent 60%),
            radial-gradient(ellipse 50% 80% at 50% 100%, rgba(255,80,0,.18) 0%, transparent 55%),
            radial-gradient(ellipse 60% 40% at 20% 20%, rgba(180,0,0,.15) 0%, transparent 55%),
            linear-gradient(160deg, #110000 0%, #1a0500 40%, #0d0000 100%);
        }

        /* Textura diagonal de calor */
        .hs-heat-lines {
          position: absolute; inset: 0; z-index: 0; opacity: .04; pointer-events: none;
          background: repeating-linear-gradient(
            -60deg,
            #ff4400 0px, #ff4400 1px,
            transparent 1px, transparent 55px
          );
        }

        /* Blob lava derecha */
        .hs-lava-right {
          position: absolute; right: -5%; top: -10%;
          width: 65%; height: 120%;
          border-radius: 40% 0 0 50%;
          z-index: 1; pointer-events: none;
          background: linear-gradient(
            170deg,
            rgba(255,60,0,.13) 0%,
            rgba(255,140,0,.09) 40%,
            rgba(255,200,0,.05) 70%,
            transparent 100%
          );
          animation: hsBlobPulse 8s ease-in-out infinite;
        }
        @keyframes hsBlobPulse {
          0%,100% { transform: scale(1) rotate(0deg); opacity: 1; }
          50%      { transform: scale(1.04) rotate(2deg); opacity: .85; }
        }

        /* Glow superior */
        .hs-glow-top {
          position: absolute; top: -15%; left: 30%;
          width: 50%; height: 50%;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,100,0,.18) 0%, transparent 70%);
          z-index: 1; pointer-events: none;
          animation: hsGlowPulse 4s ease-in-out infinite;
        }
        @keyframes hsGlowPulse {
          0%,100% { opacity: .7; transform: scale(1); }
          50%      { opacity: 1; transform: scale(1.12); }
        }

        /* Ember particles */

        /* ── LOGO ── */
        .hs-logo {
          position: absolute; top: 3%; left: 3%; z-index: 10;
          width: clamp(110px, 13%, 155px);
          height: clamp(110px, 13%, 155px);
          border-radius: 50%;
          background: #fff;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 24px rgba(255,80,0,.45), 0 0 0 3px rgba(255,100,0,.25);
          overflow: hidden;
          opacity: 0; transform: translateY(-20px) scale(.85);
          transition: opacity .8s ease .3s, transform .8s cubic-bezier(.34,1.56,.64,1) .3s;
        }
        .hs-logo.on { opacity: 1; transform: translateY(0) scale(1); }
        .hs-logo img {
          width: 78%;
          height: 78%;
          object-fit: contain;
        }

        /* ── BANDA HOT SALE (diagonal top) ── */
        .hs-banner {
          position: absolute; top: 0; right: -2%; z-index: 10;
          width: 60%;
          background: linear-gradient(90deg, #cc1a00, #ff3800, #ff6600, #ffaa00);
          padding: 10px 64px 10px 44px;
          clip-path: polygon(3% 0%, 100% 0%, 100% 100%, 0% 100%);
          display: flex; align-items: center; gap: 16px;
          box-shadow: 0 8px 50px rgba(255,60,0,.55), 0 0 80px rgba(255,100,0,.3);
          overflow: hidden;
          opacity: 0; transform: translateY(-60px);
          transition: opacity .7s ease .1s, transform .8s cubic-bezier(.34,1.4,.64,1) .1s;
        }
        .hs-banner.on { opacity: 1; transform: translateY(0); }
        .hs-banner::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(circle at 30% 50%, rgba(255,255,255,.15) 0%, transparent 55%);
        }
        .hs-banner::after {
          content: '';
          position: absolute; top: 0; left: -100%; width: 50%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.3), transparent);
          animation: hsBannerShine 3s infinite 1.5s;
        }
        @keyframes hsBannerShine { 0%{left:-100%} 60%,100%{left:160%} }

        .hs-banner-fire { font-size: clamp(40px, 7%, 80px); line-height: 1; }
        .hs-banner-txt {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(60px, 10%, 120px);
          letter-spacing: 8px;
          line-height: 1;
          color: #fff;
          text-shadow: 0 2px 16px rgba(0,0,0,.35);
        }
        .hs-banner-txt span {
          color: #fff176;
          text-shadow: 0 0 20px rgba(255,240,0,.6), 0 2px 12px rgba(0,0,0,.3);
        }

        /* ── LAYOUT ── */
        .hs-layout {
          position: absolute; inset: 0; z-index: 4;
          display: grid;
          grid-template-columns: 48% 1fr;
          height: 100%;
        }

        /* ── IZQUIERDA — IMAGEN ── */
        .hs-left {
          position: relative;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          padding: 12% 2% 4% 4%;
        }

        /* Glow imagen */
        .hs-img-glow {
          position: absolute; width: 75%; height: 60%;
          border-radius: 50%; pointer-events: none;
          background: radial-gradient(circle, rgba(255,100,0,.28) 0%, rgba(255,40,0,.12) 40%, transparent 70%);
          filter: blur(40px);
          animation: hsImgGlowPulse 3s ease-in-out infinite;
        }
        @keyframes hsImgGlowPulse {
          0%,100% { transform: scale(1); opacity: .7; }
          50%      { transform: scale(1.15); opacity: 1; }
        }

        /* Plataforma / sombra suelo */
        .hs-floor {
          position: absolute; bottom: 12%; left: 50%; transform: translateX(-50%);
          width: 70%; height: 3%;
          background: radial-gradient(ellipse, rgba(255,80,0,.3) 0%, transparent 70%);
          pointer-events: none;
        }

        .hs-img-wrap {
          position: relative; z-index: 3;
          width: 85%; height: 70%;
          display: flex; align-items: center; justify-content: center;
          opacity: 0; transform: translateX(-50px) scale(.75);
          transition: opacity 1s ease .4s, transform 1.1s cubic-bezier(.34,1.56,.64,1) .4s;
        }
        .hs-img-wrap.on  { opacity: 1; transform: translateX(0) scale(1); }
        .hs-img-wrap.out { opacity: 0 !important; transform: translateX(-40px) scale(.8) !important; transition: opacity .35s ease, transform .35s ease !important; }
        .hs-img-wrap.in  { opacity: 0; transform: translateX(40px) scale(.8) !important; transition: opacity .6s ease .15s, transform .8s cubic-bezier(.34,1.56,.64,1) .15s !important; }

        .hs-img {
          width: 100%; height: 100%;
          object-fit: contain;
          filter: drop-shadow(0 20px 50px rgba(255,60,0,.4)) drop-shadow(0 0 80px rgba(255,120,0,.25));
          animation: hsFloat 5s ease-in-out infinite 1s;
        }
        @keyframes hsFloat {
          0%,100% { transform: translateY(0) scale(1); }
          50%      { transform: translateY(-14px) scale(1.02); }
        }

        /* Título debajo imagen */
        .hs-img-titulo {
          position: relative; z-index: 4;
          font-family: 'Bebas Neue', sans-serif;
          font-weight: 400;
          font-style: normal;
          text-transform: uppercase;
          text-align: center;
          line-height: 1;
          letter-spacing: 3px;
          width: 100%;
          opacity: 0; transform: translateY(20px);
          transition: opacity .8s ease .5s, transform .8s cubic-bezier(.34,1.56,.64,1) .5s;
        }
        .hs-img-titulo.on { opacity: 1; transform: translateY(0); }
        .hs-img-titulo-normal {
          display: block;
          font-size: clamp(60px, 9%, 115px);
          color: rgba(255,255,255,.65);
        }
        .hs-img-titulo-dest {
          display: block;
          font-size: clamp(100px, 17%, 200px);
          color: #fff;
        }

        .hs-titulo-group {
          display: flex; flex-direction: column; align-items: center; gap: 6px;
        }

        /* Slogan derecha */
        .hs-slogan {
          font-family: 'Rubik', sans-serif;
          font-weight: 900;
          font-size: clamp(72px, 11%, 140px);
          letter-spacing: 1px;
          text-align: center;
          line-height: 1;
          text-transform: uppercase;
          color: #ffdd00;
          filter: drop-shadow(0 0 18px rgba(255,220,0,.85)) drop-shadow(0 0 40px rgba(255,200,0,.55));
          opacity: 0; transform: translateX(-60px) scale(.9);
          transition: opacity .8s ease .15s, transform .9s cubic-bezier(.34,1.8,.64,1) .15s;
          animation: hsSloganFire 2.6s ease-in-out infinite 2s;
        }
        .hs-content.idle .hs-slogan { opacity: 1; transform: translateX(0) scale(1); }
        @keyframes hsSloganFire {
          0%,100% {
            filter: drop-shadow(0 0 14px rgba(255,140,0,.7)) drop-shadow(0 0 30px rgba(255,60,0,.4));
            transform: scale(1);
          }
          40% {
            filter: drop-shadow(0 0 32px rgba(255,200,0,1)) drop-shadow(0 0 70px rgba(255,80,0,.8)) drop-shadow(0 0 110px rgba(200,20,0,.5));
            transform: scale(1.07);
          }
          55% {
            filter: drop-shadow(0 0 10px rgba(255,120,0,.5)) drop-shadow(0 0 22px rgba(255,50,0,.3));
            transform: scale(0.98);
          }
          70% {
            filter: drop-shadow(0 0 28px rgba(255,180,0,.9)) drop-shadow(0 0 55px rgba(255,70,0,.6));
            transform: scale(1.04);
          }
        }

        /* Corner decorativos */
        .hs-corner {
          position: absolute; width: 22px; height: 22px;
          pointer-events: none; z-index: 4;
          border-color: rgba(255,100,0,.4);
        }
        .hs-corner-tl { top: 12%; left: 4%; border-top: 2px solid; border-left: 2px solid; border-radius: 4px 0 0 0; }
        .hs-corner-tr { top: 12%; right: 4%; border-top: 2px solid; border-right: 2px solid; border-radius: 0 4px 0 0; }
        .hs-corner-bl { bottom: 12%; left: 4%; border-bottom: 2px solid; border-left: 2px solid; border-radius: 0 0 0 4px; }
        .hs-corner-br { bottom: 12%; right: 4%; border-bottom: 2px solid; border-right: 2px solid; border-radius: 0 0 4px 0; }

        /* ── DERECHA — CONTENIDO ── */
        .hs-right {
          display: flex; flex-direction: column; justify-content: flex-start;
          padding: 16% 3% 4% 3%;
          gap: 2%;
          position: relative;
          overflow: hidden;
        }

        .hs-fire-bg {
          position: absolute;
          right: -25%; top: 50%;
          transform: translateY(-50%);
          width: 90%;
          height: 100%;
          object-fit: contain;
          object-position: center center;
          opacity: 0.18;
          pointer-events: none;
          z-index: 0;
          mask-image: linear-gradient(to right, transparent 0%, black 30%, black 70%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 30%, black 70%, transparent 100%);
        }

        .hs-content {
          display: flex; flex-direction: column; gap: 0;
          justify-content: space-between;
          flex: 1;
          align-items: center;
          position: relative; z-index: 1;
          transition: opacity .35s ease, transform .35s ease;
        }
        .hs-content.out { opacity: 0; transform: translateX(30px); }
        .hs-content.in  { opacity: 0; transform: translateX(-30px); transition: opacity .5s ease .1s, transform .65s cubic-bezier(.22,1,.36,1) .1s; }
        .hs-content.idle { opacity: 1; transform: translateX(0); }

        /* Eyebrow ambiente */
        .hs-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 6px 20px; border-radius: 20px;
          border: 1.5px solid rgba(255,100,0,.35);
          background: rgba(255,68,0,.1);
          backdrop-filter: blur(4px);
          width: fit-content;
          opacity: 0; transform: translateX(-40px);
          transition: opacity .7s ease .1s, transform .8s cubic-bezier(.34,1.6,.64,1) .1s;
        }
        .hs-content.idle .hs-eyebrow { opacity: 1; transform: translateX(0); }
        .hs-eyebrow.on { opacity: 1; transform: translateX(0); }
        .hs-eyebrow-txt {
          font-size: clamp(16px, 2%, 24px);
          letter-spacing: 4px; text-transform: uppercase;
          font-weight: 700; color: #ff8844;
        }

        /* Título */
        .hs-titulo {
          font-family: 'Bebas Neue', sans-serif;
          line-height: .92; letter-spacing: 1px;
          color: #fff; text-align: center;
          opacity: 0; transform: translateX(-60px) rotate(-3deg) scale(.9);
          transition: opacity .8s ease .15s, transform .9s cubic-bezier(.34,1.8,.64,1) .15s;
        }
        .hs-content.idle .hs-titulo { opacity: 1; transform: translateX(0) rotate(0) scale(1); }
        .hs-titulo-normal {
          display: block;
          font-size: clamp(52px, 9%, 108px);
          color: #ffccaa;
          letter-spacing: 3px;
        }
        .hs-titulo-dest {
          display: block;
          font-size: clamp(80px, 15%, 180px);
          letter-spacing: 2px;
          background: linear-gradient(135deg, #ff3800 0%, #ff7700 50%, #ffcc00 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 4px 20px rgba(255,80,0,.5));
          animation: hsDestGlow 3s ease-in-out infinite 2s;
        }
        @keyframes hsDestGlow {
          0%,100% { filter: drop-shadow(0 4px 20px rgba(255,80,0,.5)); }
          50%      { filter: drop-shadow(0 0 40px rgba(255,120,0,.9)) drop-shadow(0 0 80px rgba(255,200,0,.4)); }
        }

        /* Subtítulo */
        .hs-subtitulo {
          font-size: clamp(17px, 2.2%, 27px);
          font-weight: 600; letter-spacing: 3px; text-transform: uppercase;
          color: rgba(255,200,150,.6); text-align: center;
          opacity: 0; transform: translateX(50px);
          transition: opacity .7s ease .25s, transform .8s cubic-bezier(.34,1.6,.64,1) .25s;
        }
        .hs-content.idle .hs-subtitulo { opacity: 1; transform: translateX(0); }

        /* Separador llama */
        .hs-divider {
          display: flex; align-items: center; gap: 12px;
          opacity: 0; transform: translateX(-40px);
          transition: opacity .6s ease .3s, transform .7s cubic-bezier(.34,1.6,.64,1) .3s;
        }
        .hs-content.idle .hs-divider { opacity: 1; transform: translateX(0); }
        .hs-div-line {
          height: 2px; flex: 1; max-width: 60px;
          background: linear-gradient(to right, #ff4400, #ffcc00);
          border-radius: 2px;
        }
        .hs-div-icon { font-size: clamp(14px, 1.5%, 20px); }

        /* Descripción */
        .hs-desc {
          font-size: clamp(20px, 2.6%, 32px);
          line-height: 1.75; font-weight: 600;
          color: rgba(255,255,255,.88); text-align: center;
          letter-spacing: .3px;
          padding: 12px 20px;
          border-top: 2px solid rgba(255,100,0,.25);
          border-bottom: 2px solid rgba(255,100,0,.25);
          background: rgba(255,60,0,.06);
          border-radius: 8px;
          backdrop-filter: blur(4px);
          opacity: 0; transform: translateX(50px);
          transition: opacity .75s ease .35s, transform .85s cubic-bezier(.34,1.5,.64,1) .35s;
        }
        .hs-content.idle .hs-desc { opacity: 1; transform: translateX(0); }

        /* ── PRECIO ── */
        .hs-price-block {
          display: flex; flex-direction: column; gap: 10px; align-items: center;
          opacity: 0; transform: translateY(40px) scale(.9);
          transition: opacity .8s ease .45s, transform .9s cubic-bezier(.34,1.9,.64,1) .45s;
        }
        .hs-content.idle .hs-price-block { opacity: 1; transform: translateY(0) scale(1); }

        .hs-price-antes {
          font-size: clamp(28px, 3.8%, 48px);
          font-weight: 600; color: rgba(255,180,140,.5);
          text-decoration: line-through; letter-spacing: .5px;
          white-space: nowrap;
        }
        .hs-price-row {
          display: flex; align-items: center; justify-content: center; gap: 70px;
        }
        .hs-price-nums {
          display: flex; flex-direction: column; align-items: center; gap: 4px;
          min-width: 0;
        }
        .hs-price-nuevo {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(80px, 13%, 160px);
          line-height: 1;
          white-space: nowrap;
          background: linear-gradient(135deg, #ff2200 0%, #ff6600 40%, #ffcc00 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 6px 24px rgba(255,80,0,.6));
          animation: hsPricePulse 2.5s ease-in-out infinite 2s;
        }
        @keyframes hsPricePulse {
          0%,100% { filter: drop-shadow(0 6px 24px rgba(255,80,0,.6)); transform: scale(1); }
          50%      { filter: drop-shadow(0 8px 50px rgba(255,120,0,.95)); transform: scale(1.03); }
        }

        /* Badge descuento — bola de fuego */
        .hs-off-badge {
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          width: clamp(150px, 20%, 230px);
          height: clamp(150px, 20%, 230px);
          border-radius: 50%;
          background: radial-gradient(circle at 40% 35%, #ffdd00, #ff6600, #cc1a00);
          box-shadow:
            0 0 30px rgba(255,100,0,.7),
            0 0 60px rgba(255,60,0,.4),
            0 0 100px rgba(255,40,0,.2);
          flex-shrink: 0;
          animation: hsOffPulse 2s ease-in-out infinite 2.5s;
        }
        @keyframes hsOffPulse {
          0%,100% { transform: scale(1); box-shadow: 0 0 30px rgba(255,100,0,.7), 0 0 60px rgba(255,60,0,.4); }
          50%      { transform: scale(1.12); box-shadow: 0 0 50px rgba(255,150,0,.9), 0 0 90px rgba(255,80,0,.6); }
        }
        .hs-off-pct {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(66px, 10%, 120px);
          line-height: 1; color: #fff; font-weight: 900;
          text-shadow: 0 2px 6px rgba(0,0,0,.4);
        }
        .hs-off-lbl {
          font-size: clamp(18px, 2.4%, 30px); letter-spacing: 2px;
          font-weight: 800; text-transform: uppercase;
          color: rgba(255,255,255,.85);
        }

        .hs-cuotas {
          font-size: clamp(20px, 2.4%, 30px);
          color: rgba(255,200,150,.65); font-weight: 400; text-align: center;
        }
        .hs-cuotas strong { color: #ffaa44; font-weight: 700; }

        /* ── WHATSAPP ── */
        .hs-whatsapp {
          display: inline-flex; align-items: center; gap: 14px;
          padding: 20px 42px; border-radius: 14px;
          background: #25D366;
          color: #fff; font-size: clamp(24px, 2.8%, 36px);
          font-weight: 700; letter-spacing: .5px;
          box-shadow: 0 6px 24px rgba(37,211,102,.35);
          align-self: center;
          opacity: 0; transform: translateY(30px) scale(.88);
          transition: opacity .8s ease .6s, transform .9s cubic-bezier(.34,1.8,.64,1) .6s;
        }
        .hs-content.idle .hs-whatsapp { opacity: 1; transform: translateY(0) scale(1); }
        .hs-wa-icon { width: clamp(32px, 3.2%, 46px); height: clamp(32px, 3.2%, 46px); fill: #fff; }

        /* ── TAGS ── */
        .hs-tags {
          display: flex; gap: 8px; flex-wrap: wrap;
          position: absolute; bottom: 4%; left: 4%;
          z-index: 10;
          opacity: 0; transform: translateY(30px);
          transition: opacity .8s ease .5s, transform .8s cubic-bezier(.34,1.6,.64,1) .5s;
        }
        .hs-tags.on { opacity: 1; transform: translateY(0); }
        .hs-tag {
          font-size: clamp(9px, .85%, 12px);
          font-weight: 700; letter-spacing: 1px; text-transform: uppercase;
          padding: 7px 14px; border-radius: 6px;
        }
        .hs-tag-fire   { background: rgba(255,60,0,.15); color: #ff8844; border: 1px solid rgba(255,80,0,.3); }
        .hs-tag-gold   { background: rgba(255,200,0,.12); color: #ffcc44; border: 1px solid rgba(255,200,0,.25); }
        .hs-tag-white  { background: rgba(255,255,255,.08); color: rgba(255,220,180,.8); border: 1px solid rgba(255,255,255,.12); }

        /* ── BARRA PROGRESO ── */
        .hs-progress-wrap {
          position: absolute; bottom: 0; left: 0; right: 0; z-index: 10;
          height: 4px; background: rgba(255,60,0,.12);
        }
        .hs-progress-bar {
          height: 100%;
          background: linear-gradient(to right, #cc1a00, #ff6600, #ffcc00);
          box-shadow: 0 0 8px rgba(255,100,0,.6);
          transition: width .1s linear;
        }

        /* ── DOTS ── */
        .hs-dots {
          position: absolute; bottom: 3%; right: 5%;
          display: flex; gap: 10px; align-items: center; z-index: 10;
        }
        .hs-dot {
          width: 9px; height: 9px; border-radius: 50%;
          border: 1.5px solid rgba(255,100,0,.4);
          background: transparent; cursor: pointer;
          transition: background .3s, transform .3s, border-color .3s, box-shadow .3s;
        }
        .hs-dot.active {
          background: #ff6600;
          border-color: #ff6600;
          transform: scale(1.3);
          box-shadow: 0 0 8px rgba(255,100,0,.7);
        }

        /* Línea divisoria vertical */
        .hs-vline {
          position: absolute; top: 10%; bottom: 10%;
          left: 48%; width: 1px; z-index: 3; pointer-events: none;
          background: linear-gradient(to bottom, transparent, rgba(255,80,0,.2) 20%, rgba(255,80,0,.2) 80%, transparent);
        }

        /* Número producto top-right */
        .hs-counter {
          position: absolute; top: 3%; right: 4%; z-index: 10;
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(12px, 1.5%, 20px);
          letter-spacing: 3px; color: rgba(255,150,80,.5);
          opacity: 0; transform: translateX(20px);
          transition: opacity .7s ease .5s, transform .7s ease .5s;
        }
        .hs-counter.on { opacity: 1; transform: translateX(0); }
      `}</style>

      <div className="hs">

        {/* FONDOS */}
        <div className="hs-bg" />
        <div className="hs-heat-lines" />
        <div className="hs-lava-right" />
        <div className="hs-glow-top" />

        {/* EMBERS — partículas estáticas (calculadas fuera del render en prod, aquí inline) */}

        {/* LOGO */}
        <div className={`hs-logo ${mounted ? 'on' : ''}`}>
          <img src={logo} alt="Logo" />
        </div>

        {/* BANDA HOT SALE */}
        <div className={`hs-banner ${mounted ? 'on' : ''}`}>
          <span className="hs-banner-fire">🔥</span>
          <span className="hs-banner-txt"><span>HOT</span> SALE</span>
        </div>

        {/* COUNTER */}

        {/* LÍNEA VERTICAL */}
        <div className="hs-vline" />

        {/* LAYOUT */}
        <div className="hs-layout">

          {/* IZQUIERDA — IMAGEN */}
          <div className="hs-left">
            <div className="hs-img-glow" />
            <div className="hs-floor" />
            <div className={`hs-img-wrap ${mounted ? 'on' : ''}`}>
              <img className="hs-img" src={imagenProducto} alt={titulo} />
            </div>
            <div className={`hs-eyebrow ${mounted ? 'on' : ''}`}>
              <span className="hs-eyebrow-txt">🔥 {categoria}</span>
            </div>
            <div className="hs-corner hs-corner-tl" />
            <div className="hs-corner hs-corner-tr" />
            <div className="hs-corner hs-corner-bl" />
            <div className="hs-corner hs-corner-br" />
          </div>

          {/* DERECHA — CONTENIDO */}
          <div className="hs-right">
            <img className="hs-fire-bg" src={fireBg} alt="" />
            <div className="hs-content idle">

              <div className="hs-slogan">Precios que arden!</div>

              <div className="hs-titulo-group">
                <div className={`hs-img-titulo ${mounted ? 'on' : ''}`}>
                  <span className="hs-img-titulo-dest">{titulo}</span>
                </div>

                <div className="hs-subtitulo">{categoria}</div>
              </div>

              <p className="hs-desc">{descripcion}</p>

              <div className="hs-price-block">
                <div className="hs-price-row">
                  <div className="hs-price-nums">
                    {formatPrecio(precioLista) && (
                      <div className="hs-price-antes">Antes: {formatPrecio(precioLista)}</div>
                    )}
                    <div className="hs-price-nuevo">{formatPrecio(precioOferta)}</div>
                  </div>
                  {porcentajeDescuento && (
                    <div className="hs-off-badge">
                      <span className="hs-off-pct">{porcentajeDescuento}%</span>
                      <span className="hs-off-lbl">OFF</span>
                    </div>
                  )}
                </div>
                <div className="hs-cuotas">
                  Hasta <strong>12 cuotas sin interés</strong>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="hs-whatsapp">
                <svg className="hs-wa-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                <span>381 2108473</span>
              </div>

            </div>
          </div>
        </div>

        {/* TAGS */}
        <div className={`hs-tags ${mounted ? 'on' : ''}`}>
          <span className="hs-tag hs-tag-fire">🔥 Hot Sale</span>
          <span className="hs-tag hs-tag-gold">⚡ Oferta limitada</span>
          <span className="hs-tag hs-tag-white">✓ Envío gratis</span>
        </div>

        {/* DOTS */}

        {/* BARRA PROGRESO */}

      </div>
    </>
  );
}
