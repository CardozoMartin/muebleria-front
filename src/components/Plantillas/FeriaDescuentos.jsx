import React, { useEffect, useState } from 'react';
import plantilla from '../../assets/canva/feriadedescuentos.png';
import comedorDefault from '../../assets/comedor.png';

const FeriaDescuentos = ({
  nombreProducto = 'Juego de Comedor',
  descripcion = 'Mesa extensible con 6 sillas tapizadas en tela premium. Estructura de roble macizo, acabado laqueado mate.',
  imagenProducto = comedorDefault,
  precioLista = 500000,
  precioOferta = 250000,
  porcentajeDescuento = 50,
  preview = false,
}) => {
  const BASE_W = 1200;
  const BASE_H = 600;
  const [scale, setScale] = useState(1);
  const effectiveScale = preview ? 1 : scale;

  useEffect(() => {
    const calc = () => setScale(Math.min(window.innerWidth / BASE_W, window.innerHeight / BASE_H));
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);

  const fmt = (n) => (n ? `$${Number(n).toLocaleString('es-AR')}` : '');
  const nombreSize = nombreProducto.length > 26 ? 24 : nombreProducto.length > 16 ? 30 : 38;

  const css = `
    @keyframes floatProd3 {
      0%,100% { transform: translateY(0px); }
      50%      { transform: translateY(-13px); }
    }
    @keyframes glowProd3 {
      0%,100% { filter: drop-shadow(0 10px 30px rgba(66,133,244,0.25)); }
      50%      { filter: drop-shadow(0 20px 44px rgba(66,133,244,0.18))
                         drop-shadow(0  0px 28px rgba(66,133,244,0.22)); }
    }
    @keyframes pricePulse3 {
      0%,100% { transform: scale(1); }
      50%      { transform: scale(1.03); }
    }
    @keyframes slideIn3 {
      from { opacity:0; transform: translateX(-24px); }
      to   { opacity:1; transform: translateX(0); }
    }
  `;

  /* Layout analizado sobre 1200×600:
     División blanco/azul ≈ x:560 (el gran círculo arranca ahí)
     Zona izquierda disponible: 0–560
     Imagen: centrada en x≈310, flota sobre la división
     Nombre + precios: columna izquierda, y 340–540                  */

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Rubik:wght@700;900&display=swap"
        rel="stylesheet"
      />
      <style>{css}</style>

      <div
        style={{
          width: preview ? BASE_W : '100vw',
          height: preview ? BASE_H : '100vh',
          background: '#f0f4ff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'relative',
            width: BASE_W,
            height: BASE_H,
            flexShrink: 0,
            transform: `scale(${effectiveScale})`,
            transformOrigin: 'center center',
          }}
        >
          {/* FONDO */}
          <img
            src={plantilla}
            alt=""
            aria-hidden
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />

          {/* ══ IMAGEN DEL PRODUCTO
              Centrada en x≈310, montada entre las dos zonas
              top:30 para que sea grande y protagonista              */}
          {imagenProducto && (
            <img
              src={imagenProducto}
              alt={nombreProducto}
              style={{
                position: 'absolute',
                left: 30,
                top: 28,
                transform: 'translateX(-50%)',
                width: 600,
                height: 520,
                objectFit: 'contain',
                animation: 'floatProd3 4s ease-in-out infinite, glowProd3 4s ease-in-out infinite',
                pointerEvents: 'none',
                zIndex: 2,
              }}
            />
          )}

          {/* ══ NOMBRE DEL PRODUCTO
              Bajo la imagen, texto oscuro sobre el blanco           */}
          <div
            style={{
              position: 'absolute',
              left: 164,
              top: 558,
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: nombreSize,
              color: '#1a2e6e',
              letterSpacing: 4,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: 500,
              animation: 'slideIn3 0.6s ease both',
              pointerEvents: 'none',
              zIndex: 2,
            }}
          >
            {nombreProducto}
          </div>

          {/* ══ PRECIO OFERTA — azul sólido, tipografía grande       */}
          {precioOferta > 0 && (
            <div
              style={{
                position: 'absolute',
                left: 604,
                top: 410,
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                zIndex: 2,
                pointerEvents: 'none',
              }}
            >
              {/* Precio principal */}
              <div
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 42,
                  color: '#fbfbfc',
                  letterSpacing: 2,
                  lineHeight: 1,
                  animation: 'pricePulse3 3s ease-in-out infinite',
                }}
              >
                {fmt(precioOferta)}
              </div>

              {/* Badge % OFF */}
              {porcentajeDescuento > 0 && (
                <div
                  style={{
                    background: '#2563eb',
                    color: '#fff',
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 26,
                    letterSpacing: 2,
                    padding: '8px 14px 6px',
                    borderRadius: 10,
                    lineHeight: 1,
                    boxShadow: '0 4px 16px rgba(37,99,235,0.4)',
                  }}
                >
                  {porcentajeDescuento}%<br />
                  OFF
                </div>
              )}
            </div>
          )}

          {/* ══ PRECIO DE LISTA tachado — discreto, bajo el precio oferta */}
          {precioLista > 0 && (
            <div
              style={{
                position: 'absolute',
                left: 648,
                top: 380,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                pointerEvents: 'none',
                zIndex: 2,
              }}
            >
              <span
                style={{
                  fontFamily: "'Rubik', sans-serif",
                  fontSize: 11,
                  color: '#94a3b8',
                  letterSpacing: 1.5,
                  textTransform: 'uppercase',
                }}
              >
                Antes
              </span>
              <span
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 22,
                  color: '#94a3b8',
                  textDecoration: 'line-through',
                  letterSpacing: 1,
                  lineHeight: 1,
                }}
              >
                {fmt(precioLista)}
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FeriaDescuentos;
