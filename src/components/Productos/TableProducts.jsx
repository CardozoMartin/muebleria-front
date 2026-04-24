import { useState } from 'react';
import { useGetProducts, useSearchProducts, useBulkUpdateDiscount, useBulkUpdateTemplate } from '../../hooks/useProducts';
import { Loader2, AlertCircle, PackageOpen, Eye, ChevronLeft, ChevronRight, Percent, Save, Wand2, LayoutPanelLeft } from 'lucide-react';
import Swal from 'sweetalert2';
import { PLANTILLAS } from '../../constants/plantillas';
import RowProducts from './RowProducts';
import ModalVideo from './ModalVideo';
import '../../css/productos.css';

const TableProducts = ({ setShowForm, searchQuery = '', categoryFilter = '' }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showVideo, setShowVideo] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [globalDiscount, setGlobalDiscount] = useState('');
  const [bulkCategory, setBulkCategory] = useState('');
  const [bulkTemplateId, setBulkTemplateId] = useState('');

  const { mutate: applyBulkDiscount, isLoading: isApplyingBulk } = useBulkUpdateDiscount();
  const { mutate: applyBulkTemplate, isLoading: isApplyingBulkTemplate } = useBulkUpdateTemplate();

  const handleApplyBulkTemplate = () => {
    if (!bulkCategory || !bulkTemplateId) {
      Swal.fire('Error', 'Selecciona categoría y plantilla', 'error');
      return;
    }

    const templateName = PLANTILLAS.find(p => p.id === bulkTemplateId)?.nombre;

    Swal.fire({
      title: '¿Aplicar plantilla por categoría?',
      text: `Se aplicará la plantilla "${templateName}" a TODOS los productos de la categoría "${bulkCategory}".`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, aplicar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        applyBulkTemplate({ categoria: bulkCategory, plantillaId: bulkTemplateId }, {
          onSuccess: () => {
            setBulkCategory('');
            setBulkTemplateId('');
          }
        });
      }
    });
  };

  const handleApplyGlobalDiscount = () => {
    if (!globalDiscount || isNaN(globalDiscount)) {
      Swal.fire('Error', 'Ingresa un porcentaje válido', 'error');
      return;
    }

    Swal.fire({
      title: '¿Aplicar descuento global?',
      text: `Se aplicará un ${globalDiscount}% de descuento a TODOS los productos de la base de datos y se recalcularán los precios de oferta. Esta acción no se puede deshacer.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, aplicar a todos',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        applyBulkDiscount(globalDiscount, {
          onSuccess: () => {
            setGlobalDiscount('');
          }
        });
      }
    });
  };

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
      {/* Header tabla y acciones globales */}
      <div className="table-header-actions">
        <div className="global-discount-container">
          <div className="global-discount-input-group">
            <Percent style={{ width: '16px', height: '16px', color: '#666' }} />
            <input
              type="number"
              value={globalDiscount}
              onChange={(e) => setGlobalDiscount(e.target.value)}
              placeholder="Descuento global %"
              className="global-discount-input"
            />
          </div>
          <button
            onClick={handleApplyGlobalDiscount}
            disabled={isApplyingBulk}
            className="global-apply-btn"
            title="Aplicar a todos los productos"
          >
            {isApplyingBulk ? (
              <Loader2 className="animate-spin" style={{ width: '16px', height: '16px' }} />
            ) : (
              <Wand2 style={{ width: '16px', height: '16px' }} />
            )}
            <span>Aplicar a todos</span>
          </button>
        </div>

        <div className="global-template-container">
          <div className="bulk-select-group">
            <LayoutPanelLeft style={{ width: '16px', height: '16px', color: '#666' }} />
            <select
              value={bulkCategory}
              onChange={(e) => setBulkCategory(e.target.value)}
              className="bulk-select"
            >
              <option value="">Categoría...</option>
              <option value="Cocina">Cocina</option>
              <option value="Living">Living</option>
              <option value="Dormitorio">Dormitorio</option>
              <option value="Jardin">Jardin</option>
              <option value="Varios">Varios</option>
            </select>
            <select
              value={bulkTemplateId}
              onChange={(e) => setBulkTemplateId(e.target.value)}
              className="bulk-select"
            >
              <option value="">Plantilla...</option>
              {PLANTILLAS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nombre}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleApplyBulkTemplate}
            disabled={isApplyingBulkTemplate || !bulkCategory || !bulkTemplateId}
            className="bulk-apply-btn"
            title="Aplicar plantilla a categoría"
          >
            {isApplyingBulkTemplate ? (
              <Loader2 className="animate-spin" size={16} />
            ) : (
              <LayoutPanelLeft size={16} />
            )}
            <span>Asignar</span>
          </button>
        </div>
      </div>

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
              <th>Descripcion</th>
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
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '8px',
                      color: '#ef4444',
                    }}
                  >
                    <AlertCircle style={{ width: '24px', height: '24px' }} />
                    <span style={{ fontSize: '12px', fontWeight: '500' }}>
                      Error al cargar productos
                    </span>
                  </div>
                </td>
              </tr>
            )}

            {/* Vacío */}
            {!isLoading && !isError && products.length === 0 && (
              <tr>
                <td colSpan="8" className="empty-state">
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '8px',
                      color: '#cccccc',
                    }}
                  >
                    <PackageOpen style={{ width: '24px', height: '24px' }} />
                    <span style={{ fontSize: '12px', fontWeight: '500' }}>
                      No hay productos disponibles
                    </span>
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
          Mostrando {(currentPage - 1) * 10 + 1} - {Math.min(currentPage * 10, totalProducts)} de{' '}
          {totalProducts} productos
        </div>

        <div className="pagination-controls">
          <button
            type="button"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="pagination-button"
          >
            <ChevronLeft style={{ width: '16px', height: '16px' }} />
            <span>anterior</span>
          </button>

          <div className="pagination-numbers">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
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
