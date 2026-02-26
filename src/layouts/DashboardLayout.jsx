import { Outlet, NavLink, useNavigate } from "react-router-dom";
import Logo from "./../assets/logo.png"
import useAuthStore from "../store/useAuthStore";
import { toast } from "sonner";

const navItems = [
  {
    to: "/products",
    label: "Productos",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M16 11V7a4 4 0 10-8 0v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 11h18l-1.5 9a2 2 0 01-2 1.5H6.5A2 2 0 014 20L3 11z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    to: "/offers",
    label: "Vista Previa Categorias",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    to: "/plantillas",
    label: "Modelos de Plantillas",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="8" height="8" stroke="currentColor" strokeWidth="1.6" rx="1"/>
        <rect x="13" y="3" width="8" height="8" stroke="currentColor" strokeWidth="1.6" rx="1"/>
        <rect x="3" y="13" width="8" height="8" stroke="currentColor" strokeWidth="1.6" rx="1"/>
        <rect x="13" y="13" width="8" height="8" stroke="currentColor" strokeWidth="1.6" rx="1"/>
      </svg>
    ),
  },
];

export default function DashboardLayout() {
  const { user, clearAuth } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuth();
    toast.success('Sesión cerrada');
    navigate('/login');
  };

  console.log("Usuario autenticado:", user)
  return (
    <div className="flex h-screen bg-[#f5f5f3] font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-56 flex-shrink-0 flex flex-col bg-white border-r border-gray-200/80 shadow-sm">
        {/* Logo */}
        <div className="px-5 py-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14  rounded-lg flex items-center justify-center shadow-sm">
              <img src={Logo} alt="Logo" className="object-contain"/>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900 leading-none">Mueblesdepinoml</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-500 hover:bg-gray-100 hover:text-gray-800'
                }`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* User + Logout */}
        <div className="px-3 py-4 border-t border-gray-100 space-y-1">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg">


          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-all duration-150">
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
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="h-14 bg-white border-b border-gray-200/80 flex items-center justify-between px-6 flex-shrink-0 shadow-sm">

          <div className="flex text-center gap-3">
            <h3 className="text-sm font-medium text-gray-700">Bienvenido a Mueblerias de Pino ML</h3>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
