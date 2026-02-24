import { Eye } from 'lucide-react';
import React from 'react';

const RowProducts = ({ product, index }) => {
  return (
    <tr
      key={product._id}
      className="border-b border-gray-300/50 last:border-0 hover:bg-gray-500/5 transition"
    >
      {/* # */}
      <td className="px-5 py-3.5 text-xs text-gray-600/60 font-medium">
        {String(index + 1).padStart(2, '0')}
      </td>

      {/* Producto (imagen + nombre) */}
      <td className="px-5 py-3.5">
        <div className="flex items-center gap-3">
          {product.imagenProducto ? (
            <img
              src={product.imagenProducto}
              alt={product.titulo}
              className="w-40 h-40 object-cover rounded-md border border-gray-500/20 shrink-0"
            />
          ) : (
            <div className="w-10 h-10 rounded-md border border-gray-500/20 bg-gray-500/10 flex items-center justify-center shrink-0">
              <PackageOpen className="w-4 h-4 text-gray-400/60" />
            </div>
          )}
          <span className="text-sm font-medium text-gray-800/80">{product.titulo}</span>
        </div>
      </td>

      {/* Precio actual */}
      <td className="px-5 py-3.5 text-sm font-medium text-gray-800/80">
        ${Number(product.precioActual).toLocaleString('es-AR')}
      </td>

      {/* Precio anterior */}
      <td className="px-5 py-3.5">
        {product.precioAnterior ? (
          <span className="text-sm text-gray-500/70 line-through">
            ${Number(product.precioAnterior).toLocaleString('es-AR')}
          </span>
        ) : (
          <span className="text-xs text-gray-400/50">—</span>
        )}
      </td>

      {/* Estado */}
      <td className="px-5 py-3.5">
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium ${
            product.productoActivo
              ? 'bg-gray-800/5 text-gray-700/70 border border-gray-500/20'
              : 'bg-red-50/60 text-red-500/80 border border-red-400/20'
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              product.productoActivo ? 'bg-gray-600/60' : 'bg-red-400/80'
            }`}
          />
          {product.productoActivo ? 'Activo' : 'Inactivo'}
        </span>
      </td>

      {/* Acciones */}
      <td className="px-5 py-3.5">
        <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-500/30 text-gray-800/80 text-xs font-medium rounded-md hover:bg-gray-500/10 transition">
          Ver video
        </button>
      </td>
    </tr>
  );
};

export default RowProducts;
