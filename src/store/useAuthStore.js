import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { jwtDecode } from 'jwt-decode';

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,

      setAuth: (token) => {
        try {
          const decoded = jwtDecode(token);
          set({ token, user: decoded });
        } catch {
          set({ token: null, user: null });
        }
      },

      clearAuth: () => set({ token: null, user: null }),

      isAuthenticated: () => {
        const { token } = useAuthStore.getState();
        if (!token) return false;
        try {
          const { exp } = jwtDecode(token);
          return exp * 1000 > Date.now();
        } catch {
          return false;
        }
      },
    }),
    {
      name: 'auth-storage', // key en localStorage
      partialize: (state) => ({ token: state.token, user: state.user }),
    }
  )
);

export default useAuthStore;
