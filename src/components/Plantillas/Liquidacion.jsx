import { useEffect, useState } from 'react';
import comedor from './../../assets/comedor.png';
import fondoliquidacion from './../../assets/fondoliquidacion.png';
import logo from './../../assets/logo.png';
import './liquidacion.css';

export default function Liquidacion({
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

  const tituloSize = titulo.length > 28 ? '44px' : titulo.length > 18 ? '58px' : '72px';

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Bebas+Neue&family=Nunito:wght@600;700;900&display=swap"
        rel="stylesheet"
      />

      <div className="lq-viewport">
        <div className="lq-scene" style={{ transform: `scale(${scale})` }}>
          <img className="lq-bg-img" src={fondoliquidacion} alt="" aria-hidden />

          {/* Banner superior */}
          <div className={`lq-banner ${mounted ? 'on' : ''}`}>LIQUIDACIÓN TOTAL</div>

          {/* Logo top-right */}
          <div className={`lq-logo ${mounted ? 'on' : ''}`}>
            <img src={logo} alt="Logo" />
          </div>

          {/* Grid principal */}
          <div className="lq-grid">

            {/* ══ PANEL IZQUIERDO ══ */}
            <div className="lq-panel">

              {/* Caja blanca */}
              <div className={`lq-box ${mounted ? 'on' : ''}`}>
                <div
                  className={`lq-titulo ${mounted ? 'on' : ''}`}
                  style={{ fontSize: tituloSize }}
                >
                  {titulo}
                </div>
                {descripcion && (
                  <p className={`lq-desc ${mounted ? 'on' : ''}`}>{descripcion}</p>
                )}

                <div className={`lq-price-block ${mounted ? 'on' : ''}`}>
                  {precioLista > 0 && (
                    <div className="lq-price-antes">Antes: {fmt(precioLista)}</div>
                  )}
                  {precioOferta > 0 && (
                    <div className="lq-price-nuevo">{fmt(precioOferta)}</div>
                  )}
                </div>
              </div>

              {/* WhatsApp */}
              <div className={`lq-wa ${mounted ? 'on' : ''}`}>
                <svg viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                381 2108473
              </div>

              {/* Web */}
              <div className={`lq-footer-btns ${mounted ? 'on' : ''}`}>
                <div className="lq-web">🌐 www.mueblesdepinoml.com</div>
              </div>

            </div>

            {/* ══ COLUMNA IMAGEN ══ */}
            <div className={`lq-col-img ${mounted ? 'on' : ''}`}>
              {porcentajeDescuento > 0 && (
                <div className={`lq-badge-img ${mounted ? 'on' : ''}`}>
                  <span className="lq-badge-pct">{porcentajeDescuento}%</span>
                  <span className="lq-badge-lbl">OFF</span>
                </div>
              )}
              {imagenProducto && <img src={imagenProducto} alt={titulo} />}
              <div className={`lq-ultima ${mounted ? 'on' : ''}`}>¡Última oportunidad!</div>
            </div>

          </div>

          {/* Tag verde inferior eliminado — dirección en footer */}

        </div>
      </div>
    </>
  );
}
