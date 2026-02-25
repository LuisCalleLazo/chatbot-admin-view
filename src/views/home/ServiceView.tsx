export const ServiceView = () => {
  const services = [
    {
      id: 1,
      title: 'WhatsApp Business Bot',
      description: 'Automatiza respuestas en WhatsApp Business. Gestiona consultas, pedidos y atención al cliente desde un único dashboard.',
      features: ['Respuestas instantáneas', 'Etiquetado de contactos', 'Plantillas personalizadas'],
      image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_chatbot-removebg-preview-TeG2K5KMKRbC2PCaHTzbelk6aJ8cK2.png',
      color: 'from-blue-100 to-blue-50',
    },
    {
      id: 2,
      title: 'Telegram Bot',
      description: 'Crea bots inteligentes para Telegram. Notificaciones automáticas, encuestas y interacciones personalizadas con tus usuarios.',
      features: ['Bots inteligentes', 'Notificaciones', 'Análisis en tiempo real'],
      image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_chatbot-removebg-preview-TeG2K5KMKRbC2PCaHTzbelk6aJ8cK2.png',
      color: 'from-teal-100 to-teal-50',
    },
    {
      id: 3,
      title: 'Facebook Messenger Bot',
      description: 'Conecta tu página de Facebook con bots automáticos. Aumenta el engagement y convierte visitas en clientes.',
      features: ['Automatización completa', 'Integración con catálogo', 'Reportes detallados'],
      image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_chatbot-removebg-preview-TeG2K5KMKRbC2PCaHTzbelk6aJ8cK2.png',
      color: 'from-orange-100 to-orange-50',
    },
  ];

  return (
    <div className="space-y-12 sm:space-y-16 lg:space-y-20">
      {/* Título de la sección */}
      <section className="container mx-auto px-4 pt-12 sm:pt-16 lg:pt-20">
        <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 text-center mb-4">
          Nuestros Servicios
        </h2>
        <p className="text-lg sm:text-xl text-slate-600 text-center max-w-2xl mx-auto">
          Soluciones completas de chatbot para cada plataforma de mensajería
        </p>
      </section>

      {/* Servicios */}
      <section id="services" className="container mx-auto px-4">
        <div className="space-y-8 sm:space-y-12">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-dense' : ''
              }`}
            >
              {/* Imagen */}
              <div
                className={`flex justify-center ${index % 2 === 1 ? 'lg:order-2' : ''}`}
              >
                <div
                  className={`relative w-full max-w-sm h-72 sm:h-80 ${service.color} rounded-2xl flex items-center justify-center overflow-hidden shadow-lg hover:shadow-xl transition-shadow`}
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    width={280}
                    height={280}
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Contenido */}
              <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-lg text-slate-600 mb-6">
                  {service.description}
                </p>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  <h4 className="font-semibold text-slate-900">Características principales:</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3 text-slate-600">
                        <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <button className="px-6 sm:px-8 py-3 from-blue-600 to-teal-600 text-white rounded-lg hover:shadow-lg transition-shadow font-semibold">
                  Conocer más
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sección de ventajas adicionales */}
      <section className="from-blue-50 to-teal-50 py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 text-center mb-12">
            Lo que incluye cada servicio
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              { icon: '📊', title: 'Dashboard intuitivo', desc: 'Gestiona todos tus bots desde un único panel' },
              { icon: '🔄', title: 'Integración fácil', desc: 'Conecta en minutos sin conocimientos técnicos' },
              { icon: '📈', title: 'Análisis detallados', desc: 'Reportes en tiempo real sobre rendimiento' },
              { icon: '🛠️', title: 'Personalización', desc: 'Adapta cada bot a tus necesidades específicas' },
              { icon: '👥', title: 'Soporte 24/7', desc: 'Equipo de expertos siempre disponible' },
              { icon: '🔐', title: 'Seguridad garantizada', desc: 'Encriptación y cumplimiento normativo' },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 sm:p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <h4 className="text-lg font-semibold text-slate-900 mb-2">{item.title}</h4>
                <p className="text-slate-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
