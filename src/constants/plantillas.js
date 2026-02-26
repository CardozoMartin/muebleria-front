import MegaSale from '../components/Plantillas/MegaSale';
import LuxeShow from '../components/Plantillas/LuxeShow';
import HotSale from '../components/Plantillas/HotSale';
import CasaViva from '../components/Plantillas/CasaViva';
import LiquidacionBanner from '../components/Plantillas/LiquidacionBanner';
import MegaSaleRustico from '../components/Plantillas/MegaSaleRustico';
import NeonGrid from '../components/Plantillas/NeonGrid';

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
  {
    id: 'hotsale',
    nombre: 'Hot Sale',
    descripcion: 'Dinámico · Rojo y negro · Urgente',
    component: HotSale,
    dot: 'bg-red-600',
  },
  {
    id: 'liquidacion',
    nombre: 'Liquidación Banner',
    descripcion: 'Promocional · Descuentos · Activo',
    component: LiquidacionBanner,
    dot: 'bg-yellow-500',
  },
  {
    id: 'megasalerustico',
    nombre: 'Mega Sale Rústico',
    descripcion: 'Vintage · Madera · Cálido',
    component: MegaSaleRustico,
    dot: 'bg-amber-600',
  },
  {
    id: 'neongrid',
    nombre: 'Neon Grid',
    descripcion: 'Moderno · Neon · Futurista',
    component: NeonGrid,
    dot: 'bg-cyan-500',
  },
];

// helper for form options
export const PLANTILLA_OPTIONS = PLANTILLAS.map((p) => ({
  value: p.id,
  label: p.nombre,
}));
