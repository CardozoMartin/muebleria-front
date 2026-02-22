import LoginForm from "../components/LoginForm/LoginForm";


export default function LoginPage() {


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6 font-medium text-sm">
      <div className="flex w-full max-w-3xl min-h-[520px] bg-white border border-gray-500/30 rounded-xl overflow-hidden shadow-sm">
        {/* ── Panel izquierdo: imagen ── */}
        <div className="relative flex-1 bg-gray-800 hidden md:flex flex-col justify-end p-10 overflow-hidden">
          {/* Podés reemplazar el div de abajo por: <img src="tu-imagen.jpg" className="absolute inset-0 w-full h-full object-cover" /> */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700" />

          {/* Círculos decorativos */}
          <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full border border-white/5 bg-white/[0.02]" />
          <div className="absolute top-24 -right-10 w-40 h-40 rounded-full border border-white/5 bg-white/[0.02]" />
          <div className="absolute bottom-32 right-8 w-20 h-20 rounded-full bg-white/[0.03]" />

          {/* Logo */}
          <div className="absolute top-8 left-10 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 3L20 7.5V16.5L12 21L4 16.5V7.5L12 3Z"
                  stroke="white"
                  strokeOpacity="0.9"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="text-white/80 text-sm font-semibold tracking-wide">MyApp</span>
          </div>

          {/* Texto inferior */}
          <div className="relative z-10">
            <p className="text-white/80 text-lg font-semibold leading-snug mb-2">
              Bienvenido de vuelta
            </p>
            <p className="text-white/40 text-xs leading-relaxed">
              Ingresa tus credenciales para acceder
              <br /> a tu panel de control.
            </p>
          </div>
        </div>

        {/* ── Panel derecho: formulario ── */}
        <div className="flex-1 flex flex-col justify-center px-10 py-12">
          <div className="mb-7">
            <h1 className="text-gray-800/90 text-lg font-semibold mb-1">Iniciar sesión</h1>
            <p className="text-gray-500/80 text-xs">
              Ingresa tu email y contraseña para continuar.
            </p>
          </div>
          <LoginForm />


          <p className="text-gray-400/70 text-xs text-center mt-6">
            ¿No tienes cuenta?{' '}
            <a href="#" className="text-gray-700/80 hover:text-gray-900 transition font-semibold">
              Regístrate
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
