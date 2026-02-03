
import { useTheme } from "../../../context"

export const AdminChatbotStatesView = () => {
  const { isDark } = useTheme()

  const states = [
    {
      id: "welcome",
      label: "Bienvenida",
      description: "El cliente inicia la conversación con el chatbot",
      icon: "bi-hand-thumbs-up",
      color: "from-blue-500 to-blue-600",
    },
    {
      id: "browsing_catalog",
      label: "Explorando Catálogo",
      description: "El cliente consulta productos y servicios disponibles",
      icon: "bi-shop",
      color: "from-purple-500 to-purple-600",
    },
    {
      id: "ordering",
      label: "Realizando Pedido",
      description: "El cliente selecciona y personaliza su pedido",
      icon: "bi-bag-check",
      color: "from-orange-500 to-orange-600",
    },
    {
      id: "service",
      label: "Servicio",
      description: "Se proporciona soporte y servicio al cliente",
      icon: "bi-headset",
      color: "from-green-500 to-green-600",
    },
    {
      id: "waiting_payment",
      label: "Esperando Pago",
      description: "El cliente realiza el pago de su pedido",
      icon: "bi-credit-card",
      color: "from-red-500 to-red-600",
    },
    {
      id: "confirmed",
      label: "Confirmado",
      description: "El pedido ha sido confirmado y completado",
      icon: "bi-check-circle",
      color: "from-emerald-500 to-emerald-600",
    },
  ]

  const cardBg = isDark ? "bg-slate-800" : "bg-white"
  const cardBorder = isDark ? "border-slate-700" : "border-gray-200"
  const textPrimary = isDark ? "text-slate-50" : "text-gray-900"
  const textSecondary = isDark ? "text-slate-400" : "text-gray-600"

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className={`text-3xl font-bold ${textPrimary}`}>Estados del Chatbot</h1>
        <p className={`mt-2 ${textSecondary}`}>Diagrama de flujo de estados por los que pasa una conversación</p>
      </div>

      {/* Flow Diagram */}
      <div className={`${cardBg} rounded-xl border ${cardBorder} p-8 shadow-sm overflow-x-auto`}>
        <div className="flex items-center gap-4 min-w-max pb-4">
          {states.map((state, index) => (
            <div key={state.id} className="flex items-center gap-4">
              {/* State Card */}
              <div className={`bg-gradient-to-br ${state.color} text-white rounded-lg p-6 min-w-max shadow-lg hover:shadow-xl transition-shadow duration-200`}>
                <div className="mb-3">
                  <i className={`bi ${state.icon} text-3xl block`}></i>
                </div>
                <h3 className="font-bold text-lg">{state.label}</h3>
              </div>

              {/* Arrow */}
              {index < states.length - 1 && (
                <div className="text-white text-3xl">
                  <i className="bi bi-arrow-right"></i>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* States Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {states.map((state) => (
          <div key={state.id} className={`${cardBg} rounded-xl border ${cardBorder} p-6 shadow-sm hover:shadow-md transition-shadow duration-200`}>
            <div className={`bg-gradient-to-br ${state.color} text-white w-12 h-12 rounded-lg flex items-center justify-center text-xl mb-4`}>
              <i className={`bi ${state.icon}`}></i>
            </div>
            <h3 className={`text-lg font-bold ${textPrimary} mb-2`}>{state.label}</h3>
            <p className={`text-sm ${textSecondary}`}>{state.description}</p>

            {/* State Actions */}
            <div className="mt-4 pt-4 border-t border-current border-opacity-20">
              <p className={`text-xs font-medium ${textSecondary} mb-3`}>Acciones disponibles:</p>
              <ul className={`text-sm space-y-2 ${textSecondary}`}>
                <li className="flex items-center gap-2">
                  <i className="bi bi-dot text-blue-500"></i>
                  Hacer preguntas personalizadas
                </li>
                <li className="flex items-center gap-2">
                  <i className="bi bi-dot text-blue-500"></i>
                  Recopilar respuestas
                </li>
                <li className="flex items-center gap-2">
                  <i className="bi bi-dot text-blue-500"></i>
                  Transicionar al siguiente estado
                </li>
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* State Transitions Info */}
      <div className={`${cardBg} rounded-xl border ${cardBorder} p-6 shadow-sm`}>
        <h2 className={`text-lg font-bold ${textPrimary} mb-4`}>Información de transiciones</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className={`font-semibold ${textPrimary} mb-2`}>Flujo principal</h3>
            <ol className={`text-sm space-y-2 ${textSecondary}`}>
              <li>1. Bienvenida → Cliente es recibido</li>
              <li>2. Explorando Catálogo → Consulta productos</li>
              <li>3. Realizando Pedido → Selecciona items</li>
              <li>4. Esperando Pago → Procesa pago</li>
              <li>5. Confirmado → Pedido completado</li>
            </ol>
          </div>
          <div>
            <h3 className={`font-semibold ${textPrimary} mb-2`}>Estados especiales</h3>
            <ul className={`text-sm space-y-2 ${textSecondary}`}>
              <li>• Servicio: Accesible desde cualquier estado</li>
              <li>• El cliente puede volver a Catálogo desde Pedido</li>
              <li>• Esperando Pago es obligatorio antes de Confirmado</li>
              <li>• Confirmado es el estado final</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
