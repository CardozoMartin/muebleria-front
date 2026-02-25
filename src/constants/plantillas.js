import MegaSale from '../components/Plantillas/MegaSale';
import LuxeShow from '../components/Plantillas/LuxeShow';
import CasaViva from '../components/Plantillas/Casaviva';
import CuotasBanner from '../components/Plantillas/CustomBanner';
import LiquidacionBanner from '../components/Plantillas/LiquidacionBanner';

// central list of available templates; used in PlantillasPage and product form
export const PLANTILLAS = [
  {
    id: 'megasale',
    nombre: 'Mega Sale',
    descripcion: 'Energético · Naranja · Impacto',
    component: MegaSale,
    dot: 'bg-orange-500',
  },
  {
    id: 'luxeshow',
    nombre: 'Luxe Show',
    descripcion: 'Clásico · Madera clara · Sereno',
    component: LuxeShow,
    dot: 'bg-amber-700',
  },
  {
    id: 'casaviva',
    nombre: 'Casa Viva',
    descripcion: 'Cinematográfico · Oscuro · Cálido',
    component: CasaViva,
    dot: 'bg-orange-300',
  },
];

// helper for form options
export const PLANTILLA_OPTIONS = PLANTILLAS.map((p) => ({
  value: p.id,
  label: p.nombre,
}));
