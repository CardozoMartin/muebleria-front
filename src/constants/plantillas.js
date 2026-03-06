import MegaSale from '../components/Plantillas/MegaSale';
import LuxeShow from '../components/Plantillas/LuxeShow';
import HotSale from '../components/Plantillas/HotSale';
import CyberMonday from '../components/Plantillas/CyberMonday';
import Liquidacion from '../components/Plantillas/Liquidacion';
import CasaViva from '../components/Plantillas/Casaviva';
import CalidezTV from '../components/Plantillas/CalidezTV';
import ImpactoTV from '../components/Plantillas/ImpactoTV';
import ImpactoTV2 from '../components/Plantillas/ImpactoTV2';
import ModernTV from '../components/Plantillas/ModernTV';
import SpotlightTV from '../components/Plantillas/SpotlightTV';
import PlantillaCanva from '../components/Plantillas/PlantillaCanva';
import PlantillaCanva2 from '../components/Plantillas/PlantillaCanva2';
import PlantillaCanva3 from '../components/Plantillas/PlantillaCanva3';

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
  {
    id: 'calidez',
    nombre: 'Calidez TV',
    descripcion: 'Cálido · Crema · Hogareño',
    component: CalidezTV,
    dot: 'bg-amber-600',
  },
  {
    id: 'impactotv',
    nombre: 'Impacto TV',
    descripcion: 'Impactante · Negro · Dinámico',
    component: ImpactoTV,
    dot: 'bg-gray-900',
  },
  {
    id: 'impactotv2',
    nombre: 'Impacto TV 2',
    descripcion: 'Impactante · Negro · Moderno',
    component: ImpactoTV2,
    dot: 'bg-slate-700',
  },
  {
    id: 'modern',
    nombre: 'Modern TV',
    descripcion: 'Limpio · Blanco · Minimalista',
    component: ModernTV,
    dot: 'bg-white',
  },
  {
    id: 'spotlight',
    nombre: 'Spotlight TV',
    descripcion: 'Elegante · Oro · Premium',
    component: SpotlightTV,
    dot: 'bg-yellow-600',
  },
  {
    id: 'canva',
    nombre: 'Plantilla Canva',
    descripcion: 'Personalizado · Diseño Canva · Premium',
    component: PlantillaCanva,
    dot: 'bg-purple-500',
  },
  {
    id: 'canva2',
    nombre: 'Plantilla Canva 2',
    descripcion: 'Personalizado · Diseño Canva · Premium',
    component: PlantillaCanva2,
    dot: 'bg-purple-600',
  },
  {
    id: 'canva3',
    nombre: 'Plantilla Canva 3',
    descripcion: 'Personalizado · Diseño Canva · Premium',
    component: PlantillaCanva3,
    dot: 'bg-purple-700',
  },
];

// helper for form options
export const PLANTILLA_OPTIONS = PLANTILLAS.map((p) => ({
  value: p.id,
  label: p.nombre,
}));
