import { memo, useEffect, useState, useRef } from 'react';
import { useTemplateScale, fmtCurrency } from '../../hooks/useTemplateScale';

const BlackFriday = ({
  nombreProducto = 'Juego de Comedor',
  descripcion = 'Mesa extensible con 6 sillas tapizadas en tela premium. Estructura de roble macizo, acabado laqueado mate.',
  imagenProducto = '',
  backgroundUrl = '', // Recibido desde cache
  precioLista = 0,
  precioOferta = 0,
  porcentajeDescuento = 0,
  preview = false,
}) => {
  const BASE_W = 1200;
  const BASE_H = 600;

  const scale = useTemplateScale(BASE_W, BASE_H, !preview);
  const effectiveScale = preview ? 1 : scale;

  const [imgRatio, setImgRatio] = useState(1);
  const imgRef = useRef(null);

  useEffect(() => {
    const el = imgRef.current;
    if (el?.complete && el.naturalWidth > 0) {
      setImgRatio(el.naturalHeight / el.naturalWidth);
    }
  }, [imagenProducto]);

  const len = nombreProducto.length;
  const unaLinea = len <= 14;
  const nombreFontSize = len <= 8 ? 72 : len <= 14 ? 54 : len <= 20 ? 54 : len <= 26 ? 46 : 36;
  const descUnaLinea = descripcion.length <= 50;

  const IMG_FULL = 440;
  const IMG_TALL = 460;
  const isTall = imgRatio > 1.3;
  const imgSize = isTall ? IMG_TALL : IMG_FULL;
  const imgLeft = Math.round(340 - imgSize / 2) + (isTall ? 25 : 0);
  const imgTop = Math.round(315 - imgSize / 2);

  return (
    <div
      style={{
        width: preview ? BASE_W : '100vw',
        height: preview ? BASE_H : '100vh',
        background: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        contain: 'strict',
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
          willChange: 'transform',
        }}
      >
        {/* FONDO */}
        {backgroundUrl && (
          <img
            src={backgroundUrl}
            alt=""
            aria-hidden
            fetchPriority="high"
            decoding="async"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        )}

        {/* PRECIO OFERTA */}
        <div
          className="bf-popIn"
          style={{
            position: 'absolute',
            left: 840,
            top: 540,
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            lineHeight: 1,
            pointerEvents: 'none',
          }}
        >
          <div
            className="bf-pricePulse"
            style={{
              fontFamily: "'Rubik', sans-serif",
              fontWeight: 900,
              fontSize: porcentajeDescuento > 0 ? 46 : 52,
              color: '#050303',
              letterSpacing: -1,
              lineHeight: 0.95,
            }}
          >
            {fmtCurrency(precioOferta)}
          </div>
        </div>

        {/* % DESCUENTO */}
        {porcentajeDescuento > 0 && (
          <div
            className="bf-slideDown"
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
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: 110,
              textAlign: 'center',
            }}
          >
            <span style={{ fontWeight: 900, fontSize: 52, letterSpacing: -2, lineHeight: 1 }}>
              {porcentajeDescuento}%
            </span>
            <span style={{ fontWeight: 800, fontSize: 22, letterSpacing: 3, marginTop: -4 }}>
              OFF
            </span>
          </div>
        )}

        {/* PRECIO DE LISTA */}
        {precioLista > 0 && (
          <div
            className="bf-slideUp"
            style={{
              position: 'absolute',
              left: 720,
              top: 420,
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '8px 14px',
              pointerEvents: 'none',
              background: 'rgba(0,0,0,0.7)',
              borderRadius: 12,
              border: '1px solid rgba(255,255,255,0.12)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
            }}
          >
            <span style={{ fontFamily: "'Rubik', sans-serif", fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.8)', letterSpacing: 2, textTransform: 'uppercase' }}>
              Antes
            </span>
            <span style={{ fontFamily: "'Rubik', sans-serif", fontSize: 22, fontWeight: 500, color: '#ffffff', textDecoration: 'line-through', lineHeight: 1, letterSpacing: 1 }}>
              {fmtCurrency(precioLista)}
            </span>
          </div>
        )}

        {/* NOMBRE */}
        <div
          className="bf-slideLeftTitle"
          style={{
            position: 'absolute',
            left: 860,
            top: unaLinea ? 240 : 200,
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
            background: 'linear-gradient(180deg, #fff5a0 0%, #f5c800 30%, #c8860a 65%, #f5c800 85%, #fff0a0 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.7))',
          }}
        >
          {nombreProducto}
        </div>

        {/* DESCRIPCIÓN */}
        {descripcion && (
          <div
            className="bf-fadeIn"
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
              background: 'rgba(0, 0, 0, 0.75)',
              borderRadius: 14,
              border: '1px solid rgba(255,255,255,0.12)',
              boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
            }}
          >
            {descripcion}
          </div>
        )}

        {/* IMAGEN PRODUCTO */}
        {imagenProducto && (
          <img
            ref={imgRef}
            src={imagenProducto}
            alt={nombreProducto ?? ''}
            decoding="async"
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
              willChange: 'transform',
              pointerEvents: 'none',
            }}
            className="bf-imgAnim"
          />
        )}
      </div>

      <style>{`
        @keyframes bf-floatProd {
          0%,100% { transform: translateY(0px);  }
          50%      { transform: translateY(-14px); }
        }
        @keyframes bf-pricePulse {
          0%,100% { opacity:1; }
          50%      { opacity:0.82; }
        }
        @keyframes bf-slideDown {
          from { opacity:0; transform: translateY(-22px); }
          to   { opacity:1; transform: translateY(0);     }
        }
        @keyframes bf-slideLeftTitle {
          from { opacity:0; transform: translateX(calc(-50% + 28px)); }
          to   { opacity:1; transform: translateX(-50%);              }
        }
        @keyframes bf-slideUp {
          from { opacity:0; transform: translateY(22px); }
          to   { opacity:1; transform: translateY(0);    }
        }
        @keyframes bf-popIn {
          from { opacity:0; transform: translate(-50%,-50%) scale(0.75); }
          to   { opacity:1; transform: translate(-50%,-50%) scale(1);    }
        }
        @keyframes bf-fadeIn {
          from { opacity:0; }
          to   { opacity:1; }
        }
        @keyframes bf-imgEnter {
          from { opacity:0; transform: translateY(18px); }
          to   { opacity:1; transform: translateY(0);    }
        }

        .bf-popIn { animation: bf-popIn 0.6s cubic-bezier(0.34,1.56,0.64,1) 1.2s both; }
        .bf-pricePulse { animation: bf-pricePulse 2.5s ease-in-out 1.8s infinite; }
        .bf-slideDown { animation: bf-slideDown 0.5s ease-out 0.1s both; }
        .bf-slideUp { animation: bf-slideUp 0.5s ease-out 1.0s both; }
        .bf-slideLeftTitle { animation: bf-slideLeftTitle 0.55s ease-out 0.5s both; }
        .bf-fadeIn { animation: bf-fadeIn 0.6s ease-out 0.75s both; }
        .bf-imgAnim {
          animation:
            bf-imgEnter 0.7s ease-out 0s both,
            bf-floatProd 4s ease-in-out 0.7s infinite;
        }
      `}</style>
    </div>
  );
};

export default memo(BlackFriday);
