// AdminChatbotConversationVie
import { useTheme } from "../../../context"
import { useConversations } from "../../../hooks/chatbot/useConversations"

export const AdminChatbotConversationView = () => {
  const { isDark } = useTheme()
  const {
    channel, setChannel,
    filterStatus, setFilterStatus,
    conversations,
    selectedConversation,
    messages, messagesEndRef,
    loadingList, loadingMessages, sending,
    text, setText,
    file, setFile, fileInputRef,
    selectConversation,
    handleSend,
  } = useConversations()

  const cardBg = isDark ? "bg-slate-800/50 backdrop-blur-sm" : "bg-white/80 backdrop-blur-sm"
  const cardBorder = isDark ? "border-slate-700/50" : "border-gray-200/50"
  const textPrimary = isDark ? "text-slate-50" : "text-gray-900"
  const textSecondary = isDark ? "text-slate-400" : "text-gray-600"
  const activeBg = isDark ? "bg-slate-700" : "bg-blue-50"
  const inputClass = `flex-1 px-3 py-2 rounded-lg border text-sm outline-none focus:ring-2 focus:ring-blue-500 ${
    isDark ? "border-slate-600 bg-slate-700 text-white" : "border-gray-300 bg-white text-gray-900"
  }`

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
      case "completed": return "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
      case "pending": return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
      default: return "bg-gray-100 text-gray-700"
    }
  }

  const getStateColor = (state: string) => {
    const map: Record<string, string> = {
      welcome: "from-blue-500 to-blue-600",
      browsing_catalog: "from-purple-500 to-purple-600",
      ordering: "from-orange-500 to-orange-600",
      service: "from-green-500 to-green-600",
      waiting_payment: "from-red-500 to-red-600",
      confirmed: "from-emerald-500 to-emerald-600",
    }
    return map[state] || "from-gray-500 to-gray-600"
  }

  const getStateLabel = (state: string) => {
    const map: Record<string, string> = {
      welcome: "Bienvenida", browsing_catalog: "Catálogo",
      ordering: "Pedido", service: "Servicio",
      waiting_payment: "Pago", confirmed: "Confirmado",
    }
    return map[state] || state
  }

  const formatTime = (iso: string) =>
    new Date(iso).toLocaleTimeString("es-BO", { hour: "2-digit", minute: "2-digit" })

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("es-BO", { day: "2-digit", month: "short" })

  return (
    <div className="space-y-6">
      <div>
        <h1 className={`text-3xl font-bold ${textPrimary}`}>Conversaciones</h1>
        <p className={`mt-2 ${textSecondary}`}>Gestiona todas las conversaciones del chatbot</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ── Lista ── */}
        <div className="lg:col-span-1">
          <div className={`${cardBg} rounded-xl border ${cardBorder} p-4 shadow-sm`}>
            {/* Canal */}
            <div className="mb-4 flex gap-2">
              {(["whatsapp", "telegram"] as const).map((ch) => (
                <button
                  key={ch}
                  type="button"
                  onClick={() => setChannel(ch)}
                  className={`flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium border transition-all ${
                    channel === ch
                      ? ch === "whatsapp"
                        ? "bg-green-500 text-white border-green-600 shadow-sm"
                        : "bg-sky-500 text-white border-sky-600 shadow-sm"
                      : isDark
                      ? "bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700"
                      : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <i className={`bi bi-${ch}`}></i>
                  {ch === "whatsapp" ? "WhatsApp" : "Telegram"}
                </button>
              ))}
            </div>

            {/* Filtro */}
            <div className="mb-4">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border text-sm focus:ring-2 focus:ring-blue-500 outline-none ${
                  isDark ? "border-slate-600 bg-slate-700 text-white" : "border-gray-300 bg-white text-gray-900"
                }`}
              >
                <option value="all">Todas</option>
                <option value="active">Activas</option>
                <option value="completed">Completadas</option>
                <option value="pending">Pendientes</option>
              </select>
            </div>

            {/* Conversaciones */}
            <div className="space-y-2 max-h-[480px] overflow-y-auto pr-1">
              {loadingList ? (
                <div className="py-8 text-center">
                  <i className={`bi bi-arrow-repeat animate-spin text-2xl ${textSecondary}`}></i>
                </div>
              ) : conversations.length === 0 ? (
                <p className={`text-sm text-center py-8 ${textSecondary}`}>Sin conversaciones</p>
              ) : (
                conversations.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => void selectConversation(c.id)}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                      selectedConversation?.id === c.id
                        ? `${activeBg} border border-blue-500`
                        : isDark ? "hover:bg-slate-700" : "hover:bg-blue-50"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-1">
                      <span className={`font-medium text-sm truncate max-w-[120px] ${textPrimary}`}>
                        {c.firstName ? `${c.firstName} ${c.lastName ?? ""}` : c.phone}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(c.status)}`}>
                        {c.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs ${textSecondary}`}>{c.messageCount} mensajes</span>
                      <span className={`text-xs ${textSecondary}`}>{formatDate(c.lastMessageAt)}</span>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>

        {/* ── Detalle ── */}
        <div className="lg:col-span-2">
          {selectedConversation ? (
            <div className={`${cardBg} rounded-xl border ${cardBorder} shadow-sm overflow-hidden flex flex-col`} style={{ height: "560px" }}>
              {/* Header chat */}
              <div className={`${isDark ? "bg-slate-700" : "bg-gradient-to-r from-blue-600 to-blue-700"} text-white p-4 flex items-center justify-between shrink-0`}>
                <div>
                  <h2 className="font-bold">
                    {selectedConversation.firstName
                      ? `${selectedConversation.firstName} ${selectedConversation.lastName ?? ""}`
                      : selectedConversation.phone}
                  </h2>
                  <p className="text-xs opacity-70">{selectedConversation.phone}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-2 py-0.5 text-xs rounded-full ${getStatusColor(selectedConversation.status)}`}>
                      {selectedConversation.status}
                    </span>
                    <span className={`px-2 py-0.5 text-xs rounded-full bg-gradient-to-r ${getStateColor(selectedConversation.state)} text-white`}>
                      {getStateLabel(selectedConversation.state)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Mensajes */}
              <div className={`flex-1 overflow-y-auto p-4 space-y-3 ${isDark ? "bg-slate-800" : "bg-gray-50"}`}>
                {loadingMessages ? (
                  <div className="h-full flex items-center justify-center">
                    <i className={`bi bi-arrow-repeat animate-spin text-2xl ${textSecondary}`}></i>
                  </div>
                ) : messages.length === 0 ? (
                  <div className="h-full flex items-center justify-center">
                    <p className={`text-sm ${textSecondary}`}>No hay mensajes.</p>
                  </div>
                ) : (
                  messages.map((msg) => {
                    const isOut = msg.direction === "outbound"
                    return (
                      <div key={msg.id} className={`flex ${isOut ? "justify-end" : "justify-start"}`}>
                        <div className={`rounded-2xl px-4 py-2 max-w-[70%] shadow-sm ${
                          isOut
                            ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-br-sm"
                            : isDark
                            ? "bg-slate-700 rounded-bl-sm"
                            : "bg-white rounded-bl-sm"
                        }`}>
                          {msg.messageType === "image" && msg.mediaUrl ? (
                            <img src={msg.mediaUrl} alt="media" className="rounded-lg max-w-full mb-1" />
                          ) : msg.messageType === "image" ? (
                            <div className="flex items-center gap-2 mb-1">
                              <i className="bi bi-file-image text-lg"></i>
                              <span className="text-sm">{msg.content}</span>
                            </div>
                          ) : (
                            <p className={`text-sm whitespace-pre-wrap ${isOut ? "text-white" : textPrimary}`}>{msg.content}</p>
                          )}
                          <div className="flex items-center justify-end gap-1 mt-1">
                            <span className={`text-xs ${isOut ? "text-blue-200" : textSecondary}`}>{formatTime(msg.sentAt)}</span>
                            {isOut && (
                              <i className={`bi bi-check2${msg.status === "read" ? "-all text-sky-300" : " text-blue-200"} text-xs`}></i>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Preview archivo */}
              {file && (
                <div className={`px-4 py-2 flex items-center gap-3 border-t ${cardBorder} ${isDark ? "bg-slate-750" : "bg-blue-50"}`}>
                  <i className="bi bi-paperclip text-blue-500"></i>
                  <span className={`text-sm truncate flex-1 ${textPrimary}`}>{file.name}</span>
                  <button onClick={() => setFile(null)} className="text-red-400 hover:text-red-500">
                    <i className="bi bi-x-lg text-sm"></i>
                  </button>
                </div>
              )}

              {/* Input */}
              <div className={`border-t ${cardBorder} p-3 flex items-end gap-2 shrink-0`}>
                {/* Adjuntar archivo */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,application/pdf,.doc,.docx"
                  className="hidden"
                  onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className={`p-2 rounded-lg transition-all ${isDark ? "hover:bg-slate-600 text-slate-300" : "hover:bg-gray-100 text-gray-500"}`}
                  title="Adjuntar archivo"
                >
                  <i className="bi bi-paperclip text-lg"></i>
                </button>

                {/* Texto */}
                <textarea
                  rows={1}
                  placeholder="Escribe un mensaje..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      void handleSend()
                    }
                  }}
                  className={`${inputClass} resize-none`}
                />

                {/* Enviar */}
                <button
                  onClick={() => void handleSend()}
                  disabled={sending || (!text.trim() && !file)}
                  className="p-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-lg transition-all"
                  title="Enviar"
                >
                  {sending
                    ? <i className="bi bi-arrow-repeat animate-spin text-lg"></i>
                    : <i className="bi bi-send text-lg"></i>
                  }
                </button>
              </div>
            </div>
          ) : (
            <div className={`${cardBg} rounded-xl border ${cardBorder} p-8 text-center flex items-center justify-center border-dashed`} style={{ height: "560px" }}>
              <div>
                <i className={`bi bi-chat-dots text-5xl ${textSecondary} mb-4 block`}></i>
                <p className={`font-medium ${textPrimary}`}>Selecciona una conversación</p>
                <p className={`text-sm ${textSecondary}`}>para ver los detalles y mensajes</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}