/**
 * FeriaDescuentos — versión TV-optimizada
 *
 * Cambios vs original:
 * - Sin backdrop-filter (mata GPU en TV)
 * - Sin drop-shadow en filter (usa box-shadow o text-shadow, mucho más barato)
 * - Animaciones solo en `transform` y `opacity` (composited layers, 60fps)
 * - Las fuentes NO se importan aquí — deben preloadarse una vez en index.html o en el SlideShowPlayer
 * - Sin @keyframes definidos inline en cada render — se inyectan UNA sola vez
 */

import { memo, useEffect, useState } from 'react';
import plantilla from '../../assets/canva/feriadedescuentos.png';
import comedorDefault from '../../assets/comedor.png';

const BASE_W = 1200;
const BASE_H = 600;

/* ─────────────────────────────────────────────────────────────
   Keyframes inyectados UNA sola vez en el <head> del documento.
   NO van dentro del componente para evitar re-inserción en cada render.
───────────────────────────────────────────────────────────── */
const KEYFRAMES_ID = '__feria_kf__';
const KEYFRAMES_CSS = `
  @keyframes fd-floatProd {
    0%,100% { transform: translateY(0px); }
    50%      { transform: translateY(-14px); }
  }
  @keyframes fd-pricePulse {
    0%,100% { opacity: 1; }
    50%      { opacity: 0.82; }
  }
  @keyframes fd-slideDown {
    from { opacity: 0; transform: translateY(-22px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fd-slideDownRot {
    from { opacity: 0; transform: rotate(-4deg) translateY(-22px); }
    to   { opacity: 1; transform: rotate(-4deg) translateY(0); }
  }
  @keyframes fd-slideUp {
    from { opacity: 0; transform: translateY(22px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fd-slideLeftTitle {
    from { opacity: 0; transform: translate(calc(-50% + 28px), 0); }
    to   { opacity: 1; transform: translate(-50%, 0); }
  }
  @keyframes fd-fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes fd-popIn {
    from { opacity: 0; transform: translate(-50%, -50%) scale(0.75); }
    to   { opacity: 1; transform: translate(-50%, -50%) scale(1); }
  }
  @keyframes fd-imgEnter {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;

function injectKeyframesOnce() {
  if (document.getElementById(KEYFRAMES_ID)) return;
  const style = document.createElement('style');
  style.id = KEYFRAMES_ID;
  style.textContent = KEYFRAMES_CSS;
  document.head.appendChild(style);
}

/* ─────────────────────────────────────────────────────────────
   Componente
───────────────────────────────────────────────────────────── */
const FeriaDescuentos = ({
  nombreProducto = 'Juego de Comedor',
  descripcion = 'Mesa extensible con 6 sillas tapizadas en tela premium.',
  imagenProducto = comedorDefault,
  precioLista = 500000,
  precioOferta = 250000,
  porcentajeDescuento = 50,
  preview = false,
}) => {
  const [scale, setScale] = useState(1);
  const [imgRatio, setImgRatio] = useState(1);

  // Inyectar keyframes una sola vez al montar el primer componente
  useEffect(() => {
    injectKeyframesOnce();
  }, []);

  useEffect(() => {
    if (preview) return;
    const calc = () => setScale(Math.min(window.innerWidth / BASE_W, window.innerHeight / BASE_H));
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, [preview]);

  const fmt = (n) => (n ? `$${Number(n).toLocaleString('es-AR')}` : '');

  const len = nombreProducto.length;
  const nombreFontSize = len <= 8 ? 72 : len <= 14 ? 54 : len <= 20 ? 54 : len <= 26 ? 46 : 36;
  const unaLinea = len <= 14;
  const descUnaLinea = descripcion.length <= 35;

  const isTall = imgRatio > 1.3;
  const imgSize = isTall ? 460 : 440;
  const imgLeft = Math.round(860 - imgSize / 2) + (isTall ? 25 : 0);
  const imgTop = Math.round(305 - imgSize / 2);

  const effectiveScale = preview ? 1 : scale;

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
          /* Forzar composited layer para que los hijos animados no redibujén el fondo */
          willChange: 'transform',
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

        {/* PRECIO OFERTA */}
        <div
          style={{
            position: 'absolute',
            left: 388,
            top: 490,
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            lineHeight: 1,
            pointerEvents: 'none',
            animation: 'fd-popIn 0.6s cubic-bezier(0.34,1.56,0.64,1) 1.2s both',
            willChange: 'transform, opacity',
          }}
        >
          <div
            style={{
              fontFamily: "'Rubik', sans-serif",
              fontWeight: 900,
              fontSize: porcentajeDescuento > 0 ? 66 : 52,
              color: '#fff898',
              /* text-shadow es mucho más barato que filter: drop-shadow */
              textShadow:
                '-3px -3px 0 #352020, 3px -3px 0 #352020, -3px 3px 0 #352020, 3px 3px 0 #4a2c1a',
              letterSpacing: -1,
              lineHeight: 0.95,
              animation: 'fd-pricePulse 2.5s ease-in-out 1.8s infinite',
              willChange: 'opacity',
            }}
          >
            {fmt(precioOferta)}
          </div>
        </div>

        {/* % DESCUENTO */}
        {porcentajeDescuento > 0 && (
          <div
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
              animation: 'fd-slideDownRot 0.5s ease-out 0.1s both',
              willChange: 'transform, opacity',
            }}
          >
            {porcentajeDescuento}%
          </div>
        )}

        {/* PRECIO LISTA TACHADO */}
        {precioLista > 0 && (
          <div
            style={{
              position: 'absolute',
              left: 250,
              top: 410,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              pointerEvents: 'none',
              animation: 'fd-slideUp 0.5s ease-out 1.0s both',
              willChange: 'transform, opacity',
            }}
          >
            <div
              style={{
                fontFamily: "'Rubik', sans-serif",
                fontSize: 34,
                fontWeight : 700,
                color: '#fff',
                letterSpacing: 1.5,
                textTransform: 'uppercase',
              }}
            >
              ANTES
            </div>
            <div
              style={{
                fontFamily: "'Rubik', sans-serif",
                fontSize: 34,
                fontWeight : 800,
                color: '#fff',
                textDecoration: 'line-through',
                lineHeight: 1,
                letterSpacing: 1,
              }}
            >
              {fmt(precioLista)}
            </div>
          </div>
        )}

        {/* NOMBRE DEL PRODUCTO */}
        <div
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
            /* box-shadow en el contenedor → NO filter */
            textShadow: '0 3px 8px rgba(0,0,0,0.8)',
            animation: 'fd-slideLeftTitle 0.55s ease-out 0.5s both',
            willChange: 'transform, opacity',
          }}
        >
          {nombreProducto}
        </div>

        {/* DESCRIPCIÓN — sin backdrop-filter */}
        {descripcion && (
          <div
            style={{
              position: 'absolute',
              left: 140,
              top: 330,
              width: 490,
              fontFamily: "'Rubik', sans-serif",
              fontSize: descUnaLinea ? 20 : 16,
              fontWeight: 400,
              color: '#000',
              background: '#b0c1ff',
              /* backdrop-filter eliminado — usamos fondo sólido */
              borderRadius: 14,
              border: '1px solid rgba(255,255,255,0.25)',
              /* box-shadow es composited, no repaint */
              boxShadow: '0 8px 24px rgba(0,0,0,0.45)',
              lineHeight: 1.6,
              whiteSpace: descUnaLinea ? 'nowrap' : 'normal',
              textAlign: 'center',
              padding: '6px 14px',
              pointerEvents: 'none',
              animation: 'fd-fadeIn 0.6s ease-out 0.75s both',
              willChange: 'opacity',
            }}
          >
            {descripcion}
          </div>
        )}

        {/* IMAGEN DEL PRODUCTO */}
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
              pointerEvents: 'none',
              /*
                Solo transform + opacity → composited layer, sin repaint.
                El drop-shadow del original era el principal asesino de FPS.
              */
              animation:
                'fd-imgEnter 0.7s ease-out 0s both, fd-floatProd 4s ease-in-out 0.7s infinite',
              willChange: 'transform, opacity',
            }}
          />
        )}
      </div>
    </div>
  );
};

export default memo(FeriaDescuentos);
