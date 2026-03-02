import { useState } from 'react';
import '../css/productos.css';
import LoginProductos from '../components/Productos/FormProductos';

import TableProducts from '../components/Productos/TableProducts';
import FormProductos from '../components/Productos/FormProductos';

export default function Products() {
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const categories = ['Cocina', 'Living', 'Dormitorio', 'Jardin', 'Varios'];

  return (
    <div className="productos-page">
      <div className="productos-header">
        <div className="productos-title">
          <h1>Productos</h1>
          <p>Inventario de producto</p>
        </div>
        
        {!showForm && (
          <div className="productos-controls">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="productos-filter-select"
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
              className="productos-search-input"
            />

            <button
              className="btn-agregar-producto"
              onClick={() => setShowForm(true)}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M12 5v14M5 12h14" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
              Agregar Producto
            </button>
          </div>
        )}
      </div>
      {showForm && <FormProductos setShowForm={setShowForm} />}

      {!showForm && (
        <TableProducts setShowForm={setShowForm} searchQuery={searchQuery} categoryFilter={categoryFilter} />

      )}
    </div>
  );
}
