import { useState } from 'react';
import { useGetProducts, useSearchProducts } from '../../hooks/useProducts';
import { Loader2, AlertCircle, PackageOpen, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import RowProducts from './RowProducts';
import ModalVideo from './ModalVideo';
import '../../css/productos.css';

const TableProducts = ({ setShowForm, searchQuery = '', categoryFilter = '' }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showVideo, setShowVideo] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Si hay búsqueda, usar el hook de búsqueda, sino usar el hook de productos paginados
  const searchData = useSearchProducts(searchQuery);
  const regularData = useGetProducts(currentPage);

  const { data, isLoading, isError } = searchQuery ? searchData : regularData;

  // Si es búsqueda, los datos vienen como array directo; si es normal, vienen con estructura
  let products = searchQuery
    ? (Array.isArray(data) ? data : [])
    : (data?.productos || []);

  // Filtrar por categoría si está seleccionada
  if (categoryFilter) {
    products = products.filter(product => product.categoria === categoryFilter);
  }

  const totalPages = data?.totalPages || 1;
  const totalProducts = searchQuery
    ? (Array.isArray(data) ? data.length : 0)
    : (data?.total || 0);

  return (
    <div className="table-container">
      {/* Header tabla */}

      <div className="table-wrapper">
        <table className="productos-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Producto</th>
              <th>P. Lista</th>
              <th>P. Oferta</th>
              <th>P.Descuento</th>
              <th>Plantilla</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {/* Loading */}
            {isLoading && (
              <tr>
                <td colSpan="8" className="empty-state">
                  <div className="loading-state">
                    <div className="loading-spinner" />
                    <span className="loading-text">Cargando productos...</span>
                  </div>
                </td>
              </tr>
            )}

            {/* Error */}
            {isError && (
              <tr>
                <td colSpan="8" className="empty-state">
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', color: '#ef4444' }}>
                    <AlertCircle style={{ width: '24px', height: '24px' }} />
                    <span style={{ fontSize: '12px', fontWeight: '500' }}>Error al cargar productos</span>
                  </div>
                </td>
              </tr>
            )}

            {/* Vacío */}
            {!isLoading && !isError && products.length === 0 && (
              <tr>
                <td colSpan="8" className="empty-state">
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', color: '#cccccc' }}>
                    <PackageOpen style={{ width: '24px', height: '24px' }} />
                    <span style={{ fontSize: '12px', fontWeight: '500' }}>No hay productos disponibles</span>
                  </div>
                </td>
              </tr>
            )}

            {/* Filas */}
            {!isLoading &&
              !isError &&
              products.length > 0 &&
              products.map((product, index) => (
                <RowProducts 
                  key={product._id} 
                  product={product} 
                  index={searchQuery ? index : (currentPage - 1) * 10 + index} 
                  setShowForm={setShowForm} 
                  setShowVideo={setShowVideo}
                  setSelectedProduct={setSelectedProduct}
                />
              ))}
          </tbody>
        </table>
      </div>
      
      <div className="pagination-container">
        <div className="pagination-info">
          Mostrando {((currentPage - 1) * 10) + 1} - {Math.min(currentPage * 10, totalProducts)} de {totalProducts} productos
        </div>
      
        <div className="pagination-controls">
          <button 
            type="button" 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="pagination-button"
          >
            <ChevronLeft style={{ width: '16px', height: '16px' }} />
            <span>anterior</span>
          </button>
        
          <div className="pagination-numbers">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={`page-number ${currentPage === page ? 'active' : ''}`}
              >
                {page}
              </button>
            ))}
          </div>
        
          <button 
            type="button" 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="pagination-button"
          >
            <span>siguiente</span>
            <ChevronRight style={{ width: '16px', height: '16px' }} />
          </button>
        </div>
      </div>
      
      {showVideo && selectedProduct && (
        <ModalVideo 
          product={selectedProduct} 
          setShowVideo={(visible) => {
            setShowVideo(visible);
            if (!visible) setSelectedProduct(null);
          }} 
        />
      )}
    </div>
  );
};

export default TableProducts;
