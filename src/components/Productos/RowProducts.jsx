import { Eye, MonitorPlay, SquarePen, Trash, PackageOpen } from "lucide-react";
import React from "react";
import {
  useChangeStateProduct,
  useDeleteProduct,
} from "../../hooks/useProducts";
import Swal from "sweetalert2";
import { useEditProduct } from "../../store/useEditProduct";
import '../../css/productos.css';

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
    <tr key={product._id}>
      {/* # */}
      <td className="table-number">
        {String(index + 1).padStart(2, "0")}
      </td>

      {/* Producto (imagen + nombre) */}
      <td>
        <div className="product-info">
          {product.imagenProducto ? (
            <img
              src={product.imagenProducto}
              alt={product.titulo}
              className="product-image"
            />
          ) : (
            <div className="product-image-placeholder">
              <PackageOpen style={{ width: '16px', height: '16px', color: '#999999' }} />
            </div>
          )}
          <span className="product-name">
            {product.titulo}
          </span>
        </div>
      </td>

      {/* Precio actual */}
      <td className="price-cell">
        ${Number(product.precioLista).toLocaleString("es-AR")}
      </td>

      {/* Precio anterior */}
      <td className="price-cell">
        ${Number(product.precioOferta).toLocaleString("es-AR")}
      </td>

      <td className="price-cell">
        <span style={{ fontWeight: 'bold' }}>%</span>
        {Number(product.porcentajeDescuento).toLocaleString("es-AR")}
      </td>
      <td className="price-cell">
        {product.plantillaId || '-'}
      </td>

      {/* Estado */}
      <td>
        <button
          onClick={handleStateChange}
          className={`status-badge ${product.productoActivo ? 'active' : 'inactive'}`}
        >
          <span className="status-badge-dot" />
          {product.productoActivo ? "Activo" : "Inactivo"}
        </button>
      </td>

      {/* Acciones */}
      <td>
        <div className="actions-cell">
          <button 
            onClick={handleShowVideo}
            className="btn-action view"
            title="Ver plantilla"
          >
            <MonitorPlay style={{ width: '16px', height: '16px' }} />
          </button>
          <button
            onClick={handleDeleteProduct}
            className="btn-action"
            title="Eliminar"
          >
            <Trash style={{ width: '16px', height: '16px' }} />
          </button>
          <button 
            className="btn-action edit"
            onClick={handleEditProduct}
            title="Editar"
          >
            <SquarePen style={{ width: '16px', height: '16px' }} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default RowProducts;
