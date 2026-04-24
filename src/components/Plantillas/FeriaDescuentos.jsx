import { memo, useEffect, useState, useRef } from 'react';
import { useTemplateScale, fmtCurrency } from '../../hooks/useTemplateScale';

const FeriaDescuentos = ({
  nombreProducto = 'Juego de Comedor',
  descripcion = 'Mesa extensible con 6 sillas tapizadas en tela premium.',
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
  const nombreFontSize = len <= 8 ? 72 : len <= 14 ? 54 : len <= 20 ? 54 : len <= 26 ? 46 : 36;
  const unaLinea = len <= 14;
  const descUnaLinea = descripcion.length <= 35;

  const isTall = imgRatio > 1.3;
  const imgSize = isTall ? 460 : 440;
  const imgLeft = Math.round(860 - imgSize / 2) + (isTall ? 25 : 0);
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
          className="fd-popIn"
          style={{
            position: 'absolute',
            left: 388,
            top: 490,
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            lineHeight: 1,
            pointerEvents: 'none',
          }}
        >
          <div
            className="fd-pricePulse"
            style={{
              fontFamily: "'Rubik', sans-serif",
              fontWeight: 900,
              fontSize: porcentajeDescuento > 0 ? 66 : 52,
              color: '#fff898',
              textShadow: '-3px -3px 0 #352020, 3px -3px 0 #352020, -3px 3px 0 #352020, 3px 3px 0 #4a2c1a',
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
            className="fd-slideDownRot"
            style={{
              position: 'absolute',
              left: 400,
              top: 52,
              transform: 'rotate(-4deg)',
              zIndex: 2,
              fontFamily: "'Rubik', sans-serif",
              fontWeight: 900,
              fontSize: 53,
              color: '#808ae4',
              letterSpacing: -1,
              lineHeight: 1,
              pointerEvents: 'none',
              textShadow: '0 2px 8px rgba(0,0,0,0.4)',
            }}
          >
            {porcentajeDescuento}%
          </div>
        )}

        {/* PRECIO LISTA TACHADO */}
        {precioLista > 0 && (
          <div
            className="fd-slideUp"
            style={{
              position: 'absolute',
              left: 250,
              top: 410,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              pointerEvents: 'none',
            }}
          >
            <div style={{ fontFamily: "'Rubik', sans-serif", fontSize: 34, fontWeight: 700, color: '#ffffff', letterSpacing: 1.5, textTransform: 'uppercase', textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>
              ANTES
            </div>
            <div style={{ fontFamily: "'Rubik', sans-serif", fontSize: 34, fontWeight: 800, color: '#ffffff', textDecoration: 'line-through', lineHeight: 1, letterSpacing: 1, textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>
              {fmtCurrency(precioLista)}
            </div>
          </div>
        )}

        {/* NOMBRE DEL PRODUCTO */}
        <div
          className="fd-slideLeftTitle"
          style={{
            position: 'absolute',
            left: 380,
            top: unaLinea ? 230 : 190,
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
            color: '#fff',
            textShadow: '0 3px 8px rgba(0,0,0,0.8)',
          }}
        >
          {nombreProducto}
        </div>

        {/* DESCRIPCIÓN */}
        {descripcion && (
          <div
            className="fd-fadeIn"
            style={{
              position: 'absolute',
              left: 140,
              top: 330,
              width: 490,
              padding: '8px 16px',
              fontFamily: "'Rubik', sans-serif",
              fontSize: descUnaLinea ? 20 : 16,
              fontWeight: 700,
              color: '#000',
              lineHeight: 1.6,
              whiteSpace: descUnaLinea ? 'nowrap' : 'normal',
              textAlign: 'center',
              pointerEvents: 'none',
              background: 'rgba(176, 193, 255, 0.92)',
              borderRadius: 14,
              border: '1px solid rgba(255,255,255,0.4)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
            }}
          >
            {descripcion}
          </div>
        )}

        {/* IMAGEN DEL PRODUCTO */}
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
            className="fd-imgAnim"
          />
        )}
      </div>

      <style>{`
        @keyframes fd-floatProd {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-14px); }
        }
        @keyframes fd-pricePulse {
          0%,100% { opacity: 1; }
          50%      { opacity: 0.82; }
        }
        @keyframes fd-slideDownRot {
          from { opacity: 0; transform: rotate(-4deg) translateY(-22px); }
          to   { opacity: 1; transform: rotate(-4deg) translateY(0); }
        }
        @keyframes fd-slideLeftTitle {
          from { opacity: 0; transform: translate(calc(-50% + 28px), 0); }
          to   { opacity: 1; transform: translate(-50%, 0); }
        }
        @keyframes fd-slideUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fd-popIn {
          from { opacity: 0; transform: translate(-50%, -50%) scale(0.75); }
          to   { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
        @keyframes fd-fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes fd-imgEnter {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .fd-popIn { animation: fd-popIn 0.6s cubic-bezier(0.34,1.56,0.64,1) 1.2s both; }
        .fd-pricePulse { animation: fd-pricePulse 2.5s ease-in-out 1.8s infinite; }
        .fd-slideDownRot { animation: fd-slideDownRot 0.5s ease-out 0.1s both; }
        .fd-slideUp { animation: fd-slideUp 0.5s ease-out 1.0s both; }
        .fd-slideLeftTitle { animation: fd-slideLeftTitle 0.55s ease-out 0.5s both; }
        .fd-fadeIn { animation: fd-fadeIn 0.6s ease-out 0.75s both; }
        .fd-imgAnim {
          animation:
            fd-imgEnter 0.7s ease-out 0s both,
            fd-floatProd 4s ease-in-out 0.7s infinite;
        }
      `}</style>
    </div>
  );
};

export default memo(FeriaDescuentos);
