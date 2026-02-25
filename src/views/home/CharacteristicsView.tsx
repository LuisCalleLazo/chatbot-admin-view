export const CharacteristicsView = () => {
  const characteristics = [
    {
      title: 'Chat Inteligente Multi-Plataforma',
      description: 'Conecta tus clientes en WhatsApp, Telegram y Facebook Messenger desde un único dashboard. Automatiza respuestas y mejora la experiencia del usuario.',
      icon: '💬',
    },
    {
      title: 'Pagos QR Automáticos',
      description: 'Integra pagos QR directo en el chat. Tus clientes pueden escanear y pagar sin salir de la conversación. Validación automática de transacciones en tiempo real.',
      icon: '📱',
    },
    {
      title: 'Validación Automática de Pagos',
      description: 'Los pagos se validan instantáneamente. Recibe notificaciones en tiempo real cuando se completa una transacción. Historial completo de todas las transacciones.',
      icon: '✅',
    },
    {
      title: 'Flujos de Conversación Personalizables',
      description: 'Crea flujos de conversación adaptados a tu negocio. Desde el plan profesional en adelante, personaliza cada interacción según tus necesidades.',
      icon: '🔄',
    },
    {
      title: 'Reportes y Análisis en Excel',
      description: 'Extrae datos detallados de conversaciones y transacciones. Exporta reportes en Excel para análisis profundo y toma de decisiones informadas.',
      icon: '📊',
    },
    {
      title: 'Soporte y Mantenimiento 24/7',
      description: 'Acceso prioritario a nuestro equipo de soporte. Actualizaciones constantes y mejoras continuas en tu chatbot.',
      icon: '🛡️',
    },
    {
      title: 'Seguridad de Datos',
      description: 'Encriptación end-to-end en todas las comunicaciones. Cumplimiento con estándares de seguridad internacionales. Tus datos y los de tus clientes están protegidos.',
      icon: '🔐',
    },
    {
      title: 'Escalabilidad Ilimitada',
      description: 'Crece sin límites. Maneja miles de conversaciones simultáneamente sin afectar el rendimiento. Infraestructura en la nube de última generación.',
      icon: '📈',
    },
  ];

  return (
    <section id="characteristics" className="py-16 md:py-24 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Características Principales
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Todas las herramientas que necesitas para automatizar y monetizar tu atención al cliente. Desde chatbots básicos hasta soluciones empresariales completas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {characteristics.map((char, index) => (
            <div
              key={index}
              className="p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300"
            >
              <div className="text-4xl mb-4">{char.icon}</div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">{char.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{char.description}</p>
            </div>
          ))}
        </div>

        {/* Sección destacada de Pagos QR */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-teal-50 rounded-2xl p-8 md:p-12 border-2 border-blue-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Sistema de Pagos QR Integrado
              </h3>
              <ul className="space-y-3">
                <li className="flex gap-3 items-start">
                  <span className="text-green-600 font-bold text-xl">✓</span>
                  <span className="text-gray-700">Generación automática de códigos QR</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="text-green-600 font-bold text-xl">✓</span>
                  <span className="text-gray-700">Validación instantánea de pagos</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="text-green-600 font-bold text-xl">✓</span>
                  <span className="text-gray-700">Confirmación automática en el chat</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="text-green-600 font-bold text-xl">✓</span>
                  <span className="text-gray-700">Historial completo de transacciones</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="text-green-600 font-bold text-xl">✓</span>
                  <span className="text-gray-700">Sin intermediarios, comisiones mínimas</span>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="w-full aspect-square bg-gradient-to-br from-blue-100 to-teal-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">📲</div>
                  <p className="text-gray-700 font-semibold">Código QR de Pago</p>
                  <p className="text-sm text-gray-500 mt-2">Generado automáticamente en el chat</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
