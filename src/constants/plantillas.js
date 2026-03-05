import MegaSale from '../components/Plantillas/MegaSale';
import LuxeShow from '../components/Plantillas/LuxeShow';
import HotSale from '../components/Plantillas/HotSale';
import CyberMonday from '../components/Plantillas/CyberMonday';
import Liquidacion from '../components/Plantillas/Liquidacion';
import CasaViva from '../components/Plantillas/Casaviva';

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
    nombre: 'Super Sale',
    descripcion: 'Clásico · Madera clara · Sereno',
    component: LuxeShow,
    dot: 'bg-amber-700',
  },
  {
    id: 'casaviva',
    nombre: 'Oferta Especial',
    descripcion: 'Cinematográfico · Oscuro · Cálido',
    component: CasaViva,
    dot: 'bg-orange-300',
  },
  {
    id: 'liquidacion',
    nombre: 'Liquidación',
    descripcion: 'Dinámico · Rojo · Fuego',
    component: Liquidacion,
    dot: 'bg-red-500',
  },
  {
    id: 'hotsale',
    nombre: 'Hot Sale',
    descripcion: 'Dinámico · Rojo · Fuego',
    component: HotSale,
    dot: 'bg-red-500',
  },
    {
    id: 'cybermonday',
    nombre: 'Cyber Monday',
    descripcion: 'Dinámico · Rojo · Fuego',
    component: CyberMonday,
    dot: 'bg-red-500',
  },
];

// helper for form options
export const PLANTILLA_OPTIONS = PLANTILLAS.map((p) => ({
  value: p.id,
  label: p.nombre,
}));
