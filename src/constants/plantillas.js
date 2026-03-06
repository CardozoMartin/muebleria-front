
import PlantillaCanva from '../components/Plantillas/MegaOferta';
import PlantillaCanva2 from '../components/Plantillas/FlashSale';
import PlantillaCanva3 from '../components/Plantillas/HotSale';
import PlantillaCanva4 from '../components/Plantillas/BlackFriday';
import PlantillaCanva5 from '../components/Plantillas/FeriaDescuentos';


// central list of available templates; used in PlantillasPage and product form
export const PLANTILLAS = [

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
  {
    id: 'blackfriday',
    nombre: 'Black Friday',
    descripcion: 'Dinámico · con tonos oscuros, rojos y naranjas · Impactante',
    component: PlantillaCanva4,
    dot: 'bg-gray-800',
  },
  {
    id: 'feriadedescuentos',
    nombre: 'Feria de Descuentos',
    descripcion: 'Dinámico · con tonos azules y blancos · Moderno',
    component: PlantillaCanva5,
    dot: 'bg-blue-600',
  },
];

// helper for form options
export const PLANTILLA_OPTIONS = PLANTILLAS.map((p) => ({
  value: p.id,
  label: p.nombre,
}));
