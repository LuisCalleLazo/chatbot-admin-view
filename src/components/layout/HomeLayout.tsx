
import type { ReactNode } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface HomeLayoutProps {
  children: ReactNode;
}

export const HomeLayout = ({ children }: HomeLayoutProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-teal-600 text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Logo y nombre */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleScroll('home')}>
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_chatbot-removebg-preview-TeG2K5KMKRbC2PCaHTzbelk6aJ8cK2.png"
                alt="ChatBot Logo"
                width={40}
                height={40}
                className="h-10 w-10"
              />
              <h1 className="text-2xl font-bold hidden sm:inline">ChatBot Business</h1>
              <h1 className="text-xl font-bold sm:hidden">ChatBot Business</h1>
            </div>

            {/* Navegación y botones - Desktop */}
            <nav className="hidden md:flex items-center gap-3 lg:gap-6">
              <button onClick={() => navigate("/home")} className="text-sm lg:text-base hover:text-blue-100 transition-colors">
                Inicio
              </button>
              <button onClick={() => navigate("/services")} className="text-sm lg:text-base hover:text-blue-100 transition-colors">
                Servicios
              </button>
              <button onClick={() => navigate("/contact")} className="text-sm lg:text-base hover:text-blue-100 transition-colors">
                Contacto
              </button>
              <button onClick={() => navigate("/characteristics")} className="text-sm lg:text-base hover:text-blue-100 transition-colors">
                Caracteristicas
              </button>
              <button onClick={() => navigate("/prices")} className="text-sm lg:text-base hover:text-blue-100 transition-colors">
                Precios
              </button>
              <button 
                className="px-3 lg:px-4 py-2 bg-white text-blue-600 rounded-md hover:bg-blue-50 transition-colors text-sm lg:text-base font-medium"
                onClick={() => navigate("/auth/login")}>
                Iniciar Sesión
              </button>
              <button 
                className="px-3 lg:px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors text-sm lg:text-base font-medium"
                onClick={() => navigate("/auth/register")}>
                Registrarse
              </button>
            </nav>

            {/* Botón hamburguesa - Mobile */}
            <button
              className="md:hidden p-2 hover:bg-blue-500 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Menú móvil */}
          {mobileMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 border-t border-blue-500 pt-4 space-y-3">
              <button onClick={() => navigate("/home")} className="block w-full text-left text-sm py-2 hover:text-blue-100 transition-colors">
                Inicio
              </button>
              <button onClick={() => navigate("/services")} className="block w-full text-left text-sm py-2 hover:text-blue-100 transition-colors">
                Servicios
              </button>
              <button onClick={() => navigate("/contact")} className="block w-full text-left text-sm py-2 hover:text-blue-100 transition-colors">
                Contacto
              </button>
              <button onClick={() => navigate("/characteristics")} className="block w-full text-left text-sm py-2 hover:text-blue-100 transition-colors">
                Caracteristicas
              </button>
              <button onClick={() => navigate("/prices")} className="block w-full text-left text-sm py-2 hover:text-blue-100 transition-colors">
                Precios
              </button>
              <div className="flex gap-2 pt-2">
                <button 
                  className="flex-1 px-3 py-2 bg-white text-blue-600 rounded-md hover:bg-blue-50 transition-colors text-sm font-medium"
                  onClick={() => navigate("/auth/login")}>
                  Iniciar Sesión
                </button>
                <button 
                  className="flex-1 px-3 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors text-sm font-medium"
                  onClick={() => navigate("/auth/register")}>
                  Registrarse
                </button>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-8">
            {/* Columna 1 */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_chatbot-removebg-preview-TeG2K5KMKRbC2PCaHTzbelk6aJ8cK2.png"
                  alt="ChatBot Logo"
                  width={32}
                  height={32}
                  className="h-8 w-8"
                />
                <h3 className="text-lg font-semibold">ChatBot Pro</h3>
              </div>
              <p className="text-slate-400 text-sm">
                Soluciones de chatbot inteligentes para tu negocio. Automatiza tu atención al cliente.
              </p>
            </div>

            {/* Columna 2 - Enlaces rápidos */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Enlaces rápidos</h3>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Inicio
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Servicios
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Características
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Precios
                  </a>
                </li>
              </ul>
            </div>

            {/* Columna 3 - Soporte */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Soporte</h3>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Centro de ayuda
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Documentación
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Estado del servicio
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contacto
                  </a>
                </li>
              </ul>
            </div>

            {/* Columna 4 - Contacto */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contacto</h3>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>Email: info@chatbotpro.com</li>
                <li>Teléfono: +1 (555) 123-4567</li>
                <li className="pt-2">Síguenos en redes sociales</li>
              </ul>
            </div>
          </div>

          {/* Separador */}
          <div className="border-t border-slate-700 pt-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-slate-400 text-sm">
                © {new Date().getFullYear()} ChatBot Pro. Todos los derechos reservados.
              </p>
              <div className="flex gap-4 text-sm">
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  Privacidad
                </a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  Términos
                </a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  Cookies
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
