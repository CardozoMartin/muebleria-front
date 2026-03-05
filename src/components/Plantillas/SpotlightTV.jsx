import { useEffect, useState } from 'react';

/**
 * SpotlightTV — Elegante / Premium
 * Fondo oscuro profundo, producto iluminado como en vidriera de lujo.
 * Tipografía serif refinada, paleta negro/oro/crema.
 */
export default function SpotlightTV({
  titulo = 'Juego de Comedor',
  descripcion = 'Mesa extensible con 6 sillas tapizadas en tela premium. Estructura de roble macizo, acabado laqueado mate.',
  imagenProducto = null,
  precioLista = 500000,
  precioOferta = 250000,
  porcentajeDescuento = 50,
  etiqueta = 'Oferta destacada',
  whatsapp = '381 2108473',
  web = 'www.mueblesdepinoml.com',
  logoSrc = null,
  logoLetra = 'MP',
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
  const tituloWords = titulo.split(' ');
  const tituloLine1 = tituloWords.slice(0, Math.ceil(tituloWords.length / 2)).join(' ');
  const tituloLine2 = tituloWords.slice(Math.ceil(tituloWords.length / 2)).join(' ');

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500;600;700&display=swap');

    .sp-viewport {
      width: 100vw; height: 100vh;
      display: flex; align-items: center; justify-content: center;
      background: #000; overflow: hidden;
    }
    .sp-scene {
      width: 1280px; height: 720px;
      position: relative; overflow: hidden;
      flex-shrink: 0; transform-origin: center center;
      font-family: 'DM Sans', sans-serif;
      background: #0a0a0d;
    }

    /* fondo — spotlight radial suave */
    .sp-bg-glow {
      position: absolute; inset: 0; pointer-events: none;
      background:
        radial-gradient(ellipse 75% 90% at 78% 52%, rgba(200,169,110,0.10) 0%, transparent 65%),
        radial-gradient(ellipse 50% 70% at 15% 85%, rgba(120,80,40,0.07) 0%, transparent 55%),
        radial-gradient(ellipse 30% 40% at 50% 0%, rgba(200,169,110,0.05) 0%, transparent 50%);
    }

    /* línea divisoria vertical */
    .sp-divider-line {
      position: absolute; left: 570px; top: 50px; bottom: 50px; width: 1px;
      background: linear-gradient(180deg, transparent 0%, rgba(200,169,110,0.28) 25%, rgba(200,169,110,0.28) 75%, transparent 100%);
      z-index: 2;
    }

    /* grid layout */
    .sp-layout {
      position: absolute; inset: 0; z-index: 3;
      display: grid;
      grid-template-columns: 570px 1fr;
    }

    /* ── PANEL IZQUIERDO ── */
    .sp-left {
      display: flex; flex-direction: column; justify-content: center;
      padding: 56px 52px 56px 60px; gap: 0;
    }

    .sp-logo-row {
      display: flex; align-items: center; gap: 14px;
      margin-bottom: 32px;
      opacity: 0; transform: translateY(-14px);
      transition: opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s;
    }
    .sp-logo-row.on { opacity: 1; transform: translateY(0); }

    .sp-logo-circle {
      width: 52px; height: 52px; border-radius: 50%;
      border: 1.5px solid rgba(200,169,110,0.45);
      display: flex; align-items: center; justify-content: center;
      overflow: hidden; flex-shrink: 0;
      background: rgba(200,169,110,0.08);
    }
    .sp-logo-circle img { width: 100%; height: 100%; object-fit: contain; }
    .sp-logo-circle span {
      font-family: 'Playfair Display', serif;
      font-size: 18px; font-weight: 900; color: #c8a96e;
    }
    .sp-logo-brand {
      font-size: 11px; font-weight: 600; letter-spacing: 3.5px;
      text-transform: uppercase; color: rgba(200,169,110,0.6);
    }

    .sp-etiqueta {
      display: inline-flex; align-items: center; gap: 10px;
      margin-bottom: 18px;
      opacity: 0; transform: translateY(-10px);
      transition: opacity 0.6s ease 0.25s, transform 0.6s ease 0.25s;
    }
    .sp-etiqueta.on { opacity: 1; transform: translateY(0); }
    .sp-etiqueta-line { width: 24px; height: 1px; background: #c8a96e; }
    .sp-etiqueta-text {
      font-size: 10px; font-weight: 700; letter-spacing: 4px;
      text-transform: uppercase; color: #c8a96e;
    }

    .sp-titulo {
      font-family: 'Playfair Display', serif;
      line-height: 0.9; letter-spacing: -0.5px;
      color: #f4ede0; margin-bottom: 18px;
      opacity: 0; transform: translateX(-28px);
      transition: opacity 0.75s ease 0.4s, transform 0.9s cubic-bezier(0.22,1.3,0.36,1) 0.4s;
    }
    .sp-titulo.on { opacity: 1; transform: translateX(0); }
    .sp-titulo-main { font-size: 80px; font-weight: 900; display: block; }
    .sp-titulo-sub  { font-size: 80px; font-weight: 400; font-style: italic; color: #c8a96e; display: block; }

    .sp-accent-bar {
      width: 48px; height: 1.5px; margin-bottom: 16px;
      background: linear-gradient(90deg, #c8a96e, rgba(200,169,110,0.15));
      opacity: 0; transition: opacity 0.5s ease 0.7s;
    }
    .sp-accent-bar.on { opacity: 1; }

    .sp-desc {
      font-size: 14px; font-weight: 300; line-height: 1.75;
      color: rgba(244,237,224,0.45); margin-bottom: 36px;
      opacity: 0; transform: translateX(18px);
      transition: opacity 0.6s ease 0.8s, transform 0.7s ease 0.8s;
    }
    .sp-desc.on { opacity: 1; transform: translateX(0); }

    /* precios */
    .sp-precios {
      opacity: 0; transform: translateY(12px);
      transition: opacity 0.6s ease 0.95s, transform 0.65s ease 0.95s;
    }
    .sp-precios.on { opacity: 1; transform: translateY(0); }

    .sp-precio-antes {
      font-size: 13px; font-weight: 400; letter-spacing: 1px;
      color: rgba(244,237,224,0.28); text-decoration: line-through;
      margin-bottom: 4px;
    }
    .sp-precio-row { display: flex; align-items: flex-end; gap: 16px; margin-bottom: 10px; }
    .sp-precio-nuevo {
      font-family: 'Playfair Display', serif;
      font-size: 70px; font-weight: 700; line-height: 0.95;
      color: #f4ede0;
    }
    .sp-precio-sup {
      font-size: 28px; font-weight: 400; vertical-align: super; margin-right: 2px;
    }
    .sp-off-pill {
      padding: 7px 16px; border-radius: 4px;
      background: #c8a96e; color: #0a0a0d;
      font-family: 'DM Sans', sans-serif;
      font-size: 12px; font-weight: 800; letter-spacing: 2.5px;
      text-transform: uppercase; margin-bottom: 8px; align-self: flex-end;
    }

    /* footer */
    .sp-footer {
      display: flex; align-items: center; gap: 18px;
      opacity: 0; transform: translateY(10px);
      transition: opacity 0.6s ease 1.15s, transform 0.6s ease 1.15s;
    }
    .sp-footer.on { opacity: 1; transform: translateY(0); }

    .sp-wa {
      display: flex; align-items: center; gap: 8px;
      font-size: 14px; font-weight: 500; color: rgba(244,237,224,0.5);
    }
    .sp-wa svg { width: 17px; height: 17px; fill: #25d366; flex-shrink: 0; }
    .sp-sep { width: 1px; height: 14px; background: rgba(244,237,224,0.12); }
    .sp-web { font-size: 13px; color: rgba(244,237,224,0.28); }

    /* ── IMAGEN ── */
    .sp-right {
      display: flex; align-items: center; justify-content: center;
      padding: 40px 44px 40px 44px; position: relative;
    }
    .sp-img-glow {
      position: absolute; inset: 0;
      background: radial-gradient(ellipse 70% 80% at 50% 50%, rgba(200,169,110,0.07) 0%, transparent 65%);
      pointer-events: none;
    }
    .sp-img {
      max-height: 640px; max-width: 100%; object-fit: contain;
      position: relative; z-index: 1;
      filter: drop-shadow(0 40px 70px rgba(0,0,0,0.55)) drop-shadow(0 0 40px rgba(200,169,110,0.08));
      opacity: 0; transform: scale(0.95) translateY(10px);
      transition: opacity 1s ease 0.25s, transform 1.1s cubic-bezier(0.34,1.3,0.64,1) 0.25s;
    }
    .sp-img.on { opacity: 1; transform: scale(1) translateY(0); }
    .sp-img.float { animation: spFloat 5s ease-in-out infinite; }
    @keyframes spFloat { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-10px);} }

    /* ── corners deco ── */
    .sp-corner {
      position: absolute; width: 40px; height: 40px; opacity: 0.25;
    }
    .sp-corner-tl { top: 28px; left: 28px; border-top: 1px solid #c8a96e; border-left: 1px solid #c8a96e; }
    .sp-corner-br { bottom: 28px; right: 28px; border-bottom: 1px solid #c8a96e; border-right: 1px solid #c8a96e; }
  `;

  return (
    <>
      <style>{css}</style>
      <div className="sp-viewport">
        <div className="sp-scene" style={{ transform: `scale(${scale})` }}>
          <div className="sp-bg-glow" />
          <div className="sp-divider-line" />
          <div className="sp-corner sp-corner-tl" />
          <div className="sp-corner sp-corner-br" />

          <div className="sp-layout">
            {/* PANEL IZQUIERDO */}
            <div className="sp-left">

              <div className={`sp-logo-row ${mounted ? 'on' : ''}`}>
                <div className="sp-logo-circle">
                  {logoSrc ? <img src={logoSrc} alt="logo" /> : <span>{logoLetra}</span>}
                </div>
                <div className="sp-logo-brand">Muebles de Pino</div>
              </div>

              <div className={`sp-etiqueta ${mounted ? 'on' : ''}`}>
                <div className="sp-etiqueta-line" />
                <span className="sp-etiqueta-text">{etiqueta}</span>
              </div>

              <div className={`sp-titulo ${mounted ? 'on' : ''}`}>
                <span className="sp-titulo-main">{tituloLine1}</span>
                <span className="sp-titulo-sub">{tituloLine2}</span>
              </div>

              <div className={`sp-accent-bar ${mounted ? 'on' : ''}`} />

              {descripcion && (
                <div className={`sp-desc ${mounted ? 'on' : ''}`}>{descripcion}</div>
              )}

              <div className={`sp-precios ${mounted ? 'on' : ''}`}>
                {precioLista > 0 && (
                  <div className="sp-precio-antes">Antes {fmt(precioLista)}</div>
                )}
                <div className="sp-precio-row">
                  <div className="sp-precio-nuevo">
                    <span className="sp-precio-sup">$</span>
                    {Number(precioOferta).toLocaleString('es-AR')}
                  </div>
                  {porcentajeDescuento > 0 && (
                    <div className="sp-off-pill">{porcentajeDescuento}% OFF</div>
                  )}
                </div>
              </div>

              <div className={`sp-footer ${mounted ? 'on' : ''}`}>
                <div className="sp-wa">
                  <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                  {whatsapp}
                </div>
                <div className="sp-sep" />
                <div className="sp-web">{web}</div>
              </div>
            </div>

            {/* IMAGEN */}
            <div className="sp-right">
              <div className="sp-img-glow" />
              {imagenProducto && (
                <img
                  src={imagenProducto}
                  alt={titulo}
                  className={`sp-img ${mounted ? 'on float' : ''}`}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}