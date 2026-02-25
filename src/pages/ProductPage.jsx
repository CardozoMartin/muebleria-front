import { useState } from 'react';
import LoginProductos from '../components/Productos/FormProductos';

import TableProducts from '../components/Productos/TableProducts';
import FormProductos from '../components/Productos/FormProductos';

export default function Products() {
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const categories = ['Cocina', 'Living', 'Dormitorio', 'Jardin', 'Varios'];

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
          <h1 className="text-xl font-bold text-gray-900">Productos</h1>
          <p className="text-sm text-gray-400 mt-0.5">Inventario de producto</p>
        </div>
        
        {!showForm && (
          <>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Todas las categorías</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Buscar por nombre..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />

            <button
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition shadow-sm"
              onClick={() => setShowForm(true)}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M12 5v14M5 12h14" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
              Agregar Producto
            </button>
          </>
        )}
      </div>
      {showForm && <FormProductos setShowForm={setShowForm} />}

      {!showForm && (
        <TableProducts setShowForm={setShowForm} searchQuery={searchQuery} categoryFilter={categoryFilter} />

      )}
    </div>
  );
}
