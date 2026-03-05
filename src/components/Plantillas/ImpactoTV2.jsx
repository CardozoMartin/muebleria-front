import { useEffect, useState } from 'react';

/**
 * ImpactoTV — Bold / Impactante
 * Sidebar negra IZQUIERDA con logo + texto vertical + dot pulsante.
 * Panel texto: suprátítulo, título Anton masivo por palabras,
 * descripción, precio tachado + precio nuevo + badge OFF con colorAcento.
 * Imagen derecha con número % decorativo gigante de fondo.
 * Barra de color TOP configurable.
 */
export default function ImpactoTV({
  titulo = 'Juego de Comedor',
  descripcion = 'Mesa extensible con 6 sillas tapizadas en tela premium. Estructura de roble macizo.',
  imagenProducto = null,
  precioLista = 500000,
  precioOferta = 250000,
  porcentajeDescuento = 50,
  etiqueta = '⚡ Oferta del día',
  whatsapp = '381 2108473',
  web = 'www.mueblesdepinoml.com',
  logoSrc = null,
  logoLetra = 'MP',
  colorAcento = '#e63500',
  nombreTienda = 'Muebles de Pino',
}) {
  const [mounted, setMounted] = useState(false);
  const [scale, setScale] = useState(1);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    const calc = () =>
      setScale(Math.min(window.innerWidth / 1280, window.innerHeight / 720));
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);

  useEffect(() => {
    setFlash(false);
    const t1 = setTimeout(() => setMounted(false), 0);
    const t2 = setTimeout(() => { setMounted(true); setFlash(true); }, 80);
    const t3 = setTimeout(() => setFlash(false), 600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [titulo, imagenProducto]);

  const fmt = (n) => (n ? `$ ${Number(n).toLocaleString('es-AR')}` : null);
  const palabras = titulo.split(' ');
  const tituloFontSize =
    titulo.length > 28 ? '64px' : titulo.length > 18 ? '80px' : '96px';

  const WA_PATH =
    'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z';

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Anton&family=Barlow+Condensed:wght@600;700;800;900&family=Barlow:wght@400;500;600;700&display=swap');

    .it-viewport {
      width: 100vw; height: 100vh;
      display: flex; align-items: center; justify-content: center;
      background: #000; overflow: hidden;
    }
    .it-scene {
      width: 1280px; height: 720px;
      position: relative; overflow: hidden;
      flex-shrink: 0; transform-origin: center center;
      font-family: 'Barlow', sans-serif;
      background: #f8f7f4;
      display: flex;
    }

    .it-flash {
      position: absolute; inset: 0; z-index: 99; pointer-events: none;
      background: #fff; animation: itFlash 0.5s ease forwards;
    }
    @keyframes itFlash { from { opacity: 0.75; } to { opacity: 0; } }

    /* barra top de color */
    .it-topbar {
      position: absolute; top: 0; left: 80px; right: 0; height: 8px; z-index: 10;
    }

    /* ══ SIDEBAR IZQUIERDA ══ */
    .it-sidebar {
      width: 80px; flex-shrink: 0; background: #111;
      display: flex; flex-direction: column;
      align-items: center; justify-content: space-between;
      padding: 28px 0; z-index: 5;
    }
    .it-logo-sq {
      width: 46px; height: 46px; background: #fff; border-radius: 4px;
      display: flex; align-items: center; justify-content: center; overflow: hidden;
    }
    .it-logo-sq img { width: 100%; height: 100%; object-fit: contain; }
    .it-logo-sq span {
      font-family: 'Anton', sans-serif; font-size: 16px; color: #111;
    }
    .it-vtext {
      font-family: 'Barlow Condensed', sans-serif;
      font-size: 11px; font-weight: 700; letter-spacing: 5px;
      color: rgba(255,255,255,0.28); text-transform: uppercase;
      writing-mode: vertical-rl; transform: rotate(180deg);
    }
    .it-dot {
      width: 8px; height: 8px; border-radius: 50%; background: #fff;
      animation: itDotBlink 1.3s ease-in-out infinite;
    }
    @keyframes itDotBlink { 0%,100% { opacity:1; } 50% { opacity:0.12; } }

    /* ══ MAIN ══ */
    .it-main {
      flex: 1; display: flex; flex-direction: column; overflow: hidden;
    }
    .it-content {
      flex: 1; display: flex;
    }

    /* ── PANEL TEXTO ── */
    .it-texto {
      width: 520px; flex-shrink: 0;
      display: flex; flex-direction: column; justify-content: center;
      padding: 52px 44px 44px 48px;
      border-right: 1px solid rgba(0,0,0,0.07);
      position: relative; z-index: 2;
    }

    .it-supratitulo {
      font-family: 'Barlow Condensed', sans-serif;
      font-size: 13px; font-weight: 800; letter-spacing: 5px;
      text-transform: uppercase; margin-bottom: 16px;
      opacity: 0; transform: translateY(-10px);
      transition: opacity 0.5s ease 0.2s, transform 0.5s ease 0.2s;
    }
    .it-supratitulo.on { opacity: 1; transform: translateY(0); }

    .it-titulo-big {
      font-family: 'Anton', sans-serif;
      text-transform: uppercase; line-height: 0.88;
      color: #111; margin-bottom: 18px;
      opacity: 0; transform: translateX(-28px);
      transition: opacity 0.75s ease 0.35s, transform 0.9s cubic-bezier(0.22,1.4,0.36,1) 0.35s;
    }
    .it-titulo-big.on { opacity: 1; transform: translateX(0); }
    .it-titulo-big span { display: block; }

    .it-desc-blk {
      font-size: 14px; font-weight: 400; line-height: 1.65;
      color: rgba(17,17,17,0.45); margin-bottom: 26px;
      opacity: 0; transform: translateY(10px);
      transition: opacity 0.55s ease 0.65s, transform 0.55s ease 0.65s;
    }
    .it-desc-blk.on { opacity: 1; transform: translateY(0); }

    /* precios */
    .it-precio-blk {
      opacity: 0; transform: translateY(14px);
      transition: opacity 0.6s ease 0.82s, transform 0.6s ease 0.82s;
    }
    .it-precio-blk.on { opacity: 1; transform: translateY(0); }

    .it-precio-antes {
      font-family: 'Barlow Condensed', sans-serif;
      font-size: 24px; font-weight: 600;
      color: rgba(17,17,17,0.28); text-decoration: line-through; margin-bottom: 4px;
    }
    .it-precio-nuevo-wrap {
      display: flex; align-items: center; gap: 14px;
    }
    .it-precio-nuevo {
      font-family: 'Barlow Condensed', sans-serif;
      font-size: 80px; font-weight: 900; line-height: 0.9;
      letter-spacing: -2px; color: #111;
    }
    .it-off-badge {
      color: #fff; border-radius: 6px; padding: 10px 16px;
      font-family: 'Barlow Condensed', sans-serif;
      font-size: 22px; font-weight: 800; letter-spacing: 2px; white-space: nowrap;
    }

    /* footer */
    .it-footer {
      display: flex; align-items: center; gap: 20px; margin-top: 26px;
      opacity: 0; transform: translateY(8px);
      transition: opacity 0.55s ease 1.05s, transform 0.55s ease 1.05s;
    }
    .it-footer.on { opacity: 1; transform: translateY(0); }

    .it-wa-btn {
      display: flex; align-items: center; gap: 8px;
      background: #111; color: #fff; border-radius: 6px;
      padding: 10px 18px;
      font-family: 'Barlow Condensed', sans-serif;
      font-size: 18px; font-weight: 700; letter-spacing: 1px; white-space: nowrap;
    }
    .it-wa-btn svg { width: 18px; height: 18px; fill: #25d366; flex-shrink: 0; }
    .it-web-text { font-size: 13px; font-weight: 500; color: rgba(17,17,17,0.38); }

    /* ── ÁREA IMAGEN ── */
    .it-img-area {
      flex: 1; position: relative;
      display: flex; align-items: center; justify-content: center;
      padding: 30px 30px 60px 20px; overflow: hidden;
    }
    .it-deco-num {
      position: absolute; bottom: -20px; right: -10px;
      font-family: 'Anton', sans-serif;
      font-size: 300px; font-weight: 400; line-height: 1; letter-spacing: -10px;
      color: rgba(0,0,0,0.045); user-select: none; pointer-events: none; z-index: 0;
    }
    .it-img {
      max-height: 640px; max-width: 100%; object-fit: contain;
      position: relative; z-index: 1;
      filter: drop-shadow(0 20px 50px rgba(0,0,0,0.16));
      opacity: 0; transform: translateX(50px) scale(0.96);
      transition: opacity 0.85s ease 0.2s, transform 1s cubic-bezier(0.34,1.3,0.64,1) 0.2s;
    }
    .it-img.on { opacity: 1; transform: translateX(0) scale(1); }
    .it-img.float { animation: itFloat 4.5s ease-in-out infinite 1.5s; }
    @keyframes itFloat { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-10px);} }
  `;

  return (
    <>
      <style>{css}</style>
      <div className="it-viewport">
        <div className="it-scene" style={{ transform: `scale(${scale})` }}>

          {flash && <div className="it-flash" />}
          <div className="it-topbar" style={{ background: colorAcento }} />

          {/* SIDEBAR */}
          <div className="it-sidebar">
            <div className="it-logo-sq">
              {logoSrc ? <img src={logoSrc} alt="logo" /> : <span>{logoLetra}</span>}
            </div>
            <div className="it-vtext">{nombreTienda}</div>
            <div className="it-dot" />
          </div>

          {/* MAIN */}
          <div className="it-main">
            <div className="it-content">

              {/* TEXTO */}
              <div className="it-texto">
                <div
                  className={`it-supratitulo ${mounted ? 'on' : ''}`}
                  style={{ color: colorAcento }}
                >
                  {etiqueta}
                </div>

                <div
                  className={`it-titulo-big ${mounted ? 'on' : ''}`}
                  style={{ fontSize: tituloFontSize }}
                >
                  {palabras.map((p, i) => <span key={i}>{p}</span>)}
                </div>

                {descripcion && (
                  <div className={`it-desc-blk ${mounted ? 'on' : ''}`}>
                    {descripcion}
                  </div>
                )}

                <div className={`it-precio-blk ${mounted ? 'on' : ''}`}>
                  {precioLista > 0 && (
                    <div className="it-precio-antes">{fmt(precioLista)}</div>
                  )}
                  <div className="it-precio-nuevo-wrap">
                    <div className="it-precio-nuevo">{fmt(precioOferta)}</div>
                    {porcentajeDescuento > 0 && (
                      <div
                        className="it-off-badge"
                        style={{ background: colorAcento }}
                      >
                        {porcentajeDescuento}% OFF
                      </div>
                    )}
                  </div>
                </div>

                <div className={`it-footer ${mounted ? 'on' : ''}`}>
                  <div className="it-wa-btn">
                    <svg viewBox="0 0 24 24"><path d={WA_PATH} /></svg>
                    {whatsapp}
                  </div>
                  <div className="it-web-text">🌐 {web}</div>
                </div>
              </div>

              {/* IMAGEN */}
              <div className="it-img-area">
                {porcentajeDescuento > 0 && (
                  <div className="it-deco-num">{porcentajeDescuento}</div>
                )}
                {imagenProducto && (
                  <img
                    src={imagenProducto}
                    alt={titulo}
                    className={`it-img ${mounted ? 'on float' : ''}`}
                  />
                )}
              </div>

            </div>
          </div>

        </div>
      </div>
    </>
  );
}