import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Products from './pages/ProductPage';
import Offers from './pages/Offers';
import Reproductor from './pages/Reproductor';
import { Plantillas } from './pages/PlantillasPage';
import LoginPage from './pages/LoginPage';
import useAuthStore from './store/useAuthStore';


export default function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated());

  return (
    <HashRouter>
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
    </HashRouter>
  );
}
