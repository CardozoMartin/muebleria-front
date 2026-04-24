import { useState, useEffect } from 'react';

/**
 * Hook para calcular el factor de escala de una escena fija (ej: 1200x600)
 * ajustada al viewport actual. Optimizado para evitar re-renders excesivos.
 */
export function useTemplateScale(baseW, baseH, active = true) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (!active) return;

    const calc = () => {
      const s = Math.min(window.innerWidth / baseW, window.innerHeight / baseH);
      setScale(s);
    };

    // Calcular al inicio
    calc();

    // ResizeObserver es más eficiente que el evento 'resize' de window en hardware limitado
    // ya que no se dispara con el scroll y es más granular.
    const ro = new ResizeObserver(() => {
        // Envolver en requestAnimationFrame para suavidad si es necesario
        calc();
    });

    ro.observe(document.documentElement);

    return () => ro.disconnect();
  }, [baseW, baseH, active]);

  return scale;
}

/**
 * Formateador de moneda consistente para todas las plantillas
 */
export const fmtCurrency = (n) => {
  if (n === undefined || n === null || isNaN(n)) return '';
  return `$${Number(n).toLocaleString("es-AR")}`;
};
