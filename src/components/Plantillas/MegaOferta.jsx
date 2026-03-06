import React, { useEffect, useState } from 'react';
import plantilla from '../../assets/canva/megaoferta.png';
import comedorDefault from '../../assets/comedor.png';

const Megaoferta = ({
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
  const nombreSize = nombreProducto.length > 26 ? 22 : nombreProducto.length > 16 ? 28 : 34;

  /* ─── keyframes inyectados una sola vez ─── */
  const css = `
    @keyframes floatProd {
      0%,100% { transform: translateY(0px);  }
      50%      { transform: translateY(-14px); }
    }
    @keyframes glowProd {
      0%,100% { filter: drop-shadow(0 10px 28px rgba(0,0,0,0.55)); }
      50%      { filter: drop-shadow(0 18px 38px rgba(0,0,0,0.35))
                         drop-shadow(0  0px 24px rgba(180,220,255,0.18)); }
    }
    @keyframes pricePulse {
      0%,100% { opacity:1; }
      50%      { opacity:0.82; }
    }
  `;

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Rubik:wght@700;900&display=swap"
        rel="stylesheet"
      />
      <style>{css}</style>

      {/* Pantalla completa → centra la escena */}
      <div
        style={{
          width: '100vw',
          height: '100vh',
          background: '#000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Escena fija 1200 × 600 */}
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

          {/* ══════════════════════════════════════════
              ESTRELLA — precio oferta adentro
              Centro de la estrella en la plantilla ≈ x:155, y:128
          ══════════════════════════════════════════ */}
          <div
            style={{
              position: 'absolute',
              left: 728,
              top: 500,
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              lineHeight: 1,
              pointerEvents: 'none',
            }}
          >
            {/* Precio oferta — grande y llamativo */}
            
            <div
              style={{
                fontFamily: "'Rubik', sans-serif",
                fontWeight: 900,
                fontSize: porcentajeDescuento > 0 ? 46 : 52,
                color: '#050303',
                letterSpacing: -1,
                lineHeight: 0.95,
                animation: 'pricePulse 2.5s ease-in-out infinite',
              }}
            >
              {fmt(precioOferta)}
            </div>
          </div>

          {/* ══════════════════════════════════════════
              % DESCUENTO — sobre la etiqueta roja de la imagen
          ══════════════════════════════════════════ */}
          {porcentajeDescuento > 0 && (
            <div
              style={{
                position: 'absolute',
                left: 69,
                top: 22,
                transform: 'rotate(-4deg)',
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 42,
                color: '#ffffff',
                letterSpacing: 3,
                lineHeight: 1,
                textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                pointerEvents: 'none',
              }}
            >
              {porcentajeDescuento}% OFF
            </div>
          )}

          {/* ══════════════════════════════════════════
              PRECIO DE LISTA tachado — debajo de la estrella
          ══════════════════════════════════════════ */}
          {precioLista > 0 && (
            <div
              style={{
                position: 'absolute',
                left: 620,
                top: 420,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                pointerEvents: 'none',
              }}
            >
              <div
                style={{
                  fontFamily: "'Rubik', sans-serif",
                  fontSize: 24,
                  color: 'rgb(255, 255, 255)',
                  letterSpacing: 1.5,
                  textTransform: 'uppercase',
                }}
              >
                ANTES
              </div>
              <div
                style={{
                  fontFamily: "'Rubik', sans-serif",
                  fontSize: 24,
                  color: 'rgb(255, 255, 255)',
                  textDecoration: 'line-through',
                  lineHeight: 1,
                  letterSpacing: 1,
                }}
              >
                {fmt(precioLista)}
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════
              NOMBRE DEL PRODUCTO — debajo del título MEGA OFERTA
          ══════════════════════════════════════════ */}
          <div
            style={{
              position: 'absolute',
              left: 890,
              top: 180,
              transform: 'translateX(-50%)',
              fontFamily: "'Rubik', sans-serif",
              fontWeight: 900,
              fontSize: nombreSize + 14,
              color: '#f5c800',
              letterSpacing: -1,
              textShadow: '0 3px 18px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,0.7)',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
            }}
          >
            {nombreProducto}
          </div>

          {/* ══════════════════════════════════════════
              DESCRIPCIÓN — zona central-derecha
          ══════════════════════════════════════════ */}
          {descripcion && (
            <div
              style={{
                position: 'absolute',
                left: 650,
                top: 300,
                width: 490,
                fontFamily: "'Rubik', sans-serif",
                fontSize: 14,
                fontWeight: 400,
                color: 'rgb(255, 255, 255)',
                lineHeight: 1.6,
                textAlign: 'center',
                pointerEvents: 'none',
              }}
            >
              {descripcion}
            </div>
          )}

          {/* ══════════════════════════════════════════
              IMAGEN DEL PRODUCTO — centrada en zona izquierda
              bajo el reflector (el haz de luz apunta a x≈295, y≈300)
              Animación: flota suavemente
          ══════════════════════════════════════════ */}
          {imagenProducto && (
            <img
              src={imagenProducto}
              alt={nombreProducto ?? ''}
              style={{
                position: 'absolute',
                left: 70,
                top: 40,
                transform: 'translateX(-50%)',
                width: 570,
                height: 530,
                objectFit: 'contain',
                animation: 'floatProd 4s ease-in-out infinite, glowProd 4s ease-in-out infinite',
                pointerEvents: 'none',
              }}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Megaoferta;
