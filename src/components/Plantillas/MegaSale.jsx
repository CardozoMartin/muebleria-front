import { useEffect, useState } from 'react';
import comedor from './../../assets/comedor.png';
import fondo from './../../assets/fondo2.png';
import logo from './../../assets/logo.png';

export default function MegaSaleTV({
  titulo = 'Juego de Comedor',
  descripcion = 'Mesa extensible con 6 sillas tapizadas en tela premium. Estructura de roble macizo, acabado laqueado mate.',
  imagenProducto = comedor,
  precioLista = 500000,
  precioOferta = 250000,
  porcentajeDescuento = 50,
}) {
  const [mounted, setMounted] = useState(false);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const calc = () => setScale(Math.min(window.innerWidth / 1280, window.innerHeight / 720));
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);

  useEffect(() => {
    const t1 = setTimeout(() => setMounted(false), 0);
    const t2 = setTimeout(() => setMounted(true), 80);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [titulo, imagenProducto]);

  const fmt = (n) => (n ? `$ ${Number(n).toLocaleString('es-AR')}` : null);
  const tituloSize = titulo.length > 30 ? '52px' : titulo.length > 20 ? '64px' : '78px';

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Rubik:wght@700;900&family=Montserrat:wght@600;700;900&display=swap"
        rel="stylesheet"
      />
      <style>{`
        *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }

        /* Wrapper: ocupa toda la pantalla, fondo negro */
        .tv-viewport {
          width:100vw; height:100vh;
          display:flex; align-items:center; justify-content:center;
          background:#000; overflow:hidden;
        }

        /* Escena fija 1280×720 — se escala para llenar cualquier TV */
        .tv-scene {
          width:1280px; height:720px;
          position:relative; overflow:hidden;
          font-family:'Montserrat',sans-serif;
          flex-shrink:0;
          transform-origin:center center;
        }

        /* Fondo */
        .tv-bg {
          position:absolute; inset:0;
          width:100%; height:100%;
          object-fit:cover; z-index:0;
          opacity:0; transition:opacity 1.2s ease;
        }
        .tv-bg.on { opacity:1; }

        /* Flash de entrada */
        .flash {
          position:absolute; inset:0; z-index:50;
          background:white; pointer-events:none;
          animation:flashAnim .55s ease forwards;
        }
        @keyframes flashAnim { from{opacity:.75} to{opacity:0} }

        /* ── Logo: posición absoluta arriba izquierda ── */
        .tv-logo-anim {
          position:absolute; top:28px; left:28px; z-index:10;
          opacity:0; transform:translateY(-24px);
          transition: opacity .7s ease .2s, transform .7s cubic-bezier(.34,1.5,.64,1) .2s;
        }
        .tv-logo-anim.on { opacity:1; transform:translateY(0); }
        .tv-logo-ring {
          width:96px; height:96px; border-radius:50%;
          background:linear-gradient(135deg,#e63500,#ff8800,#ffcc00);
          padding:4px;
          box-shadow:0 0 22px rgba(230,100,0,.55);
          display:flex; align-items:center; justify-content:center;
        }
        .tv-logo-inner {
          width:100%; height:100%; border-radius:50%; background:#fff;
          display:flex; align-items:center; justify-content:center; overflow:hidden;
        }
        .tv-logo-inner img { width:82%; height:82%; object-fit:contain; }

        /* ── GRID: 2 columnas ── */
        /* Contenido texto: 680px | Imagen: 600px = 1280px */
        .tv-grid {
          position:absolute; inset:0; z-index:2;
          display:grid;
          grid-template-columns: 680px 600px;
          grid-template-rows: 720px;
        }

        /* ── Columna contenido ── */
        .tv-col-content {
          display:flex; flex-direction:column; justify-content:center;
          /* padding-top alto para que el contenido quede debajo del logo */
          padding:140px 28px 28px 28px;
          gap:13px; z-index:3;
        }

        /* Badge MEGA OFERTA */
        .tv-badge {
          align-self:flex-start;
          display:inline-flex; align-items:center; gap:10px;
          background:linear-gradient(135deg,#e63500,#ff8800);
          color:#fff; font-family:'Rubik',sans-serif;
          font-size:19px; font-weight:900;
          letter-spacing:3px; text-transform:uppercase;
          padding:9px 26px; border-radius:40px;
          box-shadow:0 0 28px rgba(230,53,0,.6);
          position:relative; overflow:hidden;
          opacity:0; transform:translateY(-26px);
          transition: opacity .6s ease .4s, transform .7s cubic-bezier(.34,1.5,.64,1) .4s;
        }
        .tv-badge.on { opacity:1; transform:translateY(0); }
        .tv-badge::after {
          content:''; position:absolute; top:0; left:-100%; width:55%; height:100%;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,.35),transparent);
          animation:shine 4.5s infinite 3s;
        }
        @keyframes shine { 0%{transform:translateX(0);opacity:1} 60%,100%{transform:translateX(450%);opacity:0} }
        .tv-dot {
          width:9px; height:9px; background:#fff; border-radius:50%; flex-shrink:0;
          animation:blink 1.2s infinite;
        }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:.1} }

        /* Título */
        .tv-titulo {
          font-family:'Bebas Neue',sans-serif;
          line-height:.93; letter-spacing:2px; color:#e63500;
          text-shadow:0 3px 14px rgba(230,53,0,.2);
          word-break:break-word;
          opacity:0; transform:translateX(-48px);
          transition: opacity .6s ease .7s, transform .9s cubic-bezier(.22,1.4,.36,1) .7s;
        }
        .tv-titulo.on { opacity:1; transform:translateX(0); }

        /* Descripción */
        .tv-desc {
          font-size:16px; font-weight:600; color:#1a1a1a; line-height:1.55;
          background:rgba(255,255,255,.84);
          border:2px solid rgba(230,53,0,.2); border-radius:11px;
          padding:10px 15px;
          display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;
          opacity:0; transform:translateX(34px);
          transition: opacity .6s ease .95s, transform .8s ease .95s;
        }
        .tv-desc.on { opacity:1; transform:translateX(0); }

        /* Precios */
        .tv-precios {
          display:flex; align-items:center; gap:14px; flex-wrap:nowrap;
          opacity:0; transform:translateY(16px);
          transition: opacity .6s ease 1.2s, transform .7s ease 1.2s;
        }
        .tv-precios.on { opacity:1; transform:translateY(0); }

        .tv-p-label { font-size:12px; font-weight:700; color:#555; text-transform:uppercase; letter-spacing:1px; margin-bottom:2px; }
        .tv-p-old   { font-size:35px; font-weight:700; color:#333; text-decoration:line-through; line-height:1; }

        .tv-off {
          display:inline-flex; align-items:center; justify-content:center;
          background:linear-gradient(135deg,#e63500,#ff8800);
          color:#fff; font-family:'Bebas Neue',sans-serif;
          font-size:40px; letter-spacing:2px;
          padding:10px 20px; border-radius:12px;
          box-shadow:0 0 26px rgba(230,53,0,.5); flex-shrink:0;
          animation:offPulse 2.4s ease-in-out infinite 3s;
        }
        @keyframes offPulse { 0%,100%{opacity:1} 50%{opacity:.78} }

        .tv-p-new-wrap {
          background:rgba(14,6,0,.9); border:3px solid #fff;
          border-radius:14px; padding:8px 22px 4px;
          box-shadow:0 0 20px rgba(255,255,255,.1); flex-shrink:0;
        }
        .tv-p-new {
          font-family:'Bebas Neue',sans-serif; font-size:82px; line-height:1;
          background:linear-gradient(135deg,#e63500 0%,#ff6600 40%,#ffaa00 100%);
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
          filter:drop-shadow(0 5px 16px rgba(230,80,0,.44));
          animation:newPulse 3s ease-in-out infinite 2.5s;
        }
        @keyframes newPulse { 0%,100%{opacity:1} 50%{opacity:.82} }

        /* Footer WhatsApp + Web */
        .tv-footer {
          display:flex; align-items:center; gap:12px; flex-wrap:nowrap;
          opacity:0; transform:translateY(16px);
          transition: opacity .7s ease 1.65s, transform .7s ease 1.65s;
        }
        .tv-footer.on { opacity:1; transform:translateY(0); }

        .tv-wa {
          display:inline-flex; align-items:center; gap:9px;
          padding:12px 20px; border-radius:12px;
          background:#25D366; color:#fff;
          font-size:20px; font-weight:900;
          box-shadow:0 5px 18px rgba(37,211,102,.4); flex-shrink:0;
        }
        .tv-wa svg { width:25px; height:25px; fill:#fff; flex-shrink:0; }

        .tv-web {
          display:inline-flex; align-items:center; gap:8px;
          padding:12px 20px; border-radius:12px;
          background:linear-gradient(135deg,#0055ee,#0088ff);
          border:2px solid #44bbff; color:#fff;
          font-size:17px; font-weight:900;
          box-shadow:0 5px 16px rgba(0,120,255,.35); white-space:nowrap;
        }

        /* ── Columna imagen: SIN overlay, imagen limpia ── */
        .tv-col-img {
          display:flex; align-items:center; justify-content:center;
          z-index:3;
          /* sombra suave solo en el wrapper */
          filter:drop-shadow(0 20px 40px rgba(0,0,0,.45));
          opacity:0; transform:translateX(65px);
          transition: opacity .9s ease .2s, transform 1s cubic-bezier(.34,1.4,.64,1) .2s;
        }
        .tv-col-img.on { opacity:1; transform:translateX(0); }
        .tv-col-img img {
          width:100%; height:100%; max-height:700px; object-fit:contain;
          animation:floatImg 4.5s ease-in-out infinite 1.5s;
        }
        @keyframes floatImg { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-13px)} }
      `}</style>

      <div className="tv-viewport">
        <div className="tv-scene" style={{ transform: `scale(${scale})` }}>
          {mounted && <div className="flash" />}

          {/* Fondo — imagen directa, sin overlay encima */}
          <img className={`tv-bg ${mounted ? 'on' : ''}`} src={fondo} alt="" aria-hidden />

          {/* Logo arriba izquierda, fuera del grid */}
          <div className={`tv-logo-anim ${mounted ? 'on' : ''}`}>
            <div className="tv-logo-ring">
              <div className="tv-logo-inner">
                <img src={logo} alt="Logo" />
              </div>
            </div>
          </div>

          <div className="tv-grid">
            {/* ── Columna texto ── */}
            <div className="tv-col-content">
              <div className={`tv-badge ${mounted ? 'on' : ''}`}>
                <span className="tv-dot" />⚡ MEGA OFERTA
              </div>

              <div className={`tv-titulo ${mounted ? 'on' : ''}`} style={{ fontSize: tituloSize }}>
                {titulo}
              </div>

              {descripcion && <p className={`tv-desc ${mounted ? 'on' : ''}`}>{descripcion}</p>}

              <div className={`tv-precios ${mounted ? 'on' : ''}`}>
                {precioLista > 0 && (
                  <div>
                    <div className="tv-p-label">Precio anterior</div>
                    <div className="tv-p-old">{fmt(precioLista)}</div>
                  </div>
                )}
                {porcentajeDescuento > 0 && (
                  <div className="tv-off">{porcentajeDescuento}% OFF</div>
                )}
                <div className="tv-p-new-wrap">
                  <div className="tv-p-new">{fmt(precioOferta)}</div>
                </div>
              </div>

              <div className={`tv-footer ${mounted ? 'on' : ''}`}>
                <div className="tv-wa">
                  <svg viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  381 2108473
                </div>
                <div className="tv-web">🌐 www.mueblesdepinoml.com</div>
              </div>
            </div>

            {/* ── Columna imagen ── */}
            <div className={`tv-col-img ${mounted ? 'on' : ''}`}>
              {imagenProducto && <img src={imagenProducto} alt={titulo} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
