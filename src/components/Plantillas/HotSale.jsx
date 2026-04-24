import { memo, useEffect, useState, useRef } from "react";
import { useTemplateScale, fmtCurrency } from "../../hooks/useTemplateScale";

const HotSale = ({
  nombreProducto = "Juego de Comedor",
  descripcion = "Mesa extensible con 6 sillas tapizadas en tela premium. Estructura de roble macizo, acabado laqueado mate.",
  imagenProducto = "",
  backgroundUrl = "", // Recibido desde cache
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
  const imgLeft = Math.round(830 - imgSize / 2) + (isTall ? 25 : 0);
  const imgTop = Math.round(270 - imgSize / 2);

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
        {/* FONDO */}
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
          className="hs-popIn"
          style={{
            position: "absolute",
            left: 350,
            top: 510,
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            lineHeight: 1,
            pointerEvents: "none",
          }}
        >
          <div
            className="hs-pricePulse"
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
            className="hs-slideDown"
            style={{
              position: "absolute",
              left: 305,
              top: 60,
              transform: "rotate(-4deg)",
              zIndex: 2,
              fontFamily: "'Rubik', sans-serif",
              fontWeight: 900,
              fontSize: 40,
              color: "#ffffff",
              letterSpacing: -1,
              lineHeight: 1,
              pointerEvents: "none",
              textShadow: "0 2px 8px rgba(0,0,0,0.6)",
            }}
          >
            {porcentajeDescuento}%
          </div>
        )}

        {/* PRECIO LISTA */}
        {precioLista > 0 && (
          <div
            className="hs-slideUp"
            style={{
              position: "absolute",
              left: 70,
              top: 470,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
              pointerEvents: "none",
            }}
          >
            <div style={{ fontFamily: "'Rubik', sans-serif", fontSize: 25, color: "#ffffff", letterSpacing: 1.5, textTransform: "uppercase", textShadow: "0 2px 8px rgba(0,0,0,0.6)" }}>
              ANTES
            </div>
            <div style={{ fontFamily: "'Rubik', sans-serif", fontSize: 20, color: "#ffffff", textDecoration: "line-through", lineHeight: 1, letterSpacing: 1, textShadow: "0 2px 8px rgba(0,0,0,0.6)" }}>
              {fmtCurrency(precioLista)}
            </div>
          </div>
        )}

        {/* NOMBRE */}
        <div
          className="hs-slideLeftTitle"
          style={{
            position: "absolute",
            left: 330,
            top: unaLinea ? 230 : 210,
            transform: "translateX(-50%)",
            fontFamily: "'Rubik', sans-serif",
            fontWeight: 900,
            fontSize: nombreFontSize,
            whiteSpace: unaLinea ? "nowrap" : "normal",
            textAlign: "center",
            width: 380,
            lineHeight: 1.05,
            pointerEvents: "none",
            color: "#ffffff",
            textShadow: "0 4px 12px rgba(0,0,0,0.8), 0 0 15px rgba(239, 68, 68, 0.4)",
            textTransform: "uppercase",
            letterSpacing: "-0.012em",
          }}
        >
          {nombreProducto}
        </div>

        {/* DESCRIPCIÓN */}
        {descripcion && (
          <div
            className="hs-fadeIn"
            style={{
              position: "absolute",
              left: 80,
              top: 330,
              width: 490,
              padding: "14px 18px",
              fontFamily: "'Rubik', sans-serif",
              fontSize: descUnaLinea ? 20 : 16,
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.6,
              whiteSpace: descUnaLinea ? "nowrap" : "normal",
              textAlign: "center",
              pointerEvents: "none",
              background: "linear-gradient(180deg, rgba(60,0,0,0.85) 0%, rgba(30,0,0,0.95) 100%)",
              borderRadius: "14px",
              border: "1px solid rgba(255,120,120,0.25)",
              boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
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
            className="hs-imgAnim"
          />
        )}
      </div>

      <style>{`
        @keyframes hs-floatProd {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-14px); }
        }
        @keyframes hs-pricePulse {
          0%,100% { opacity: 1; }
          50%      { opacity: 0.82; }
        }
        @keyframes hs-slideDown {
          from { opacity: 0; transform: translateY(-22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes hs-slideLeftTitle {
          from { opacity: 0; transform: translateX(calc(-50% + 28px)); }
          to   { opacity: 1; transform: translateX(-50%); }
        }
        @keyframes hs-slideUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes hs-popIn {
          from { opacity: 0; transform: translate(-50%,-50%) scale(0.75); }
          to   { opacity: 1; transform: translate(-50%,-50%) scale(1); }
        }
        @keyframes hs-fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes hs-imgEnter {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .hs-popIn { animation: hs-popIn 0.6s cubic-bezier(0.34,1.56,0.64,1) 1.2s both; }
        .hs-pricePulse { animation: hs-pricePulse 2.5s ease-in-out 1.8s infinite; }
        .hs-slideDown { animation: hs-slideDown 0.5s ease-out 0.1s both; }
        .hs-slideUp { animation: hs-slideUp 0.5s ease-out 1.0s both; }
        .hs-slideLeftTitle { animation: hs-slideLeftTitle 0.55s ease-out 0.5s both; }
        .hs-fadeIn { animation: hs-fadeIn 0.6s ease-out 0.75s both; }
        .hs-imgAnim {
          animation:
            hs-imgEnter 0.7s ease-out 0s both,
            hs-floatProd 4s ease-in-out 0.7s infinite;
        }
      `}</style>
    </div>
  );
};

export default memo(HotSale);
