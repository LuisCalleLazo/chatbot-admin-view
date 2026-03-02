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
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Formulario enviado:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', company: '', message: '' });
    setTimeout(() => setSubmitted(false), 4000);
  };

  const inputStyle = {
    width: '100%',
    padding: '13px 16px',
    background: 'rgba(15,23,42,0.7)',
    border: '1px solid rgba(56,189,248,0.15)',
    borderRadius: '12px',
    color: '#f1f5f9',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '14.5px',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    boxSizing: 'border-box' as const,
  };

  const labelStyle = {
    display: 'block',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '13px',
    fontWeight: 600,
    color: '#94a3b8',
    marginBottom: '8px',
    letterSpacing: '0.03em',
    textTransform: 'uppercase' as const,
  };

  return (
    <div style={{ background: '#0f172a', minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
        .contact-input:focus { border-color: rgba(56,189,248,0.5) !important; box-shadow: 0 0 0 3px rgba(56,189,248,0.1) !important; }
        .contact-input::placeholder { color: #334155; }
        .info-card:hover { border-color: rgba(56,189,248,0.25) !important; transform: translateX(4px); }
      `}</style>

      {/* Header */}
      <section style={{ paddingTop: '100px', paddingBottom: '60px', textAlign: 'center' }}>
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
            Hablemos
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
            Contáctanos
          </h2>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '1.05rem',
              color: '#64748b',
              maxWidth: '480px',
              margin: '0 auto',
              lineHeight: 1.75,
            }}
          >
            ¿Tienes preguntas? Nos encantaría ayudarte. Envíanos un mensaje y nos pondremos en contacto.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section id="contact" style={{ padding: '0 0 100px' }}>
        <div className="container mx-auto px-6 lg:px-16" style={{ maxWidth: '1100px' }}>
          <div className="grid grid-cols-1 lg:grid-cols-3" style={{ gap: '32px', alignItems: 'start' }}>
            {/* Info column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { icon: '📞', label: 'Teléfono', value: '+1 (555) 123-4567', sub: 'Lun–Vie, 9am–6pm', accent: '#38bdf8', bg: 'rgba(56,189,248,0.08)' },
                { icon: '✉️', label: 'Email', value: 'info@chatbotpro.com', sub: 'Respuesta < 24 horas', accent: '#14b8a6', bg: 'rgba(20,184,166,0.08)' },
                { icon: '📍', label: 'Ubicación', value: 'San Francisco, CA', sub: 'Oficina principal', accent: '#f59e0b', bg: 'rgba(245,158,11,0.08)' },
              ].map((info) => (
                <div
                  key={info.label}
                  className="info-card"
                  style={{
                    background: 'rgba(30,41,59,0.6)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: '18px',
                    padding: '24px',
                    transition: 'border-color 0.25s, transform 0.25s',
                    display: 'flex',
                    gap: '16px',
                    alignItems: 'flex-start',
                  }}
                >
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      background: info.bg,
                      border: `1px solid ${info.accent}25`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '20px',
                      flexShrink: 0,
                    }}
                  >
                    {info.icon}
                  </div>
                  <div>
                    <p
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: '11px',
                        fontWeight: 700,
                        color: info.accent,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        marginBottom: '4px',
                      }}
                    >
                      {info.label}
                    </p>
                    <p
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: '14.5px',
                        color: '#f1f5f9',
                        fontWeight: 600,
                        marginBottom: '3px',
                      }}
                    >
                      {info.value}
                    </p>
                    <p
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: '12px',
                        color: '#475569',
                      }}
                    >
                      {info.sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Form column */}
            <div
              style={{
                gridColumn: 'span 2',
                background: 'rgba(30,41,59,0.6)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '24px',
                padding: 'clamp(28px, 5vw, 48px)',
              }}
            >
              <h3
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: '1.5rem',
                  fontWeight: 800,
                  color: '#f1f5f9',
                  marginBottom: '32px',
                  letterSpacing: '-0.02em',
                }}
              >
                Envíanos un mensaje
              </h3>

              {submitted && (
                <div
                  style={{
                    marginBottom: '24px',
                    padding: '16px 20px',
                    background: 'rgba(34,197,94,0.1)',
                    border: '1px solid rgba(34,197,94,0.3)',
                    borderRadius: '12px',
                    color: '#4ade80',
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '14px',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  ✓ ¡Gracias por tu mensaje! Nos pondremos en contacto pronto.
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '20px' }}>
                  {/* Name */}
                  <div>
                    <label style={labelStyle}>Nombre completo</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="contact-input"
                      placeholder="Tu nombre"
                      style={inputStyle}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label style={labelStyle}>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="contact-input"
                      placeholder="tu@email.com"
                      style={inputStyle}
                    />
                  </div>
                </div>

                {/* Company */}
                <div>
                  <label style={labelStyle}>Empresa <span style={{ color: '#334155', textTransform: 'none', fontWeight: 400 }}>(opcional)</span></label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="contact-input"
                    placeholder="Tu empresa"
                    style={inputStyle}
                  />
                </div>

                {/* Message */}
                <div>
                  <label style={labelStyle}>Mensaje</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="contact-input"
                    placeholder="Cuéntanos cómo podemos ayudarte..."
                    style={{ ...inputStyle, resize: 'none' }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    padding: '15px 32px',
                    background: 'linear-gradient(135deg, #0ea5e9, #0d9488)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '12px',
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 700,
                    fontSize: '15px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 24px rgba(14,165,233,0.35)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    alignSelf: 'flex-start',
                  }}
                  onMouseEnter={e => {
                    const btn = e.currentTarget as HTMLButtonElement;
                    btn.style.transform = 'translateY(-2px)';
                    btn.style.boxShadow = '0 8px 32px rgba(14,165,233,0.5)';
                  }}
                  onMouseLeave={e => {
                    const btn = e.currentTarget as HTMLButtonElement;
                    btn.style.transform = 'translateY(0)';
                    btn.style.boxShadow = '0 4px 24px rgba(14,165,233,0.35)';
                  }}
                >
                  Enviar mensaje →
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section
        style={{
          background: 'linear-gradient(135deg, #0c4a6e 0%, #134e4a 100%)',
          borderTop: '1px solid rgba(56,189,248,0.15)',
          padding: '80px 0',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            width: '600px',
            height: '300px',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(56,189,248,0.12) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <div className="container mx-auto px-6" style={{ position: 'relative' }}>
          <h3
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 'clamp(1.75rem, 3.5vw, 3rem)',
              fontWeight: 800,
              color: '#f8fafc',
              marginBottom: '16px',
              letterSpacing: '-0.02em',
            }}
          >
            ¿Listo para transformar tu atención al cliente?
          </h3>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '1.05rem',
              color: 'rgba(186,230,253,0.8)',
              marginBottom: '36px',
              maxWidth: '500px',
              margin: '0 auto 36px',
              lineHeight: 1.7,
            }}
          >
            Únete a cientos de empresas que ya automatizan su servicio con ChatBot Pro
          </p>
          <button
            style={{
              padding: '15px 36px',
              background: '#fff',
              color: '#0c4a6e',
              border: 'none',
              borderRadius: '12px',
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 800,
              fontSize: '15px',
              cursor: 'pointer',
              boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-3px)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)'; }}
          >
            Comenzar prueba gratuita →
          </button>
        </div>
      </section>
    </div>
  );
};