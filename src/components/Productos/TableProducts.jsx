import { useGetProducts } from '../../hooks/useProducts';
import { Loader2, AlertCircle, PackageOpen, Eye } from 'lucide-react';
import RowProducts from './RowProducts';

const TableProducts = () => {
  const { data, isLoading, isError } = useGetProducts();
  console.log(data);

  return (
    <div className="bg-white rounded-md border border-gray-500/30 overflow-hidden">
      {/* Header tabla */}

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-300/70 bg-gray-500/5">
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-600/70 uppercase tracking-wider">
                #
              </th>
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-600/70 uppercase tracking-wider">
                Producto
              </th>
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-600/70 uppercase tracking-wider">
                P. Actual
              </th>
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-600/70 uppercase tracking-wider">
                P. Anterior
              </th>
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-600/70 uppercase tracking-wider">
                P.Descuento
              </th>
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-600/70 uppercase tracking-wider">
                Estado
              </th>
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-600/70 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Loading */}
            {isLoading && (
              <tr>
                <td colSpan="6" className="py-16 text-center">
                  <div className="flex flex-col items-center gap-2 text-gray-500/70">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span className="text-xs font-medium">Cargando productos...</span>
                  </div>
                </td>
              </tr>
            )}

            {/* Error */}
            {isError && (
              <tr>
                <td colSpan="6" className="py-16 text-center">
                  <div className="flex flex-col items-center gap-2 text-red-500/70">
                    <AlertCircle className="w-5 h-5" />
                    <span className="text-xs font-medium">Error al cargar productos</span>
                  </div>
                </td>
              </tr>
            )}

            {/* Vacío */}
            {!isLoading && !isError && (!data || data.length === 0) && (
              <tr>
                <td colSpan="6" className="py-16 text-center">
                  <div className="flex flex-col items-center gap-2 text-gray-400/70">
                    <PackageOpen className="w-6 h-6" />
                    <span className="text-xs font-medium">No hay productos disponibles</span>
                  </div>
                </td>
              </tr>
            )}

            {/* Filas */}
            {!isLoading &&
              !isError &&
              data &&
              data.map((product, index) => (
                <RowProducts key={product._id} product={product} index={index} />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableProducts;
