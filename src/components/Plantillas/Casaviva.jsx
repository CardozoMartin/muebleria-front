import React, { useEffect, useState } from "react";
import logo from "./../../assets/logo.png";
import comedor from "./../../assets/comedor.png";

export default function CasaViva({
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
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [titulo, imagenProducto]);

  const formatPrecio = (n) =>
    n ? `$ ${Number(n).toLocaleString("es-AR")}` : null;

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Outfit:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <style>{`
        *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }

        .cv {
          width:100%; height:100%;
          position:relative; overflow:hidden;
          font-family:'Outfit',sans-serif;
          background:#f4f6f2;
        }

        /* ── FONDO ── */
        .cv-bg {
          position:absolute; inset:0; z-index:0;
          background: linear-gradient(135deg, #f0f9f4 0%, #e8f5ee 30%, #f2f7f0 60%, #e3f1e9 100%);
        }

        /* Patrón sutil puntitos */
        .cv-pattern {
          position:absolute; inset:0; z-index:0; opacity:.5;
          background-image: radial-gradient(circle, #c8ddc0 1px, transparent 1px);
          background-size: 28px 28px;
        }

        /* Forma decorativa grande derecha */
        .cv-shape-main {
          position:absolute; right:-8vw; top:-8vh;
          width:58vw; height:116vh;
          border-radius:40% 0 0 40%;
          z-index:1; pointer-events:none;
          transition: background 1.2s ease;
        }

        /* Forma orgánica izquierda */
        .cv-shape-left {
          position:absolute; left:-10vw; bottom:-10vh;
          width:45vw; height:60vh;
          border-radius:50% 50% 0 0;
          z-index:1; pointer-events:none;
          background:radial-gradient(ellipse at top, rgba(45,122,79,.14) 0%, transparent 70%);
          transform:rotate(-15deg);
          transition: background 1s ease;
        }

        /* Blob decorativo superior derecho */
        .cv-blob-top {
          position:absolute; right:5vw; top:10vh;
          width:25vw; height:25vw;
          border-radius:60% 40% 50% 45%;
          background:radial-gradient(circle at 30% 40%, rgba(58,158,104,.2) 0%, transparent 70%);
          z-index:1; pointer-events:none;
          animation:cvBlobFloat 15s ease-in-out infinite;
        }
        @keyframes cvBlobFloat {
          0%,100%{transform:translateY(0) rotate(0deg);}
          33%{transform:translateY(-20px) rotate(5deg);}
          66%{transform:translateY(10px) rotate(-5deg);}
        }

        /* Anillos concentricos decorativos */
        .cv-rings {
          position:absolute; right:15vw; bottom:15vh;
          width:28vw; height:28vw;
          z-index:1; pointer-events:none;
          border-radius:50%;
          background:
            radial-gradient(circle at center, transparent 40%, rgba(45,122,79,.12) 40%, rgba(45,122,79,.12) 42%, transparent 42%),
            radial-gradient(circle at center, transparent 55%, rgba(58,158,104,.1) 55%, rgba(58,158,104,.1) 57%, transparent 57%),
            radial-gradient(circle at center, transparent 70%, rgba(26,92,58,.08) 70%, rgba(26,92,58,.08) 72%, transparent 72%);
        }

        /* Círculos flotantes pequeños */
        .cv-circle-float {
          position:absolute;
          border-radius:50%;
          z-index:1; pointer-events:none;
        }
        .cv-circle-float-1 {
          right:25vw; top:25vh;
          width:8vw; height:8vw;
          background:radial-gradient(circle, rgba(45,122,79,.16) 0%, transparent 70%);
          animation:cvFloatSlow 12s ease-in-out infinite;
        }
        .cv-circle-float-2 {
          left:20vw; top:18vh;
          width:12vw; height:12vw;
          background:radial-gradient(circle, rgba(58,158,104,.14) 0%, transparent 70%);
          animation:cvFloatSlow 14s ease-in-out infinite reverse;
        }
        .cv-circle-float-3 {
          right:35vw; bottom:25vh;
          width:6vw; height:6vw;
          background:radial-gradient(circle, rgba(26,92,58,.18) 0%, transparent 70%);
          animation:cvFloatSlow 10s ease-in-out infinite;
        }
        @keyframes cvFloatSlow {
          0%,100%{transform:translateY(0) scale(1);}
          50%{transform:translateY(-15px) scale(1.05);}
        }

        /* Gradiente radial inferior */
        .cv-gradient-bottom {
          position:absolute; bottom:0; left:0; right:0;
          height:30vh; z-index:1; pointer-events:none;
          background:radial-gradient(ellipse at bottom, rgba(45,122,79,.1) 0%, transparent 60%);
        }

        /* Círculo deco top left */
        .cv-circle-deco {
          position:absolute; left:-6vw; top:-6vw;
          width:22vw; height:22vw; border-radius:50%;
          z-index:1; pointer-events:none;
          border: 1.5px solid rgba(45,122,79,.12);
          transition: border-color 1s ease;
        }
        .cv-circle-deco2 {
          position:absolute; left:-3.5vw; top:-3.5vw;
          width:15vw; height:15vw; border-radius:50%;
          z-index:1; pointer-events:none;
          border: 1px solid rgba(45,122,79,.08);
        }

        /* Líneas deco diagonales fondo */
        .cv-lines-deco {
          position:absolute; inset:0; z-index:1; opacity:.04; pointer-events:none;
          background: repeating-linear-gradient(
            -45deg, 
            #2d7a4f 0px, #2d7a4f 1px, 
            transparent 1px, transparent 60px
          );
        }

        /* ── LOGO ── */
        .cv-logo {
          position:absolute; top:3vh; left:3vw; z-index:10;
          opacity:0; transform:translateY(-20px) scale(.85);
          transition:opacity .9s ease .2s,transform .9s cubic-bezier(.34,1.56,.64,1) .2s;
        }
        .cv-logo.on { opacity:1; transform:translateY(0) scale(1); }
        .cv-logo img {
          height:clamp(120px,14.4vh,192px); width:auto;
          opacity:.95;
        }

        /* ── BADGE AMBIENTE ── */
        .cv-ambiente {
          position:absolute; top:5vh; right:5.5vw; z-index:10;
          display:flex; align-items:center; gap:8px;
          padding: 8px 18px;
          border-radius: 100px;
          background: rgba(255,255,255,.85);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(45,122,79,.15);
          box-shadow: 0 4px 20px rgba(45,122,79,.08);
          opacity:0; transform:translateX(30px) scale(.9);
          transition:opacity .8s ease .8s,transform .8s cubic-bezier(.34,1.3,.64,1) .8s, background 1s ease, border-color 1s ease;
        }
        .cv-ambiente.on { opacity:1; transform:translateX(0) scale(1); }
        .cv-amb-dot { width:7px; height:7px; border-radius:50%; transition:background .8s ease; }
        .cv-amb-txt {
          font-size:clamp(10px,.8vw,13px); letter-spacing:3px;
          text-transform:uppercase; font-weight:600;
          color:#4a5e4f;
        }

        /* ── LAYOUT ── */
        .cv-layout {
          position:absolute; inset:0; z-index:5;
          display:grid;
          grid-template-columns:50% 1fr;
        }

        /* ── IZQUIERDA ── */
        .cv-left {
          display:flex; flex-direction:column; justify-content:center;
          align-items:center;
          padding:8vh 2vw 8vh 4vw; gap:2vh;
          position:relative; z-index:2;
        }

        /* Tag oferta */
        .cv-eyebrow {
          display:inline-flex; align-items:center; gap:10px;
          opacity:0; transform:translateX(-80px) scale(.8) rotate(-5deg);
          transition:opacity .9s ease, transform 1s cubic-bezier(.34,1.7,.64,1) ease;
        }
        .cv-eyebrow.on { opacity:1; transform:translateX(0) scale(1) rotate(0); }
        .cv-ey-pill {
          display:flex; align-items:center; gap:8px;
          padding:6px 14px; border-radius:4px;
          border-left: 3px solid;
          background:rgba(255,255,255,.9);
          box-shadow: 0 2px 12px rgba(0,0,0,.06);
          transition: border-color 1s ease;
        }
        .cv-ey-txt {
          font-size:clamp(10px,.82vw,13px); letter-spacing:3px;
          text-transform:uppercase; font-weight:700;
          transition: color 1s ease;
        }

        /* Título */
        .cv-titulo {
          font-family:'Playfair Display',serif;
          font-size:clamp(44px,6.2vw,100px);
          line-height:.95; letter-spacing:-.5px;
          color:#1c2b20;
          text-align:center;
        }
        .cv-titulo-dest {
          display:block; font-style:italic;
          transition:color 1.2s ease;
          animation: cvTituloDestAnim 1s cubic-bezier(.34,1.9,.64,1) .15s backwards;
        }
        @keyframes cvTituloDestAnim {
          0% { opacity:0; transform:translateY(-50px) scale(.75); }
          100% { opacity:1; transform:translateY(0) scale(1); }
        }

        /* Divider */
        .cv-divider {
          display:flex; align-items:center; gap:14px; margin-top:.2vh;
        }
        .cv-div-line {
          height:2px; width:40px; border-radius:2px;
          transition:background 1s ease;
        }
        .cv-div-txt {
          font-size:clamp(12px,1vw,16px); letter-spacing:2px;
          text-transform:uppercase; color:#7a9280; font-weight:500;
        }

        /* Descripción */
        .cv-desc {
          font-size:clamp(15px,1.3vw,20px); line-height:1.7; font-weight:400;
          color:#6a7f70; max-width:500px;
        }

        /* Tarjeta de precio */
        .cv-price-card {
          background:rgba(255,255,255,.9);
          border-radius:16px;
          padding: 22px 26px;
          box-shadow: 0 8px 32px rgba(45,122,79,.08), 0 2px 8px rgba(0,0,0,.04);
          border: 1px solid rgba(45,122,79,.1);
          display:flex; flex-direction:column; gap:10px;
          max-width: 500px;
          transition: border-color 1s ease, box-shadow 1s ease;
        }
        .cv-price-label {
          font-size:clamp(10px,.82vw,14px); letter-spacing:3px; text-transform:uppercase;
          color:#9aad9e; font-weight:600;
        }
        .cv-price-old {
          font-size:clamp(24px,3vw,40px); color:#b0bdb3;
          text-decoration:line-through; font-weight:500; letter-spacing:.5px;
        }
        .cv-price-row { display:flex; align-items:flex-end; gap:16px; flex-wrap:wrap; }
        .cv-price-new {
          font-family:'Playfair Display',serif;
          font-size:clamp(28px,3.8vw,58px);
          line-height:1; letter-spacing:-1px;
          color:#1c2b20; white-space:nowrap;
        }

        /* Badge OFF */
        .cv-off-pill {
          display:flex; flex-direction:column; align-items:center;
          padding:10px 15px; margin-bottom:8px;
          border-radius:10px; min-width:68px;
          transition:background 1.2s ease;
        }
        .cv-off-pct {
          font-family:'Playfair Display',serif;
          font-size:clamp(24px,3vw,44px); line-height:1; color:#fff; font-weight:700;
        }
        .cv-off-lbl {
          font-size:clamp(10px,.7vw,12px); letter-spacing:3px; font-weight:700;
          text-transform:uppercase; color:rgba(255,255,255,.75);
        }

        /* Cuotas */
        .cv-cuotas {
          font-size:clamp(14px,1.1vw,18px); color:#8a9e90; font-weight:400;
        }
        .cv-cuotas strong { color:#2d7a4f; font-weight:700; transition: color 1s ease; }

        /* Features chips */
        .cv-features { display:flex; gap:8px; flex-wrap:wrap; }
        .cv-feat {
          font-size:clamp(10px,.78vw,13px); font-weight:600; letter-spacing:1px;
          text-transform:uppercase; padding:8px 16px; border-radius:8px;
          background:rgba(255,255,255,.85);
          border: 1px solid rgba(45,122,79,.15);
          color:#4a6e52;
          box-shadow: 0 2px 8px rgba(45,122,79,.06);
          transition: border-color 1s ease, color 1s ease;
        }

        /* WhatsApp badge */
        .cv-whatsapp {
          display:inline-flex; align-items:center; gap:14px;
          padding:20px 36px; border-radius:18px;
          background:#25D366;
          color:#fff;
          font-size:clamp(20px,1.6vw,30px);
          font-weight:800;
          letter-spacing:.6px;
          box-shadow: 0 8px 28px rgba(37,211,102,.36), 0 3px 10px rgba(0,0,0,.12);
          margin-top:12px;
          align-self:flex-start; /* alinear con el resto del texto */
        }
        .cv-whatsapp-icon {
          width:clamp(36px,3.2vw,48px);
          height:clamp(36px,3.2vw,48px);
          fill:#fff;
        }

        /* ── DERECHA ── */
        .cv-right {
          position:relative; display:flex;
          align-items:center; justify-content:center;
          z-index:2;
          padding:2vh 2vw;
        }

        /* Glow imagen */
        .cv-img-glow {
          position:absolute; width:65%; height:55%;
          border-radius:50%; pointer-events:none;
          filter:blur(60px); opacity:.22;
          transition:background 1.2s ease;
        }

        /* Sombra suelo */
        .cv-floor {
          position:absolute; bottom:12%; left:50%; transform:translateX(-50%);
          width:65%; height:4%;
          background:radial-gradient(ellipse,rgba(45,122,79,.18) 0%,transparent 70%);
          pointer-events:none; z-index:2;
          transition: background 1s ease;
        }

        /* Imagen */
        .cv-img-wrap {
          position:relative; z-index:3;
          width:95%; height:95%;
          display:flex; align-items:center; justify-content:center;
          opacity:0; transform:translateX(50px) translateY(20px) scale(.7);
          transition:opacity 1.2s ease .6s,transform 1.2s cubic-bezier(.34,1.56,.64,1) .6s;
        }
        .cv-img-wrap.on { opacity:1; transform:translateX(0) translateY(0) scale(1); }
        .cv-img-wrap.out { opacity:0!important; transform:translateX(60px) translateY(-15px) scale(.85) rotate(3deg)!important; transition:opacity .4s ease,transform .4s cubic-bezier(.6,-.28,.74,.05) !important; }
        .cv-img-wrap.in { opacity:0; transform:translateX(-50px) translateY(20px) scale(.75) rotate(-3deg)!important; transition:opacity .6s ease .15s,transform .9s cubic-bezier(.34,1.56,.64,1) .15s!important; }

        .cv-img {
          width:100%; height:100%;
          max-height:none; max-width:none;
          object-fit:contain;
          animation:cvFloat 7s ease-in-out infinite;
        }
        @keyframes cvFloat { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-14px);} }

        /* ── PANEL INFO BOTTOM (franja inferior izquierda) ── */
        .cv-bottom-strip {
          position:absolute; bottom:28px; left:0; right:0; z-index:6;
          min-width:52px;
          height:52px;
          display:flex; align-items:center; gap:0;
          pointer-events:none;
        }
        .cv-bstrip-block {
          height:100%; display:flex; align-items:center;
          padding:0 20px; gap:10px;
          background:rgba(255,255,255,.75);
          border: 1px solid rgba(45,122,79,.1);
          border-radius:8px;
          margin-right:8px;
          backdrop-filter:blur(4px);
        }
        .cv-bstrip-icon { font-size:16px; }
        .cv-bstrip-txt { font-size:clamp(10px,.8vw,13px); font-weight:600; color:#4a6e52; letter-spacing:.5px; }

        /* ── RECUADRO SUBTITULO ── */
        .cv-subtitle-box {
          display:inline-flex; align-items:center; gap:10px;
          background:rgba(255,255,255,.7);
          border:1px solid rgba(45,122,79,.12);
          border-radius:8px;
          padding:8px 14px;
          backdrop-filter:blur(4px);
        }

        /* ── FRAME DECORATIVO IMAGEN ── */
        .cv-img-frame {
          position:absolute; z-index:2;
          border-radius:20px;
          pointer-events:none;
        }
        .cv-img-frame-outer {
          inset:10% 5% 10% 5%;
          border: 1.5px solid rgba(45,122,79,.1);
        }
        .cv-img-frame-inner {
          inset:18% 12% 18% 12%;
          border: 1px dashed rgba(45,122,79,.08);
        }

        /* ── CORNER MARKS ── */
        .cv-corner {
          position:absolute; width:20px; height:20px; z-index:3; pointer-events:none;
          transition: border-color 1s ease;
        }
        .cv-corner-tl { top:11%; left:6%; border-top:2px solid; border-left:2px solid; border-radius:4px 0 0 0; }
        .cv-corner-tr { top:11%; right:6%; border-top:2px solid; border-right:2px solid; border-radius:0 4px 0 0; }
        .cv-corner-bl { bottom:11%; left:6%; border-bottom:2px solid; border-left:2px solid; border-radius:0 0 0 4px; }
        .cv-corner-br { bottom:11%; right:6%; border-bottom:2px solid; border-right:2px solid; border-radius:0 0 4px 0; }

        /* ── RECUADRO DESCRIPCION ── */
        .cv-desc-box {
          background:rgba(255,255,255,.55);
          border-left: 3px solid;
          border-radius:0 8px 8px 0;
          padding:12px 16px;
          border-top: 1px solid rgba(45,122,79,.08);
          border-right: 1px solid rgba(45,122,79,.08);
          border-bottom: 1px solid rgba(45,122,79,.08);
          transition: border-color 1s ease;
        }
        .cv-content { display:flex; flex-direction:column; gap:2vh; transition:opacity .35s ease,transform .35s ease; }
        .cv-content.out { opacity:0; transform:translateX(-28px); }
        .cv-content.in { opacity:0; transform:translateX(28px); transition:opacity .5s ease .1s,transform .65s cubic-bezier(.22,1,.36,1) .1s; }
        .cv-content.idle { opacity:1; transform:translateX(0); }

        /* Estáticos */
        .cv-static { opacity:0; transform:translateY(40px) scale(.85); transition:opacity 1s ease, transform 1s cubic-bezier(.34,1.8,.64,1) ease; }
        .cv-static.on { opacity:1; transform:translateY(0) scale(1); }

        /* Animaciones individuales para elementos del contenido */
        .cv-titulo { opacity:0; transform:translateX(-80px) scale(.85) rotate(-3deg); transition:opacity .8s ease .05s, transform .9s cubic-bezier(.34,1.8,.64,1) .05s; }
        .cv-content.idle .cv-titulo { opacity:1; transform:translateX(0) scale(1) rotate(0); }
        .cv-subtitle-box { opacity:0; transform:translateX(-60px) scale(.9); transition:opacity .7s ease .2s, transform .8s cubic-bezier(.34,1.6,.64,1) .2s; }
        .cv-content.idle .cv-subtitle-box { opacity:1; transform:translateX(0) scale(1); }
        .cv-desc-box { opacity:0; transform:translateX(70px) scale(.88) rotate(2deg); transition:opacity .75s ease .3s, transform .85s cubic-bezier(.34,1.7,.64,1) .3s; }
        .cv-content.idle .cv-desc-box { opacity:1; transform:translateX(0) scale(1) rotate(0); }
        .cv-price-card { opacity:0; transform:translateY(60px) scale(.85); transition:opacity .8s ease .4s, transform .9s cubic-bezier(.34,1.9,.64,1) .4s; }
        .cv-content.idle .cv-price-card { opacity:1; transform:translateY(0) scale(1); }

        /* ── BARRA PROGRESO INFERIOR ── */
        .cv-progress-bar-wrap {
          position:absolute; bottom:0; left:0; right:0; z-index:10;
          height:4px; background:rgba(45,122,79,.1);
        }
        .cv-progress-bar {
          height:100%; transition:width .1s linear, background 1s ease;
        }

        /* ── DOTS ── */
        .cv-dots {
          position:absolute; bottom:4.5vh; left:50%; transform:translateX(-50%); z-index:10;
          display:flex; gap:12px; align-items:center;
        }
        .cv-dot {
          width:10px; height:10px; border-radius:50%;
          border:1.5px solid rgba(45,122,79,.35);
          background:transparent;
          cursor:pointer;
          transition:background .3s,transform .3s,border-color .3s;
        }
        .cv-dot.active {
          background:rgba(45,122,79,.85);
          border-color:rgba(45,122,79,.85);
          transform:scale(1.3);
        }

        /* Línea separadora vertical deco */
        .cv-v-line {
          position:absolute; top:15vh; bottom:15vh;
          left:50%; width:1px; z-index:1; pointer-events:none;
          background:linear-gradient(to bottom, transparent, rgba(45,122,79,.1) 20%, rgba(45,122,79,.1) 80%, transparent);
        }
      `}</style>

      <div className="cv">
        {/* FONDO */}
        <div className="cv-bg" />
        <div className="cv-pattern" />
        <div className="cv-lines-deco" />
        <div className="cv-gradient-bottom" />

        {/* Formas decorativas */}
        <div
          className="cv-shape-main"
          style={{
            background:
              "linear-gradient(160deg, #e8f5ee 0%, rgba(255,255,255,0) 70%)",
          }}
        />
        <div
          className="cv-shape-left"
          style={{
            background:
              "radial-gradient(ellipse at top, rgba(45,122,79,.1) 0%, transparent 70%)",
          }}
        />
        <div
          className="cv-blob-top"
          style={{
            background:
              "radial-gradient(circle at 30% 40%, rgba(45,122,79,.15) 0%, transparent 70%)",
          }}
        />
        <div className="cv-rings" />

        {/* Círculos flotantes */}
        <div className="cv-circle-float cv-circle-float-1" />
        <div className="cv-circle-float cv-circle-float-2" />
        <div className="cv-circle-float cv-circle-float-3" />

        {/* Círculos deco top left */}
        <div
          className="cv-circle-deco"
          style={{ borderColor: "rgba(45,122,79,.14)" }}
        />
        <div
          className="cv-circle-deco2"
          style={{ borderColor: "rgba(45,122,79,.08)" }}
        />

        {/* Línea vertical separadora */}
        <div className="cv-v-line" />

        {/* LOGO */}
        <div className={`cv-logo ${mounted ? "on" : ""}`}>
          <img src={logo} alt="Logo" />
        </div>

        {/* BADGE AMBIENTE */}
        <div
          className={`cv-ambiente ${mounted ? "on" : ""}`}
          style={{ borderColor: "rgba(45,122,79,.15)" }}
        >
          <div className="cv-amb-dot" style={{ background: "#2d7a4f" }} />
          <span className="cv-amb-txt">{categoria}</span>
        </div>

        {/* LAYOUT */}
        <div className="cv-layout">
          {/* IZQUIERDA */}
          <div className="cv-left">
            {/* Eyebrow */}
            <div
              className={`cv-eyebrow cv-static ${mounted ? "on" : ""}`}
              style={{ transitionDelay: ".4s" }}
            >
              <div
                className="cv-ey-pill"
                style={{ borderLeftColor: "#2d7a4f" }}
              >
                <span className="cv-ey-txt" style={{ color: "#2d7a4f" }}>
                  ❆ Oferta Especial
                </span>
              </div>
            </div>

            {/* Contenido dinámico */}
            <div className="cv-content idle">
              <div className="cv-titulo">
                <span className="cv-titulo-dest" style={{ color: "#2d7a4f" }}>
                  {titulo}
                </span>
              </div>

              {/* Subtítulo en recuadro */}
              <div
                className="cv-subtitle-box"
                style={{ borderColor: "rgba(45,122,79,.14)" }}
              >
                <div
                  className="cv-div-line"
                  style={{
                    background: "#2d7a4f",
                    height: "2px",
                    width: "28px",
                    borderRadius: "2px",
                    flexShrink: 0,
                  }}
                />
                <span className="cv-div-txt">{categoria}</span>
              </div>

              {/* Descripción en recuadro */}
              <div
                className="cv-desc-box"
                style={{ borderLeftColor: "#2d7a4f" }}
              >
                <p className="cv-desc" style={{ margin: 0 }}>
                  {descripcion}
                </p>
              </div>

              {/* Tarjeta precio */}
              <div
                className="cv-price-card"
                style={{
                  borderColor: "rgba(45,122,79,.14)",
                  boxShadow: "0 8px 32px rgba(45,122,79,.08)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "4px",
                    }}
                  >
                    <span className="cv-price-label">Precio oferta</span>
                    <div className="cv-price-old">
                      {formatPrecio(precioLista)}
                    </div>
                    <div className="cv-price-row">
                      <div className="cv-price-new">
                        {formatPrecio(precioOferta)}
                      </div>
                    </div>
                    <div className="cv-cuotas">
                      <strong style={{ color: "#2d7a4f" }}>
                        Consultar medios de Pago
                      </strong>
                    </div>
                  </div>
                  <div
                    className="cv-off-pill"
                    style={{
                      background: "#2d7a4f",
                      marginLeft: "12px",
                      flexShrink: 0,
                    }}
                  >
                    <span className="cv-off-pct">{porcentajeDescuento}%</span>
                    <span className="cv-off-lbl">OFF</span>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp */}
            <div
              className={`cv-whatsapp cv-static ${mounted ? "on" : ""}`}
              style={{ transitionDelay: "2s" }}
            >
              <svg
                className="cv-whatsapp-icon"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              <span>381 2108473</span>
            </div>
            {/* Features */}
            <div
              className={`cv-features cv-static ${mounted ? "on" : ""}`}
              style={{ transitionDelay: "1.8s", alignSelf: 'flex-start' }}
            >
              <span
                className="cv-feat"
                style={{ borderColor: "rgba(194, 4, 4, 0.18)", color: "#da0505", fontWeight:700, fontSize:'1rem' }}
              >
                www.mueblesdepinoml.com
              </span>
            </div>
          </div>

          {/* DERECHA */}
          <div className="cv-right">
            {/* Marcos decorativos */}
            <div
              className="cv-img-frame cv-img-frame-outer"
              style={{ borderColor: "rgba(45,122,79,.1)" }}
            />
            <div
              className="cv-img-frame cv-img-frame-inner"
              style={{ borderColor: "rgba(45,122,79,.07)" }}
            />
            {/* Esquinas */}
            <div
              className="cv-corner cv-corner-tl"
              style={{ borderColor: "#2d7a4f" }}
            />
            <div
              className="cv-corner cv-corner-tr"
              style={{ borderColor: "#2d7a4f" }}
            />
            <div
              className="cv-corner cv-corner-bl"
              style={{ borderColor: "#2d7a4f" }}
            />
            <div
              className="cv-corner cv-corner-br"
              style={{ borderColor: "#2d7a4f" }}
            />

            <div
              className="cv-img-glow"
              style={{
                background:
                  "radial-gradient(ellipse,rgba(45,122,79,.6) 0%,transparent 70%)",
              }}
            />
            <div
              className="cv-floor"
              style={{
                background:
                  "radial-gradient(ellipse,rgba(45,122,79,.15) 0%,transparent 70%)",
              }}
            />

            <div className={`cv-img-wrap ${mounted ? "on" : ""}`}>
              <img
                className="cv-img"
                src={imagenProducto}
                alt={titulo}
                style={{
                  filter:
                    "drop-shadow(0 24px 48px rgba(45,90,55,.22)) drop-shadow(0 0 50px rgba(45,122,79,.1))",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
