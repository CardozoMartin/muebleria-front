import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Swal from 'sweetalert2';
import '../css/dashboardLayout.css';
import useAuthStore from '../store/useAuthStore';
import Logo from './../assets/logo.png';

const navItems = [
  {
    to: '/products',
    label: 'Productos',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path
          d="M16 11V7a4 4 0 10-8 0v4"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3 11h18l-1.5 9a2 2 0 01-2 1.5H6.5A2 2 0 014 20L3 11z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    to: '/offers',
    label: 'Vista Previa Categorias',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path
          d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx="12"
          cy="12"
          r="3"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    to: '/plantillas',
    label: 'Modelos de Plantillas',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="8" height="8" stroke="currentColor" strokeWidth="1.6" rx="1" />
        <rect x="13" y="3" width="8" height="8" stroke="currentColor" strokeWidth="1.6" rx="1" />
        <rect x="3" y="13" width="8" height="8" stroke="currentColor" strokeWidth="1.6" rx="1" />
        <rect x="13" y="13" width="8" height="8" stroke="currentColor" strokeWidth="1.6" rx="1" />
      </svg>
    ),
  },
];

export default function DashboardLayout() {
  const { user, clearAuth } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: '¿Cerrar sesión?',
      text: '¿Estás seguro de que deseas cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        clearAuth();
        toast.success('Sesión cerrada exitosamente');
        navigate('/login');
      }
    });
  };

  console.log('Usuario autenticado:', user);
  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        {/* Logo */}
        <div className="sidebar-logo-section">
          <div className="sidebar-logo-wrapper">
            <div className="sidebar-logo-icon">
              <img src={Logo} alt="Logo" className="object-contain" />
            </div>
            <div className="sidebar-logo-text">
              <p>Muebles de Pino ML</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* User + Logout */}
        <div className="sidebar-user-section">
          <button onClick={handleLogout} className="logout-button">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <polyline
                points="16,17 21,12 16,7"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <line
                x1="21"
                y1="12"
                x2="9"
                y2="12"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="dashboard-main">
        {/* Top bar */}
        <header className="dashboard-header">
          <div className="dashboard-header-title">
            Bienvenido a <span className="dashboard-header-accent">Muebles de Pino ML</span>
          </div>
          <a
            href="/inicio"
            className="border border-red-700 text-red-700 hover:bg-red-50 hover:border-red-500 hover:text-red-500 text-[10px] font-bold uppercase tracking-widest px-[4rem] py-4 rounded-none transition-all duration-150 select-none"
          >
            ir a Pantalla principal
          </a>
        </header>

        {/* Page content */}
        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
