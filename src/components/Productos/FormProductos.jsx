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
} from 'lucide-react';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { usePostProduct } from '../../hooks/useProducts';
import { toast } from 'sonner';

const FormProductos = ({ setShowForm }) => {
  const [preview, setPreview] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const fileInputRef = useRef(null);

  const { mutate: CrearProductos, isLoading: isPending } = usePostProduct();

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
    },
  });

  const { ref: registerRef, ...registerImageProps } = register('imagenProducto', {
    required: 'La imagen es requerida',
  });

  const productoActivo = watch('productoActivo');

  const handleSubmitForm = (formData) => {
    const formDataToSend = new FormData();
    formDataToSend.append('titulo', formData.titulo);
    formDataToSend.append('categoria', formData.categoria);
    formDataToSend.append('precioLista', formData.precioLista);
    if (formData.precioOferta) formDataToSend.append('precioOferta', formData.precioOferta);
    if (formData.porcentajeDescuento)
      formDataToSend.append('porcentajeDescuento', formData.porcentajeDescuento);
    if (formData.descripcion) formDataToSend.append('descripcion', formData.descripcion);
    formDataToSend.append('productoActivo', formData.productoActivo);
    formDataToSend.append('imagenProducto', formData.imagenProducto[0]);

    CrearProductos(formDataToSend, {
      onSuccess: () => {
        setShowSuccess(true);
        reset();
        setPreview(null);
        setTimeout(() => setShowSuccess(false), 3000);
      },
      onError: (err) => {
        console.error('error creating product', err);
        toast.error('Error al crear el producto');
      },
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      {showSuccess && (
        <div className="fixed top-4 right-4 bg-green-50 border border-green-200 rounded-lg p-4 shadow-lg z-50 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="text-sm font-medium text-green-800">Producto guardado exitosamente</span>
        </div>
      )}

      <div className="bg-white rounded-md border border-gray-500/30 p-6 max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-medium text-gray-800/80">Agregar Nuevo Producto</h2>
            <p className="text-sm text-gray-600/70 mt-1">Completa la información del producto</p>
          </div>
          <button
            type="button"
            onClick={() => {
              reset();
              setPreview(null);
              setShowForm(false);
            }}
            className="p-2 text-gray-600/70 hover:text-gray-800 hover:bg-gray-500/10 rounded transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-5">
          {/* ── Información Básica ── */}
          <div className="bg-gray-500/5 rounded-md p-5 border border-gray-500/20 space-y-4">
            <h3 className="text-sm font-medium text-gray-800/80 flex items-center">
              <Package className="w-4 h-4 text-gray-700/70 mr-2" /> Información Básica
            </h3>

            {/* Nombre */}
            <div>
              <label className="block text-sm font-medium text-gray-800/80 mb-2 flex items-center">
                <Tag className="w-3.5 h-3.5 mr-1.5 text-gray-600/60" /> Nombre del Producto *
              </label>
              <input
                {...register('titulo', {
                  required: 'El nombre es obligatorio',
                  minLength: { value: 3, message: 'Mínimo 3 caracteres' },
                  maxLength: { value: 50, message: 'Máximo 50 caracteres' },
                })}
                className={`w-full border rounded-md px-3 py-2 text-sm text-gray-800/80 focus:outline-none focus:ring-1 focus:ring-gray-400 transition ${
                  errors.titulo
                    ? 'border-red-400/60 bg-red-50/30'
                    : 'border-gray-500/30 hover:border-gray-500/50'
                }`}
                placeholder="Ej: Mesa de Madera Roble"
              />
              {errors.titulo && (
                <div className="flex items-center gap-1.5 mt-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-red-500/80" />
                  <span className="text-red-600/80 text-xs">{errors.titulo.message}</span>
                </div>
              )}
            </div>

            {/* Categoría */}
            <div>
              <label className="block text-sm font-medium text-gray-800/80 mb-2">Categoría *</label>
              <select
                {...register('categoria', { required: 'La categoría es obligatoria' })}
                className={`w-full border rounded-md px-3 py-2 text-sm text-gray-800/80 focus:outline-none focus:ring-1 focus:ring-gray-400 transition bg-white ${
                  errors.categoria
                    ? 'border-red-400/60 bg-red-50/30'
                    : 'border-gray-500/30 hover:border-gray-500/50'
                }`}
              >
                <option value="">Selecciona una categoría</option>
                <option value="Cocina">Cocina</option>
                <option value="Living">Living</option>
                <option value="Dormitorio">Dormitorio</option>
                <option value="Jardin">Jardin</option>
                <option value="Varios">Varios</option>
              </select>
              {errors.categoria && (
                <div className="flex items-center gap-1.5 mt-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-red-500/80" />
                  <span className="text-red-600/80 text-xs">{errors.categoria.message}</span>
                </div>
              )}
            </div>

            {/* Descripción */}
            <div>
              <label className="block text-sm font-medium text-gray-800/80 mb-2 flex items-center">
                <FileText className="w-3.5 h-3.5 mr-1.5 text-gray-600/60" /> Descripción
              </label>
              <textarea
                {...register('descripcion', {
                  maxLength: { value: 500, message: 'Máximo 500 caracteres' },
                })}
                rows={3}
                className={`w-full border rounded-md px-3 py-2 text-sm text-gray-800/80 focus:outline-none focus:ring-1 focus:ring-gray-400 transition resize-none ${
                  errors.descripcion
                    ? 'border-red-400/60 bg-red-50/30'
                    : 'border-gray-500/30 hover:border-gray-500/50'
                }`}
                placeholder="Descripción opcional del producto..."
              />
              {errors.descripcion && (
                <div className="flex items-center gap-1.5 mt-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-red-500/80" />
                  <span className="text-red-600/80 text-xs">{errors.descripcion.message}</span>
                </div>
              )}
            </div>
          </div>

          {/* ── Precios ── */}
          <div className="bg-gray-500/5 rounded-md p-5 border border-gray-500/20 space-y-4">
            <h3 className="text-sm font-medium text-gray-800/80 flex items-center">
              <DollarSign className="w-4 h-4 text-gray-700/70 mr-2" /> Precios
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Precio Lista */}
              <div>
                <label className="block text-sm font-medium text-gray-800/80 mb-2">
                  Precio de Lista *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-700/70 text-sm">
                    $
                  </span>
                  <input
                    {...register('precioLista', {
                      required: 'El precio es obligatorio',
                      min: { value: 0, message: 'Debe ser ≥ 0' },
                    })}
                    type="number"
                    step="0.01"
                    className={`w-full border rounded-md pl-8 pr-3 py-2 text-sm text-gray-800/80 focus:outline-none focus:ring-1 focus:ring-gray-400 transition ${
                      errors.precioLista
                        ? 'border-red-400/60 bg-red-50/30'
                        : 'border-gray-500/30 hover:border-gray-500/50'
                    }`}
                    placeholder="0.00"
                  />
                </div>
                {errors.precioLista && (
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-red-500/80" />
                    <span className="text-red-600/80 text-xs">{errors.precioLista.message}</span>
                  </div>
                )}
              </div>

              {/* Precio Oferta */}
              <div>
                <label className="block text-sm font-medium text-gray-800/80 mb-2">
                  Precio Oferta
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-700/70 text-sm">
                    $
                  </span>
                  <input
                    {...register('precioOferta', {
                      min: { value: 0, message: 'Debe ser ≥ 0' },
                    })}
                    type="number"
                    step="0.01"
                    className={`w-full border rounded-md pl-8 pr-3 py-2 text-sm text-gray-800/80 focus:outline-none focus:ring-1 focus:ring-gray-400 transition ${
                      errors.precioOferta
                        ? 'border-red-400/60 bg-red-50/30'
                        : 'border-gray-500/30 hover:border-gray-500/50'
                    }`}
                    placeholder="0.00"
                  />
                </div>
                {errors.precioOferta && (
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-red-500/80" />
                    <span className="text-red-600/80 text-xs">{errors.precioOferta.message}</span>
                  </div>
                )}
              </div>

              {/* Porcentaje Descuento */}
              <div>
                <label className="block text-sm font-medium text-gray-800/80 mb-2 flex items-center">
                  <Percent className="w-3.5 h-3.5 mr-1 text-gray-600/60" /> % Descuento
                </label>
                <div className="relative">
                  <input
                    {...register('porcentajeDescuento', {
                      min: { value: 0, message: 'Debe ser ≥ 0' },
                      max: { value: 100, message: 'Debe ser ≤ 100' },
                    })}
                    type="number"
                    step="1"
                    className={`w-full border rounded-md pl-3 pr-8 py-2 text-sm text-gray-800/80 focus:outline-none focus:ring-1 focus:ring-gray-400 transition ${
                      errors.porcentajeDescuento
                        ? 'border-red-400/60 bg-red-50/30'
                        : 'border-gray-500/30 hover:border-gray-500/50'
                    }`}
                    placeholder="0"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-700/70 text-sm">
                    %
                  </span>
                </div>
                {errors.porcentajeDescuento && (
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-red-500/80" />
                    <span className="text-red-600/80 text-xs">
                      {errors.porcentajeDescuento.message}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── Estado del producto ── */}
          <div className="bg-gray-500/5 rounded-md p-5 border border-gray-500/20">
            <h3 className="text-sm font-medium text-gray-800/80 flex items-center mb-4">
              <ToggleLeft className="w-4 h-4 text-gray-700/70 mr-2" /> Estado
            </h3>
            <label className="flex items-center gap-3 cursor-pointer w-fit">
              <div className="relative">
                <input type="checkbox" className="sr-only" {...register('productoActivo')} />
                <div
                  onClick={() => setValue('productoActivo', !productoActivo)}
                  className={`w-10 h-5 rounded-full transition-colors duration-200 ${
                    productoActivo ? 'bg-gray-800/80' : 'bg-gray-300/80'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${
                      productoActivo ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </div>
              </div>
              <span className="text-sm text-gray-800/80">
                Producto{' '}
                <span
                  className={
                    productoActivo ? 'text-green-600 font-medium' : 'text-gray-500 font-medium'
                  }
                >
                  {productoActivo ? 'activo' : 'inactivo'}
                </span>
              </span>
            </label>
          </div>

          {/* ── Imagen ── */}
          <div className="bg-gray-500/5 rounded-md p-5 border border-gray-500/20">
            <h3 className="text-sm font-medium text-gray-800/80 mb-4 flex items-center">
              <UploadCloud className="w-4 h-4 text-gray-700/70 mr-2" /> Imagen del Producto
            </h3>

            <label
              className={`flex items-center gap-3 border rounded-md px-3 py-2 cursor-pointer bg-white transition w-full ${
                errors.imagenProducto
                  ? 'border-red-400/60 bg-red-50/30'
                  : 'border-gray-500/30 hover:border-gray-500/60'
              }`}
            >
              <UploadCloud className="w-4 h-4 text-gray-500/70 shrink-0" />
              <span className="text-sm text-gray-500/80 truncate">
                {preview ? 'Cambiar imagen...' : 'Seleccionar imagen...'}
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                // react-hook-form gives us a ref function and an onChange handler
                ref={(e) => {
                  registerRef(e);
                  fileInputRef.current = e;
                }}
                {...registerImageProps}
                // keep the original RHF onChange and also run our preview helper
                onChange={(e) => {
                  registerImageProps.onChange?.(e);
                  handleImageChange(e);
                }}
                name="imagenProducto" // just to be explicit
              />
            </label>

            {errors.imagenProducto && (
              <div className="flex items-center gap-1.5 mt-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-red-500/80" />
                <span className="text-red-600/80 text-xs">{errors.imagenProducto.message}</span>
              </div>
            )}

            {preview && (
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-800/80">Vista Previa</span>
                  <button
                    type="button"
                    onClick={() => {
                      setPreview(null);
                      setValue('imagenProducto', null);
                    }}
                    className="flex items-center gap-1 text-xs text-gray-600/70 hover:text-red-500 transition"
                  >
                    <X className="w-3.5 h-3.5" /> Quitar
                  </button>
                </div>
                <div className="border border-gray-500/30 rounded-md p-3 bg-white">
                  <img src={preview} alt="Preview" className="w-full h-40 object-cover rounded" />
                </div>
              </div>
            )}
          </div>

          {/* ── Botones ── */}
          <div className="flex gap-3 pt-4 border-t border-gray-300/70">
            <button
              type="submit"
              disabled={isPending}
              className="flex items-center gap-2 bg-gray-800/80 hover:bg-gray-800 text-white text-sm font-medium px-5 py-2.5 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {isPending ? 'Guardando...' : 'Guardar Producto'}
            </button>
            <button
              type="button"
              onClick={() => {
                reset();
                setPreview(null);
              }}
              className="px-5 py-2.5 border border-gray-500/30 text-gray-800/80 text-sm font-medium rounded-md hover:bg-gray-500/10 transition"
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
