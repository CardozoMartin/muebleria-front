import axios from 'axios';
import useAuthStore from '../store/useAuthStore';
import { toast } from 'sonner';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4500/api',
});

let isRedirecting = false;

// Interceptor para agregar el token JWT en cada request
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores 401 (token inválido/expirado)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && !isRedirecting) {
      isRedirecting = true;
      // Limpiar la sesión si el token es inválido
      useAuthStore.getState().clearAuth();
      // Mostrar notificación
      toast.error('Tu sesión ha expirado. Por favor inicia sesión nuevamente.');
      // Redirigir al login
      setTimeout(() => {
        window.location.hash = '#/login';
        isRedirecting = false;
      }, 500);
    }
    return Promise.reject(error);
  }
);
