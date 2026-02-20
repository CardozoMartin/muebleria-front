import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createProduct, getProducts } from "../services/Productos/productos.services"


export const useGetProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
    staleTime: 1000 * 60 * 5,
    retry: 3,
  })
}

export const usePostProduct = () => {
  const queryCliente = useQueryClient();
  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryCliente.invalidateQueries({ queryKey: ['products'] });
      alert('Producto creado exitosamente');
    },
    onError: () => {
      alert('Error al crear el producto');
    },
  })
}
