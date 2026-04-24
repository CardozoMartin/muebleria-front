import {
  Eye,
  MonitorPlay,
  SquarePen,
  Trash,
  PackageOpen,
  Save,
  Loader2,
  RotateCcw,
  ImagePlus,
  X,
  FileText,
} from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import {
  useChangeStateProduct,
  useDeleteProduct,
  useEditProduct as useEditProductMutation,
} from '../../hooks/useProducts';
import Swal from 'sweetalert2';
import '../../css/productos.css';
import { PLANTILLAS } from '../../constants/plantillas';
import { getTemplatesByCategory } from '../../constants/categoryTemplates';

const DescripcionModal = ({ value, onClose, onSave, readOnly }) => {
  const [text, setText] = useState(value || '');
  const textareaRef = useRef(null);

  useEffect(() => {
    if (!readOnly) {
      textareaRef.current?.focus();
    }
  }, [readOnly]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      onClick={handleOverlayClick}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.5)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: '12px',
          width: '100%',
          maxWidth: '520px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 20px',
            borderBottom: '1px solid #f0f0f0',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {readOnly ? <Eye size={16} color="#666" /> : <FileText size={16} color="#666" />}
            <span style={{ fontWeight: 600, fontSize: '15px', color: '#111' }}>
              {readOnly ? 'Descripción del producto' : 'Editar descripción'}
            </span>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#999',
              display: 'flex',
              alignItems: 'center',
              padding: '4px',
              borderRadius: '6px',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '20px' }}>
          <p style={{ fontSize: '13px', color: '#888', marginBottom: '12px', marginTop: 0 }}>
            Podés escribir una descripción corta o larga. Se mostrará en la vista del producto.
          </p>
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            readOnly={readOnly}
            placeholder={
              readOnly
                ? 'El producto no tiene una descripción cargada.'
                : 'Ej: Silla ergonómica de madera maciza con tapizado en tela de alta resistencia. Disponible en 3 colores. Ideal para comedores y espacios de trabajo...'
            }
            style={{
              width: '100%',
              minHeight: '160px',
              resize: 'vertical',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #e0e0e0',
              fontSize: '14px',
              lineHeight: 1.6,
              color: '#111',
              fontFamily: 'inherit',
              boxSizing: 'border-box',
              outline: 'none',
              transition: 'all 0.15s',
              backgroundColor: readOnly ? '#f9fafb' : '#fff',
              cursor: readOnly ? 'default' : 'text',
            }}
            onFocus={(e) => !readOnly && (e.target.style.borderColor = '#4f46e5')}
            onBlur={(e) => !readOnly && (e.target.style.borderColor = '#e0e0e0')}
          />
          <div
            style={{
              textAlign: 'right',
              fontSize: '12px',
              color: '#aaa',
              marginTop: '6px',
            }}
          >
            {text.length} caracteres
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '10px',
            padding: '14px 20px',
            borderTop: '1px solid #f0f0f0',
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: '1px solid #e0e0e0',
              background: 'transparent',
              fontSize: '13px',
              cursor: 'pointer',
              color: '#555',
              fontWeight: 500,
            }}
          >
            {readOnly ? 'Cerrar' : 'Cancelar'}
          </button>
          {!readOnly && (
            <button
              onClick={() => {
                onSave(text);
                onClose();
              }}
              style={{
                padding: '8px 18px',
                borderRadius: '8px',
                border: 'none',
                background: '#4f46e5',
                color: '#fff',
                fontSize: '13px',
                cursor: 'pointer',
                fontWeight: 600,
              }}
            >
              Guardar cambios
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const RowProducts = ({ product, index, setShowForm, setShowVideo, setSelectedProduct }) => {
  const [localProduct, setLocalProduct] = useState({ ...product });
  const [isEditing, setIsEditing] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  console.log('productos en las filas', product);
  // Image handling
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(product.imagenProducto?.[0] || null);
  const fileInputRef = useRef(null);

  // Modal descripcion
  const [showDescModal, setShowDescModal] = useState(false);

  // hooks
  const { mutate: changeStateProduct } = useChangeStateProduct();
  const { mutate: deleteProduct } = useDeleteProduct();
  const { mutate: editProduct, isLoading: isSaving } = useEditProductMutation();

  useEffect(() => {
    setLocalProduct({ ...product });
    setPreviewUrl(product.imagenProducto?.[0] || null);
    setSelectedFile(null);
    setHasChanges(false);
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue =
      name.includes('precio') || name === 'porcentajeDescuento' ? Number(value) : value;

    setLocalProduct((prev) => {
      const updated = { ...prev, [name]: newValue };

      if (name === 'precioLista' || name === 'porcentajeDescuento') {
        const lista = name === 'precioLista' ? newValue : prev.precioLista;
        const pct = name === 'porcentajeDescuento' ? newValue : prev.porcentajeDescuento;
        updated.precioOferta = Math.round(lista * (1 - pct / 100));
      }

      return updated;
    });
    setHasChanges(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setHasChanges(true);
    }
  };

  const handleReset = () => {
    setLocalProduct({ ...product });
    setPreviewUrl(product.imagenProducto?.[0] || null);
    setSelectedFile(null);
    setHasChanges(false);
    setIsEditing(false);
  };

  const handleSave = () => {
    let dataToSave;
    if (selectedFile) {
      const formData = new FormData();
      Object.keys(localProduct).forEach((key) => {
        if (key !== 'imagenProducto') {
          formData.append(key, localProduct[key]);
        }
      });
      formData.append('imagenProducto', selectedFile);
      dataToSave = formData;
    } else {
      dataToSave = localProduct;
    }

    editProduct(
      { id: product._id, data: dataToSave },
      {
        onSuccess: () => {
          setHasChanges(false);
          setIsEditing(false);
          setSelectedFile(null);
        },
      }
    );
  };

  const handleStateChange = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas ${product.productoActivo ? 'desactivar' : 'activar'} este producto?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cambiar estado',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        changeStateProduct(product._id);
      }
    });
  };

  const handleDeleteProduct = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(product._id);
      }
    });
  };

  const handleShowVideo = () => {
    if (setSelectedProduct) setSelectedProduct(product);
    setShowVideo(true);
  };

  const suggestedTemplates = getTemplatesByCategory(localProduct.categoria);

  return (
    <>
      {showDescModal && (
        <DescripcionModal
          value={localProduct.descripcion}
          readOnly={!isEditing}
          onClose={() => setShowDescModal(false)}
          onSave={(text) => {
            setLocalProduct((prev) => ({ ...prev, descripcion: text }));
            setHasChanges(true);
            setIsEditing(true);
          }}
        />
      )}

      <tr
        key={product._id}
        className={`${hasChanges ? 'row-edited' : ''} ${isEditing ? 'row-editing' : ''}`}
      >
        {/* # */}
        <td className="table-number">{String(index + 1).padStart(2, '0')}</td>

        {/* Producto (imagen + nombre editable) */}
        <td>
          <div className="product-info-grid">
            <div
              className={`product-image-container ${isEditing ? 'editable' : ''}`}
              onClick={() => isEditing && fileInputRef.current.click()}
            >
              {previewUrl ? (
                <img src={previewUrl} alt={localProduct.titulo} className="product-image-mini" />
              ) : (
                <div className="product-image-placeholder-mini">
                  <PackageOpen style={{ width: '12px', height: '12px', color: '#999999' }} />
                </div>
              )}
              {isEditing && (
                <div className="image-edit-overlay">
                  <ImagePlus size={14} color="white" />
                </div>
              )}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
                accept="image/*"
              />
            </div>
            <div className="product-inputs">
              {isEditing ? (
                <>
                  <input
                    name="titulo"
                    value={localProduct.titulo}
                    onChange={handleChange}
                    className="grid-input title-input active"
                    placeholder="Nombre del producto"
                  />
                  <select
                    name="categoria"
                    value={localProduct.categoria}
                    onChange={handleChange}
                    className="grid-select category-select active"
                  >
                    <option value="Cocina">Cocina</option>
                    <option value="Living">Living</option>
                    <option value="Dormitorio">Dormitorio</option>
                    <option value="Jardin">Jardin</option>
                    <option value="Varios">Varios</option>
                  </select>
                </>
              ) : (
                <>
                  <span className="product-name-static">{localProduct.titulo}</span>
                  <span className="product-category-static">{localProduct.categoria}</span>
                </>
              )}
            </div>
          </div>
        </td>

        {/* Precio Lista */}
        <td className="price-cell-grid">
          <div className={`price-input-wrapper ${isEditing ? 'active' : 'static'}`}>
            <span className="currency">$</span>
            {isEditing ? (
              <input
                type="number"
                name="precioLista"
                value={localProduct.precioLista}
                onChange={handleChange}
                className="grid-input number-input"
              />
            ) : (
              <span className="price-static">
                {Number(localProduct.precioLista).toLocaleString('es-AR')}
              </span>
            )}
          </div>
        </td>

        {/* Precio Oferta */}
        <td className="price-cell-grid">
          <div className={`price-input-wrapper offer ${isEditing ? 'active' : 'static'}`}>
            <span className="currency">$</span>
            {isEditing ? (
              <input
                type="number"
                name="precioOferta"
                value={localProduct.precioOferta}
                onChange={handleChange}
                className="grid-input number-input offer-input"
              />
            ) : (
              <span className="price-static">
                {Number(localProduct.precioOferta).toLocaleString('es-AR')}
              </span>
            )}
          </div>
        </td>

        {/* Descuento % */}
        <td className="price-cell-grid">
          <div className={`price-input-wrapper discount ${isEditing ? 'active' : 'static'}`}>
            {isEditing ? (
              <input
                type="number"
                name="porcentajeDescuento"
                value={localProduct.porcentajeDescuento}
                onChange={handleChange}
                className="grid-input number-input offer-input"
              />
            ) : (
              <span className="price-static">{localProduct.porcentajeDescuento}</span>
            )}
          </div>
        </td>

        {/* Plantilla */}
        <td>
          {isEditing ? (
            <select
              name="plantillaId"
              value={localProduct.plantillaId || ''}
              onChange={handleChange}
              className="grid-select template-select active"
            >
              <option value="">-- Sin plantilla --</option>
              {PLANTILLAS.map((p) => (
                <option key={p.id} value={p.id}>
                  {suggestedTemplates.includes(p.id) ? '⭐ ' : ''}
                  {p.nombre}
                </option>
              ))}
            </select>
          ) : (
            <span className="template-name-static">
              {PLANTILLAS.find((p) => p.id === localProduct.plantillaId)?.nombre || 'Sin plantilla'}
            </span>
          )}
        </td>

        {/* Descripcion */}
        <td>
          <button
            onClick={() => setShowDescModal(true)}
            className={`desc-modal-trigger ${localProduct.descripcion ? 'has-desc' : ''}`}
            title={localProduct.descripcion || 'Sin descripción'}
          >
            {isEditing ? <SquarePen size={13} /> : <Eye size={13} />}
            <span>
              {isEditing
                ? localProduct.descripcion
                  ? 'Editar descripción'
                  : 'Agregar descripción'
                : localProduct.descripcion
                ? 'Ver descripción'
                : 'Sin descripción'}
            </span>
          </button>
        </td>

        {/* Estado */}
        <td>
          <button
            onClick={handleStateChange}
            className={`status-badge-mini ${localProduct.productoActivo ? 'active' : 'inactive'}`}
          >
            <span className="status-badge-dot" />
            {localProduct.productoActivo ? 'Activo' : 'Inactivo'}
          </button>
        </td>

        {/* Acciones */}
        <td>
          <div className="actions-cell-grid">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="btn-action save"
                  title="Guardar cambios"
                >
                  {isSaving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                </button>
                <button onClick={handleReset} className="btn-action reset" title="Cancelar">
                  <X size={16} />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn-action edit-row"
                  title="Editar fila"
                >
                  <SquarePen size={16} />
                </button>
                <button onClick={handleShowVideo} className="btn-action view" title="Ver plantilla">
                  <MonitorPlay size={16} />
                </button>
                <button
                  onClick={handleDeleteProduct}
                  className="btn-action delete"
                  title="Eliminar"
                >
                  <Trash size={16} />
                </button>
              </>
            )}
          </div>
        </td>
      </tr>
    </>
  );
};

export default RowProducts;
