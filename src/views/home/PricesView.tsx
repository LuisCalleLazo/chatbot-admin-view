export const PricesView = () => {
  const plans = [
    {
      name: 'Básico',
      price: 100,
      currency: 'Bs',
      period: 'mes',
      description: 'Perfecto para empezar con automatización',
      highlighted: false,
      features: [
        {
          name: 'Chat fluido por defecto',
          included: true,
        },
        {
          name: 'Multi-plataforma (WhatsApp, Telegram, Facebook)',
          included: true,
        },
        {
          name: 'Respuestas automáticas',
          included: true,
        },
        {
          name: 'Integración básica',
          included: true,
        },
        {
          name: 'Modificar flujos de conversación',
          included: false,
        },
        {
          name: 'Reportes en Excel',
          included: false,
        },
        {
          name: 'Pagos QR integrados',
          included: false,
        },
      ],
      cta: 'Comenzar Ahora',
    },
    {
      name: 'Profesional',
      price: 300,
      currency: 'Bs',
      period: 'mes',
      description: 'Para negocios en crecimiento',
      highlighted: true,
      features: [
        {
          name: 'Todo del plan Básico',
          included: true,
        },
        {
          name: 'Modificar flujos de conversación',
          included: true,
        },
        {
          name: 'Reportes detallados en Excel',
          included: true,
        },
        {
          name: 'Análisis de conversaciones',
          included: true,
        },
        {
          name: 'Soporte prioritario',
          included: true,
        },
        {
          name: 'Pagos QR integrados',
          included: false,
        },
        {
          name: 'API avanzada',
          included: false,
        },
      ],
      cta: 'Probar Ahora',
    },
    {
      name: 'Empresarial',
      price: 600,
      currency: 'Bs',
      period: 'mes',
      description: 'Solución completa para grandes operaciones',
      highlighted: false,
      features: [
        {
          name: 'Todo del plan Profesional',
          included: true,
        },
        {
          name: 'Pagos QR automáticos',
          included: true,
        },
        {
          name: 'Validación automática de pagos',
          included: true,
        },
        {
          name: 'Historial de transacciones',
          included: true,
        },
        {
          name: 'API avanzada',
          included: true,
        },
        {
          name: 'Soporte dedicado 24/7',
          included: true,
        },
        {
          name: 'Integraciones personalizadas',
          included: true,
        },
      ],
      cta: 'Contactar Ventas',
    },
  ];

  return (
    <section id="prices" className="py-16 md:py-24 px-4 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Planes de Precios
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Elige el plan que mejor se adapte a tu negocio. Todos incluyen soporte y actualizaciones.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-6">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${
                plan.highlighted
                  ? 'md:scale-105 bg-gradient-to-br from-blue-600 to-teal-600 text-white shadow-2xl'
                  : 'bg-white border border-gray-200 hover:border-blue-300 hover:shadow-lg text-gray-900'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute top-4 left-4 right-4">
                  <span className="inline-block bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                    MÁS POPULAR
                  </span>
                </div>
              )}

              <div className={`p-8 ${plan.highlighted ? '' : ''}`}>
                {/* Nombre del plan */}
                <h3 className={`text-2xl font-bold mb-2 ${plan.highlighted ? 'text-white' : 'text-gray-900'}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm mb-6 ${plan.highlighted ? 'text-blue-100' : 'text-gray-600'}`}>
                  {plan.description}
                </p>

                {/* Precio */}
                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-bold">{plan.price}</span>
                    <span className={`text-xl ${plan.highlighted ? 'text-blue-100' : 'text-gray-600'}`}>
                      {plan.currency}
                    </span>
                  </div>
                  <p className={`text-sm mt-2 ${plan.highlighted ? 'text-blue-100' : 'text-gray-500'}`}>
                    Facturación mensual
                  </p>
                </div>

                {/* Botón CTA */}
                <button
                  className={`w-full py-3 px-4 rounded-lg font-bold mb-8 transition-all duration-300 ${
                    plan.highlighted
                      ? 'bg-white text-blue-600 hover:bg-blue-50'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {plan.cta}
                </button>

                {/* Features */}
                <div className={`border-t ${plan.highlighted ? 'border-blue-400' : 'border-gray-200'} pt-8`}>
                  <ul className="space-y-4">
                    {plan.features.map((feature, fIndex) => (
                      <li
                        key={fIndex}
                        className={`flex items-start gap-3 text-sm ${
                          feature.included
                            ? plan.highlighted
                              ? 'text-white'
                              : 'text-gray-900'
                            : plan.highlighted
                            ? 'text-blue-200'
                            : 'text-gray-400'
                        }`}
                      >
                        <span className="flex-shrink-0 text-lg">
                          {feature.included ? '✓' : '✗'}
                        </span>
                        <span className={feature.included ? 'font-medium' : 'line-through'}>
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sección de información adicional */}
        <div className="mt-16 bg-white rounded-2xl p-8 md:p-12 border border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Preguntas Frecuentes sobre Planes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold text-gray-900 mb-3 flex items-start gap-2">
                <span className="text-blue-600 text-xl">?</span>
                ¿Puedo cambiar de plan en cualquier momento?
              </h4>
              <p className="text-gray-600 text-sm">
                Sí, puedes actualizar o degradar tu plan en cualquier momento. Se prorrateará según tu uso.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-3 flex items-start gap-2">
                <span className="text-blue-600 text-xl">?</span>
                ¿Hay prueba gratuita disponible?
              </h4>
              <p className="text-gray-600 text-sm">
                Sí, ofrecemos 14 días de prueba gratuita con acceso completo al plan Básico.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-3 flex items-start gap-2">
                <span className="text-blue-600 text-xl">?</span>
                ¿Qué pasa si necesito más usuarios?
              </h4>
              <p className="text-gray-600 text-sm">
                Los planes soportan usuarios ilimitados. Solo paga por el plan que necesites.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-3 flex items-start gap-2">
                <span className="text-blue-600 text-xl">?</span>
                ¿Incluye soporte técnico?
              </h4>
              <p className="text-gray-600 text-sm">
                Todos los planes incluyen soporte por email. El plan Empresarial incluye soporte 24/7 dedicado.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
