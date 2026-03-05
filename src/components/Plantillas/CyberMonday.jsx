import React, { useEffect, useState } from 'react';
import logo from './../../assets/logo.png';
import comedor from './../../assets/comedor.png';
import fondorayos from './../../assets/fondorayos.png';
import './CyberMonday.css';

/*
 * CyberMonday — optimizado para televisores de 32" o más.
 * Estilos en cybermonday.css (canvas fijo 1280×720, sin clamp/vw/vh).
 * Un scale() uniforme adapta la escena a cualquier resolución de TV.
 */
export default function CyberMonday({
  titulo = "Juego de Comedor",
  descripcion = "Mesa extensible con 6 sillas tapizadas en tela premium. Estructura de roble macizo, acabado laqueado mate.",
  imagenProducto = comedor,
  precioLista = 500000,
  precioOferta = 250000,
  porcentajeDescuento = 50,
}) {
  const [mounted, setMounted] = useState(false);
  const [scale, setScale] = useState(1);

  /* Escala uniforme: 1280×720 → tamaño real del TV */
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

  /* Escala del título: base 42px definida en CSS, ajuste JS por longitud */
  const titleScale = Math.min(1, Math.max(0.45, 1 - Math.max(0, titulo.length - 14) * 0.04));

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Orbitron:wght@600;800;900&family=Bebas+Neue&family=Montserrat:wght@400;600;700;800;900&display=swap"
        rel="stylesheet"
      />

      {/* Viewport: llena toda la pantalla del TV */}
      <div className="cm-viewport">
        {/* Escena fija 1280×720, escalada uniformemente */}
        <div className="cm-scene" style={{ transform: `scale(${scale})` }}>

          {mounted && <div className="cm-flash" />}

          <img className="cm-fondo-rayos" src={fondorayos} alt="" aria-hidden="true" />
          <div className="cm-grid" />
          <div className="cm-glow-left" />
          <div className="cm-glow-right" />

          {/* Banner */}
          <div className={`cm-banner ${mounted ? 'on' : ''}`}>
            <span>CYBER MONDAY</span>
          </div>

          {/* Logo */}
          <div className={`cm-logo ${mounted ? 'on' : ''}`}>
            <img src={logo} alt="logo" />
          </div>

          {/* Layout dos columnas */}
          <div className="cm-layout">

            {/* Columna imagen */}
            <div className="cm-left">
              {porcentajeDescuento > 0 && (
                <div className={`cm-badge-img ${mounted ? 'on' : ''}`}>
                  <span className="cm-badge-img-pct">{porcentajeDescuento}%</span>
                  <span className="cm-badge-img-lbl">OFF</span>
                </div>
              )}
              <div className={`cm-img-wrap ${mounted ? 'on' : ''}`}>
                <div className="cm-img-inner">
                  <img src={imagenProducto} alt={titulo} className="cm-img" />
                </div>
                <div className="cm-img-caption">Oportunidad única</div>
              </div>
            </div>

            {/* Columna info */}
            <div className="cm-right">
              <div className={`cm-box ${mounted ? 'on' : ''}`}>

                <div
                  className={`cm-titulo ${mounted ? 'on' : ''}`}
                  style={{ '--titulo-scale': titleScale }}
                >
                  {titulo}
                </div>

                <p className={`cm-desc ${mounted ? 'on' : ''}`}>{descripcion}</p>

                <div className={`cm-price-block ${mounted ? 'on' : ''}`}>
                  {formatPrecio(precioLista) && (
                    <div className="cm-price-antes">Antes: {formatPrecio(precioLista)}</div>
                  )}
                  <div className="cm-price-row">
                    <div className="cm-price-nums">
                      <div className="cm-price-nuevo">{formatPrecio(precioOferta)}</div>
                    </div>
                    {porcentajeDescuento > 0 && (
                      <div className="cm-off-badge">
                        <span className="cm-off-pct">{porcentajeDescuento}%</span>
                        <span className="cm-off-lbl">OFF</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className={`cm-cuotas ${mounted ? 'on' : ''}`}>
                  Consultar medios de Pago — <strong>Sujeto a Stock</strong>
                </div>

              </div>{/* /cm-box */}

              <div className={`cm-whatsapp ${mounted ? 'on' : ''}`}>
                <svg className="cm-wa-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                <span>381 2108473</span>
              </div>

              <div className={`cm-tags ${mounted ? 'on' : ''}`}>
                <span className="cm-tag cm-tag-green">www.mueblesdepinoml.com.ar</span>
              </div>

            </div>
          </div>

        </div>{/* /cm-scene */}
      </div>{/* /cm-viewport */}
    </>
  );
}
