import { memo, useEffect, useState, useRef } from "react";
import { useTemplateScale, fmtCurrency } from "../../hooks/useTemplateScale";

/**
 * Plantilla MegaSale: Optimizada para rendimiento en Chromecast.
 * Utiliza escalado por SceneScale y fondos cacheados.
 */
const MegaSale = ({
  nombreProducto = "Juego de Comedor",
  descripcion = "Mesa extensible con 6 sillas tapizadas en tela premium. Estructura de roble macizo, acabado laqueado mate.",
  imagenProducto = "",
  backgroundUrl = "", // Recibido desde cache (Blob URL)
  precioLista = 0,
  precioOferta = 0,
  porcentajeDescuento = 0,
  preview = false,
}) => {
  const BASE_W = 1200;
  const BASE_H = 600;

  // Escala responsiva basada en ResizeObserver
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
  const nombreFontSize =
    len <= 8 ? 72 : len <= 14 ? 54 : len <= 20 ? 54 : len <= 26 ? 46 : 36;

  const descUnaLinea = descripcion.length <= 50;

  const IMG_FULL = 440;
  const IMG_TALL = 380;
  const isTall = imgRatio > 1.3;
  const imgSize = isTall ? IMG_TALL : IMG_FULL;
  const imgLeft = Math.round(340 - imgSize / 2) + (isTall ? 25 : 0);
  const imgTop = Math.round(305 - imgSize / 2);

  return (
    <div
      style={{
        width: preview ? BASE_W : "100vw",
        height: preview ? BASE_H : "100vh",
        background: "#000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        contain: "strict",
      }}
    >
      <div
        style={{
          position: "relative",
          width: BASE_W,
          height: BASE_H,
          flexShrink: 0,
          transform: `scale(${effectiveScale})`,
          transformOrigin: "center center",
          willChange: "transform",
        }}
      >
        {/* FONDO CACHEADO */}
        {backgroundUrl && (
          <img
            src={backgroundUrl}
            alt=""
            aria-hidden
            fetchPriority="high"
            decoding="async"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        )}

        {/* PRECIO OFERTA */}
        <div
          className="ms-popIn"
          style={{
            position: "absolute",
            left: 919,
            top: 455,
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            lineHeight: 1,
            pointerEvents: "none",
          }}
        >
          <div
            className="ms-pricePulse"
            style={{
              fontFamily: "'Rubik', sans-serif",
              fontWeight: 900,
              fontSize: porcentajeDescuento > 0 ? 46 : 52,
              color: "#050303",
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
            className="ms-slideDown"
            style={{
              position: "absolute",
              left: 670,
              top: 420,
              transform: "rotate(-4deg)",
              zIndex: 2,
              fontFamily: "'Rubik', sans-serif",
              fontWeight: 900,
              fontSize: 33,
              color: "#ffffff",
              letterSpacing: -1,
              lineHeight: 1,
              textShadow: "0 2px 8px rgba(0,0,0,0.6)",
              pointerEvents: "none",
            }}
          >
            {porcentajeDescuento}% OFF
          </div>
        )}

        {/* PRECIO LISTA TACHADO */}
        {precioLista > 0 && (
          <div
            className="ms-slideUp"
            style={{
              position: "absolute",
              left: 810,
              top: 370,
              display: "flex",
              alignItems: "center",
              gap: 8,
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                fontFamily: "'Rubik', sans-serif",
                fontSize: 25,
                color: "#fff",
                letterSpacing: 1.5,
                textShadow: "0 2px 8px rgba(0,0,0,0.6)",
              }}
            >
              ANTES
            </div>
            <div
              style={{
                fontFamily: "'Rubik', sans-serif",
                fontWeight: 700,
                fontSize: 30,
                color: "#fff",
                textDecoration: "line-through",
                lineHeight: 1,
                letterSpacing: 1,
                textShadow: "0 2px 8px rgba(0,0,0,0.6)",
              }}
            >
              {fmtCurrency(precioLista)}
            </div>
          </div>
        )}

        {/* TITULO PRODUCTO */}
        <div
          className="ms-slideLeftTitle"
          style={{
            position: "absolute",
            left: 890,
            top: unaLinea ? 110 : 120,
            transform: "translateX(-50%)",
            fontFamily: "'Rubik', sans-serif",
            fontWeight: 900,
            fontSize: nombreFontSize,
            letterSpacing: -1,
            whiteSpace: unaLinea ? "nowrap" : "normal",
            textAlign: "center",
            width: 380,
            lineHeight: 1.05,
            pointerEvents: "none",
            background:
              "linear-gradient(180deg, #ffc76a 0%, #ff9f1a 35%, #ff7a00 60%, #ff9f1a 85%, #ffe2b3 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.8))",
          }}
        >
          {nombreProducto}
        </div>

        {/* DESCRIPCIÓN */}
        {descripcion && (
          <div
            className="ms-fadeIn"
            style={{
              position: "absolute",
              left: 650,
              top: 285,
              width: 490,
              padding: "12px 16px",
              fontFamily: "'Rubik', sans-serif",
              fontSize: descUnaLinea ? 18 : 14,
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1.6,
              whiteSpace: descUnaLinea ? "nowrap" : "normal",
              textAlign: "center",
              pointerEvents: "none",
              background: "rgba(0,0,0,0.72)",
              borderRadius: 14,
              border: "1px solid rgba(255,255,255,0.12)",
              boxShadow: "0 4px 16px rgba(0,0,0,0.5)",
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
            alt={nombreProducto ?? ""}
            decoding="async"
            onLoad={(e) => {
              const { naturalWidth: w, naturalHeight: h } = e.currentTarget;
              setImgRatio(w > 0 ? h / w : 1);
            }}
            style={{
              position: "absolute",
              left: imgLeft,
              top: imgTop,
              width: imgSize,
              height: imgSize,
              objectFit: "contain",
              zIndex: 1,
              willChange: "transform",
              pointerEvents: "none",
            }}
            className="ms-imgAnim"
          />
        )}
      </div>

      <style>{`
        @keyframes ms-floatProd {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-14px); }
        }
        @keyframes ms-pricePulse {
          0%,100% { opacity: 1; }
          50%      { opacity: 0.82; }
        }
        @keyframes ms-slideDown {
          from { opacity: 0; transform: rotate(-4deg) translateY(-18px); }
          to   { opacity: 1; transform: rotate(-4deg) translateY(0); }
        }
        @keyframes ms-slideLeftTitle {
          from { opacity: 0; transform: translateX(calc(-50% + 24px)); }
          to   { opacity: 1; transform: translateX(-50%); }
        }
        @keyframes ms-slideUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes ms-popIn {
          from { opacity: 0; transform: translate(-50%,-50%) scale(0.78); }
          to   { opacity: 1; transform: translate(-50%,-50%) scale(1); }
        }
        @keyframes ms-fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes ms-imgEnter {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .ms-popIn        { animation: ms-popIn 0.6s cubic-bezier(0.34,1.56,0.64,1) 1.2s both; }
        .ms-pricePulse   { animation: ms-pricePulse 2.5s ease-in-out 1.8s infinite; }
        .ms-slideDown    { animation: ms-slideDown 0.5s ease-out 0.1s both; }
        .ms-slideUp      { animation: ms-slideUp 0.5s ease-out 1.0s both; }
        .ms-slideLeftTitle { animation: ms-slideLeftTitle 0.55s ease-out 0.5s both; }
        .ms-fadeIn       { animation: ms-fadeIn 0.6s ease-out 0.75s both; }
        .ms-imgAnim      {
          animation:
            ms-imgEnter 0.7s ease-out 0s both,
            ms-floatProd 4s ease-in-out 0.7s infinite;
        }
      `}</style>
    </div>
  );
};

export default memo(MegaSale);