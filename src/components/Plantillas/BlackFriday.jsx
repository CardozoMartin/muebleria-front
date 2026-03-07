import { memo, useEffect, useState } from 'react';
import plantilla from '../../assets/canva/blackfriday.png';
import comedorDefault from '../../assets/comedor.png';

const BlackFriday = ({
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
  const [imgRatio, setImgRatio] = useState(1); // naturalH / naturalW
  const effectiveScale = preview ? 1 : scale;

  useEffect(() => {
    const calc = () => setScale(Math.min(window.innerWidth / BASE_W, window.innerHeight / BASE_H));
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);

  const fmt = (n) => (n ? `$${Number(n).toLocaleString('es-AR')}` : '');
  const len = nombreProducto.length;
  // ≤8 chars → una línea grande | ≤14 → una línea mediana | >14 → dos líneas
  const unaLinea = len <= 14;
  const nombreFontSize = len <= 8 ? 72 : len <= 14 ? 54 : len <= 20 ? 54 : len <= 26 ? 46 : 36;
  const descUnaLinea = descripcion.length <= 50;

  // Imagen: si es muy alta (portrait) la achicamos y recentramos para que no tape el fondo
  // Centro deseado: x≈298, y≈305 (zona del reflector)
  const IMG_FULL = 440;
  const IMG_TALL = 460; // imagen alta → más chica
  const isTall = imgRatio > 1.3;
  const imgSize = isTall ? IMG_TALL : IMG_FULL;
  // Al achicar una imagen portrait el contenido visible ocupa menos ancho dentro del box "contain",
  // así que sumamos un offset extra para que quede centrada bajo el reflector
  const imgLeft = Math.round(340 - imgSize / 2) + (isTall ? 25 : 0);
  const imgTop = Math.round(315 - imgSize / 2);

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
    @keyframes slideDown {
      from { opacity:0; transform: translateY(-22px); }
      to   { opacity:1; transform: translateY(0);     }
    }
    @keyframes slideRight {
      from { opacity:0; transform: translateX(-28px) translateX(0); }
      to   { opacity:1; transform: translateX(0);                   }
    }
    @keyframes slideLeft {
      from { opacity:0; transform: translateX(28px); }
      to   { opacity:1; transform: translateX(0);    }
    }
    @keyframes slideLeftTitle {
      from { opacity:0; transform: translateX(calc(-50% + 28px)); }
      to   { opacity:1; transform: translateX(-50%);              }
    }
    @keyframes slideUp {
      from { opacity:0; transform: translateY(22px); }
      to   { opacity:1; transform: translateY(0);    }
    }
    @keyframes popIn {
      from { opacity:0; transform: translate(-50%,-50%) scale(0.75); }
      to   { opacity:1; transform: translate(-50%,-50%) scale(1);    }
    }
    @keyframes fadeIn {
      from { opacity:0; }
      to   { opacity:1; }
    }
    @keyframes imgEnter {
      from { opacity:0; transform: translateY(18px); }
      to   { opacity:1; transform: translateY(0);    }
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
          width: preview ? BASE_W : '100vw',
          height: preview ? BASE_H : '100vh',
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

          {/* ══════════════════════════════════════════
              ESTRELLA — precio oferta adentro
              Centro de la estrella en la plantilla ≈ x:155, y:128
          ══════════════════════════════════════════ */}
          <div
            style={{
              position: 'absolute',
              left: 840,
              top: 540,
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              lineHeight: 1,
              pointerEvents: 'none',
              animation: 'popIn 0.6s cubic-bezier(0.34,1.56,0.64,1) 1.2s both',
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
                animation: 'pricePulse 2.5s ease-in-out 1.8s infinite',
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
                left: 560,
                top: 435,
                transform: 'rotate(-4deg)',
                zIndex: 2,
                fontFamily: "'Rubik', sans-serif",
                color: '#ffffff',
                textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                pointerEvents: 'none',
                animation: 'slideDown 0.5s ease-out 0.1s both',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: 110,
                textAlign: 'center',
              }}
            >
              <span
                style={{
                  fontWeight: 900,
                  fontSize: 52,
                  letterSpacing: -2,
                  lineHeight: 1,
                }}
              >
                {porcentajeDescuento}%
              </span>

              <span
                style={{
                  fontWeight: 800,
                  fontSize: 22,
                  letterSpacing: 3,
                  marginTop: -4,
                }}
              >
                OFF
              </span>
            </div>
          )}
          {/* ══════════════════════════════════════════
              PRECIO DE LISTA tachado — debajo de la estrella
          ══════════════════════════════════════════ */}
          {precioLista > 0 && (
            <div
              style={{
                position: 'absolute',
                left: 720,
                top: 420,
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '8px 14px',
                pointerEvents: 'none',
                animation: 'slideUp 0.5s ease-out 1.0s both',

                // 👇 recuadro
                background: 'rgba(0,0,0,0.45)',
                backdropFilter: 'blur(6px)',
                borderRadius: 12,
                border: '1px solid rgba(255,255,255,0.15)',
                boxShadow: '0 6px 20px rgba(0,0,0,0.35)',
              }}
            >
              <span
                style={{
                  fontFamily: "'Rubik', sans-serif",
                  fontSize: 13,
                  fontWeight: 600,
                  color: 'rgba(255,255,255,0.75)',
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                }}
              >
                Antes
              </span>

              <span
                style={{
                  fontFamily: "'Rubik', sans-serif",
                  fontSize: 22,
                  fontWeight: 500,
                  color: '#ffffff',
                  textDecoration: 'line-through',
                  lineHeight: 1,
                  letterSpacing: 1,
                }}
              >
                {fmt(precioLista)}
              </span>
            </div>
          )}

          {/* ══════════════════════════════════════════
              NOMBRE DEL PRODUCTO — debajo del título MEGA OFERTA
          ══════════════════════════════════════════ */}
          <div
            style={{
              position: 'absolute',
              left: 860,
              top: unaLinea ? 190 : 200,
              transform: 'translateX(-50%)',
              fontFamily: "'Rubik', sans-serif",
              fontWeight: 900,
              fontSize: nombreFontSize,
              letterSpacing: -1,
              whiteSpace: unaLinea ? 'nowrap' : 'normal',
              textAlign: 'center',
              width: 380,
              lineHeight: 1.05,
              pointerEvents: 'none',
              background:
                'linear-gradient(180deg, #fff5a0 0%, #f5c800 30%, #c8860a 65%, #f5c800 85%, #fff0a0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.7))',
              animation: 'slideLeftTitle 0.55s ease-out 0.5s both',
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
                left: 620,
                top: 320,
                width: 490,
                padding: '14px 18px',
                fontFamily: "'Rubik', sans-serif",
                fontSize: descUnaLinea ? 18 : 15,
                fontWeight: 400,
                color: '#ffffff',
                lineHeight: 1.6,
                textAlign: 'center',
                whiteSpace: descUnaLinea ? 'nowrap' : 'normal',
                pointerEvents: 'none',
                animation: 'fadeIn 0.6s ease-out 0.75s both',

                background: 'rgba(0, 0, 0, 0.45)',
                backdropFilter: 'blur(6px)',
                borderRadius: 14,
                border: '1px solid rgba(255,255,255,0.15)',
                boxShadow: '0 8px 30px rgba(0,0,0,0.35)',
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
              onLoad={(e) => {
                const { naturalWidth: w, naturalHeight: h } = e.currentTarget;
                setImgRatio(w > 0 ? h / w : 1);
              }}
              style={{
                position: 'absolute',
                left: imgLeft,
                top: imgTop,
                width: imgSize,
                height: imgSize,
                objectFit: 'contain',
                zIndex: 1,
                animation:
                  'imgEnter 0.7s ease-out 0s both, floatProd 4s ease-in-out 0.7s infinite, glowProd 4s ease-in-out 0.7s infinite',
                pointerEvents: 'none',
              }}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default memo(BlackFriday);
