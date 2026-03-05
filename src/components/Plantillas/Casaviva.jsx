import React, { useEffect, useState } from "react";
import logo from "./../../assets/logo.png";
import comedor from "./../../assets/comedor.png";
import "./Casaviva.css";

export default function CasaViva({
  titulo = "Juego de Comedor",
  descripcion = "Mesa extensible con 6 sillas tapizadas en tela premium. Estructura de roble macizo, acabado laqueado mate.",
  imagenProducto = comedor,
  precioLista = 500000,
  precioOferta = 250000,
  porcentajeDescuento = 50,
}) {
  const [mounted, setMounted] = useState(false);
  const [scale, setScale]   = useState(1);

  useEffect(() => {
    const updateScale = () =>
      setScale(Math.min(window.innerWidth / 1280, window.innerHeight / 720));
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  useEffect(() => {
    const t1 = setTimeout(() => setMounted(false), 0);
    const t2 = setTimeout(() => setMounted(true), 80);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [titulo, imagenProducto]);

  const formatPrecio = (n) =>
    n ? `$ ${Number(n).toLocaleString("es-AR")}` : null;

  const titleScale = Math.min(
    1,
    Math.max(0.45, 1 - Math.max(0, titulo.length - 14) * 0.04)
  );

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Outfit:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <div className="cv-viewport">
        <div className="cv-scene" style={{ transform: `scale(${scale})` }}>
          {/* FONDO */}
          <div className="cv-bg" />
          <div className="cv-pattern" />
          <div className="cv-lines-deco" />
          <div className="cv-gradient-bottom" />

          {/* Formas decorativas */}
          <div
            className="cv-shape-main"
            style={{
              background:
                "linear-gradient(160deg, #e8f5ee 0%, rgba(255,255,255,0) 70%)",
            }}
          />
          <div
            className="cv-shape-left"
            style={{
              background:
                "radial-gradient(ellipse at top, rgba(45,122,79,.1) 0%, transparent 70%)",
            }}
          />
          <div
            className="cv-blob-top"
            style={{
              background:
                "radial-gradient(circle at 30% 40%, rgba(45,122,79,.15) 0%, transparent 70%)",
            }}
          />
          <div className="cv-rings" />

          {/* Círculos flotantes */}
          <div className="cv-circle-float cv-circle-float-1" />
          <div className="cv-circle-float cv-circle-float-2" />
          <div className="cv-circle-float cv-circle-float-3" />

          {/* Círculos deco top left */}
          <div
            className="cv-circle-deco"
            style={{ borderColor: "rgba(45,122,79,.14)" }}
          />
          <div
            className="cv-circle-deco2"
            style={{ borderColor: "rgba(45,122,79,.08)" }}
          />

          {/* Línea vertical separadora */}
          <div className="cv-v-line" />

          {/* LOGO */}
          <div className={`cv-logo ${mounted ? "on" : ""}`}>
            <img src={logo} alt="Logo" />
          </div>

          {/* LAYOUT */}
          <div className="cv-layout">
            {/* IZQUIERDA */}
            <div className="cv-left">
              {/* Eyebrow */}
              <div
                className={`cv-eyebrow cv-static ${mounted ? "on" : ""}`}
                style={{ transitionDelay: ".4s" }}
              >
                <div
                  className="cv-ey-pill"
                  style={{ borderLeftColor: "#2d7a4f" }}
                >
                  <span className="cv-ey-txt" style={{ color: "#2d7a4f" }}>
                    ❆ Oferta Especial
                  </span>
                </div>
              </div>

              {/* Contenido dinámico */}
              <div className="cv-content idle">
                <div className="cv-titulo" style={{ "--titulo-scale": titleScale }}>
                  <span className="cv-titulo-dest" style={{ color: "#2d7a4f" }}>
                    {titulo}
                  </span>
                </div>

                {/* Descripción en recuadro */}
                <div
                  className="cv-desc-box"
                  style={{ borderLeftColor: "#2d7a4f" }}
                >
                  <p className="cv-desc" style={{ margin: 0 }}>
                    {descripcion}
                  </p>
                </div>

                {/* Tarjeta precio */}
                <div
                  className="cv-price-card"
                  style={{
                    borderColor: "rgba(45,122,79,.14)",
                    boxShadow: "0 8px 32px rgba(45,122,79,.08)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "4px",
                      }}
                    >
                      <span className="cv-price-label">Precio oferta</span>
                      <div className="cv-price-old">
                        {formatPrecio(precioLista)}
                      </div>
                      <div className="cv-price-row">
                        <div className="cv-price-new">
                          {formatPrecio(precioOferta)}
                        </div>
                      </div>
                      <div className="cv-cuotas">
                        <strong style={{ color: "#2d7a4f" }}>
                          Consultar medios de Pago
                        </strong>
                      </div>
                    </div>
                    <div
                      className="cv-off-pill"
                      style={{
                        background: "#2d7a4f",
                        marginLeft: "12px",
                        flexShrink: 0,
                      }}
                    >
                      <span className="cv-off-pct">{porcentajeDescuento}%</span>
                      <span className="cv-off-lbl">OFF</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* WhatsApp */}
              <div
                className={`cv-whatsapp cv-static ${mounted ? "on" : ""}`}
                style={{ transitionDelay: "2s" }}
              >
                <svg
                  className="cv-whatsapp-icon"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                <span>381 2108473</span>
              </div>

              {/* Features / www tag */}
              <div
                className={`cv-features cv-static ${mounted ? "on" : ""}`}
                style={{ transitionDelay: "1.8s" }}
              >
                <span
                  className="cv-feat"
                  style={{
                    borderColor: "rgba(194,4,4,.18)",
                    color: "#da0505",
                    fontWeight: 700,
                    fontSize: "1rem",
                  }}
                >
                  www.mueblesdepinoml.com
                </span>
              </div>
            </div>

            {/* DERECHA */}
            <div className="cv-right">
              {/* Marcos decorativos */}
              <div
                className="cv-img-frame cv-img-frame-outer"
                style={{ borderColor: "rgba(45,122,79,.1)" }}
              />
              <div
                className="cv-img-frame cv-img-frame-inner"
                style={{ borderColor: "rgba(45,122,79,.07)" }}
              />
              {/* Esquinas */}
              <div
                className="cv-corner cv-corner-tl"
                style={{ borderColor: "#2d7a4f" }}
              />
              <div
                className="cv-corner cv-corner-tr"
                style={{ borderColor: "#2d7a4f" }}
              />
              <div
                className="cv-corner cv-corner-bl"
                style={{ borderColor: "#2d7a4f" }}
              />
              <div
                className="cv-corner cv-corner-br"
                style={{ borderColor: "#2d7a4f" }}
              />

              <div
                className="cv-img-glow"
                style={{
                  background:
                    "radial-gradient(ellipse,rgba(45,122,79,.6) 0%,transparent 70%)",
                }}
              />
              <div
                className="cv-floor"
                style={{
                  background:
                    "radial-gradient(ellipse,rgba(45,122,79,.15) 0%,transparent 70%)",
                }}
              />

              <div className={`cv-img-wrap ${mounted ? "on" : ""}`}>
                <img
                  className="cv-img"
                  src={imagenProducto}
                  alt={titulo}
                  style={{
                    filter:
                      "drop-shadow(0 24px 48px rgba(45,90,55,.22)) drop-shadow(0 0 50px rgba(45,122,79,.1))",
                  }}
                />
              </div>
            </div>
          </div>
        </div>{/* /cv-scene */}
      </div>{/* /cv-viewport */}
    </>
  );
}