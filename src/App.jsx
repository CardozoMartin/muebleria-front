import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Products from './pages/ProductPage';
import Offers from './pages/Offers';
import Analytics from './pages/Analytics';
import { Plantillas } from './pages/PlantillasPage';
import LoginPage from './pages/LoginPage';


export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route>
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="offers" element={<Offers />} />
          <Route path="plantillas" element={<Plantillas />} />

        </Route>
      </Routes>
    </HashRouter>
  );
}
