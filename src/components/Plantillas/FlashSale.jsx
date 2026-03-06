import React, { useEffect, useState } from 'react';
import plantilla from '../../assets/canva/flashsale.png';
import comedorDefault from '../../assets/comedor.png';

const FlashSale = ({
  nombreProducto = 'Juego de Comedor',
  descripcion = 'Mesa extensible con 6 sillas tapizadas en tela premium. Estructura de roble macizo, acabado laqueado mate.',
  imagenProducto = comedorDefault,
  precioLista = 500000,
  precioOferta = 250000,
  porcentajeDescuento = 50,
}) => {
  const BASE_W = 1200;
  const BASE_H = 600;
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const calc = () => setScale(Math.min(window.innerWidth / BASE_W, window.innerHeight / BASE_H));
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);

  const fmt = (n) => (n ? `$${Number(n).toLocaleString('es-AR')}` : '');
  const nombreSize = nombreProducto.length > 26 ? 22 : nombreProducto.length > 16 ? 27 : 33;

  const css = `
    @keyframes floatProd {
      0%,100% { transform: translateX(-50%) translateY(0px); }
      50%      { transform: translateX(-50%) translateY(-12px); }
    }
    @keyframes glowBF {
      0%,100% { filter: drop-shadow(0 8px 24px rgba(0,0,0,0.18)); }
      50%      { filter: drop-shadow(0 16px 36px rgba(0,0,0,0.12))
                         drop-shadow(0 0 28px rgba(240,200,0,0.22)); }
    }
    @keyframes badgePop {
      0%,100% { transform: scale(1); }
      50%      { transform: scale(1.04); }
    }
  `;

  /* Zona izquierda disponible: x 0–560, toda la altura 0–600
     Blob amarillo difuso ≈ centro x:310, y:260
     Imagen: centrada en x:290, top:50 — grande para llenar el haz                */

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Rubik:wght@700;900&display=swap"
        rel="stylesheet"
      />
      <style>{css}</style>

      <div
        style={{
          width: '100vw',
          height: '100vh',
          background: '#fff',
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
            transform: `scale(${scale})`,
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
              Centrada sobre el blob amarillo difuso, zona izquierda
              x≈290, top:30, grande                                    */}
          {imagenProducto && (
            <img
              src={imagenProducto}
              alt={nombreProducto}
              style={{
                position: 'absolute',
                left: 390,
                top: 130,
                transform: 'translateX(-50%)',
                width: 480,
                height: 410,
                objectFit: 'contain',
                animation: 'floatProd 4s ease-in-out infinite, glowBF 4s ease-in-out infinite',
                pointerEvents: 'none',
                zIndex: 2,
              }}
            />
          )}

          {/* ══ NOMBRE DEL PRODUCTO
              Bajo la imagen, izquierda, texto oscuro sobre blanco       */}
          <div
            style={{
              position: 'absolute',
              left: 244,
              top: 48,
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: nombreSize,
              color: '#111',
              letterSpacing: 3,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: 520,
              pointerEvents: 'none',
              zIndex: 2,
            }}
          >
            {nombreProducto}
          </div>

          {/* ══ PRECIO OFERTA — estilo negro/amarillo acorde a la plantilla */}
          {precioOferta > 0 && (
            <div
              style={{
                position: 'absolute',
                left: 184,
                top: 488,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 12,
                zIndex: 2,
                pointerEvents: 'none',
              }}
            >
              {/* Bloque precio */}
              <div
                style={{
                  background: '#f5c800',
                  borderRadius: 8,
                  padding: '6px 20px 4px',
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 54,
                  color: '#111',
                  letterSpacing: 2,
                  lineHeight: 1,
                  boxShadow: '0 4px 18px rgba(200,160,0,0.35)',
                  animation: 'badgePop 3s ease-in-out infinite',
                }}
              >
                {fmt(precioOferta)}
              </div>

              {/* Badge % OFF */}
              {porcentajeDescuento > 0 && (
                <div
                  style={{
                    background: '#111',
                    color: '#f5c800',
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 28,
                    letterSpacing: 2,
                    padding: '8px 14px 6px',
                    borderRadius: 8,
                    lineHeight: 1,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
                  }}
                >
                  {porcentajeDescuento}%<br />
                  OFF
                </div>
              )}
            </div>
          )}

          {/* ══ PRECIO DE LISTA tachado — debajo del precio oferta */}
          {precioLista > 0 && (
            <div
              style={{
                position: 'absolute',
                left: 250,
                top: 562,
                pointerEvents: 'none',
                zIndex: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span
                style={{
                  fontFamily: "'Rubik', sans-serif",
                  fontSize: 11,
                  color: '#888',
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
                  color: '#999',
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

export default FlashSale;
