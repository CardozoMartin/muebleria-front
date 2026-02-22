import { useMutation } from '@tanstack/react-query';
import { postLogin } from '../services/Auth/apiAuth';
import useAuthStore from '../store/useAuthStore';

export const useAuth = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  return useMutation({
    mutationFn: postLogin,

    onSuccess: (data) => {
      // Asumiendo que el backend retorna { token: '...' }
      setAuth(data.token);
    },

    onError: (error) => {
      clearAuth();
      console.error('Login fallido:', error.message);
    },
  });
};
