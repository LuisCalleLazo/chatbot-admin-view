import { useState } from 'react';

export const RegisterView = () => {
  const [formData, setFormData] = useState({
    businessName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.businessName) {
      newErrors.businessName = 'El nombre del negocio es requerido';
    } else if (formData.businessName.length < 3) {
      newErrors.businessName = 'El nombre debe tener al menos 3 caracteres';
    }

    if (!formData.email) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Por favor ingresa un email válido';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = 'La contraseña debe contener al menos una mayúscula';
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password = 'La contraseña debe contener al menos un número';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    if (!acceptTerms) {
      newErrors.terms = 'Debes aceptar los términos y condiciones';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setSuccessMessage('');

    try {
      // Aquí irá la lógica de registro
      console.log('Register attempt with:', {
        ...formData,
        confirmPassword: undefined,
      });

      // Simulamos un delay de servidor
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSuccessMessage('Registro exitoso! Te enviaremos un email de confirmación...');
      setFormData({
        businessName: '',
        email: '',
        password: '',
        confirmPassword: '',
      });

      // Aquí irá la redirección después del registro
      setTimeout(() => {
        // window.location.href = '/dashboard';
      }, 2500);
    } catch (error) {
      console.error('Register error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          {/* Header con gradiente */}
          <div className="bg-gradient-to-r from-teal-600 to-blue-600 px-6 py-8 text-center">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_chatbot-removebg-preview-TeG2K5KMKRbC2PCaHTzbelk6aJ8cK2.png"
              alt="ChatBot Logo"
              width={50}
              height={50}
              className="h-12 w-12 mx-auto mb-4"
            />
            <h1 className="text-2xl font-bold text-white">ChatBot Business</h1>
            <p className="text-teal-100 text-sm mt-2">Crea tu cuenta ahora</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-6 py-8 space-y-5">
            {successMessage && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
                {successMessage}
              </div>
            )}

            {/* Business Name */}
            <div className="space-y-2">
              <label htmlFor="businessName" className="block text-sm font-medium text-gray-700">
                Nombre del Negocio
              </label>
              <input
                type="text"
                id="businessName"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                placeholder="Mi Negocio"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors ${
                  errors.businessName ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.businessName && (
                <p className="text-red-500 text-xs font-medium">{errors.businessName}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="tu@email.com"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs font-medium">{errors.email}</p>
              )}
            </div>

            {/* Contraseña */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.password && (
                <p className="text-red-500 text-xs font-medium">{errors.password}</p>
              )}
              <p className="text-gray-500 text-xs">
                Mínimo 8 caracteres, 1 mayúscula y 1 número
              </p>
            </div>

            {/* Confirmar Contraseña */}
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirmar Contraseña
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors ${
                  errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs font-medium">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Términos y condiciones */}
            <div className="space-y-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => {
                    setAcceptTerms(e.target.checked);
                    if (errors.terms) {
                      setErrors((prev) => ({
                        ...prev,
                        terms: '',
                      }));
                    }
                  }}
                  className="w-4 h-4 rounded border-gray-300 text-teal-600 mt-1"
                />
                <span className="text-gray-600 text-sm">
                  Acepto los{' '}
                  <a href="#" className="text-teal-600 hover:underline font-medium">
                    términos de servicio
                  </a>{' '}
                  y la{' '}
                  <a href="#" className="text-teal-600 hover:underline font-medium">
                    política de privacidad
                  </a>
                </span>
              </label>
              {errors.terms && (
                <p className="text-red-500 text-xs font-medium">{errors.terms}</p>
              )}
            </div>

            {/* Botón Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-teal-600 to-blue-600 text-white font-medium py-2 rounded-lg hover:from-teal-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Creando cuenta...</span>
                </>
              ) : (
                'Crear Cuenta'
              )}
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">O</span>
              </div>
            </div>

            {/* Link a login */}
            <p className="text-center text-gray-600 text-sm">
              ¿Ya tienes cuenta?{' '}
              <a href="login" className="text-teal-600 hover:text-teal-700 font-medium">
                Inicia sesión aquí
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
