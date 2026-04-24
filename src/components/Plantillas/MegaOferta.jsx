import { memo, useEffect, useState, useRef } from 'react';
import { useTemplateScale, fmtCurrency } from '../../hooks/useTemplateScale';

const Megaoferta = ({
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
  const imgTop = Math.round(305 - imgSize / 2);

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
          className="mo-popIn"
          style={{
            position: 'absolute',
            left: 728,
            top: 495,
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            lineHeight: 1,
            pointerEvents: 'none',
          }}
        >
          <div
            className="mo-pricePulse"
            style={{
              fontFamily: "'Rubik', sans-serif",
              fontWeight: 900,
              fontSize: porcentajeDescuento > 0 ? 46 : 52,
              color: '#000000',
              letterSpacing: -1,
              lineHeight: 0.95,
              textShadow: '-2px -2px 0 #ffffff, 2px -2px 0 #ffffff, -2px  2px 0 #ffffff,  2px  2px 0 #4a2c1a',
            }}
          >
            {fmtCurrency(precioOferta)}
          </div>
        </div>

        {/* % DESCUENTO */}
        {porcentajeDescuento > 0 && (
          <div
            className="mo-slideDownRotated"
            style={{
              position: 'absolute',
              left: 63,
              top: 22,
              transform: 'rotate(-8deg)',
              zIndex: 2,
              fontFamily: "'Rubik', sans-serif",
              fontWeight: 900,
              fontSize: 33,
              color: '#ffffff',
              letterSpacing: -1,
              lineHeight: 1,
              textShadow: '0 2px 10px rgba(0,0,0,0.5)',
              pointerEvents: 'none',
            }}
          >
            {porcentajeDescuento}% OFF
          </div>
        )}

        {/* PRECIO LISTA */}
        {precioLista > 0 && (
          <div
            className="mo-slideUp"
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
            <div style={{ fontFamily: "'Rubik', sans-serif", fontSize: 24, color: '#ffffff', letterSpacing: 1.5, textTransform: 'uppercase', textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>
              ANTES
            </div>
            <div style={{ fontFamily: "'Rubik', sans-serif", fontSize: 24, color: '#ffffff', textDecoration: 'line-through', lineHeight: 1, letterSpacing: 1, textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>
              {fmtCurrency(precioLista)}
            </div>
          </div>
        )}

        {/* NOMBRE */}
        <div
          className="mo-slideLeftTitle"
          style={{
            position: 'absolute',
            left: 890,
            top: unaLinea ? 200 : 190,
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
            className="mo-fadeIn"
            style={{
              position: 'absolute',
              left: 650,
              top: 330,
              width: 490,
              padding: '12px 16px',
              fontFamily: "'Rubik', sans-serif",
              fontSize: descUnaLinea ? 18 : 14,
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.6,
              whiteSpace: descUnaLinea ? 'nowrap' : 'normal',
              textAlign: 'center',
              pointerEvents: 'none',
              background: 'rgba(0, 0, 0, 0.72)',
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
            className="mo-imgAnim"
          />
        )}
      </div>

      <style>{`
        @keyframes mo-floatProd {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-14px); }
        }
        @keyframes mo-pricePulse {
          0%,100% { opacity: 1; }
          50%      { opacity: 0.82; }
        }
        @keyframes mo-slideDownRotated {
          from { opacity: 0; transform: rotate(-8deg) translateY(-22px); }
          to   { opacity: 1; transform: rotate(-8deg) translateY(0); }
        }
        @keyframes mo-slideLeftTitle {
          from { opacity: 0; transform: translateX(calc(-50% + 28px)); }
          to   { opacity: 1; transform: translateX(-50%); }
        }
        @keyframes mo-slideUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes mo-popIn {
          from { opacity: 0; transform: translate(-50%,-50%) scale(0.75); }
          to   { opacity: 1; transform: translate(-50%,-50%) scale(1); }
        }
        @keyframes mo-fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes mo-imgEnter {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .mo-popIn { animation: mo-popIn 0.6s cubic-bezier(0.34,1.56,0.64,1) 1.2s both; }
        .mo-pricePulse { animation: mo-pricePulse 2.5s ease-in-out 1.8s infinite; }
        .mo-slideDownRotated { animation: mo-slideDownRotated 0.5s ease-out 0.1s both; }
        .mo-slideUp { animation: mo-slideUp 0.5s ease-out 1.0s both; }
        .mo-slideLeftTitle { animation: mo-slideLeftTitle 0.55s ease-out 0.5s both; }
        .mo-fadeIn { animation: mo-fadeIn 0.6s ease-out 0.75s both; }
        .mo-imgAnim {
          animation:
            mo-imgEnter 0.7s ease-out 0s both,
            mo-floatProd 4s ease-in-out 0.7s infinite;
        }
      `}</style>
    </div>
  );
};

export default memo(Megaoferta);
