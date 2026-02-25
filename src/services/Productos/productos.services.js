import {api} from '../api';


export const getProducts = async (page = 1) => {
  try {
    const response = await api.get(`/productos/?page=${page}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}
//productos con paginacion de 10 en 10
export const getAllProducts = async () => {
  try {
    //al obtener los productos ahora vienen con paginacion de 10 en 10, por lo que se debe hacer un loop para obtener todos los productos

    let allProducts = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const response = await api.get(`/productos/?page=${page}`);
      const products = response.data.productos;
      
      if (products.length === 0) {
        hasMore = false;
      } else {
        allProducts = [...allProducts, ...products];
        page++;
      }
    }

    return allProducts;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}
//funcion para crear un nuevo producto
export const createProduct = async (productData) => {
  try {
    const response = await api.post('/productos/', productData);
    
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
}
//funcion para cambiar el estado del producto
export const cambiarEstadoProducto = async (productId) =>{
  try {
    const response = await api.put(`/productos/estado/${productId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
//funcion para eliminar un producto
export const deleteProduct = async (productId) => {
  try {
    const response = await api.delete(`/productos/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
}

//funcion para editar un producto
export const editProduct = async (productId, productData) => {
  try {
    const response = await api.put(`/productos/${productId}`, productData);
    return response.data;
  } catch (error) {
    // log more details from axios response if available
    console.error('Error editing product:', error.response?.data || error.message || error);
    throw error;
  }
}

//funcion para obtener todos los productos
export const getProductosAll = async () => {
  try {
    const response = await api.get('/productos/all');
    console.log('Respuesta de getProductosAll:', response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
}


