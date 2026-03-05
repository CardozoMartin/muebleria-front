import { useEffect, useState } from 'react';

/**
 * CalidezTV — Cálido / Hogareño
 * Paleta crema, chocolate, ocre. Sensación de hogar real.
 * Tipografía serif + imagen grande como protagonista.
 */
export default function CalidezTV({
  titulo = 'Juego de Comedor',
  descripcion = 'Mesa extensible con 6 sillas tapizadas en tela premium. Estructura de roble macizo, acabado laqueado mate.',
  imagenProducto = null,
  precioLista = 500000,
  precioOferta = 250000,
  porcentajeDescuento = 50,
  etiqueta = 'Precio especial',
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

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600;700&display=swap');

    .cz-viewport {
      width: 100vw; height: 100vh;
      display: flex; align-items: center; justify-content: center;
      background: #000; overflow: hidden;
    }
    .cz-scene {
      width: 1280px; height: 720px;
      position: relative; overflow: hidden;
      flex-shrink: 0; transform-origin: center center;
      font-family: 'DM Sans', sans-serif;
      background: #f2ebe0;
    }

    /* textura sutil */
    .cz-scene::before {
      content: '';
      position: absolute; inset: 0; z-index: 0; pointer-events: none;
      background-image:
        radial-gradient(circle at 20% 20%, rgba(44,31,14,0.04) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(180,140,80,0.06) 0%, transparent 40%);
    }

    /* banda superior oscura */
    .cz-header {
      position: absolute; top: 0; left: 0; right: 0; height: 190px;
      background: #241a0b; z-index: 2;
      display: flex; align-items: flex-end;
      padding: 0 56px 22px;
    }
    /* curva inferior de la banda */
    .cz-header::after {
      content: '';
      position: absolute; bottom: -30px; left: 0; right: 0; height: 60px;
      background: #241a0b;
      clip-path: ellipse(52% 100% at 50% 0%);
    }

    .cz-header-content {
      display: flex; align-items: flex-end; gap: 0; width: 100%;
      justify-content: space-between;
    }

    .cz-brand {
      display: flex; align-items: center; gap: 12px; padding-bottom: 4px;
      opacity: 0; transform: translateY(-10px);
      transition: opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s;
    }
    .cz-brand.on { opacity: 1; transform: translateY(0); }
    .cz-logo-ring {
      width: 50px; height: 50px; border-radius: 50%;
      border: 1.5px solid rgba(210,180,120,0.45);
      display: flex; align-items: center; justify-content: center;
      overflow: hidden; flex-shrink: 0;
    }
    .cz-logo-ring img { width: 100%; height: 100%; object-fit: contain; }
    .cz-logo-ring span {
      font-family: 'Lora', serif;
      font-size: 17px; font-weight: 700; color: #d2b478;
    }
    .cz-brand-info { display: flex; flex-direction: column; gap: 2px; }
    .cz-brand-name {
      font-size: 10px; font-weight: 600; letter-spacing: 4px;
      text-transform: uppercase; color: rgba(210,180,120,0.65);
    }
    .cz-brand-tag {
      font-family: 'Lora', serif;
      font-size: 11px; font-style: italic;
      color: rgba(210,180,120,0.4);
    }

    .cz-titulo {
      font-family: 'Lora', serif;
      font-weight: 700; line-height: 0.88; color: #f2ebe0;
      text-align: right;
      opacity: 0; transform: translateY(14px);
      transition: opacity 0.75s ease 0.3s, transform 0.85s cubic-bezier(0.22,1.3,0.36,1) 0.3s;
    }
    .cz-titulo.on { opacity: 1; transform: translateY(0); }
    .cz-titulo-main { font-size: 66px; display: block; }
    .cz-titulo-sub  { font-size: 66px; font-style: italic; color: #d2b478; display: block; }

    /* layout principal */
    .cz-body {
      position: absolute; top: 190px; left: 0; right: 0; bottom: 0;
      z-index: 3; display: flex;
    }

    /* área imagen — ocupa el espacio central */
    .cz-img-area {
      flex: 1;
      display: flex; align-items: flex-end; justify-content: center;
      padding: 10px 20px 50px 56px;
      position: relative;
    }
    /* sombra suelo */
    .cz-img-area::after {
      content: '';
      position: absolute; bottom: 38px; left: 56px; right: 20px; height: 30px;
      background: radial-gradient(ellipse 70% 100% at 50% 100%, rgba(36,26,11,0.20) 0%, transparent 70%);
      pointer-events: none;
    }
    .cz-img {
      max-height: 420px; max-width: 100%; object-fit: contain;
      position: relative; z-index: 1;
      filter: drop-shadow(0 16px 40px rgba(36,26,11,0.22));
      opacity: 0; transform: translateY(20px) scale(0.96);
      transition: opacity 0.85s ease 0.5s, transform 1s cubic-bezier(0.34,1.2,0.64,1) 0.5s;
    }
    .cz-img.on { opacity: 1; transform: translateY(0) scale(1); }
    .cz-img.float { animation: czFloat 5.5s ease-in-out infinite; }
    @keyframes czFloat { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-9px);} }

    /* panel derecho */
    .cz-panel {
      width: 370px; flex-shrink: 0;
      display: flex; flex-direction: column; justify-content: center;
      padding: 30px 52px 30px 28px; gap: 18px;
      border-left: 1px solid rgba(36,26,11,0.1);
    }

    .cz-etiqueta {
      display: inline-flex; align-items: center; gap: 8px;
      opacity: 0; transform: translateY(-8px);
      transition: opacity 0.5s ease 0.6s, transform 0.5s ease 0.6s;
    }
    .cz-etiqueta.on { opacity: 1; transform: translateY(0); }
    .cz-etiqueta-dot { width: 6px; height: 6px; border-radius: 50%; background: #a8713a; }
    .cz-etiqueta-text {
      font-size: 10px; font-weight: 700; letter-spacing: 3px;
      text-transform: uppercase; color: #a8713a;
    }

    .cz-desc {
      font-family: 'Lora', serif;
      font-size: 14px; font-style: italic; line-height: 1.75;
      color: rgba(36,26,11,0.6);
      opacity: 0; transform: translateX(14px);
      transition: opacity 0.6s ease 0.75s, transform 0.65s ease 0.75s;
    }
    .cz-desc.on { opacity: 1; transform: translateX(0); }

    /* divisor decorativo */
    .cz-ornament {
      display: flex; align-items: center; gap: 8px;
      opacity: 0; transition: opacity 0.5s ease 0.9s;
    }
    .cz-ornament.on { opacity: 1; }
    .cz-orn-line { flex: 1; height: 1px; background: rgba(36,26,11,0.12); }
    .cz-orn-diamond {
      width: 6px; height: 6px; background: #d2b478;
      transform: rotate(45deg); flex-shrink: 0;
    }

    /* precios */
    .cz-precios {
      opacity: 0; transform: translateY(10px);
      transition: opacity 0.6s ease 1s, transform 0.65s ease 1s;
    }
    .cz-precios.on { opacity: 1; transform: translateY(0); }
    .cz-precio-label {
      font-size: 10px; font-weight: 700; letter-spacing: 3px;
      text-transform: uppercase; color: rgba(36,26,11,0.35); margin-bottom: 5px;
    }
    .cz-precio-antes {
      font-size: 18px; font-weight: 400;
      color: rgba(36,26,11,0.32); text-decoration: line-through;
      margin-bottom: 4px;
    }
    .cz-precio-row { display: flex; align-items: center; gap: 12px; }
    .cz-precio-nuevo {
      font-family: 'Lora', serif;
      font-size: 52px; font-weight: 700; line-height: 1;
      color: #241a0b;
    }
    .cz-off-circle {
      width: 62px; height: 62px; border-radius: 50%;
      background: #241a0b; flex-shrink: 0;
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
    }
    .cz-off-num {
      font-family: 'DM Sans', sans-serif;
      font-size: 18px; font-weight: 800; line-height: 1;
      color: #d2b478;
    }
    .cz-off-label {
      font-size: 9px; font-weight: 700; letter-spacing: 1.5px;
      color: rgba(210,180,120,0.6); text-transform: uppercase;
    }

    /* contacto */
    .cz-contacto {
      display: flex; flex-direction: column; gap: 8px;
      opacity: 0; transform: translateY(8px);
      transition: opacity 0.6s ease 1.2s, transform 0.6s ease 1.2s;
    }
    .cz-contacto.on { opacity: 1; transform: translateY(0); }
    .cz-contact-item {
      display: flex; align-items: center; gap: 9px;
      font-size: 13px; font-weight: 500; color: rgba(36,26,11,0.5);
    }
    .cz-contact-item svg { width: 15px; height: 15px; fill: #25d366; flex-shrink: 0; }
    .cz-contact-web { color: rgba(36,26,11,0.35); font-size: 12px; }

    /* deco esquinas crema */
    .cz-corner-deco {
      position: absolute; bottom: 20px; left: 20px;
      width: 50px; height: 50px; z-index: 1;
      border-bottom: 1px solid rgba(36,26,11,0.1);
      border-left: 1px solid rgba(36,26,11,0.1);
    }
  `;

  return (
    <>
      <style>{css}</style>
      <div className="cz-viewport">
        <div className="cz-scene" style={{ transform: `scale(${scale})` }}>

          {/* HEADER */}
          <div className="cz-header">
            <div className="cz-header-content">
              <div className={`cz-brand ${mounted ? 'on' : ''}`}>
                <div className="cz-logo-ring">
                  {logoSrc ? <img src={logoSrc} alt="logo" /> : <span>{logoLetra}</span>}
                </div>
                <div className="cz-brand-info">
                  <div className="cz-brand-name">Muebles de Pino</div>
                  <div className="cz-brand-tag">calidad en cada detalle</div>
                </div>
              </div>
              <div className={`cz-titulo ${mounted ? 'on' : ''}`}>
                <span className="cz-titulo-main">{titulo.split(' ').slice(0, Math.ceil(titulo.split(' ').length / 2)).join(' ')}</span>
                <span className="cz-titulo-sub">{titulo.split(' ').slice(Math.ceil(titulo.split(' ').length / 2)).join(' ')}</span>
              </div>
            </div>
          </div>

          {/* BODY */}
          <div className="cz-body">
            <div className="cz-img-area">
              {imagenProducto && (
                <img
                  src={imagenProducto}
                  alt={titulo}
                  className={`cz-img ${mounted ? 'on float' : ''}`}
                />
              )}
            </div>

            <div className="cz-panel">
              <div className={`cz-etiqueta ${mounted ? 'on' : ''}`}>
                <div className="cz-etiqueta-dot" />
                <span className="cz-etiqueta-text">{etiqueta}</span>
              </div>

              {descripcion && (
                <div className={`cz-desc ${mounted ? 'on' : ''}`}>"{descripcion}"</div>
              )}

              <div className={`cz-ornament ${mounted ? 'on' : ''}`}>
                <div className="cz-orn-line" />
                <div className="cz-orn-diamond" />
                <div className="cz-orn-line" />
              </div>

              <div className={`cz-precios ${mounted ? 'on' : ''}`}>
                <div className="cz-precio-label">Precio especial</div>
                {precioLista > 0 && (
                  <div className="cz-precio-antes">{fmt(precioLista)}</div>
                )}
                <div className="cz-precio-row">
                  <div className="cz-precio-nuevo">{fmt(precioOferta)}</div>
                  {porcentajeDescuento > 0 && (
                    <div className="cz-off-circle">
                      <span className="cz-off-num">{porcentajeDescuento}%</span>
                      <span className="cz-off-label">OFF</span>
                    </div>
                  )}
                </div>
              </div>

              <div className={`cz-contacto ${mounted ? 'on' : ''}`}>
                <div className="cz-contact-item">
                  <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                  {whatsapp}
                </div>
                <div className="cz-contact-item cz-contact-web">🌐 {web}</div>
              </div>
            </div>
          </div>

          <div className="cz-corner-deco" />
        </div>
      </div>
    </>
  );
}