import LoginForm from "../components/LoginForm/LoginForm";
import "../css/login.css";
import logoImg from "../assets/logo.png";

export default function LoginPage() {
  return (
    <div className="login-container">
      <div className="login-card">
        {/* Panel Izquierdo - Decoración */}
        <div className="login-left-panel">
          {/* Círculos decorativos */}
          <div className="decorative-circle decorative-circle-1"></div>
          <div className="decorative-circle decorative-circle-2"></div>
          <div className="decorative-circle decorative-circle-3"></div>

          {/* Contenido de texto */}
          <div className="left-panel-content">
            <div className="logo-circle">
              <img src={logoImg} alt="Mueblería Logo" />
            </div>
            <h2>Bienvenido de vuelta</h2>
            <p>Ingresa tus credenciales para acceder a tu panel de control.</p>
          </div>
        </div>

        {/* Panel Derecho - Formulario */}
        <div className="login-right-panel">
          {/* Logo en móvil */}
          <div className="mobile-logo">
            <div className="mobile-logo-circle">
              <img src={logoImg} alt="Mueblería Logo" />
            </div>
            <span className="mobile-logo-text">Mueblería</span>
          </div>

          {/* Header */}
          <div className="login-header">
            <h1>Iniciar sesión</h1>
            <p>Ingresa tu email y contraseña para continuar.</p>
          </div>

          {/* Formulario */}
          <LoginForm />

          {/* Footer */}
          <p className="login-footer">
            ¿No tienes cuenta?{" "}
            <a href="#">Regístrate</a>
          </p>
        </div>
      </div>
    </div>
  );
}
