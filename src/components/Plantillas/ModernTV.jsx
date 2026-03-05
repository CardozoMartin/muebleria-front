import { useEffect, useState } from 'react';

/**
 * ModernTV — Limpio / Moderno
 * Blanco puro, mucho espacio, tipografía geométrica fina.
 * La imagen es el protagonista visual, precio nítido y legible.
 */
export default function ModernTV({
  titulo = 'Juego de Comedor',
  descripcion = 'Mesa extensible con 6 sillas tapizadas en tela premium. Estructura de roble macizo, acabado laqueado mate.',
  imagenProducto = null,
  precioLista = 500000,
  precioOferta = 250000,
  porcentajeDescuento = 50,
  etiqueta = 'Oferta especial',
  whatsapp = '381 2108473',
  web = 'www.mueblesdepinoml.com',
  logoSrc = null,
  logoLetra = 'MP',
  accentColor = '#1a1a1a',
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
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [titulo, imagenProducto]);

  const fmt = (n) => n ? `$ ${Number(n).toLocaleString('es-AR')}` : null;
  const tituloSize = titulo.length > 30 ? '52px' : titulo.length > 20 ? '62px' : '76px';

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');

    .mn-viewport {
      width: 100vw; height: 100vh;
      display: flex; align-items: center; justify-content: center;
      background: #000; overflow: hidden;
    }
    .mn-scene {
      width: 1280px; height: 720px;
      position: relative; overflow: hidden;
      flex-shrink: 0; transform-origin: center center;
      font-family: 'DM Sans', sans-serif;
      background: #fafaf8;
    }

    /* layout */
    .mn-layout {
      position: absolute; inset: 0;
      display: grid;
      grid-template-columns: 1fr 540px;
      grid-template-rows: 1fr;
    }

    /* ── IMAGEN (izquierda) ── */
    .mn-img-col {
      position: relative;
      display: flex; align-items: center; justify-content: center;
      padding: 60px 40px 80px 80px;
      background: #fafaf8;
    }
    /* número deco de fondo */
    .mn-deco-pct {
      position: absolute; bottom: 20px; left: 60px;
      font-family: 'Syne', sans-serif;
      font-size: 240px; font-weight: 800; line-height: 1;
      color: rgba(0,0,0,0.035); user-select: none; pointer-events: none;
      letter-spacing: -8px;
    }
    .mn-img {
      max-height: 560px; max-width: 100%; object-fit: contain;
      position: relative; z-index: 1;
      filter: drop-shadow(0 20px 50px rgba(0,0,0,0.12));
      opacity: 0; transform: translateX(-30px) scale(0.97);
      transition: opacity 0.85s ease 0.2s, transform 1s cubic-bezier(0.34,1.2,0.64,1) 0.2s;
    }
    .mn-img.on { opacity: 1; transform: translateX(0) scale(1); }
    .mn-img.float { animation: mnFloat 5s ease-in-out infinite 1.2s; }
    @keyframes mnFloat { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-8px);} }

    /* ── PANEL DERECHO ── */
    .mn-panel {
      display: flex; flex-direction: column; justify-content: space-between;
      padding: 48px 56px 44px 44px;
      border-left: 1px solid rgba(0,0,0,0.07);
      position: relative;
    }

    /* top: logo + etiqueta */
    .mn-top {
      display: flex; flex-direction: column; gap: 28px;
    }

    .mn-logo-row {
      display: flex; align-items: center; gap: 12px;
      opacity: 0; transform: translateY(-10px);
      transition: opacity 0.55s ease 0.15s, transform 0.55s ease 0.15s;
    }
    .mn-logo-row.on { opacity: 1; transform: translateY(0); }
    .mn-logo-sq {
      width: 40px; height: 40px;
      background: #1a1a1a;
      display: flex; align-items: center; justify-content: center;
      overflow: hidden; flex-shrink: 0;
    }
    .mn-logo-sq img { width: 100%; height: 100%; object-fit: contain; }
    .mn-logo-sq span {
      font-family: 'Syne', sans-serif;
      font-size: 14px; font-weight: 800; color: #fafaf8;
    }
    .mn-brand-text {
      font-family: 'Syne', sans-serif;
      font-size: 11px; font-weight: 600; letter-spacing: 3px;
      text-transform: uppercase; color: rgba(0,0,0,0.35);
    }

    /* pill etiqueta */
    .mn-pill {
      display: inline-flex; align-items: center; gap: 8px; align-self: flex-start;
      border: 1.5px solid rgba(0,0,0,0.15); border-radius: 100px;
      padding: 6px 16px;
      font-size: 10px; font-weight: 700; letter-spacing: 3px;
      text-transform: uppercase; color: rgba(0,0,0,0.45);
      opacity: 0; transform: translateY(-8px);
      transition: opacity 0.5s ease 0.3s, transform 0.5s ease 0.3s;
    }
    .mn-pill.on { opacity: 1; transform: translateY(0); }
    .mn-pill-dot {
      width: 5px; height: 5px; border-radius: 50%;
      background: #1a1a1a; animation: mnBlink 1.3s infinite;
    }
    @keyframes mnBlink { 0%,100%{opacity:1;} 50%{opacity:0.15;} }

    /* nombre producto */
    .mn-nombre {
      font-family: 'Syne', sans-serif;
      font-weight: 800; line-height: 0.92; letter-spacing: -1px;
      color: #1a1a1a; word-break: break-word;
      opacity: 0; transform: translateX(20px);
      transition: opacity 0.7s ease 0.5s, transform 0.85s cubic-bezier(0.22,1.3,0.36,1) 0.5s;
    }
    .mn-nombre.on { opacity: 1; transform: translateX(0); }

    /* descripción */
    .mn-desc {
      font-size: 13px; font-weight: 400; line-height: 1.7;
      color: rgba(0,0,0,0.38); margin-top: 14px;
      opacity: 0; transform: translateX(14px);
      transition: opacity 0.6s ease 0.75s, transform 0.65s ease 0.75s;
    }
    .mn-desc.on { opacity: 1; transform: translateX(0); }

    /* ── PRECIOS ── */
    .mn-precios-blk {
      opacity: 0; transform: translateY(12px);
      transition: opacity 0.65s ease 0.9s, transform 0.65s ease 0.9s;
    }
    .mn-precios-blk.on { opacity: 1; transform: translateY(0); }

    .mn-precio-row-before {
      display: flex; align-items: center; gap: 10px; margin-bottom: 4px;
    }
    .mn-precio-antes {
      font-size: 16px; font-weight: 400;
      color: rgba(0,0,0,0.25); text-decoration: line-through;
    }
    .mn-off-tag {
      padding: 3px 10px; background: #1a1a1a; border-radius: 3px;
      font-family: 'Syne', sans-serif;
      font-size: 11px; font-weight: 700; color: #fafaf8; letter-spacing: 1px;
    }

    .mn-precio-nuevo {
      font-family: 'Syne', sans-serif;
      font-size: 64px; font-weight: 800; line-height: 1;
      letter-spacing: -2px; color: #1a1a1a;
    }

    /* divisor */
    .mn-divider {
      height: 1px; background: rgba(0,0,0,0.08); margin: 20px 0;
      opacity: 0; transition: opacity 0.4s ease 1.1s;
    }
    .mn-divider.on { opacity: 1; }

    /* footer */
    .mn-footer {
      display: flex; flex-direction: column; gap: 8px;
      opacity: 0; transform: translateY(8px);
      transition: opacity 0.6s ease 1.2s, transform 0.6s ease 1.2s;
    }
    .mn-footer.on { opacity: 1; transform: translateY(0); }
    .mn-contact {
      display: flex; align-items: center; gap: 10px;
      font-size: 13px; font-weight: 500; color: rgba(0,0,0,0.45);
    }
    .mn-contact svg { width: 15px; height: 15px; fill: #25d366; flex-shrink: 0; }
    .mn-contact-web { font-size: 12px; color: rgba(0,0,0,0.28); }

    /* línea acento lateral */
    .mn-accent-bar {
      position: absolute; left: 0; top: 60px; bottom: 60px; width: 3px;
      background: #1a1a1a;
    }
  `;

  return (
    <>
      <style>{css}</style>
      <div className="mn-viewport">
        <div className="mn-scene" style={{ transform: `scale(${scale})` }}>

          <div className="mn-layout">
            {/* IMAGEN */}
            <div className="mn-img-col">
              {porcentajeDescuento > 0 && (
                <div className="mn-deco-pct">{porcentajeDescuento}</div>
              )}
              {imagenProducto && (
                <img
                  src={imagenProducto}
                  alt={titulo}
                  className={`mn-img ${mounted ? 'on float' : ''}`}
                />
              )}
            </div>

            {/* PANEL */}
            <div className="mn-panel">
              <div className="mn-accent-bar" />

              <div className="mn-top">
                <div className={`mn-logo-row ${mounted ? 'on' : ''}`}>
                  <div className="mn-logo-sq">
                    {logoSrc ? <img src={logoSrc} alt="logo" /> : <span>{logoLetra}</span>}
                  </div>
                  <span className="mn-brand-text">Muebles de Pino</span>
                </div>

                <div className={`mn-pill ${mounted ? 'on' : ''}`}>
                  <div className="mn-pill-dot" />
                  {etiqueta}
                </div>

                <div>
                  <div
                    className={`mn-nombre ${mounted ? 'on' : ''}`}
                    style={{ fontSize: tituloSize }}
                  >
                    {titulo}
                  </div>
                  {descripcion && (
                    <div className={`mn-desc ${mounted ? 'on' : ''}`}>{descripcion}</div>
                  )}
                </div>
              </div>

              <div>
                <div className={`mn-precios-blk ${mounted ? 'on' : ''}`}>
                  {precioLista > 0 && (
                    <div className="mn-precio-row-before">
                      <div className="mn-precio-antes">{fmt(precioLista)}</div>
                      {porcentajeDescuento > 0 && (
                        <div className="mn-off-tag">{porcentajeDescuento}% OFF</div>
                      )}
                    </div>
                  )}
                  <div className="mn-precio-nuevo">{fmt(precioOferta)}</div>
                </div>

                <div className={`mn-divider ${mounted ? 'on' : ''}`} />

                <div className={`mn-footer ${mounted ? 'on' : ''}`}>
                  <div className="mn-contact">
                    <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                    {whatsapp}
                  </div>
                  <div className="mn-contact mn-contact-web">🌐 {web}</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}