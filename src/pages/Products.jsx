import { useMutation } from '@tanstack/react-query';
import { createProduct } from '../services/Productos/productos.services';
import { useForm, Watch } from 'react-hook-form';
import { Form } from 'react-router-dom';
import { useState } from 'react';
import { useGetProducts } from '../hooks/useProducts';

export default function Products() {
  const [preview, setPreview] = useState(null);
  //llamamos a useQuery para obtener los productos desde el backend
  //data son los datos que obtenemos desde el backend
  //isLoading es un booleano que nos indica si la consulta esta en proceso de carga
  //isError es un booleano que nos indica si hubo un error al cargar los datos
  const { data, isLoading, isError } = useGetProducts()

  //USEMUTATION para crear un nuevo producto o para editar algun producto
  const { mutate: CrearProductos, isPending } = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      //me muestr alerta de sonner

      //resete formulario
      reset();

      //me envie al home
    },
    onError: () => {
      alert('Error al crear el producto');
    },
  });
  //USEMUTATION para editar un nuevo producto o para editar algun producto

  //REACTHOOKFORM para manejar los formularios de creacion y edicion de productos
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleSubmitForm = (formData) => {
    //formato FORM-DATA para enviar la imagen al backend
    const formDataToSend = new FormData();
    formDataToSend.append('titulo', formData.titulo);
    formDataToSend.append('precioActual', formData.precioActual);
    formDataToSend.append('imagenProducto', formData.imagenProducto[0]);

    CrearProductos(formDataToSend);
    reset();
    setPreview(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  if (isLoading) {
    return <div>Cargando productos...</div>;
  }

  if (isError) {
    return <div>Error al cargar los productos.</div>;
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Products</h1>
          <p className="text-sm text-gray-400 mt-0.5">Inventario de producto</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition shadow-sm">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M5 12h14" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          Agregar Producto
        </button>
      </div>
      <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre del Producto</label>
          <input
            {...register('titulo', { required: true, minLength: 3, maxLength: 50 })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />

          {errors.titulo && (
            <p className="text-red-500 text-sm mt-1">
              El nombre es requerido y debe tener entre 3 y 50 caracteres.
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Imagen Producto</label>

          <input
            type="file"
            accept="image/*"
            {...register('imagenProducto', { required: true })}
            onChange={handleImageChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />

          {/* Preview de la imagen */}
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-2 w-40 h-40 object-cover rounded-md border border-gray-300"
            />
          )}

          {errors.imagenProducto && (
            <p className="text-red-500 text-sm mt-1">La imagen es requerida.</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Precio</label>
          <input
            {...register('precioActual', { required: true, min: 0 })}
            type="number"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />

          {errors.precioActual && (
            <p className="text-red-500 text-sm mt-1">El precio es requerido y debe ser positivo.</p>
          )}
        </div>

        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition shadow-sm"
          disabled={isPending}
        >
          {isPending ? 'Guardando...' : 'Guardar Producto'}
        </button>
      </form>
    </div>
  );
}
