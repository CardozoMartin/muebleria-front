import { memo, useEffect, useState, useRef } from 'react';
import { useTemplateScale, fmtCurrency } from '../../hooks/useTemplateScale';

const FlashSale = ({
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
  const descUnaLinea = descripcion.length <= 40;

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
          className="fs-popIn"
          style={{
            position: 'absolute',
            left: 960,
            top: 468,
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            lineHeight: 1,
            pointerEvents: 'none',
          }}
        >
          <div
            className="fs-pricePulse"
            style={{
              fontFamily: "'Rubik', sans-serif",
              fontWeight: 980,
              fontSize: porcentajeDescuento > 0 ? 60 : 52,
              color: '#faa60a',
              letterSpacing: -1,
              lineHeight: 0.95,
              textShadow: '-2px -2px 0 #000000, 2px -2px 0 #010101, -2px  2px 0 #000000, 1px  1px 0 #ffffff',
            }}
          >
            {fmtCurrency(precioOferta)}
          </div>
        </div>

        {/* % DESCUENTO */}
        {porcentajeDescuento > 0 && (
          <div
            className="fs-slideDown"
            style={{
              position: 'absolute',
              left: 685,
              top: 455,
              transform: 'rotate(-4deg)',
              zIndex: 2,
              fontFamily: "'Rubik', sans-serif",
              fontWeight: 900,
              fontSize: 33,
              color: '#ffffff',
              letterSpacing: -1,
              lineHeight: 1,
              pointerEvents: 'none',
              textShadow: '-2px -2px 0 #000000, 2px -2px 0 #010101, -2px  2px 0 #000000, 2px  2px 0 #3768bc',
            }}
          >
            {porcentajeDescuento}%
          </div>
        )}

        {/* PRECIO LISTA */}
        {precioLista > 0 && (
          <div
            className="fs-slideUp"
            style={{
              position: 'absolute',
              left: 675,
              top: 360,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              pointerEvents: 'none',
            }}
          >
            <div style={{ fontFamily: "'Rubik', sans-serif", fontSize: 30, color: '#000000', letterSpacing: 1.5, textShadow: '0 1px 2px rgba(255,255,255,0.3)' }}>
              ANTES
            </div>
            <div style={{ fontFamily: "'Rubik', sans-serif", fontSize: 30, color: '#000000', textDecoration: 'line-through', lineHeight: 1, letterSpacing: 1.5, textShadow: '0 1px 2px rgba(255,255,255,0.3)' }}>
              {fmtCurrency(precioLista)}
            </div>
          </div>
        )}

        {/* NOMBRE */}
        <div
          className="fs-slideLeftTitle"
          style={{
            position: 'absolute',
            left: 890,
            top: unaLinea ? 140 : 135,
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
            color: 'rgb(56, 131, 235)',
            textShadow: '-3px -3px 0 #000000, 3px -3px 0 #010101, -3px  3px 0 #000000, 3px  3px 0 #000000',
          }}
        >
          {nombreProducto}
        </div>

        {/* DESCRIPCIÓN */}
        {descripcion && (
          <div
            className="fs-fadeIn"
            style={{
              position: 'absolute',
              left: 650,
              top: 255,
              width: 490,
              padding: '12px 18px',
              fontFamily: "'Rubik', sans-serif",
              fontSize: descUnaLinea ? 18 : 14,
              fontWeight: 700,
              color: '#000',
              lineHeight: 1.5,
              whiteSpace: descUnaLinea ? 'nowrap' : 'normal',
              textAlign: 'center',
              pointerEvents: 'none',
              background: 'rgba(251, 251, 251, 0.72)',
              borderRadius: '10px',
              border: '2px solid #FB8C00',
              boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
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
            className="fs-imgAnim"
          />
        )}
      </div>

      <style>{`
        @keyframes fs-floatProd {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-14px); }
        }
        @keyframes fs-pricePulse {
          0%,100% { opacity: 1; }
          50%      { opacity: 0.82; }
        }
        @keyframes fs-slideDown {
          from { opacity: 0; transform: translateY(-22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fs-slideLeftTitle {
          from { opacity: 0; transform: translateX(calc(-50% + 28px)); }
          to   { opacity: 1; transform: translateX(-50%); }
        }
        @keyframes fs-slideUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fs-popIn {
          from { opacity: 0; transform: translate(-50%,-50%) scale(0.75); }
          to   { opacity: 1; transform: translate(-50%,-50%) scale(1); }
        }
        @keyframes fs-fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes fs-imgEnter {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .fs-popIn { animation: fs-popIn 0.6s cubic-bezier(0.34,1.56,0.64,1) 1.2s both; }
        .fs-pricePulse { animation: fs-pricePulse 2.5s ease-in-out 1.8s infinite; }
        .fs-slideDown { animation: fs-slideDown 0.5s ease-out 0.1s both; }
        .fs-slideUp { animation: fs-slideUp 0.5s ease-out 1.0s both; }
        .fs-slideLeftTitle { animation: fs-slideLeftTitle 0.55s ease-out 0.5s both; }
        .fs-fadeIn { animation: fs-fadeIn 0.6s ease-out 0.75s both; }
        .fs-imgAnim {
          animation:
            fs-imgEnter 0.7s ease-out 0s both,
            fs-floatProd 4s ease-in-out 0.7s infinite;
        }
      `}</style>
    </div>
  );
};

export default memo(FlashSale);
