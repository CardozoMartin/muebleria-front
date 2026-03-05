import { useEffect, useState } from 'react';
import comedor from './../../assets/comedor.png';
import fondo from './../../assets/fondo2.png';
import logo from './../../assets/logo.png';
import './megasale.css';

export default function MegaSaleTV({
  titulo = 'Juego de Comedor',
  descripcion = 'Mesa extensible con 6 sillas tapizadas en tela premium. Estructura de roble macizo, acabado laqueado mate.',
  imagenProducto = comedor,
  precioLista = 500000,
  precioOferta = 250000,
  porcentajeDescuento = 50,
}) {
  const [mounted, setMounted] = useState(false);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const calc = () => setScale(Math.min(window.innerWidth / 1280, window.innerHeight / 720));
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);

  useEffect(() => {
    const t1 = setTimeout(() => setMounted(false), 0);
    const t2 = setTimeout(() => setMounted(true), 80);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [titulo, imagenProducto]);

  const fmt = (n) => (n ? `$ ${Number(n).toLocaleString('es-AR')}` : null);

  // Tamaño de título basado en largo pero el espacio siempre es el mismo
  const tituloSize = titulo.length > 30 ? '48px' : titulo.length > 20 ? '60px' : '74px';

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Rubik:wght@700;900&family=Montserrat:wght@600;700;900&display=swap"
        rel="stylesheet"
      />

      <div className="tv-viewport">
        <div className="tv-scene" style={{ transform: `scale(${scale})` }}>
          {mounted && <div className="flash" />}

          <img className={`tv-bg ${mounted ? 'on' : ''}`} src={fondo} alt="" aria-hidden />

          <div className="tv-grid">
            {/* ══ PANEL IZQUIERDO ══ */}
            <div className="tv-panel">
              {/* ZONA 1 — Logo (100px) */}
              <div className="zone-logo">
                <div className={`tv-logo-anim ${mounted ? 'on' : ''}`}>
                  <div className="tv-logo-ring">
                    <div className="tv-logo-inner">
                      <img src={logo} alt="Logo" />
                    </div>
                  </div>
                </div>
              </div>

              {/* ZONA 2 — Badge (60px) */}
              <div className="zone-badge">
                <div className={`tv-badge ${mounted ? 'on' : ''}`}>
                  <span className="tv-dot" />⚡ MEGA OFERTA
                </div>
              </div>

              {/* ZONA 3 — Título (160px) */}
              <div className="zone-titulo">
                <div
                  className={`tv-titulo ${mounted ? 'on' : ''}`}
                  style={{ fontSize: tituloSize }}
                >
                  {titulo}
                </div>
              </div>

              {/* ZONA 4 — Descripción (100px) */}
              <div className="zone-desc">
                {
                  descripcion ? (
                    <p className={`tv-desc ${mounted ? 'on' : ''}`}>{descripcion}</p>
                  ) : (
                    <div className="tv-desc-empty" />
                  ) /* ocupa el espacio igual */
                }
              </div>

              {/* ZONA 5 — Precios (180px) */}
              <div className="zone-precios">
                {/* Fila A: precio viejo + descuento (70px) */}
                <div className={`tv-fila-old ${mounted ? 'on' : ''}`}>
                  {/* Precio viejo — siempre ocupa su espacio, invisible si no existe */}
                  <div className={`tv-p-viejo-wrap ${precioLista > 0 ? 'visible' : ''}`}>
                    <div className="tv-p-label">Antes</div>
                    <div className="tv-p-old">{fmt(precioLista) ?? '—'}</div>
                  </div>

                  {/* Descuento — siempre ocupa su espacio, invisible si no existe */}
                  <div className={`tv-off-wrap ${porcentajeDescuento > 0 ? 'visible' : ''}`}>
                    <div className="tv-off">
                      {porcentajeDescuento > 0 ? `${porcentajeDescuento}% OFF` : ''}
                    </div>
                  </div>
                </div>

                {/* Fila B: precio oferta (100px) */}
                <div className={`tv-fila-new ${mounted ? 'on' : ''}`}>
                  <div className={`tv-p-new-wrap ${precioOferta > 0 ? 'visible' : ''}`}>
                    <div className="tv-p-new-inner">
                      <div className="tv-p-new">{fmt(precioOferta) ?? ''}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ZONA 6 — Footer (90px) */}
              <div className={`zone-footer ${mounted ? 'on' : ''}`}>
                <div className="tv-wa">
                  <svg viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  381 2108473
                </div>
                <div className="tv-web">🌐 www.mueblesdepinoml.com</div>
              </div>
            </div>

            {/* ══ COLUMNA IMAGEN ══ */}
            <div className={`tv-col-img ${mounted ? 'on' : ''}`}>
              {imagenProducto && <img src={imagenProducto} alt={titulo} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
