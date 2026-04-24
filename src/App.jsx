import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import useAuthStore from './store/useAuthStore';
import { Loader2 } from 'lucide-react';

// Lazy loaded components for better performance
const DashboardLayout = lazy(() => import('./layouts/DashboardLayout'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Products = lazy(() => import('./pages/ProductPage'));
const Offers = lazy(() => import('./pages/Offers'));
const Reproductor = lazy(() => import('./pages/Reproductor'));
const Plantillas = lazy(() => import('./pages/PlantillasPage').then(module => ({ default: module.Plantillas })));
const LoginPage = lazy(() => import('./pages/LoginPage'));

// Sleek loading fallback for Chromecast optimization
const LoadingFallback = () => (
  <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center gap-4">
    <div className="relative">
      <div className="w-16 h-16 border-4 border-red-100 border-t-red-600 rounded-full animate-spin" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[10px] font-bold text-red-600 uppercase tracking-tighter">MK</span>
      </div>
    </div>
    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest animate-pulse">Cargando...</p>
  </div>
);


export default function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated());

  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />}
          />

          {/* Ruta pública para reproducción sin login */}
          <Route path="/inicio" element={<Reproductor />} />
          <Route path="/inicio/:category" element={<Reproductor />} />

          <Route
            path="/"
            element={isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" replace />}
          >
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="offers" element={<Offers />} />
            <Route path="plantillas" element={<Plantillas />} />
          </Route>

          <Route
            path="*"
            element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} replace />}
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
