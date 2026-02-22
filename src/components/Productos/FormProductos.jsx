import {
  AlertCircle,
  Save,
  UploadCloud,
  X,
  Package,
  DollarSign,
  Tag,
  CheckCircle,
  Loader2,
} from 'lucide-react';
import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';

const FormProductos = ( { setShowForm }) => {
  const [preview, setPreview] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const fileInputRef = useRef(null);


  const { mutate: CrearProductos, isPending } = useMutation();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const handleSubmitForm = (formData) => {
    const formDataToSend = new FormData();
    formDataToSend.append('titulo', formData.titulo);
    formDataToSend.append('precioActual', formData.precioActual);
    formDataToSend.append('imagenProducto', formData.imagenProducto[0]);

    CrearProductos(formDataToSend, {
      onSuccess: () => {
        setShowSuccess(true);
        reset();
        setPreview(null);
        setTimeout(() => setShowSuccess(false), 3000);
      },
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setPreview(URL.createObjectURL(file));
      setValue('imagenProducto', e.dataTransfer.files);
    }
  };



  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      {/* Toast éxito */}
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
          {/* Sección: Información Básica */}
          <div className="bg-gray-500/5 rounded-md p-5 border border-gray-500/20">
            <h3 className="text-sm font-medium text-gray-800/80 mb-4 flex items-center">
              <Package className="w-4 h-4 text-gray-700/70 mr-2" />
              Información Básica
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-800/80 mb-2 flex items-center">
                <Tag className="w-3.5 h-3.5 mr-1.5 text-gray-600/60" />
                Nombre del Producto *
              </label>
              <input
                {...register('titulo', {
                  required: 'El nombre es obligatorio',
                  minLength: { value: 3, message: 'Mínimo 3 caracteres' },
                  maxLength: { value: 50, message: 'Máximo 50 caracteres' },
                })}
                className={`w-full border rounded-md px-3 py-2 text-sm font-medium text-gray-800/80 focus:outline-none focus:ring-1 focus:ring-gray-400 transition ${
                  errors.titulo
                    ? 'border-red-400/60 bg-red-50/30'
                    : 'border-gray-500/30 hover:border-gray-500/50'
                }`}
                placeholder="Ej: Mesa de Madera Roble"
              />
              {errors.titulo && (
                <div className="flex items-center gap-1.5 mt-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-red-500/80" />
                  <span className="text-red-600/80 text-xs font-medium">
                    {errors.titulo.message}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Sección: Precio */}
          <div className="bg-gray-500/5 rounded-md p-5 border border-gray-500/20">
            <h3 className="text-sm font-medium text-gray-800/80 mb-4 flex items-center">
              <DollarSign className="w-4 h-4 text-gray-700/70 mr-2" />
              Precio
            </h3>

            <div className="max-w-xs">
              <label className="block text-sm font-medium text-gray-800/80 mb-2">
                Precio de Venta *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-700/70 font-medium text-sm">
                  $
                </span>
                <input
                  {...register('precioActual', {
                    required: 'El precio es obligatorio',
                    min: { value: 0, message: 'Debe ser mayor o igual a 0' },
                  })}
                  type="number"
                  step="0.01"
                  className={`w-full border rounded-md pl-8 pr-3 py-2 text-sm font-medium text-gray-800/80 focus:outline-none focus:ring-1 focus:ring-gray-400 transition ${
                    errors.precioActual
                      ? 'border-red-400/60 bg-red-50/30'
                      : 'border-gray-500/30 hover:border-gray-500/50'
                  }`}
                  placeholder="0.00"
                />
              </div>
              {errors.precioActual && (
                <div className="flex items-center gap-1.5 mt-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-red-500/80" />
                  <span className="text-red-600/80 text-xs font-medium">
                    {errors.precioActual.message}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Sección: Imagen */}
          <div className="bg-gray-500/5 rounded-md p-5 border border-gray-500/20">
            <h3 className="text-sm font-medium text-gray-800/80 mb-4 flex items-center">
              <UploadCloud className="w-4 h-4 text-gray-700/70 mr-2" />
              Imagen del Producto
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {/* Drop zone */}
              <div>
                <label className="block text-sm font-medium text-gray-800/80 mb-2.5">
                  Subir Imagen *
                </label>
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOver(true);
                  }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border border-dashed rounded-md p-6 text-center cursor-pointer transition bg-white flex flex-col items-center justify-center gap-2 ${
                    dragOver
                      ? 'border-gray-500/70 bg-gray-500/5'
                      : errors.imagenProducto
                        ? 'border-red-400/60 bg-red-50/30'
                        : 'border-gray-400/50 hover:border-gray-500/70'
                  }`}
                >
                  <UploadCloud className="w-10 h-10 text-gray-600/60" />
                  <span className="text-sm font-medium text-gray-800/80">
                    Arrastrá aquí o{' '}
                    <span className="underline underline-offset-2">seleccioná archivo</span>
                  </span>
                  <span className="text-xs text-gray-600/60 font-medium">
                    PNG, JPG, JPEG (máx. 5MB)
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    className="hidden"
                    {...register('imagenProducto', { required: 'La imagen es requerida' })}
                    onChange={handleImageChange}
                  />
                </div>
                {errors.imagenProducto && (
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-red-500/80" />
                    <span className="text-red-600/80 text-xs font-medium">
                      {errors.imagenProducto.message}
                    </span>
                  </div>
                )}
              </div>

              {/* Preview */}
              {preview && (
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <label className="block text-sm font-medium text-gray-800/80">
                      Vista Previa
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setPreview(null);
                        setValue('imagenProducto', null);
                      }}
                      className="flex items-center gap-1 text-xs text-gray-600/70 hover:text-red-500 transition"
                    >
                      <X className="w-3.5 h-3.5" />
                      Quitar
                    </button>
                  </div>
                  <div className="border border-gray-500/30 rounded-md p-3 bg-white">
                    <img src={preview} alt="Preview" className="w-full h-40 object-cover rounded" />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Botones */}
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
