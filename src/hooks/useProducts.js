/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  cambiarEstadoProducto,
  createProduct,
  deleteProduct,
  editProduct,
  getAllProducts,
  getProductosAll,
  getProducts,
  searchProducts,
} from "../services/Productos/productos.services";
import { toast } from "sonner";

//Hook para obtener productos con paginación
export const useGetProducts = (page = 1) => {
  return useQuery({
    queryKey: ["products", page],
    queryFn: () => getProducts(page),
    staleTime: 1000 * 60 * 5,
    retry: 3,
  });
};

//Hook para buscar productos por nombre
export const useSearchProducts = (query) => {
  return useQuery({
    queryKey: ["search-products", query],
    queryFn: () => searchProducts(query),
    enabled: !!query, // solo ejecutar si hay un término de búsqueda
    staleTime: 1000 * 60 * 5,
    retry: 3,
  });
};

//Hook para obtener todos los productos (usa el helper que itera todas las páginas)
export const useGetAllProducts = () => {
  return useQuery({
    queryKey: ["all-products"],
    queryFn: getAllProducts,
    staleTime: 1000 * 60 * 30, // ⚠️ 30 minutos - CRÍTICO PARA TV
    gcTime: 1000 * 60 * 60,     // Mantener en caché 1 hora
    retry: 3,
  });
};
//hook para crear un nuevo producto
export const usePostProduct = () => {
  const queryCliente = useQueryClient();
  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryCliente.invalidateQueries({ queryKey: ["products"] });
      queryCliente.invalidateQueries({ queryKey: ["all-products"] });
      queryCliente.invalidateQueries({ queryKey: ["search-products"] });
      toast.success("Producto creado exitosamente");
    },
    onError: () => {
      toast.error("Error al crear el producto");
    },
  });
};
//hook para cambiar el estado del producto
export const useChangeStateProduct = () => {
  const queryCliente = useQueryClient();
  return useMutation({
    mutationFn: cambiarEstadoProducto,
    onSuccess: () => {
      queryCliente.invalidateQueries({ queryKey: ["products"] });
      queryCliente.invalidateQueries({ queryKey: ["all-products"] });
      queryCliente.invalidateQueries({ queryKey: ["search-products"] });
      toast.success("Estado del producto actualizado");
    },
    onError: () => {
      toast.error("Error al actualizar el estado del producto");
    },
  });
};

//hook para eliminar un producto
export const useDeleteProduct = () => {
  const queryCliente = useQueryClient();
  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryCliente.invalidateQueries({ queryKey: ["products"] });
      queryCliente.invalidateQueries({ queryKey: ["all-products"] });
      queryCliente.invalidateQueries({ queryKey: ["search-products"] });
      toast.success("Producto eliminado exitosamente");
    },
    onError: () => {
      toast.error("Error al eliminar el producto");
    },
  });
};

//hook para editar un producto
export const useEditProduct = () => {
  const queryCliente = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => editProduct(id, data),
    onSuccess: () => {
      queryCliente.invalidateQueries({ queryKey: ["products"] });
      queryCliente.invalidateQueries({ queryKey: ["all-products"] });
      queryCliente.invalidateQueries({ queryKey: ["search-products"] });
      toast.success("Producto editado exitosamente");
    },
    onError: () => {
      toast.error("Error al editar el producto");
    },
  });
};

//hook para obtener productos sin paginacion
export const usetGetAllProducts = (options = {}) => {
  return useQuery({
    queryKey: ["all-products"],
    queryFn: getProductosAll,
    staleTime: 1000 * 60 * 5,
    retry: 3,
    ...options,
  });
}