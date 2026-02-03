
import { useState } from "react";
import { useTheme } from "../../../context";

export const AdminChatbotConversationView = () => {
  const { isDark } = useTheme()
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null)
  const [filterStatus, setFilterStatus] = useState("all")

  const cardBg = isDark ? "bg-slate-800/50 backdrop-blur-sm" : "bg-white/80 backdrop-blur-sm"
  const cardBorder = isDark ? "border-slate-700/50" : "border-gray-200/50"
  const textPrimary = isDark ? "text-slate-50" : "text-gray-900"
  const textSecondary = isDark ? "text-slate-400" : "text-gray-600"
  const activeBg = isDark ? "bg-slate-700" : "bg-blue-50"

  const conversations = [
    {
      id: 1,
      phone: "+56 9 12345678",
      status: "completed",
      messages: 12,
      date: "Hace 2 horas",
      state: "confirmed",
    },
    {
      id: 2,
      phone: "+56 9 87654321",
      status: "active",
      messages: 5,
      date: "Hace 5 minutos",
      state: "ordering",
    },
    {
      id: 3,
      phone: "+56 9 56789012",
      status: "completed",
      messages: 18,
      date: "Hace 1 día",
      state: "confirmed",
    },
    {
      id: 4,
      phone: "+56 9 34567890",
      status: "pending",
      messages: 3,
      date: "Hace 30 minutos",
      state: "welcome",
    },
    {
      id: 5,
      phone: "+56 9 23456789",
      status: "active",
      messages: 8,
      date: "Hace 10 minutos",
      state: "browsing_catalog",
    },
  ]

  const filteredConversations =
    filterStatus === "all" ? conversations : conversations.filter((c) => c.status === filterStatus)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
      case "completed":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
      case "pending":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getStateColor = (state: string) => {
    const stateColors: Record<string, string> = {
      welcome: "from-blue-500 to-blue-600",
      browsing_catalog: "from-purple-500 to-purple-600",
      ordering: "from-orange-500 to-orange-600",
      service: "from-green-500 to-green-600",
      waiting_payment: "from-red-500 to-red-600",
      confirmed: "from-emerald-500 to-emerald-600",
    }
    return stateColors[state] || "from-gray-500 to-gray-600"
  }

  const getStateLabel = (state: string) => {
    const labels: Record<string, string> = {
      welcome: "Bienvenida",
      browsing_catalog: "Catálogo",
      ordering: "Pedido",
      service: "Servicio",
      waiting_payment: "Pago",
      confirmed: "Confirmado",
    }
    return labels[state] || state
  }

  const selectedChat = conversations.find((c) => c.id === selectedConversation)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className={`text-3xl font-bold ${textPrimary}`}>Conversaciones</h1>
        <p className={`mt-2 ${textSecondary}`}>Gestiona todas las conversaciones del chatbot con tus clientes</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Conversations List */}
        <div className="lg:col-span-1">
          <div className={`${cardBg} rounded-xl border ${cardBorder} p-4 shadow-sm`}>
            {/* Filter */}
            <div className="mb-4">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border ${isDark ? "border-slate-600 bg-slate-700 text-white" : "border-gray-300 bg-white text-gray-900"} text-sm focus:ring-2 focus:ring-blue-500 outline-none`}
              >
                <option value="all">Todas</option>
                <option value="active">Activas</option>
                <option value="completed">Completadas</option>
                <option value="pending">Pendientes</option>
              </select>
            </div>

            {/* Conversations */}
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredConversations.map((conversation) => (
                <button
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation.id)}
                  className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                    selectedConversation === conversation.id ? `${activeBg} border border-blue-500` : `hover:${activeBg}`
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className={`font-medium text-sm ${textPrimary}`}>{conversation.phone}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(conversation.status)}`}>
                      {conversation.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs ${textSecondary}`}>{conversation.messages} mensajes</span>
                    <span className={`text-xs ${textSecondary}`}>{conversation.date}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Details */}
        <div className="lg:col-span-2">
          {selectedChat ? (
            <div className={`${cardBg} rounded-xl border ${cardBorder} shadow-sm overflow-hidden flex flex-col h-96`}>
              {/* Header */}
              <div className={`${isDark ? "bg-slate-700" : "bg-gradient-to-r from-blue-600 to-blue-700"} text-white p-4 flex items-center justify-between`}>
                <div>
                  <h2 className="font-bold">{selectedChat.phone}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(selectedChat.status)}`}>
                      {selectedChat.status}
                    </span>
                    <div
                      className={`px-2 py-1 text-xs rounded-full bg-gradient-to-r ${getStateColor(selectedChat.state)} text-white`}
                    >
                      {getStateLabel(selectedChat.state)}
                    </div>
                  </div>
                </div>
                <button className={`p-2 rounded-lg ${isDark ? "hover:bg-slate-600" : "hover:bg-blue-500"} transition-all`}>
                  <i className="bi bi-three-dots-vertical"></i>
                </button>
              </div>

              {/* Messages */}
              <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${isDark ? "bg-slate-800" : "bg-gray-50"}`}>
                <div className="flex gap-3">
                  <div className={`${isDark ? "bg-slate-700" : "bg-white"} rounded-lg p-3 max-w-xs`}>
                    <p className={`text-sm ${textPrimary}`}>Hola, ¿qué productos tienes?</p>
                    <span className={`text-xs ${textSecondary} mt-1 block`}>10:30 AM</span>
                  </div>
                </div>

                <div className="flex gap-3 justify-end">
                  <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg p-3 max-w-xs">
                    <p className="text-sm">Tenemos una gran variedad, ¿qué te interesa?</p>
                    <span className="text-xs opacity-70 mt-1 block">10:31 AM</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className={`${isDark ? "bg-slate-700" : "bg-white"} rounded-lg p-3 max-w-xs`}>
                    <p className={`text-sm ${textPrimary}`}>Me interesa una hamburguesa</p>
                    <span className={`text-xs ${textSecondary} mt-1 block`}>10:32 AM</span>
                  </div>
                </div>
              </div>

              {/* Input */}
              <div className={`border-t ${cardBorder} p-4 flex gap-2`}>
                <input
                  type="text"
                  placeholder="Escribe un mensaje..."
                  className={`flex-1 px-3 py-2 rounded-lg border ${isDark ? "border-slate-600 bg-slate-700 text-white" : "border-gray-300 bg-white text-gray-900"} text-sm focus:ring-2 focus:ring-blue-500 outline-none`}
                />
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all">
                  <i className="bi bi-send"></i>
                </button>
              </div>
            </div>
          ) : (
            <div className={`${cardBg} rounded-xl border ${cardBorder} p-8 text-center h-96 flex items-center justify-center border-dashed`}>
              <div>
                <i className={`bi bi-chat-dots text-4xl ${textSecondary} mb-4 block`}></i>
                <p className={`font-medium ${textPrimary}`}>Selecciona una conversación</p>
                <p className={`text-sm ${textSecondary}`}>para ver los detalles</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
