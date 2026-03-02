import {
  AlertCircle,
  CheckCircle,
  DollarSign,
  FileText,
  Loader2,
  Package,
  Percent,
  Save,
  Tag,
  ToggleLeft,
  UploadCloud,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { usePostProduct, useEditProduct as useEditProductMutation } from "../../hooks/useProducts";
import { useEditProduct } from "../../store/useEditProduct";
import { PLANTILLA_OPTIONS } from "../../constants/plantillas";
import '../../css/productos.css';

const FormProductos = ({ setShowForm }) => {
  const [preview, setPreview] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const fileInputRef = useRef(null);
  const { product } = useEditProduct();
  //hook para crear un nuevo producto
  const { mutate: CrearProductos, isLoading: isPending } = usePostProduct();
  //hook para editar un producto (mutation)
  const { mutate: EditarProducto } = useEditProductMutation();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      productoActivo: true,
      plantillaId: '',
    },
  });

  //con el useEfffec cargamos los datos del producto en el formulario
  useEffect(() => {
    if (product) {
      setValue("titulo", product.titulo);
      setValue("categoria", product.categoria);
      setValue("precioLista", product.precioLista);
      setValue("precioOferta", product.precioOferta);
      setValue("porcentajeDescuento", product.porcentajeDescuento);
      setValue("descripcion", product.descripcion);
      setValue("productoActivo", product.productoActivo);
        setValue("plantillaId", product.plantillaId || '');
      // la URL puede venir en "imagenProducto" o en un campo separado
      setPreview(product.imagenProducto || product.imagenProductoURL || null);
    }
  }, [product]);

  //imagen requerida solo si es un producto nuevo (no edición)
  const { ref: registerRef, ...registerImageProps } = register(
    "imagenProducto",
    {
      required: product ? false : "La imagen es requerida",
    },
  );

  const productoActivo = watch("productoActivo");

  const handleSubmitForm = (formData) => {
    const formDataToSend = new FormData();
    formDataToSend.append("titulo", formData.titulo);
    formDataToSend.append("categoria", formData.categoria);
    formDataToSend.append("precioLista", formData.precioLista);
    if (formData.precioOferta)
      formDataToSend.append("precioOferta", formData.precioOferta);
    if (formData.porcentajeDescuento)
      formDataToSend.append(
        "porcentajeDescuento",
        formData.porcentajeDescuento,
      );
    if (formData.descripcion)
      formDataToSend.append("descripcion", formData.descripcion);
    formDataToSend.append("productoActivo", formData.productoActivo);
    formDataToSend.append("plantillaId", formData.plantillaId || "");
    console.log("valor de plantillaId antes de enviar:", formData.plantillaId);
    // solo adjuntar imagen si se seleccionó un archivo nuevo
    if (formData.imagenProducto?.[0]) {
      formDataToSend.append("imagenProducto", formData.imagenProducto[0]);
    }
    for (let [key, val] of formDataToSend.entries()) {
  console.log(key, "→", val);
}
    //ahora verificamos si estamos editando o creando un producto nuevo, si product tiene un valor es porque estamos editando, sino estamos creando
    if (product) {
      EditarProducto(
        { id: product._id, data: formDataToSend },
        {
          onSuccess: () => {
            setShowSuccess(true);
            setShowForm(false);
            reset();
            setPreview(null);
            setTimeout(() => setShowSuccess(false), 3000);
          },
          onError: (err) => {
            console.error("error editing product", err);
            const msg = err.response?.data?.message || err.message || "Error al editar el producto";
            toast.error(msg);
          },
        },
      );
    } else {
      CrearProductos(formDataToSend, {
        onSuccess: () => {
          setShowSuccess(true);
          setShowForm(false);
          reset();
          setPreview(null);
          setTimeout(() => setShowSuccess(false), 3000);
        },
        onError: (err) => {
          console.error("error creating product", err);
          toast.error("Error al crear el producto");
        },
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="form-container">
      {showSuccess && (
        <div className="success-message">
          <CheckCircle className="success-message-icon" />
          <span className="success-message-text">
            Producto guardado exitosamente
          </span>
        </div>
      )}

      <div className="form-card">
        {/* Header */}
        <div className="form-header">
          <div className="form-title">
            <h2>
              {product ? "Editar Producto" : "Agregar Nuevo Producto"}
            </h2>
            <p>
              Completa la información del producto
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              reset();
              setPreview(null);
              setShowForm(false);
            }}
            className="form-close-btn"
          >
            <X style={{ width: '20px', height: '20px' }} />
          </button>
        </div>

        <form onSubmit={handleSubmit(handleSubmitForm)} className="form-content" style={{ marginTop: '24px' }}>
          {/* ── Información Básica ── */}
          <div className="form-section">
            <h3 className="form-section-title">
              <Package style={{ width: '16px', height: '16px' }} />
              Información Básica
            </h3>

            {/* Nombre */}
            <div className="form-group">
              <label className="form-label">
                <Tag style={{ width: '14px', height: '14px' }} />
                Nombre del Producto *
              </label>
              <input
                {...register("titulo", {
                  required: "El nombre es obligatorio",
                  minLength: { value: 3, message: "Mínimo 3 caracteres" },
                  maxLength: { value: 50, message: "Máximo 50 caracteres" },
                })}
                className={`form-input ${errors.titulo ? 'error' : ''}`}
                placeholder="Ej: Mesa de Madera Roble"
              />
              {errors.titulo && (
                <div className="form-error">
                  <AlertCircle style={{ width: '14px', height: '14px' }} />
                  <span>
                    {errors.titulo.message}
                  </span>
                </div>
              )}
            </div>

            {/* Categoría */}
            <div className="form-group">
              <label className="form-label">
                Categoría *
              </label>
              <select
                {...register("categoria", {
                  required: "La categoría es obligatoria",
                })}
                className={`form-select ${errors.categoria ? 'error' : ''}`}
              >
                <option value="">Selecciona una categoría</option>
                <option value="Cocina">Cocina</option>
                <option value="Living">Living</option>
                <option value="Dormitorio">Dormitorio</option>
                <option value="Jardin">Jardin</option>
                <option value="Varios">Varios</option>
              </select>
              {errors.categoria && (
                <div className="form-error">
                  <AlertCircle style={{ width: '14px', height: '14px' }} />
                  <span>
                    {errors.categoria.message}
                  </span>
                </div>
              )}
            </div>

            {/* Plantilla */}
            <div className="form-group">
              <label className="form-label">
                Plantilla
              </label>
              <select
                {...register('plantillaId')}
                className="form-select"
              >
                <option value="">-- Ninguna --</option>
                {PLANTILLA_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Descripción */}
            <div className="form-group">
              <label className="form-label">
                <FileText style={{ width: '14px', height: '14px' }} />
                Descripción
              </label>
              <textarea
                {...register("descripcion", {
                  maxLength: { value: 500, message: "Máximo 500 caracteres" },
                })}
                rows={3}
                className={`form-textarea ${errors.descripcion ? 'error' : ''}`}
                placeholder="Descripción opcional del producto..."
              />
              {errors.descripcion && (
                <div className="form-error">
                  <AlertCircle style={{ width: '14px', height: '14px' }} />
                  <span>
                    {errors.descripcion.message}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* ── Precios ── */}
          <div className="form-section">
            <h3 className="form-section-title">
              <DollarSign style={{ width: '16px', height: '16px' }} />
              Precios
            </h3>

            <div className="form-grid cols-3">
              {/* Precio Lista */}
              <div className="form-group">
                <label className="form-label">
                  Precio de Lista *
                </label>
                <div className="form-input-with-prefix">
                  <span className="form-input-prefix">$</span>
                  <input
                    {...register("precioLista", {
                      required: "El precio es obligatorio",
                      min: { value: 0, message: "Debe ser ≥ 0" },
                    })}
                    type="number"
                    step="0.01"
                    className={`form-input ${errors.precioLista ? 'error' : ''}`}
                    placeholder="0.00"
                  />
                </div>
                {errors.precioLista && (
                  <div className="form-error">
                    <AlertCircle style={{ width: '14px', height: '14px' }} />
                    <span>
                      {errors.precioLista.message}
                    </span>
                  </div>
                )}
              </div>

              {/* Precio Oferta */}
              <div className="form-group">
                <label className="form-label">
                  Precio Oferta
                </label>
                <div className="form-input-with-prefix">
                  <span className="form-input-prefix">$</span>
                  <input
                    {...register("precioOferta", {
                      min: { value: 0, message: "Debe ser ≥ 0" },
                    })}
                    type="number"
                    step="0.01"
                    className={`form-input ${errors.precioOferta ? 'error' : ''}`}
                    placeholder="0.00"
                  />
                </div>
                {errors.precioOferta && (
                  <div className="form-error">
                    <AlertCircle style={{ width: '14px', height: '14px' }} />
                    <span>
                      {errors.precioOferta.message}
                    </span>
                  </div>
                )}
              </div>

              {/* Porcentaje Descuento */}
              <div className="form-group">
                <label className="form-label">
                  <Percent style={{ width: '14px', height: '14px' }} />
                  % Descuento
                </label>
                <div className="form-input-with-prefix">
                  <input
                    {...register("porcentajeDescuento", {
                      min: { value: 0, message: "Debe ser ≥ 0" },
                      max: { value: 100, message: "Debe ser ≤ 100" },
                    })}
                    type="number"
                    step="1"
                    className={`form-input ${errors.porcentajeDescuento ? 'error' : ''}`}
                    placeholder="0"
                  />
                  <span className="form-input-suffix">%</span>
                </div>
                {errors.porcentajeDescuento && (
                  <div className="form-error">
                    <AlertCircle style={{ width: '14px', height: '14px' }} />
                    <span>
                      {errors.porcentajeDescuento.message}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── Estado del producto ── */}
          <div className="form-section">
            <h3 className="form-section-title">
              <ToggleLeft style={{ width: '16px', height: '16px' }} />
              Estado
            </h3>
            <label style={{ display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer', width: 'fit-content' }}>
              <div style={{ position: 'relative' }}>
                <input
                  type="checkbox"
                  style={{ opacity: 0, width: 0, height: 0 }}
                  {...register("productoActivo")}
                />
                <div
                  onClick={() => setValue("productoActivo", !productoActivo)}
                  style={{
                    width: '40px',
                    height: '20px',
                    borderRadius: '20px',
                    backgroundColor: productoActivo ? '#1c1c1c' : '#999999',
                    transition: 'background-color 0.3s',
                    position: 'relative'
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: '2px',
                      left: '2px',
                      width: '16px',
                      height: '16px',
                      backgroundColor: 'white',
                      borderRadius: '50%',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                      transition: 'left 0.3s',
                      left: productoActivo ? '22px' : '2px'
                    }}
                  />
                </div>
              </div>
              <span style={{ fontSize: '13px', color: '#1c1c1c' }}>
                Producto{" "}
                <span
                  style={{
                    color: productoActivo ? '#22c55e' : '#999999',
                    fontWeight: '500'
                  }}
                >
                  {productoActivo ? "activo" : "inactivo"}
                </span>
              </span>
            </label>
          </div>

          {/* ── Imagen ── */}
          <div className="form-section">
            <h3 className="form-section-title">
              <UploadCloud style={{ width: '16px', height: '16px' }} />
              Imagen del Producto
            </h3>

            <label
              className={`file-upload-area ${errors.imagenProducto ? 'error' : ''}`}
            >
              <div className="file-upload-content">
                <UploadCloud className="file-upload-icon" />
                <span className="file-upload-text">
                  {preview ? "Cambiar imagen..." : "Seleccionar imagen..."}
                </span>
              </div>
              <input
                type="file"
                accept="image/*"
                ref={(e) => {
                  registerRef(e);
                  fileInputRef.current = e;
                }}
                {...registerImageProps}
                onChange={(e) => {
                  registerImageProps.onChange?.(e);
                  handleImageChange(e);
                }}
                name="imagenProducto"
              />
            </label>

            {errors.imagenProducto && (
              <div className="form-error" style={{ marginTop: '8px' }}>
                <AlertCircle style={{ width: '14px', height: '14px' }} />
                <span>
                  {errors.imagenProducto.message}
                </span>
              </div>
            )}

            {preview && (
              <div className="preview-container">
                <div className="preview-header">
                  <span className="preview-title">
                    Vista Previa
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setPreview(null);
                      setValue("imagenProducto", null);
                    }}
                    className="preview-remove"
                  >
                    <X style={{ width: '14px', height: '14px' }} /> Quitar
                  </button>
                </div>
                <img
                  src={preview}
                  alt="Preview"
                  className="preview-image"
                />
              </div>
            )}
          </div>

          {/* ── Botones ── */}
          <div className="form-buttons">
            <button
              type="submit"
              disabled={isPending}
              className="btn-submit"
            >
              {isPending ? (
                <Loader2 style={{ width: '16px', height: '16px', animation: 'spin 0.8s linear infinite' }} />
              ) : (
                <Save style={{ width: '16px', height: '16px' }} />
              )}
              {isPending ? "Guardando..." : "Guardar Producto"}
            </button>
            <button
              type="button"
              onClick={() => {
                reset();
                setPreview(null);
                setShowForm(false);
              }}
              className="btn-cancel"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormProductos;
