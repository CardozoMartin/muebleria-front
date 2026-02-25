import { useState } from 'react';
import { useGetProducts, useSearchProducts } from '../../hooks/useProducts';
import { Loader2, AlertCircle, PackageOpen, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import RowProducts from './RowProducts';

const TableProducts = ({ setShowForm, searchQuery = '' }) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  // Si hay búsqueda, usar el hook de búsqueda, sino usar el hook de productos paginados
  const searchData = useSearchProducts(searchQuery);
  const regularData = useGetProducts(currentPage);
  
  const { data, isLoading, isError } = searchQuery ? searchData : regularData;
  
  // Si es búsqueda, los datos vienen como array directo; si es normal, vienen con estructura
  const products = searchQuery 
    ? (Array.isArray(data) ? data : []) 
    : (data?.productos || []);
  const totalPages = data?.totalPages || 1;
  const totalProducts = searchQuery 
    ? (Array.isArray(data) ? data.length : 0)
    : (data?.total || 0);

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
                P. Lista
              </th>
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-600/70 uppercase tracking-wider">
                P. Oferta
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
            {!isLoading && !isError && products.length === 0 && (
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
              products.length > 0 &&
              products.map((product, index) => (
                <RowProducts key={product._id} product={product} index={index} setShowForm={setShowForm} />
              ))}
          </tbody>
        </table>
      </div>
        <div className="flex items-center justify-between gap-4 text-gray-500 p-4">
          <div className="flex items-center gap-2">
            <span className="text-sm">Mostrando {((currentPage - 1) * 10) + 1} - {Math.min(currentPage * 10, totalProducts)} de {totalProducts} productos</span>
          </div>
        
          <div className="flex items-center gap-2">
            <button 
              type="button" 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="mr-2 flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed hover:text-gray-700"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm">anterior</span>
            </button>
          
            <div className="flex gap-2 text-sm">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`flex items-center justify-center active:scale-95 w-9 h-9 aspect-square rounded-md transition-all ${
                    currentPage === page 
                      ? 'bg-indigo-600 text-white' 
                      : 'hover:bg-gray-100/70'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          
            <button 
              type="button" 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="ml-2 flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed hover:text-gray-700"
            >
              <span className="text-sm">siguiente</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
    </div>
  );
};

export default TableProducts;
