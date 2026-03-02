export const PricesView = () => {
  const plans = [
    {
      name: 'Básico',
      price: 100,
      currency: 'Bs',
      description: 'Perfecto para empezar con automatización',
      highlighted: false,
      accent: '#38bdf8',
      features: [
        { name: 'Chat fluido por defecto', included: true },
        { name: 'Multi-plataforma (WhatsApp, Telegram, Facebook)', included: true },
        { name: 'Respuestas automáticas', included: true },
        { name: 'Integración básica', included: true },
        { name: 'Modificar flujos de conversación', included: false },
        { name: 'Reportes en Excel', included: false },
        { name: 'Pagos QR integrados', included: false },
      ],
      cta: 'Comenzar Ahora',
    },
    {
      name: 'Profesional',
      price: 300,
      currency: 'Bs',
      description: 'Para negocios en crecimiento',
      highlighted: true,
      accent: '#fff',
      features: [
        { name: 'Todo del plan Básico', included: true },
        { name: 'Modificar flujos de conversación', included: true },
        { name: 'Reportes detallados en Excel', included: true },
        { name: 'Análisis de conversaciones', included: true },
        { name: 'Soporte prioritario', included: true },
        { name: 'Pagos QR integrados', included: false },
        { name: 'API avanzada', included: false },
      ],
      cta: 'Probar Ahora',
    },
    {
      name: 'Empresarial',
      price: 600,
      currency: 'Bs',
      description: 'Solución completa para grandes operaciones',
      highlighted: false,
      accent: '#38bdf8',
      features: [
        { name: 'Todo del plan Profesional', included: true },
        { name: 'Pagos QR automáticos', included: true },
        { name: 'Validación automática de pagos', included: true },
        { name: 'Historial de transacciones', included: true },
        { name: 'API avanzada', included: true },
        { name: 'Soporte dedicado 24/7', included: true },
        { name: 'Integraciones personalizadas', included: true },
      ],
      cta: 'Contactar Ventas',
    },
  ];

  const faqs = [
    { q: '¿Puedo cambiar de plan en cualquier momento?', a: 'Sí, puedes actualizar o degradar tu plan en cualquier momento. Se prorrateará según tu uso.' },
    { q: '¿Hay prueba gratuita disponible?', a: 'Sí, ofrecemos 14 días de prueba gratuita con acceso completo al plan Básico.' },
    { q: '¿Qué pasa si necesito más usuarios?', a: 'Los planes soportan usuarios ilimitados. Solo paga por el plan que necesites.' },
    { q: '¿Incluye soporte técnico?', a: 'Todos los planes incluyen soporte por email. El plan Empresarial incluye soporte 24/7 dedicado.' },
  ];

  return (
    <div style={{ background: '#0f172a', minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
        .plan-card { transition: transform 0.3s, box-shadow 0.3s; }
        .plan-card:hover { transform: translateY(-6px); }
      `}</style>

      <section id="prices" style={{ padding: '100px 0' }}>
        <div className="container mx-auto px-6 lg:px-16" style={{ maxWidth: '1200px' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '72px' }}>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: '#38bdf8',
                fontWeight: 600,
                fontSize: '13px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '14px',
              }}
            >
              Precios transparentes
            </p>
            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                fontWeight: 800,
                color: '#f8fafc',
                letterSpacing: '-0.02em',
                marginBottom: '20px',
              }}
            >
              Planes de Precios
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '1.05rem',
                color: '#64748b',
                maxWidth: '500px',
                margin: '0 auto',
                lineHeight: 1.75,
              }}
            >
              Elige el plan que mejor se adapte a tu negocio. Todos incluyen soporte y actualizaciones.
            </p>
          </div>

          {/* Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: '24px', alignItems: 'start', marginBottom: '80px' }}>
            {plans.map((plan, index) => (
              <div
                key={index}
                className="plan-card"
                style={{
                  borderRadius: '24px',
                  overflow: 'hidden',
                  position: 'relative',
                  ...(plan.highlighted
                    ? {
                        background: 'linear-gradient(135deg, #0ea5e9 0%, #0d9488 100%)',
                        boxShadow: '0 30px 80px rgba(14,165,233,0.4)',
                        transform: 'scale(1.03)',
                      }
                    : {
                        background: 'rgba(30,41,59,0.6)',
                        border: '1px solid rgba(255,255,255,0.08)',
                      }),
                }}
              >
                {plan.highlighted && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '20px',
                      right: '20px',
                      background: '#f97316',
                      color: '#fff',
                      padding: '4px 12px',
                      borderRadius: '100px',
                      fontSize: '11px',
                      fontWeight: 800,
                      fontFamily: "'DM Sans', sans-serif",
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                    }}
                  >
                    ✦ Popular
                  </div>
                )}

                <div style={{ padding: '36px 32px' }}>
                  {/* Plan header */}
                  <h3
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontSize: '1.4rem',
                      fontWeight: 800,
                      color: plan.highlighted ? '#fff' : '#f1f5f9',
                      marginBottom: '6px',
                    }}
                  >
                    {plan.name}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '13.5px',
                      color: plan.highlighted ? 'rgba(255,255,255,0.7)' : '#64748b',
                      marginBottom: '28px',
                    }}
                  >
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div style={{ marginBottom: '28px' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px' }}>
                      <span
                        style={{
                          fontFamily: "'Syne', sans-serif",
                          fontSize: '3.2rem',
                          fontWeight: 800,
                          color: plan.highlighted ? '#fff' : '#f1f5f9',
                          lineHeight: 1,
                        }}
                      >
                        {plan.price}
                      </span>
                      <span
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: '1.1rem',
                          fontWeight: 600,
                          color: plan.highlighted ? 'rgba(255,255,255,0.7)' : '#64748b',
                          marginBottom: '6px',
                        }}
                      >
                        {plan.currency}/mes
                      </span>
                    </div>
                  </div>

                  {/* CTA */}
                  <button
                    style={{
                      width: '100%',
                      padding: '13px 20px',
                      borderRadius: '12px',
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 700,
                      fontSize: '15px',
                      cursor: 'pointer',
                      border: 'none',
                      marginBottom: '32px',
                      transition: 'opacity 0.2s, transform 0.15s',
                      ...(plan.highlighted
                        ? {
                            background: '#fff',
                            color: '#0ea5e9',
                            boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                          }
                        : {
                            background: 'rgba(14,165,233,0.15)',
                            color: '#38bdf8',
                            border: '1.5px solid rgba(56,189,248,0.3)',
                          }),
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLButtonElement).style.opacity = '0.9';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLButtonElement).style.opacity = '1';
                    }}
                  >
                    {plan.cta}
                  </button>

                  {/* Divider */}
                  <div
                    style={{
                      height: '1px',
                      background: plan.highlighted ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.07)',
                      marginBottom: '24px',
                    }}
                  />

                  {/* Features */}
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {plan.features.map((feature, fi) => (
                      <li
                        key={fi}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '10px',
                          marginBottom: '12px',
                          opacity: feature.included ? 1 : 0.4,
                        }}
                      >
                        <div
                          style={{
                            width: '18px',
                            height: '18px',
                            borderRadius: '50%',
                            background: feature.included
                              ? (plan.highlighted ? 'rgba(255,255,255,0.25)' : 'rgba(56,189,248,0.15)')
                              : 'rgba(255,255,255,0.05)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '10px',
                            color: feature.included ? (plan.highlighted ? '#fff' : '#38bdf8') : '#475569',
                            flexShrink: 0,
                            marginTop: '1px',
                          }}
                        >
                          {feature.included ? '✓' : '✗'}
                        </div>
                        <span
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: '13.5px',
                            color: feature.included
                              ? (plan.highlighted ? '#fff' : '#cbd5e1')
                              : '#475569',
                            textDecoration: feature.included ? 'none' : 'line-through',
                            lineHeight: 1.5,
                          }}
                        >
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* FAQ */}
          <div
            style={{
              background: 'rgba(30,41,59,0.5)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '24px',
              padding: 'clamp(32px, 5vw, 56px)',
            }}
          >
            <h3
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
                fontWeight: 800,
                color: '#f1f5f9',
                textAlign: 'center',
                marginBottom: '48px',
                letterSpacing: '-0.02em',
              }}
            >
              Preguntas Frecuentes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '32px' }}>
              {faqs.map((faq, i) => (
                <div key={i}>
                  <div style={{ display: 'flex', gap: '12px', marginBottom: '8px', alignItems: 'flex-start' }}>
                    <span
                      style={{
                        width: '26px',
                        height: '26px',
                        borderRadius: '8px',
                        background: 'rgba(56,189,248,0.1)',
                        border: '1px solid rgba(56,189,248,0.25)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#38bdf8',
                        fontSize: '13px',
                        fontWeight: 800,
                        flexShrink: 0,
                        fontFamily: "'Syne', sans-serif",
                        marginTop: '1px',
                      }}
                    >
                      ?
                    </span>
                    <h4
                      style={{
                        fontFamily: "'Syne', sans-serif",
                        fontSize: '0.95rem',
                        fontWeight: 700,
                        color: '#f1f5f9',
                        lineHeight: 1.4,
                      }}
                    >
                      {faq.q}
                    </h4>
                  </div>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '14px',
                      color: '#64748b',
                      lineHeight: 1.7,
                      paddingLeft: '38px',
                    }}
                  >
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};