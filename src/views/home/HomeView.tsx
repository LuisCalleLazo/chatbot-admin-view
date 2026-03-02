export const HomeView = () => {
  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section
        id="home"
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f2744 100%)',
          minHeight: '92vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative background circles */}
        <div
          style={{
            position: 'absolute',
            top: '-10%',
            right: '-5%',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(56,189,248,0.12) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-15%',
            left: '-8%',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(20,184,166,0.1) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        {/* Grid pattern overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(56,189,248,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.04) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            pointerEvents: 'none',
          }}
        />

        <div className="container mx-auto px-6 lg:px-16" style={{ position: 'relative', zIndex: 1 }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center py-20 lg:py-0">
            {/* Text */}
            <div className="space-y-8">
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 16px',
                  borderRadius: '100px',
                  border: '1px solid rgba(56,189,248,0.3)',
                  background: 'rgba(56,189,248,0.08)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <span
                  style={{
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    background: '#38bdf8',
                    boxShadow: '0 0 8px #38bdf8',
                    display: 'inline-block',
                    animation: 'pulse 2s infinite',
                  }}
                />
                <span style={{ color: '#7dd3fc', fontSize: '13px', fontWeight: 600, letterSpacing: '0.05em', fontFamily: "'DM Sans', sans-serif" }}>
                  Automatización inteligente
                </span>
              </div>

              <h2
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                  fontWeight: 800,
                  lineHeight: 1.05,
                  color: '#f8fafc',
                  letterSpacing: '-0.02em',
                }}
              >
                Chatbots{' '}
                <span
                  style={{
                    background: 'linear-gradient(90deg, #38bdf8, #14b8a6)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  inteligentes
                </span>
                <br />
                para tu negocio
              </h2>

              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '1.15rem',
                  lineHeight: 1.75,
                  color: '#94a3b8',
                  maxWidth: '480px',
                }}
              >
                Automatiza tu atención al cliente en WhatsApp, Telegram y Facebook Messenger.
                Respuestas instantáneas, disponibles <strong style={{ color: '#cbd5e1' }}>24/7</strong>.
              </p>

              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <button
                  style={{
                    padding: '14px 32px',
                    background: 'linear-gradient(135deg, #0ea5e9, #0d9488)',
                    color: '#fff',
                    borderRadius: '12px',
                    fontWeight: 700,
                    fontSize: '15px',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: "'DM Sans', sans-serif",
                    boxShadow: '0 4px 24px rgba(14,165,233,0.35)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                  }}
                  onMouseEnter={e => {
                    (e.target as HTMLButtonElement).style.transform = 'translateY(-2px)';
                    (e.target as HTMLButtonElement).style.boxShadow = '0 8px 32px rgba(14,165,233,0.5)';
                  }}
                  onMouseLeave={e => {
                    (e.target as HTMLButtonElement).style.transform = 'translateY(0)';
                    (e.target as HTMLButtonElement).style.boxShadow = '0 4px 24px rgba(14,165,233,0.35)';
                  }}
                >
                  Comenzar ahora →
                </button>
                <button
                  style={{
                    padding: '14px 32px',
                    background: 'transparent',
                    color: '#7dd3fc',
                    borderRadius: '12px',
                    fontWeight: 600,
                    fontSize: '15px',
                    border: '1.5px solid rgba(56,189,248,0.35)',
                    cursor: 'pointer',
                    fontFamily: "'DM Sans', sans-serif",
                    transition: 'background 0.2s, border-color 0.2s',
                  }}
                  onMouseEnter={e => {
                    (e.target as HTMLButtonElement).style.background = 'rgba(56,189,248,0.08)';
                    (e.target as HTMLButtonElement).style.borderColor = 'rgba(56,189,248,0.6)';
                  }}
                  onMouseLeave={e => {
                    (e.target as HTMLButtonElement).style.background = 'transparent';
                    (e.target as HTMLButtonElement).style.borderColor = 'rgba(56,189,248,0.35)';
                  }}
                >
                  ▶ Ver demo
                </button>
              </div>

              {/* Stats row */}
              <div style={{ display: 'flex', gap: '32px', paddingTop: '8px', flexWrap: 'wrap' }}>
                {[
                  { value: '500+', label: 'Empresas activas' },
                  { value: '99.9%', label: 'Uptime garantizado' },
                  { value: '24/7', label: 'Soporte disponible' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div
                      style={{
                        fontFamily: "'Syne', sans-serif",
                        fontSize: '1.75rem',
                        fontWeight: 800,
                        color: '#38bdf8',
                        lineHeight: 1,
                      }}
                    >
                      {stat.value}
                    </div>
                    <div
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: '12px',
                        color: '#64748b',
                        marginTop: '4px',
                        fontWeight: 500,
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: '480px',
                }}
              >
                {/* Main card */}
                <div
                  style={{
                    background: 'rgba(30,41,59,0.8)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '24px',
                    border: '1px solid rgba(56,189,248,0.2)',
                    padding: '32px',
                    boxShadow: '0 25px 80px rgba(0,0,0,0.4)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                    <div
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg,#0ea5e9,#0d9488)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '20px',
                      }}
                    >
                      🤖
                    </div>
                    <div>
                      <div style={{ color: '#f1f5f9', fontWeight: 700, fontFamily: "'DM Sans', sans-serif" }}>ChatBot Pro</div>
                      <div style={{ color: '#22c55e', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
                        En línea
                      </div>
                    </div>
                  </div>

                  {/* Chat messages */}
                  {[
                    { from: 'user', text: 'Hola, quiero información sobre sus planes' },
                    { from: 'bot', text: '¡Hola! Tenemos 3 planes: Básico (100 Bs), Profesional (300 Bs) y Empresarial (600 Bs). ¿Cuál te interesa?' },
                    { from: 'user', text: '¿El básico incluye pagos QR?' },
                  ].map((msg, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start',
                        marginBottom: '12px',
                      }}
                    >
                      <div
                        style={{
                          maxWidth: '75%',
                          padding: '10px 14px',
                          borderRadius: msg.from === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                          background: msg.from === 'user'
                            ? 'linear-gradient(135deg,#0ea5e9,#0d9488)'
                            : 'rgba(51,65,85,0.8)',
                          color: '#f1f5f9',
                          fontSize: '13px',
                          lineHeight: 1.5,
                          fontFamily: "'DM Sans', sans-serif",
                        }}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}

                  {/* Typing indicator */}
                  <div style={{ display: 'flex', gap: '4px', padding: '8px 0', alignItems: 'center' }}>
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        style={{
                          width: '7px',
                          height: '7px',
                          borderRadius: '50%',
                          background: '#38bdf8',
                          opacity: 0.6,
                          animation: `bounce 1.2s ${i * 0.2}s infinite`,
                        }}
                      />
                    ))}
                    <span style={{ color: '#64748b', fontSize: '12px', marginLeft: '8px', fontFamily: "'DM Sans', sans-serif" }}>
                      Bot respondiendo...
                    </span>
                  </div>

                  {/* Platforms row */}
                  <div
                    style={{
                      marginTop: '20px',
                      paddingTop: '20px',
                      borderTop: '1px solid rgba(56,189,248,0.15)',
                      display: 'flex',
                      gap: '12px',
                      alignItems: 'center',
                    }}
                  >
                    <span style={{ color: '#475569', fontSize: '11px', fontFamily: "'DM Sans', sans-serif", letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                      Plataformas:
                    </span>
                    {['WhatsApp', 'Telegram', 'Messenger'].map((p) => (
                      <span
                        key={p}
                        style={{
                          padding: '3px 10px',
                          borderRadius: '100px',
                          background: 'rgba(56,189,248,0.1)',
                          color: '#7dd3fc',
                          fontSize: '11px',
                          fontWeight: 600,
                          fontFamily: "'DM Sans', sans-serif",
                        }}
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Floating badge */}
                <div
                  style={{
                    position: 'absolute',
                    top: '-16px',
                    right: '-16px',
                    background: 'linear-gradient(135deg,#f59e0b,#ef4444)',
                    borderRadius: '16px',
                    padding: '10px 16px',
                    boxShadow: '0 8px 24px rgba(245,158,11,0.4)',
                    border: '2px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <div style={{ color: '#fff', fontSize: '12px', fontWeight: 700, fontFamily: "'Syne', sans-serif" }}>🔥 +2.4k</div>
                  <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '10px', fontFamily: "'DM Sans', sans-serif" }}>mensajes hoy</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
          @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
          @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        `}</style>
      </section>

      {/* Why section */}
      <section
        style={{
          background: '#0f172a',
          padding: '100px 0',
          borderTop: '1px solid rgba(56,189,248,0.08)',
        }}
      >
        <div className="container mx-auto px-6 lg:px-16">
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: '#38bdf8',
                fontWeight: 600,
                fontSize: '13px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '12px',
              }}
            >
              Por qué elegirnos
            </p>
            <h3
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                fontWeight: 800,
                color: '#f8fafc',
                letterSpacing: '-0.02em',
              }}
            >
              ¿Por qué elegir ChatBot Pro?
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: '⚡',
                title: 'Rápido y eficiente',
                desc: 'Responde a tus clientes al instante en múltiples plataformas simultáneamente.',
                accent: '#0ea5e9',
                bg: 'rgba(14,165,233,0.08)',
              },
              {
                icon: '🔒',
                title: 'Seguro y confiable',
                desc: 'Protegemos tus datos con encriptación de nivel empresarial y cumplimiento normativo.',
                accent: '#14b8a6',
                bg: 'rgba(20,184,166,0.08)',
              },
              {
                icon: '📱',
                title: 'Multi-plataforma',
                desc: 'Funciona en WhatsApp, Telegram, Facebook Messenger y más. Un solo dashboard para todo.',
                accent: '#f59e0b',
                bg: 'rgba(245,158,11,0.08)',
              },
            ].map((item) => (
              <div
                key={item.title}
                style={{
                  background: 'rgba(30,41,59,0.5)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '20px',
                  padding: '36px 32px',
                  transition: 'transform 0.25s, border-color 0.25s, box-shadow 0.25s',
                  cursor: 'default',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.transform = 'translateY(-6px)';
                  el.style.borderColor = `${item.accent}40`;
                  el.style.boxShadow = `0 20px 60px rgba(0,0,0,0.3)`;
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.transform = 'translateY(0)';
                  el.style.borderColor = 'rgba(255,255,255,0.06)';
                  el.style.boxShadow = 'none';
                }}
              >
                <div
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '14px',
                    background: item.bg,
                    border: `1px solid ${item.accent}30`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    marginBottom: '20px',
                  }}
                >
                  {item.icon}
                </div>
                <h4
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: '1.2rem',
                    fontWeight: 700,
                    color: '#f1f5f9',
                    marginBottom: '10px',
                  }}
                >
                  {item.title}
                </h4>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '15px',
                    color: '#64748b',
                    lineHeight: 1.7,
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