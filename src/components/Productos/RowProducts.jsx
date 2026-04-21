import { Eye, MonitorPlay, SquarePen, Trash, PackageOpen, Save, Loader2, RotateCcw, ImagePlus, X } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import {
  useChangeStateProduct,
  useDeleteProduct,
  useEditProduct as useEditProductMutation,
} from "../../hooks/useProducts";
import Swal from "sweetalert2";
import '../../css/productos.css';
import { PLANTILLAS } from '../../constants/plantillas';
import { getTemplatesByCategory } from '../../constants/categoryTemplates';

const RowProducts = ({ product, index, setShowForm, setShowVideo, setSelectedProduct }) => {
  const [localProduct, setLocalProduct] = useState({ ...product });
  const [isEditing, setIsEditing] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  
  // Image handling
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(product.imagenProducto?.[0] || null);
  const fileInputRef = useRef(null);
  
  // hooks
  const { mutate: changeStateProduct } = useChangeStateProduct();
  const { mutate: deleteProduct } = useDeleteProduct();
  const { mutate: editProduct, isLoading: isSaving } = useEditProductMutation();

  // Actualizar el estado local si el producto prop cambia (ej: por un bulk update)
  useEffect(() => {
    setLocalProduct({ ...product });
    setPreviewUrl(product.imagenProducto?.[0] || null);
    setSelectedFile(null);
    setHasChanges(false);
  }, [product]);

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name.includes('precio') || name === 'porcentajeDescuento' ? Number(value) : value;
    
    setLocalProduct(prev => {
      const updated = { ...prev, [name]: newValue };
      
      // Auto-cálculo de precio Oferta si cambia Lista o Descuento
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
    // Usamos FormData si hay un archivo seleccionado
    let dataToSave;
    if (selectedFile) {
      const formData = new FormData();
      // Agregar todos los campos de localProduct
      Object.keys(localProduct).forEach(key => {
        if (key !== 'imagenProducto') {
          formData.append(key, localProduct[key]);
        }
      });
      // Agregar el archivo
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
        }
      }
    );
  };

  const handleStateChange = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: `¿Deseas ${product.productoActivo ? "desactivar" : "activar"} este producto?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cambiar estado",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        changeStateProduct(product._id);
      }
    });
  };

  const handleDeleteProduct = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(product._id);
      }
    });
  };

  const handleShowVideo = () => {
    if (setSelectedProduct) setSelectedProduct(product);
    setShowVideo(true);
  }

  // Filtrar plantillas sugeridas según categoría
  const suggestedTemplates = getTemplatesByCategory(localProduct.categoria);

  return (
    <tr key={product._id} className={`${hasChanges ? 'row-edited' : ''} ${isEditing ? 'row-editing' : ''}`}>
      {/* # */}
      <td className="table-number">
        {String(index + 1).padStart(2, "0")}
      </td>

      {/* Producto (imagen + nombre editable) */}
      <td>
        <div className="product-info-grid">
          <div 
            className={`product-image-container ${isEditing ? 'editable' : ''}`}
            onClick={() => isEditing && fileInputRef.current.click()}
          >
            {previewUrl ? (
              <img
                src={previewUrl}
                alt={localProduct.titulo}
                className="product-image-mini"
              />
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
            <span className="price-static">{Number(localProduct.precioLista).toLocaleString("es-AR")}</span>
          )}
        </div>
      </td>

      {/* Precio Oferta (Auto-calculado) */}
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
            <span className="price-static">{Number(localProduct.precioOferta).toLocaleString("es-AR")}</span>
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
              className="grid-input number-input discount-input"
            />
          ) : (
            <span className="price-static">{localProduct.porcentajeDescuento}</span>
          )}
          <span className="percent">%</span>
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
            {PLANTILLAS.map(p => (
              <option key={p.id} value={p.id}>
                {suggestedTemplates.includes(p.id) ? '⭐ ' : ''}{p.nombre}
              </option>
            ))}
          </select>
        ) : (
          <span className="template-name-static">
            {PLANTILLAS.find(p => p.id === localProduct.plantillaId)?.nombre || 'Sin plantilla'}
          </span>
        )}
      </td>

      {/* Estado */}
      <td>
        <button
          onClick={handleStateChange}
          className={`status-badge-mini ${localProduct.productoActivo ? 'active' : 'inactive'}`}
        >
          <span className="status-badge-dot" />
          {localProduct.productoActivo ? "Activo" : "Inactivo"}
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
              <button 
                onClick={handleReset}
                className="btn-action reset"
                title="Cancelar"
              >
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
              <button 
                onClick={handleShowVideo}
                className="btn-action view"
                title="Ver plantilla"
              >
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
  );
};

export default RowProducts;
