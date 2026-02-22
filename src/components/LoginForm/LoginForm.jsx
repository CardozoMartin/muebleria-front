import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';


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
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <label className="text-gray-800/70 text-xs">Correo electrónico</label>
        <div
          className={`flex items-center gap-2 border rounded-md px-3 py-2 transition bg-white ${errors.email ? 'border-red-400/60 bg-red-50/40' : 'border-gray-500/30 hover:border-gray-400/50 focus-within:border-gray-500/60'}`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
              stroke="#1F2937"
              strokeOpacity="0.5"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="m22 6-10 7L2 6"
              stroke="#1F2937"
              strokeOpacity="0.5"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <input
            type="email"
            placeholder="tu@email.com"
            className="flex-1 outline-none text-gray-800/80 text-sm placeholder:text-gray-400/60 bg-transparent"
            {...register('email', {
              required: 'El email es requerido',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Email inválido',
              },
            })}
          />
        </div>
        {errors.email && <span className="text-red-500/80 text-xs">{errors.email.message}</span>}
      </div>

      {/* Contraseña */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <label className="text-gray-800/70 text-xs">Contraseña</label>
          <a href="#" className="text-gray-500/70 text-xs hover:text-gray-700/80 transition">
            ¿Olvidaste tu contraseña?
          </a>
        </div>
        <div
          className={`flex items-center gap-2 border rounded-md px-3 py-2 transition bg-white ${errors.password ? 'border-red-400/60 bg-red-50/40' : 'border-gray-500/30 hover:border-gray-400/50 focus-within:border-gray-500/60'}`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <rect
              x="3"
              y="11"
              width="18"
              height="11"
              rx="2"
              stroke="#1F2937"
              strokeOpacity="0.5"
              strokeWidth="1.5"
            />
            <path
              d="M7 11V7a5 5 0 0 1 10 0v4"
              stroke="#1F2937"
              strokeOpacity="0.5"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <circle cx="12" cy="16" r="1.5" fill="#1F2937" fillOpacity="0.5" />
          </svg>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            className="flex-1 outline-none text-gray-800/80 text-sm placeholder:text-gray-400/60 bg-transparent"
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
            className="text-gray-400/60 hover:text-gray-600/80 transition cursor-pointer"
          >
            {showPassword ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
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
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
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
          <span className="text-red-500/80 text-xs">{errors.password.message}</span>
        )}
      </div>


      {/* Mensaje de error general */}
      {error && (
        <span className="text-red-500/80 text-xs">{error.message}</span>
      )}
      {/* Separador */}
      <div className="w-full h-px bg-gray-300/50 my-1" />

      {/* Botón submit */}
      <button
        type="submit"
        disabled={isPending}
        className="flex items-center justify-center gap-2 bg-gray-800/90 hover:bg-gray-900 text-white/90 text-sm font-medium px-4 py-2.5 rounded-md transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isPending ? (
          <>
            <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
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
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
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
