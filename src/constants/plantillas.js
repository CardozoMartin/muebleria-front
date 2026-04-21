import { lazy } from 'react';

// Lazy load template components for Chromecast memory optimization
const PlantillaCanva = lazy(() => import('../components/Plantillas/MegaOferta'));
const PlantillaCanva2 = lazy(() => import('../components/Plantillas/FlashSale'));
const PlantillaCanva3 = lazy(() => import('../components/Plantillas/HotSale'));
const PlantillaCanva4 = lazy(() => import('../components/Plantillas/BlackFriday'));
const PlantillaCanva5 = lazy(() => import('../components/Plantillas/FeriaDescuentos'));
const PlantillaCanva6 = lazy(() => import('../components/Plantillas/MegaSale'));


// central list of available templates; used in PlantillasPage and product form
export const PLANTILLAS = [

  {
    id: 'canva',
    nombre: 'Mega Oferta',
    descripcion: 'Personalizado · Diseño Canva · Premium',
    component: PlantillaCanva,
    dot: 'bg-purple-500',
  },
  {
    id: 'canva2',
    nombre: 'Flash Sale',
    descripcion: 'Personalizado · Diseño Canva · Premium',
    component: PlantillaCanva2,
    dot: 'bg-purple-600',
  },
  {
    id: 'canva3',
    nombre: 'Hot Sale',
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
  {
    id: 'megasale',
    nombre: 'Mega Sale',
    descripcion: 'Dinámico · con tonos verdes y amarillos · Atractivo',
    component: PlantillaCanva6,
    dot: 'bg-green-500',
  }
];

// helper for form options
export const PLANTILLA_OPTIONS = PLANTILLAS.map((p) => ({
  value: p.id,
  label: p.nombre,
}));
