import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import '../../css/login.css';


const LoginForm = () => {
  //estados para manejar la visibilidad de la contraseña y el estado de carga del formulario
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigate();

  //hook para enviar la solicitud de login al back end
  const { mutate: login, isPending, error } = useAuth();

  // Configuración de react-hook-form para manejar el formulario y sus validaciones
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Función que se ejecuta al enviar el formulario
  const onSubmit = async (data) => {

    login(data, {
      onSuccess: () => {
        //mensaje de exito
        toast.success('¡Bienvenido de nuevo! Redirigiendo al panel de control...');
        // si el login fue exitoso, redirigir
        setTimeout(() => {
          navigation('/dashboard');
        }, 3000);
      },
      onError: () => {

       reset(); // Limpia el formulario en caso de error

        // Aquí puedes mostrar un mensaje de error al usuario
      },
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="login-form">
      {/* Email */}
      <div className="form-group">
        <label className="form-label">Correo electrónico</label>
        <div className={`input-wrapper ${errors.email ? 'error' : ''}`}>
          <svg className="input-icon" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="m22 6-10 7L2 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <input
            type="email"
            placeholder="tu@email.com"
            className="form-input"
            {...register('email', {
              required: 'El email es requerido',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Email inválido',
              },
            })}
          />
        </div>
        {errors.email && <span className="form-error">{errors.email.message}</span>}
      </div>

      {/* Contraseña */}
      <div className="form-group">
        <div className="form-group-header">
          <label className="form-label">Contraseña</label>
          <a href="#" className="forgot-password-link">
            ¿Olvidaste tu contraseña?
          </a>
        </div>
        <div className={`input-wrapper ${errors.password ? 'error' : ''}`}>
          <svg className="input-icon" viewBox="0 0 24 24" fill="none">
            <rect
              x="3"
              y="11"
              width="18"
              height="11"
              rx="2"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M7 11V7a5 5 0 0 1 10 0v4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <circle cx="12" cy="16" r="1.5" fill="currentColor" />
          </svg>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            className="form-input"
            {...register('password', {
              required: 'La contraseña es requerida',
              minLength: {
                value: 6,
                message: 'Mínimo 6 caracteres',
              },
            })}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="toggle-password"
          >
            {showPassword ? (
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <line
                  x1="1"
                  y1="1"
                  x2="23"
                  y2="23"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            )}
          </button>
        </div>
        {errors.password && (
          <span className="form-error">{errors.password.message}</span>
        )}
      </div>

      {/* Mensaje de error general */}
      {error && (
        <div className="form-error-general">{error.message}</div>
      )}

      {/* Separador */}
      <div className="form-divider" />

      {/* Botón submit */}
      <button
        type="submit"
        disabled={isPending}
        className="submit-button"
      >
        {isPending ? (
          <>
            <svg className="spinner" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="white" strokeOpacity="0.3" strokeWidth="2" />
              <path
                d="M12 2a10 10 0 0 1 10 10"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            Ingresando...
          </>
        ) : (
          <>
            Ingresar
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M5 12h14M12 5l7 7-7 7"
                stroke="white"
                strokeOpacity="0.8"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </>
        )}
      </button>
    </form>
  );
};

export default LoginForm;
