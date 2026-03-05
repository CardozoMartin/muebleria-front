import React, { useEffect, useState } from 'react';
import logo from './../../assets/logo.png';
import comedor from './../../assets/comedor.png';
import fireBg from './../../assets/fire-png.webp';
import './Hotsale.css';

/*
 * HotSale — optimizado para televisores de 32" o mas.
 * Estilos en Hotsale.css (canvas fijo 1280x720, sin clamp/vw/vh).
 * Un scale() uniforme adapta la escena a cualquier resolucion de TV.
 */
export default function HotSale({
  titulo = "Juego de Comedor",
  descripcion = "Mesa extensible con 6 sillas tapizadas en tela premium. Estructura de roble macizo, acabado laqueado mate.",
  imagenProducto = comedor,
  precioLista = 500000,
  precioOferta = 250000,
  porcentajeDescuento = 50,
}) {
  const [mounted, setMounted] = useState(false);
  const [scale, setScale] = useState(1);

  /* Escala uniforme: 1280x720 -> tamano real del TV */
  useEffect(() => {
    const calc = () =>
      setScale(Math.min(window.innerWidth / 1280, window.innerHeight / 720));
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);

  /* Animar entrada al cambiar producto */
  useEffect(() => {
    const t1 = setTimeout(() => setMounted(false), 0);
    const t2 = setTimeout(() => setMounted(true), 80);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [titulo, imagenProducto]);

  const formatPrecio = (n) =>
    n ? `$ ${Number(n).toLocaleString('es-AR')}` : null;

  const titleScale = Math.min(1, Math.max(0.45, 1 - Math.max(0, titulo.length - 14) * 0.04));

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Rubik:wght@700;800;900&family=Montserrat:wght@400;600;700;800;900&display=swap"
        rel="stylesheet"
      />

      {/* Viewport: llena toda la pantalla del TV */}
      <div className="hs-viewport">
        {/* Escena fija 1280x720, escalada uniformemente */}
        <div className="hs-scene" style={{ transform: `scale(${scale})` }}>

          {/* FONDOS */}
          <div className="hs-bg" />
          <div className="hs-heat-lines" />
          <div className="hs-lava-right" />
          <div className="hs-glow-top" />

          {/* LOGO */}
          <div className={`hs-logo ${mounted ? 'on' : ''}`}>
            <img src={logo} alt="Logo" />
          </div>

          {/* BANDA HOT SALE */}
          <div className={`hs-banner ${mounted ? 'on' : ''}`}>
            <span className="hs-banner-fire">🔥</span>
            <span className="hs-banner-txt"><span>HOT</span> SALE</span>
          </div>

          {/* LINEA VERTICAL */}
          <div className="hs-vline" />

          {/* LAYOUT */}
          <div className="hs-layout">

            {/* IZQUIERDA - IMAGEN */}
            <div className="hs-left">
              <div className="hs-img-glow" />
              <div className="hs-floor" />
              <div className={`hs-img-wrap ${mounted ? 'on' : ''}`}>
                <img className="hs-img" src={imagenProducto} alt={titulo} />
              </div>
              <div className={`hs-tags ${mounted ? 'on' : ''}`}>
                <span className="hs-tag hs-tag-white">www.mueblesdepinoml.com.ar</span>
              </div>
              <div className="hs-corner hs-corner-tl" />
              <div className="hs-corner hs-corner-tr" />
              <div className="hs-corner hs-corner-bl" />
              <div className="hs-corner hs-corner-br" />
            </div>

            {/* DERECHA - CONTENIDO */}
            <div className="hs-right">
              <img className="hs-fire-bg" src={fireBg} alt="" aria-hidden="true" />
              <div className="hs-content idle">

                <div className="hs-slogan">Precios que arden!</div>

                <div className="hs-titulo-group">
                  <div className={`hs-img-titulo ${mounted ? 'on' : ''}`} style={{ '--titulo-scale': titleScale }}>
                    <span className="hs-img-titulo-dest">{titulo}</span>
                  </div>
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
                    {porcentajeDescuento > 0 && (
                      <div className="hs-off-badge">
                        <span className="hs-off-pct">{porcentajeDescuento}%</span>
                        <span className="hs-off-lbl">OFF</span>
                      </div>
                    )}
                  </div>
                  <div className="hs-cuotas">
                    Sujeto a stock — <strong>Consultar medios de pago</strong>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="hs-whatsapp">
                  <svg className="hs-wa-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  <span>381 2108473</span>
                </div>

              </div>
            </div>
          </div>

        </div>{/* /hs-scene */}
      </div>{/* /hs-viewport */}
    </>
  );
}
