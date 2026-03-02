export const CharacteristicsView = () => {
  const characteristics = [
    { title: 'Chat Multi-Plataforma', description: 'Conecta WhatsApp, Telegram y Facebook desde un único dashboard. Automatiza respuestas y mejora la experiencia.', icon: '💬', accent: '#38bdf8' },
    { title: 'Pagos QR Automáticos', description: 'Integra pagos QR directo en el chat. Tus clientes pagan sin salir de la conversación. Validación en tiempo real.', icon: '📱', accent: '#14b8a6' },
    { title: 'Validación Instantánea', description: 'Los pagos se validan al instante. Recibe notificaciones cuando se completa una transacción. Historial completo.', icon: '✅', accent: '#22c55e' },
    { title: 'Flujos Personalizables', description: 'Crea flujos de conversación adaptados a tu negocio. Personaliza cada interacción según tus necesidades.', icon: '🔄', accent: '#a78bfa' },
    { title: 'Reportes en Excel', description: 'Extrae datos detallados de conversaciones y transacciones. Exporta reportes para análisis y toma de decisiones.', icon: '📊', accent: '#f59e0b' },
    { title: 'Soporte 24/7', description: 'Acceso prioritario a nuestro equipo. Actualizaciones constantes y mejoras continuas en tu chatbot.', icon: '🛡️', accent: '#38bdf8' },
    { title: 'Seguridad de Datos', description: 'Encriptación end-to-end en todas las comunicaciones. Cumplimiento con estándares internacionales de seguridad.', icon: '🔐', accent: '#14b8a6' },
    { title: 'Escalabilidad Ilimitada', description: 'Maneja miles de conversaciones simultáneas sin afectar el rendimiento. Infraestructura en la nube.', icon: '📈', accent: '#f59e0b' },
  ];

  return (
    <div style={{ background: '#0f172a', minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
        .char-card { transition: transform 0.25s, border-color 0.25s, box-shadow 0.25s; }
        .char-card:hover { transform: translateY(-5px); }
      `}</style>

      <section id="characteristics" style={{ padding: '100px 0' }}>
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
              Funcionalidades
            </p>
            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                fontWeight: 800,
                color: '#f8fafc',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                marginBottom: '20px',
              }}
            >
              Características Principales
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '1.05rem',
                color: '#64748b',
                maxWidth: '540px',
                margin: '0 auto',
                lineHeight: 1.75,
              }}
            >
              Todas las herramientas que necesitas para automatizar y monetizar tu atención al cliente.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4" style={{ gap: '20px', marginBottom: '80px' }}>
            {characteristics.map((char, index) => (
              <div
                key={index}
                className="char-card"
                style={{
                  background: 'rgba(30,41,59,0.6)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '20px',
                  padding: '28px 24px',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = `${char.accent}40`;
                  el.style.boxShadow = `0 16px 48px rgba(0,0,0,0.3), 0 0 0 1px ${char.accent}20`;
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = 'rgba(255,255,255,0.06)';
                  el.style.boxShadow = 'none';
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '14px',
                    background: `${char.accent}15`,
                    border: `1px solid ${char.accent}25`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '22px',
                    marginBottom: '18px',
                  }}
                >
                  {char.icon}
                </div>
                <h3
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: '#f1f5f9',
                    marginBottom: '10px',
                    letterSpacing: '-0.01em',
                    lineHeight: 1.3,
                  }}
                >
                  {char.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '13.5px',
                    color: '#64748b',
                    lineHeight: 1.7,
                  }}
                >
                  {char.description}
                </p>
              </div>
            ))}
          </div>

          {/* QR Highlight Section */}
          <div
            style={{
              background: 'rgba(30,41,59,0.7)',
              border: '1px solid rgba(56,189,248,0.2)',
              borderRadius: '28px',
              padding: 'clamp(32px, 5vw, 64px)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* BG glow */}
            <div
              style={{
                position: 'absolute',
                top: '-50%',
                right: '-10%',
                width: '400px',
                height: '400px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(20,184,166,0.12) 0%, transparent 70%)',
                pointerEvents: 'none',
              }}
            />

            <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '48px', alignItems: 'center', position: 'relative' }}>
              {/* Left */}
              <div>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '5px 14px',
                    borderRadius: '100px',
                    background: 'rgba(20,184,166,0.1)',
                    border: '1px solid rgba(20,184,166,0.3)',
                    marginBottom: '20px',
                  }}
                >
                  <span style={{ color: '#14b8a6', fontSize: '12px', fontWeight: 700, fontFamily: "'DM Sans', sans-serif", letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    ✦ Destacado
                  </span>
                </div>
                <h3
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                    fontWeight: 800,
                    color: '#f1f5f9',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.15,
                    marginBottom: '32px',
                  }}
                >
                  Sistema de Pagos QR Integrado
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {[
                    'Generación automática de códigos QR',
                    'Validación instantánea de pagos',
                    'Confirmación automática en el chat',
                    'Historial completo de transacciones',
                    'Sin intermediarios, comisiones mínimas',
                  ].map((item) => (
                    <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div
                        style={{
                          width: '22px',
                          height: '22px',
                          borderRadius: '50%',
                          background: 'rgba(20,184,166,0.15)',
                          border: '1px solid rgba(20,184,166,0.4)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '11px',
                          color: '#14b8a6',
                          fontWeight: 700,
                          flexShrink: 0,
                        }}
                      >
                        ✓
                      </div>
                      <span
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: '14.5px',
                          color: '#cbd5e1',
                          fontWeight: 500,
                        }}
                      >
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right - QR visual */}
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div
                  style={{
                    background: 'rgba(15,23,42,0.8)',
                    border: '1px solid rgba(20,184,166,0.25)',
                    borderRadius: '24px',
                    padding: '40px',
                    maxWidth: '280px',
                    width: '100%',
                    textAlign: 'center',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
                  }}
                >
                  {/* Fake QR code */}
                  <div
                    style={{
                      width: '160px',
                      height: '160px',
                      background: '#fff',
                      borderRadius: '12px',
                      margin: '0 auto 20px',
                      display: 'grid',
                      gridTemplateColumns: 'repeat(8,1fr)',
                      gridTemplateRows: 'repeat(8,1fr)',
                      gap: '2px',
                      padding: '10px',
                      boxShadow: '0 0 30px rgba(20,184,166,0.3)',
                    }}
                  >
                    {Array.from({ length: 64 }).map((_, i) => (
                      <div
                        key={i}
                        style={{
                          borderRadius: '2px',
                          background: [0,1,2,8,9,10,16,17,18, 5,6,7,13,14,15,21,22,23,
                            42,43,50,51,58,59,32,40,48,56,
                            3,11,19,27,35,36,37,44,52,60,
                            63,62,61,55,47].includes(i) ? '#0f172a' : 'transparent',
                        }}
                      />
                    ))}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      color: '#f1f5f9',
                      fontWeight: 700,
                      fontSize: '15px',
                      marginBottom: '6px',
                    }}
                  >
                    Código QR de Pago
                  </div>
                  <div
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      color: '#14b8a6',
                      fontSize: '12px',
                      fontWeight: 600,
                    }}
                  >
                    📲 Generado automáticamente
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};