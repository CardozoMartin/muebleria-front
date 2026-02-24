import { useState } from 'react';
import LoginProductos from '../components/Productos/FormProductos';

import TableProducts from '../components/Productos/TableProducts';
import FormProductos from '../components/Productos/FormProductos';

export default function Products() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Productos</h1>
          <p className="text-sm text-gray-400 mt-0.5">Inventario de producto</p>
        </div>
        {!showForm && 
        
        <button
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition shadow-sm"
          onClick={() => setShowForm(true)}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M5 12h14" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          Agregar Producto
        </button>
        }
      </div>
      {showForm && <FormProductos setShowForm={setShowForm} />}

      {!showForm && (
        <TableProducts setShowForm={setShowForm} />

      )}
    </div>
  );
}
