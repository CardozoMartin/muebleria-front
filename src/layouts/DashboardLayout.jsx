import { Outlet, NavLink } from "react-router-dom";
import Logo from "./../assets/logo.png"

const navItems = [
  {
    to: "/dashboard",
    label: "Panel de Control",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6"/>
        <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6"/>
        <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6"/>
        <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6"/>
      </svg>
    ),
  },
  {
    to: "/products",
    label: "Productos",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M20 7H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1Z" stroke="currentColor" strokeWidth="1.6"/>
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M12 12v4M10 14h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    to: "/offers",
    label: "Ofertas",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="m12.586 2.586-9 9a2 2 0 0 0 0 2.828l6 6a2 2 0 0 0 2.828 0l9-9A2 2 0 0 0 21 10V5a3 3 0 0 0-3-3h-5a2 2 0 0 0-1.414.586Z" stroke="currentColor" strokeWidth="1.6"/>
        <circle cx="16.5" cy="7.5" r="1" fill="currentColor"/>
      </svg>
    ),
  },
  {
    to: "/settings",
    label: "Configuraciones",
    icon: (
      <svg width="18" height="18" viewBox="0 0 20 18" fill="none">
        <path d="M10 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M1.664 9.733V8.267c0-.867.708-1.584 1.583-1.584 1.509 0 2.125-1.066 1.367-2.375a1.583 1.583 0 0 1 .583-2.158l1.442-.825c.658-.392 1.508-.158 1.9.5l.092.158c.75 1.309 1.983 1.309 2.741 0l.092-.158c.392-.658 1.242-.892 1.9-.5l1.442.825a1.583 1.583 0 0 1 .583 2.158c-.758 1.309-.142 2.375 1.367 2.375.866 0 1.583.709 1.583 1.584v1.466c0 .867-.708 1.583-1.583 1.583-1.509 0-2.125 1.067-1.367 2.375a1.58 1.58 0 0 1-.583 2.159l-1.442.825c-.658.392-1.508.158-1.9-.5l-.092-.159c-.75-1.308-1.983-1.308-2.741 0l-.092.159c-.392.658-1.242.892-1.9.5l-1.442-.825a1.583 1.583 0 0 1-.583-2.158c.758-1.309.142-2.376-1.367-2.376a1.59 1.59 0 0 1-1.583-1.583" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

export default function DashboardLayout() {
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
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-all duration-150">
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
          <div className="relative w-80">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.8" />
              <path
                d="m21 21-4.35-4.35"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
            <input
              type="text"
              placeholder="Search products, orders, or offers..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 placeholder-gray-400 transition"
            />
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13.73 21a2 2 0 01-3.46 0"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
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
