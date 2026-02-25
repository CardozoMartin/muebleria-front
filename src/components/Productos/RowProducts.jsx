import { Eye, MonitorPlay, SquarePen, Trash } from "lucide-react";
import React from "react";
import {
  useChangeStateProduct,
  useDeleteProduct,
} from "../../hooks/useProducts";
import Swal from "sweetalert2";
import { useEditProduct } from "../../store/useEditProduct";

const RowProducts = ({ product, index, setShowForm, setShowVideo, setSelectedProduct }) => {
  const { setProduct } = useEditProduct();
  //hook para cambiar el estado del producto
  const { mutate: changeStateProduct } = useChangeStateProduct();
  //hook para eliminar un producto
  const { mutate: deleteProduct } = useDeleteProduct();

  //handle para cambiar el estado del producto
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
  //handle para eliminar un producto
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
  //handle para editar un producto
  const handleEditProduct = ()=>{
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Deseas editar este producto?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, editar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        //aqui guardamos el producto en el estado global para luego mostrar el formulario de edición con los datos cargados
        setProduct(product);
        //aqui se podría redirigir a la página de edición o mostrar un modal con el formulario de edición
        setShowForm(true);
      }
    });
  }
  //handle para mostrar la previsualización de la plantilla
  const handleShowVideo = () => {
    if (setSelectedProduct) setSelectedProduct(product);
    setShowVideo(true);
  }
  return (
    <tr
      key={product._id}
      className="border-b border-gray-300/50 last:border-0 hover:bg-gray-500/5 transition"
    >
      {/* # */}
      <td className="px-5 py-3.5 text-xs text-gray-600/60 font-medium font-bold">
        {String(index + 1).padStart(2, "0")}
      </td>

      {/* Producto (imagen + nombre) */}
      <td className="px-5 py-3.5">
        <div className="flex  items-center gap-2">
          {product.imagenProducto ? (
            <img
              src={product.imagenProducto}
              alt={product.titulo}
              className="w-10 h-10 object-cover rounded-md border border-gray-500/20 shrink-0"
            />
          ) : (
            <div className="w-10 h-10 rounded-md border border-gray-500/20 bg-gray-500/10  shrink-0">
              <PackageOpen className="w-4 h-4 text-gray-400/60" />
            </div>
          )}
          <span className="text-sm font-bold text-gray-800/80 text-center ">
            {product.titulo}
          </span>
        </div>
      </td>

      {/* Precio actual */}
      <td className="px-5 py-3.5 text-sm items-center justify-center font-medium text-gray-800/80">
        ${Number(product.precioLista).toLocaleString("es-AR")}
      </td>

      {/* Precio anterior */}
      <td className="px-5 py-3.5 text-sm font-medium text-gray-800/80">
        ${Number(product.precioOferta).toLocaleString("es-AR")}
      </td>

      <td className="px-5 py-3.5 text-sm font-medium text-gray-800/80">
        <span className="font-bold">%</span>
        {Number(product.porcentajeDescuento).toLocaleString("es-AR")}
      </td>
      <td className="px-5 py-3.5 text-sm font-medium text-gray-800/80">
       
        {product.plantillaId}
      </td>

      {/* Estado */}
      <td className="px-5 py-3.5">
        <button
          onClick={handleStateChange}
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium ${
            product.productoActivo
              ? "bg-gray-800/5 text-green-700/70 border border-green-500/20"
              : "bg-red-50/60 text-red-500/80 border border-red-400/20"
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              product.productoActivo ? "bg-green-600/60" : "bg-red-400/80"
            }`}
          />
          {product.productoActivo ? "Activo" : "Inactivo"}
        </button>
      </td>

      {/* Acciones */}
      <td className="px-5 py-3.5">
        <div className="flex items-center gap-2">
          <button 
            onClick={handleShowVideo}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-500/30 text-gray-800/80 text-xs font-medium rounded-md hover:bg-blue-500/10 transition"
          >
            <MonitorPlay className="w-4 h-4" />
          </button>
          <button
            onClick={handleDeleteProduct}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-500/30 text-gray-800/80 text-xs font-medium rounded-md hover:bg-red-500/10 transition"
          >
            <Trash className="hover:bg-red-500/10 hover:text-red-500" />
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-500/30 text-gray-800/80 text-xs font-medium rounded-md hover:bg-yellow-500/10 transition"
          onClick={handleEditProduct}>
            <SquarePen className="hover:bg-yellow-500/10 hover:text-yellow-500" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default RowProducts;
