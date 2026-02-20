import {api} from '../api';


export const getProducts = async () => {
  try {
    const response = await api.get('/productos/');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

export const createProduct = async (productData) => {
  try {
    const response = await api.post('/productos/', productData);
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
}


