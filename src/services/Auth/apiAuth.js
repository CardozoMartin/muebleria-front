import {api} from '../api';


export const postLogin = async (data) => {
  try {
    const response = await api.post('/auth/login', data);
    return response.data;
  } catch (error) {
    // manejar errores del back en el front
    const message = error.response?.data?.messagge || 'Error desconocido';
    throw new Error(message);
  }
};
