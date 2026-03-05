import { useEffect, useState } from 'react';
import comedor from './../../assets/comedor.png';
import fondo from './../../assets/fondo1.jpeg';
import logo from './../../assets/logo.png';

/**
 * MegaSale — VERSIÓN OPTIMIZADA PARA SMART TV / PANTALLA 32"
 *
 * Cambios clave vs versión original:
 * - Layout fijo en px basado en 1280x720 (resolución base de TV 32")
 * - La imagen del producto ya NO usa position:absolute → no se superpone
 * - Grid de 3 zonas: [Logo | Contenido texto | Imagen producto]
 * - Todos los font-size en px fijos escalados para TV (no vw/vh que fallan)
 * - Scroll eliminado: todo entra en 720px de alto
 * - WhatsApp y link siempre visibles (sin depender de marginTop:auto)
 * - backdrop-filter:blur() eliminado (mata GPUs de TV)
 * - Animaciones simplificadas (solo opacity + translateY/X)
 */
export default function MegaSaleTV({
  titulo = 'Juego de Comedor',
  descripcion = 'Mesa extensible con 6 sillas tapizadas en tela premium. Estructura de roble macizo, acabado laqueado mate.',
  imagenProducto = comedor,
  precioLista = 500000,
  precioOferta = 250000,
  porcentajeDescuento = 50,
  categoria = 'Living & Comedor',
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

  const formatPrecio = (n) => (n ? `$ ${Number(n).toLocaleString('es-AR')}` : null);

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Rubik:wght@700;800;900&family=Montserrat:wght@400;600;700;900&display=swap"
        rel="stylesheet"
      />
      <style>{`
        *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }

        /*
          BASE: 1280 × 720px (HD — estándar Smart TV 32")
          Todo el layout vive en este rectángulo.
          Si la TV muestra 1920×1080, el navegador escala proporcionalmente.
        */
        .tv-root {
          width: 1280px;
          height: 720px;
          position: relative;
          overflow: hidden;
          font-family: 'Montserrat', sans-serif;
          background: #111;
          /* Centrar en cualquier viewport */
          margin: 0 auto;
        }

        /* ── FONDO ── */
        .tv-bg {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover; object-position: center;
          z-index: 0;
          opacity: 0;
          transition: opacity 1.2s ease;
          will-change: opacity;
          transform: translateZ(0);
        }
        .tv-bg.on { opacity: 1; }

        /* Overlay para que el texto sea legible sobre el fondo */
        .tv-overlay {
          position: absolute; inset: 0; z-index: 1;
          background: linear-gradient(
            to right,
            rgba(255,255,255,0.92) 0%,
            rgba(255,255,255,0.88) 55%,
            rgba(255,255,255,0.1) 100%
          );
        }

        /* ── FLASH DE ENTRADA ── */
        .flash {
          position: absolute; inset: 0; z-index: 20;
          background: white; pointer-events: none;
          animation: flashAnim 0.6s ease forwards;
          will-change: opacity;
        }
        @keyframes flashAnim { from { opacity:.7; } to { opacity:0; } }

        /* ──────────────────────────────────────────
           GRID PRINCIPAL — 3 columnas fijas en px
           [logo 160px] [contenido 660px] [imagen 460px]
           Total: 1280px exacto
        ────────────────────────────────────────── */
        .tv-grid {
          position: absolute; inset: 0; z-index: 2;
          display: grid;
          grid-template-columns: 160px 660px 460px;
          grid-template-rows: 720px;
          height: 720px;
        }

        /* ── COLUMNA IZQUIERDA: LOGO ── */
        .tv-col-logo {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 10px;
        }
        .tv-logo-wrap {
          opacity: 0;
          transform: translateX(-50px) translateZ(0);
          transition: opacity .9s ease .3s, transform .9s cubic-bezier(.34,1.56,.64,1) .3s;
          will-change: transform, opacity;
        }
        .tv-logo-wrap.on { opacity:1; transform:translateX(0) translateZ(0); }
        .tv-logo-circle {
          width: 130px; height: 130px;
          border-radius: 50%;
          background: linear-gradient(135deg, #e63500, #ff8800, #ffcc00);
          padding: 4px;
          box-shadow: 0 0 24px rgba(230,100,0,.5);
          display: flex; align-items: center; justify-content: center;
        }
        .tv-logo-inner {
          width: 100%; height: 100%;
          border-radius: 50%;
          background: #fff;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden;
        }
        .tv-logo-inner img {
          width: 82%; height: 82%;
          object-fit: contain;
        }

        /* ── COLUMNA CENTRAL: TODO EL TEXTO ── */
        .tv-col-content {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 18px 24px 18px 16px;
          gap: 10px;
          position: relative;
          z-index: 3;
        }

        /* Badge MEGA OFERTA — dentro del flujo, no absolute */
        .tv-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          align-self: flex-start;
          background: linear-gradient(135deg, #e63500, #ff8800);
          color: #fff;
          font-family: 'Rubik', sans-serif;
          font-size: 20px;
          font-weight: 900;
          letter-spacing: 3px;
          text-transform: uppercase;
          padding: 10px 28px;
          border-radius: 40px;
          box-shadow: 0 0 30px rgba(230,53,0,.6), 0 6px 20px rgba(230,53,0,.4);
          opacity: 0;
          transform: translateY(-30px) translateZ(0);
          transition: opacity .7s ease .4s, transform .8s cubic-bezier(.34,1.56,.64,1) .4s;
          will-change: transform, opacity;
          overflow: hidden;
        }
        .tv-badge.on { opacity:1; transform:translateY(0) translateZ(0); }
        .tv-badge::after {
          content:''; position:absolute; top:0; left:-100%; width:60%; height:100%;
          background: linear-gradient(90deg,transparent,rgba(255,255,255,.35),transparent);
          animation: shine 4s infinite 3s;
          will-change: transform;
        }
        @keyframes shine {
          0%   { transform: translateX(0); opacity: 1; }
          60%, 100% { transform: translateX(430%); opacity: 0; }
        }
        .tv-dot {
          width: 10px; height: 10px; background:#fff; border-radius:50%;
          animation: blink 1.2s infinite;
          will-change: opacity;
          flex-shrink: 0;
        }
        @keyframes blink { 0%,100%{opacity:1;} 50%{opacity:.1;} }

        /* Categoría */
        .tv-categoria {
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #888;
          display: flex;
          align-items: center;
          gap: 10px;
          opacity: 0;
          transform: translateX(-40px) translateZ(0);
          transition: opacity .5s ease .6s, transform .7s ease .6s;
          will-change: transform, opacity;
        }
        .tv-categoria.on { opacity:1; transform:translateX(0) translateZ(0); }
        .tv-categoria::before {
          content:'';
          width: 40px; height: 3px;
          background: linear-gradient(to right, #e63500, #ff9900);
          border-radius: 2px;
          flex-shrink: 0;
        }

        /* Título */
        .tv-titulo {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 72px;
          line-height: 0.9;
          letter-spacing: 2px;
          color: #e63500;
          text-shadow: 0 4px 16px rgba(230,53,0,.25);
          opacity: 0;
          transform: translateX(-60px) translateZ(0);
          transition: opacity .6s ease .8s, transform .9s cubic-bezier(.22,1.4,.36,1) .8s;
          will-change: transform, opacity;
          /* Fuerza wrapping en títulos largos */
          word-break: break-word;
          max-width: 100%;
        }
        .tv-titulo.on { opacity:1; transform:translateX(0) translateZ(0); }

        /* Descripción */
        .tv-desc {
          font-size: 17px;
          font-weight: 600;
          color: #222;
          line-height: 1.6;
          background: rgba(255,255,255,0.85);
          border: 2px solid rgba(230,53,0,.25);
          border-radius: 12px;
          padding: 12px 18px;
          max-width: 100%;
          /* Limitar a 3 líneas para que no desborde */
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          opacity: 0;
          transform: translateX(40px) translateZ(0);
          transition: opacity .6s ease 1.1s, transform .9s ease 1.1s;
          will-change: transform, opacity;
        }
        .tv-desc.on { opacity:1; transform:translateX(0) translateZ(0); }

        /* Bloque de precios */
        .tv-precios {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: nowrap;
          opacity: 0;
          transform: translateY(20px) translateZ(0);
          transition: opacity .6s ease 1.4s, transform .8s ease 1.4s;
          will-change: transform, opacity;
        }
        .tv-precios.on { opacity:1; transform:translateY(0) translateZ(0); }

        .tv-precio-viejo-wrap {
          display: flex;
          flex-direction: column;
        }
        .tv-precio-label {
          font-size: 13px;
          font-weight: 700;
          color: #666;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 2px;
        }
        .tv-precio-viejo {
          font-size: 38px;
          font-weight: 700;
          color: #333;
          text-decoration: line-through;
          line-height: 1;
        }

        .tv-descuento {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #e63500, #ff8800);
          color: white;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 42px;
          letter-spacing: 2px;
          padding: 10px 22px;
          border-radius: 12px;
          box-shadow: 0 0 30px rgba(230,53,0,.55), 0 6px 20px rgba(230,53,0,.4);
          animation: descPulse 2.4s ease-in-out infinite 3s;
          will-change: opacity;
          flex-shrink: 0;
        }
        @keyframes descPulse {
          0%,100% { opacity:1; }
          50% { opacity:.78; }
        }

        .tv-precio-nuevo-wrap {
          background: rgba(20,10,0,.88);
          border: 3px solid #fff;
          border-radius: 16px;
          padding: 10px 28px 6px;
          box-shadow: 0 0 24px rgba(255,255,255,.12);
          flex-shrink: 0;
        }
        .tv-precio-nuevo {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 86px;
          line-height: 1;
          background: linear-gradient(135deg, #e63500 0%, #ff6600 40%, #ffaa00 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 6px 20px rgba(230,80,0,.5));
          animation: pricePulse 3s ease-in-out infinite 2.5s;
          will-change: opacity;
        }
        @keyframes pricePulse { 0%,100%{opacity:1;} 50%{opacity:.82;} }

        /* WhatsApp + Link — fila horizontal */
        .tv-footer {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: nowrap;
          opacity: 0;
          transform: translateY(20px) translateZ(0);
          transition: opacity .8s ease 1.9s, transform .8s ease 1.9s;
          will-change: transform, opacity;
        }
        .tv-footer.on { opacity:1; transform:translateY(0) translateZ(0); }

        .tv-whatsapp {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 24px;
          border-radius: 14px;
          background: #25D366;
          color: #fff;
          font-size: 22px;
          font-weight: 900;
          letter-spacing: .4px;
          box-shadow: 0 6px 24px rgba(37,211,102,.4);
          flex-shrink: 0;
        }
        .tv-whatsapp svg {
          width: 28px; height: 28px; fill: #fff; flex-shrink: 0;
        }

        .tv-web {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 24px;
          border-radius: 14px;
          background: linear-gradient(135deg, #0066ff, #0094ff);
          border: 2px solid #00c8ff;
          color: #fff;
          font-size: 19px;
          font-weight: 900;
          letter-spacing: .5px;
          box-shadow: 0 6px 20px rgba(0,136,255,.35);
          white-space: nowrap;
        }

        /* ── COLUMNA DERECHA: IMAGEN DEL PRODUCTO ── */
        .tv-col-img {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 3;
          /* sombra en el wrapper, no en img animada */
          filter: drop-shadow(0 20px 40px rgba(0,0,0,.4)) drop-shadow(0 0 30px rgba(230,53,0,.2));
          opacity: 0;
          transform: translateX(80px) translateZ(0);
          transition: opacity .9s ease .2s, transform 1s cubic-bezier(.34,1.4,.64,1) .2s;
          will-change: transform, opacity;
        }
        .tv-col-img.on {
          opacity:1;
          transform: translateX(0) translateZ(0);
        }
        .tv-col-img img {
          width: 100%;
          height: 100%;
          max-height: 680px;
          object-fit: contain;
          /* float solo translateY — sin scale ni rotate */
          animation: floatImg 4.5s ease-in-out infinite 1.5s;
          will-change: transform;
          transform: translateZ(0);
        }
        @keyframes floatImg {
          0%,100% { transform: translateY(0) translateZ(0); }
          50%      { transform: translateY(-14px) translateZ(0); }
        }

        /* ── STAR CLIP (opcional, pásalo como clase al badge si querés) ── */
        .clip-star {
          clip-path: polygon(
            50% 0%, 61% 35%, 98% 35%, 68% 57%,
            79% 91%, 50% 70%, 21% 91%, 32% 57%,
            2% 35%, 39% 35%
          );
        }
      `}</style>

      <div className="tv-root">
        {mounted && <div className="flash" />}

        {/* FONDO */}
        <img className={`tv-bg ${mounted ? 'on' : ''}`} src={fondo} alt="" aria-hidden="true" />
        <div className="tv-overlay" />

        {/* GRID PRINCIPAL */}
        <div className="tv-grid">
          {/* ── COL 1: LOGO ── */}
          <div className="tv-col-logo">
            <div className={`tv-logo-wrap ${mounted ? 'on' : ''}`}>
              <div className="tv-logo-circle">
                <div className="tv-logo-inner">
                  <img src={logo} alt="Logo" />
                </div>
              </div>
            </div>
          </div>

          {/* ── COL 2: CONTENIDO ── */}
          <div className="tv-col-content">
            {/* Badge */}
            <div className={`tv-badge ${mounted ? 'on' : ''}`}>
              <span className="tv-dot" />⚡ MEGA OFERTA
            </div>

            {/* Categoría */}
            <div className={`tv-categoria ${mounted ? 'on' : ''}`}>{categoria}</div>

            {/* Título */}
            <div className={`tv-titulo ${mounted ? 'on' : ''}`}>{titulo}</div>

            {/* Descripción */}
            {descripcion && <p className={`tv-desc ${mounted ? 'on' : ''}`}>{descripcion}</p>}

            {/* Precios */}
            <div className={`tv-precios ${mounted ? 'on' : ''}`}>
              {precioLista > 0 && (
                <div className="tv-precio-viejo-wrap">
                  <div className="tv-precio-label">Precio anterior</div>
                  <div className="tv-precio-viejo">{formatPrecio(precioLista)}</div>
                </div>
              )}
              {porcentajeDescuento > 0 && (
                <div className="tv-descuento">{porcentajeDescuento}% OFF</div>
              )}
              <div className="tv-precio-nuevo-wrap">
                <div className="tv-precio-nuevo">{formatPrecio(precioOferta)}</div>
              </div>
            </div>

            {/* Footer: WhatsApp + Web */}
            <div className={`tv-footer ${mounted ? 'on' : ''}`}>
              <div className="tv-whatsapp">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                381 2108473
              </div>
              <div className="tv-web">🌐 www.mueblesdepinoml.com</div>
            </div>
          </div>

          {/* ── COL 3: IMAGEN PRODUCTO ── */}
          <div className={`tv-col-img ${mounted ? 'on' : ''}`}>
            {imagenProducto && <img src={imagenProducto} alt={titulo} />}
          </div>
        </div>
      </div>
    </>
  );
}
