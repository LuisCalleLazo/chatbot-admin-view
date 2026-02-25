
export const HomeView = () => {
  return (
    <div className="space-y-12 sm:space-y-16 lg:space-y-20">
      {/* Hero Section */}
      <section id="home" className="container mx-auto px-4 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
              Chatbots inteligentes para tu negocio
            </h2>
            <p className="text-lg sm:text-xl text-slate-600">
              Automatiza tu atención al cliente en WhatsApp, Telegram y Facebook Messenger. Respuestas instantáneas, disponibles 24/7.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-6 sm:px-8 py-3 from-blue-600 to-teal-600 text-white rounded-lg hover:shadow-lg transition-shadow font-semibold">
                Comenzar ahora
              </button>
              <button className="px-6 sm:px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-semibold">
                Ver demo
              </button>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative w-full max-w-md h-80 sm:h-96 from-blue-100 to-teal-100 rounded-2xl flex items-center justify-center overflow-hidden">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_chatbot-removebg-preview-TeG2K5KMKRbC2PCaHTzbelk6aJ8cK2.png"
                alt="ChatBot Illustration"
                width={300}
                height={300}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Características principales */}
      <section className="bg-slate-100 py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl sm:text-4xl font-bold text-center text-slate-900 mb-12">
            ¿Por qué elegir ChatBot Pro?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h4 className="text-xl font-semibold text-slate-900 mb-2">Rápido y eficiente</h4>
              <p className="text-slate-600">
                Responde a tus clientes al instante en múltiples plataformas simultáneamente.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <h4 className="text-xl font-semibold text-slate-900 mb-2">Seguro y confiable</h4>
              <p className="text-slate-600">
                Protegemos tus datos con encriptación de nivel empresarial y cumplimiento normativo.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h4 className="text-xl font-semibold text-slate-900 mb-2">Multi-plataforma</h4>
              <p className="text-slate-600">
                Funciona en WhatsApp, Telegram, Facebook Messenger y más. Un solo dashboard para todo.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
