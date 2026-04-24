
export const CATEGORY_TEMPLATES = {
  'Living': ['canva', 'canva2', 'canva3', 'megasale'],
  'Dormitorio': ['canva', 'feriadedescuentos', 'megasale'],
  'Cocina': ['canva2', 'hot-sale', 'megasale'],
  'Jardin': ['feriadedescuentos', 'megasale'],
  'Varios': ['canva', 'canva2', 'canva3', 'blackfriday', 'feriadedescuentos', 'megasale'],
};

export const getTemplatesByCategory = (category) => {
  return CATEGORY_TEMPLATES[category] || CATEGORY_TEMPLATES['Varios'];
};
