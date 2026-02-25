import { useState } from 'react';

export const ContactView = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aquí irá la lógica de envío del formulario
    console.log('Formulario enviado:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', company: '', message: '' });

    // Resetear el mensaje después de 3 segundos
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="space-y-12 sm:space-y-16 lg:space-y-20">
      {/* Título de la sección */}
      <section className="container mx-auto px-4 pt-12 sm:pt-16 lg:pt-20">
        <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 text-center mb-4">
          Contáctanos
        </h2>
        <p className="text-lg sm:text-xl text-slate-600 text-center max-w-2xl mx-auto">
          ¿Tienes preguntas? Nos encantaría ayudarte. Envíanos un mensaje y nos pondremos en contacto.
        </p>
      </section>

      {/* Contenido principal */}
      <section id="contact" className="container mx-auto px-4 pb-12 sm:pb-16 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Columna izquierda - Información de contacto */}
          <div className="lg:col-span-1 space-y-6">
            {/* Teléfono */}
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📞</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Teléfono</h3>
              <p className="text-slate-600">+1 (555) 123-4567</p>
              <p className="text-sm text-slate-500 mt-2">Disponible de lunes a viernes, 9am - 6pm</p>
            </div>

            {/* Email */}
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">✉️</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Email</h3>
              <p className="text-slate-600">info@chatbotpro.com</p>
              <p className="text-sm text-slate-500 mt-2">Respuesta en menos de 24 horas</p>
            </div>

            {/* Ubicación */}
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📍</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Ubicación</h3>
              <p className="text-slate-600">San Francisco, California</p>
              <p className="text-sm text-slate-500 mt-2">Oficina principal</p>
            </div>
          </div>

          {/* Columna derecha - Formulario */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 sm:p-8 lg:p-10 rounded-xl shadow-md">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Envíanos un mensaje</h3>

              {submitted && (
                <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                  ✓ Gracias por tu mensaje. Nos pondremos en contacto pronto.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Nombre */}
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
                    placeholder="Tu nombre"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
                    placeholder="tu@email.com"
                  />
                </div>

                {/* Empresa */}
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Empresa (opcional)
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
                    placeholder="Tu empresa"
                  />
                </div>

                {/* Mensaje */}
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Mensaje
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all resize-none"
                    placeholder="Cuéntanos cómo podemos ayudarte..."
                  ></textarea>
                </div>

                {/* Botón enviar */}
                <button
                  type="submit"
                  className="w-full px-6 py-3 from-blue-600 to-teal-600 text-white rounded-lg hover:shadow-lg transition-shadow font-semibold mt-6"
                >
                  Enviar mensaje
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="from-blue-600 to-teal-600 text-white py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl sm:text-4xl font-bold mb-4">¿Listo para transformar tu atención al cliente?</h3>
          <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Únete a cientos de empresas que ya están automatizando su servicio con ChatBot Pro
          </p>
          <button className="px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-semibold inline-block">
            Comenzar prueba gratuita
          </button>
        </div>
      </section>
    </div>
  );
};
