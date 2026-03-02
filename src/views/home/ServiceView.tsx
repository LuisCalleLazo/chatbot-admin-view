export const ServiceView = () => {
  const services = [
    {
      id: 1,
      title: 'WhatsApp Business Bot',
      description:
        'Automatiza respuestas en WhatsApp Business. Gestiona consultas, pedidos y atención al cliente desde un único dashboard centralizado.',
      features: ['Respuestas instantáneas', 'Etiquetado de contactos', 'Plantillas personalizadas'],
      emoji: '💬',
      accent: '#25d366',
      bg: 'rgba(37,211,102,0.08)',
      border: 'rgba(37,211,102,0.2)',
    },
    {
      id: 2,
      title: 'Telegram Bot',
      description:
        'Crea bots inteligentes para Telegram. Notificaciones automáticas, encuestas y interacciones personalizadas con tus usuarios.',
      features: ['Bots inteligentes', 'Notificaciones push', 'Análisis en tiempo real'],
      emoji: '✈️',
      accent: '#2aabee',
      bg: 'rgba(42,171,238,0.08)',
      border: 'rgba(42,171,238,0.2)',
    },
    {
      id: 3,
      title: 'Facebook Messenger Bot',
      description:
        'Conecta tu página de Facebook con bots automáticos. Aumenta el engagement y convierte visitas en clientes fieles.',
      features: ['Automatización completa', 'Integración con catálogo', 'Reportes detallados'],
      emoji: '💙',
      accent: '#0866ff',
      bg: 'rgba(8,102,255,0.08)',
      border: 'rgba(8,102,255,0.2)',
    },
  ];

  const extras = [
    { icon: '📊', title: 'Dashboard intuitivo', desc: 'Gestiona todos tus bots desde un único panel' },
    { icon: '🔄', title: 'Integración fácil', desc: 'Conecta en minutos sin conocimientos técnicos' },
    { icon: '📈', title: 'Análisis detallados', desc: 'Reportes en tiempo real sobre rendimiento' },
    { icon: '🛠️', title: 'Personalización total', desc: 'Adapta cada bot a tus necesidades específicas' },
    { icon: '👥', title: 'Soporte 24/7', desc: 'Equipo de expertos siempre disponible' },
    { icon: '🔐', title: 'Seguridad garantizada', desc: 'Encriptación y cumplimiento normativo' },
  ];

  return (
    <div style={{ background: '#0f172a', minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
        .service-card:hover { transform: translateY(-4px); }
        .extra-card:hover { border-color: rgba(56,189,248,0.35) !important; transform: translateY(-3px); }
      `}</style>

      {/* Header */}
      <section
        style={{
          paddingTop: '100px',
          paddingBottom: '60px',
          textAlign: 'center',
          borderBottom: '1px solid rgba(56,189,248,0.08)',
        }}
      >
        <div className="container mx-auto px-6">
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
            Lo que ofrecemos
          </p>
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 'clamp(2.2rem, 5vw, 4rem)',
              fontWeight: 800,
              color: '#f8fafc',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              marginBottom: '20px',
            }}
          >
            Nuestros Servicios
          </h2>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '1.1rem',
              color: '#64748b',
              maxWidth: '520px',
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            Soluciones completas de chatbot para cada plataforma de mensajería
          </p>
        </div>
      </section>

      {/* Services */}
      <section id="services" style={{ padding: '80px 0' }}>
        <div className="container mx-auto px-6 lg:px-16">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {services.map((service, index) => (
              <div
                key={service.id}
                className="service-card"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '0',
                  background: 'rgba(30,41,59,0.5)',
                  border: `1px solid ${service.border}`,
                  borderRadius: '24px',
                  overflow: 'hidden',
                  transition: 'transform 0.3s',
                }}
              >
                {/* Visual panel */}
                <div
                  style={{
                    background: service.bg,
                    padding: '48px 40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    order: index % 2 === 1 ? 2 : 1,
                    minHeight: '280px',
                    borderRight: index % 2 !== 1 ? `1px solid ${service.border}` : 'none',
                    borderLeft: index % 2 === 1 ? `1px solid ${service.border}` : 'none',
                  }}
                >
                  <div style={{ textAlign: 'center' }}>
                    <div
                      style={{
                        fontSize: '80px',
                        marginBottom: '16px',
                        filter: 'drop-shadow(0 0 30px currentColor)',
                      }}
                    >
                      {service.emoji}
                    </div>
                    <div
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        color: service.accent,
                        fontSize: '13px',
                        fontWeight: 700,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {service.title.split(' ')[0]}
                    </div>
                  </div>
                </div>

                {/* Content panel */}
                <div
                  style={{
                    padding: '48px 40px',
                    order: index % 2 === 1 ? 1 : 2,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                      fontWeight: 800,
                      color: '#f1f5f9',
                      marginBottom: '16px',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {service.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '15px',
                      color: '#64748b',
                      lineHeight: 1.75,
                      marginBottom: '28px',
                    }}
                  >
                    {service.description}
                  </p>

                  <div style={{ marginBottom: '32px' }}>
                    {service.features.map((f) => (
                      <div
                        key={f}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          marginBottom: '10px',
                        }}
                      >
                        <div
                          style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            background: service.bg,
                            border: `1px solid ${service.accent}60`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '11px',
                            color: service.accent,
                            flexShrink: 0,
                          }}
                        >
                          ✓
                        </div>
                        <span
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: '14px',
                            color: '#cbd5e1',
                            fontWeight: 500,
                          }}
                        >
                          {f}
                        </span>
                      </div>
                    ))}
                  </div>

                  <button
                    style={{
                      alignSelf: 'flex-start',
                      padding: '12px 28px',
                      background: service.bg,
                      border: `1.5px solid ${service.accent}50`,
                      color: service.accent,
                      borderRadius: '10px',
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 700,
                      fontSize: '14px',
                      cursor: 'pointer',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLButtonElement).style.background = `${service.accent}20`;
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLButtonElement).style.background = service.bg;
                    }}
                  >
                    Conocer más →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Extras grid */}
      <section
        style={{
          padding: '80px 0 100px',
          borderTop: '1px solid rgba(56,189,248,0.08)',
        }}
      >
        <div className="container mx-auto px-6 lg:px-16">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <h3
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                fontWeight: 800,
                color: '#f1f5f9',
                letterSpacing: '-0.02em',
              }}
            >
              Lo que incluye cada servicio
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: '20px' }}>
            {extras.map((item) => (
              <div
                key={item.title}
                className="extra-card"
                style={{
                  background: 'rgba(30,41,59,0.5)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '18px',
                  padding: '28px',
                  transition: 'transform 0.25s, border-color 0.25s',
                  cursor: 'default',
                }}
              >
                <div
                  style={{
                    fontSize: '32px',
                    marginBottom: '14px',
                  }}
                >
                  {item.icon}
                </div>
                <h4
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    color: '#f1f5f9',
                    marginBottom: '8px',
                  }}
                >
                  {item.title}
                </h4>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '14px',
                    color: '#64748b',
                    lineHeight: 1.65,
                  }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};