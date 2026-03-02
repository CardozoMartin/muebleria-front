import {api} from '../api';


export const postLogin = async (data) => {
  try {
    const response = await api.post('/auth/login', data);
    return response.data;
  } catch (error) {
    console.log(error.response.data.message)
    // manejar errores del back en el front
    const message = error.response?.data?.message;
    console.log('Error en postLogin:', message);
    throw new Error(message);
  }
};
