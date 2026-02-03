
import { useState } from "react"
import { useTheme } from "../../../context"

export const AdminChatbotQuestionsView = () => {
  const { isDark } = useTheme()
  const [selectedState, setSelectedState] = useState("welcome")
  const [questions, setQuestions] = useState<
    Array<{ id: number; text: string; type: string; position: string; responses: Record<string, any> }>
  >([])
  const [newQuestion, setNewQuestion] = useState("")
  const [questionType, setQuestionType] = useState("multiple")
  const [questionPosition, setQuestionPosition] = useState("start")

  const states = [
    { id: "welcome", label: "Bienvenida", color: "from-blue-500 to-blue-600" },
    { id: "browsing_catalog", label: "Explorando Catálogo", color: "from-purple-500 to-purple-600" },
    { id: "ordering", label: "Realizando Pedido", color: "from-orange-500 to-orange-600" },
    { id: "service", label: "Servicio", color: "from-green-500 to-green-600" },
    { id: "waiting_payment", label: "Esperando Pago", color: "from-red-500 to-red-600" },
    { id: "confirmed", label: "Confirmado", color: "from-emerald-500 to-emerald-600" },
  ]

  const cardBg = isDark ? "bg-slate-800/50 backdrop-blur-sm" : "bg-white/80 backdrop-blur-sm"
  const cardBorder = isDark ? "border-slate-700/50" : "border-gray-200/50"
  const inputBg = isDark ? "bg-slate-700 text-white" : "bg-white text-gray-900"
  const inputBorder = isDark ? "border-slate-600" : "border-gray-300"
  const textPrimary = isDark ? "text-slate-50" : "text-gray-900"
  const textSecondary = isDark ? "text-slate-400" : "text-gray-600"

  const addQuestion = () => {
    if (newQuestion.trim()) {
      const newQ = {
        id: Date.now(),
        text: newQuestion,
        type: questionType,
        position: questionPosition,
        responses: {},
      }
      setQuestions([...questions, newQ])
      setNewQuestion("")
    }
  }

  const removeQuestion = (id: number) => {
    setQuestions(questions.filter((q) => q.id !== id))
  }

  const downloadResponses = () => {
    const content =
      "Cliente,Pregunta,Respuesta,Fecha\n" +
      questions
        .map((q) => `+56 9 XXXXXXXX,"${q.text}","Respuesta del cliente",${new Date().toLocaleDateString()}`)
        .join("\n")

    const element = document.createElement("a")
    element.setAttribute("href", "data:text/csv;charset=utf-8," + encodeURIComponent(content))
    element.setAttribute("download", "respuestas_chatbot.csv")
    element.style.display = "none"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className={`text-3xl font-bold ${textPrimary}`}>Preguntas y Respuestas</h1>
          <p className={`mt-2 ${textSecondary}`}>Configura preguntas personalizadas para cada estado del chatbot</p>
        </div>
        <button
          onClick={downloadResponses}
          className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white font-medium rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-md"
        >
          <i className="bi bi-download mr-2"></i>
          Descargar Excel
        </button>
      </div>

      {/* States Selection */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {states.map((state) => (
          <button
            key={state.id}
            onClick={() => setSelectedState(state.id)}
            className={`px-4 py-3 rounded-lg font-medium transition-all duration-200 text-white ${
              selectedState === state.id ? `bg-gradient-to-r ${state.color} shadow-lg scale-105` : `bg-gradient-to-r ${state.color} opacity-60 hover:opacity-100`
            }`}
          >
            {state.label}
          </button>
        ))}
      </div>

      {/* Add Question Form */}
      <div className={`${cardBg} rounded-xl border ${cardBorder} p-6 shadow-sm`}>
        <h2 className={`text-lg font-bold ${textPrimary} mb-4`}>Agregar pregunta</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className={`block text-sm font-medium ${textPrimary} mb-2`}>Pregunta</label>
            <input
              type="text"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              placeholder="¿Qué deseas preguntar?"
              className={`w-full px-4 py-2 rounded-lg border ${inputBorder} ${inputBg} focus:ring-2 focus:ring-blue-500 outline-none transition-all`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium ${textPrimary} mb-2`}>Tipo</label>
            <select
              value={questionType}
              onChange={(e) => setQuestionType(e.target.value)}
              className={`w-full px-4 py-2 rounded-lg border ${inputBorder} ${inputBg} focus:ring-2 focus:ring-blue-500 outline-none transition-all`}
            >
              <option value="multiple">Múltiple</option>
              <option value="open">Abierta</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className={`block text-sm font-medium ${textPrimary} mb-2`}>Mostrar en</label>
            <select
              value={questionPosition}
              onChange={(e) => setQuestionPosition(e.target.value)}
              className={`w-full px-4 py-2 rounded-lg border ${inputBorder} ${inputBg} focus:ring-2 focus:ring-blue-500 outline-none transition-all`}
            >
              <option value="start">Inicio del estado</option>
              <option value="end">Final del estado</option>
            </select>
          </div>

          <button
            onClick={addQuestion}
            className="mt-6 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md"
          >
            <i className="bi bi-plus-circle mr-2"></i>
            Agregar pregunta
          </button>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {questions.length === 0 ? (
          <div
            className={`${cardBg} rounded-xl border ${cardBorder} p-8 text-center border-dashed`}
          >
            <i className={`bi bi-inbox text-4xl ${textSecondary} mb-4 block`}></i>
            <p className={`font-medium ${textPrimary}`}>No hay preguntas aún</p>
            <p className={`text-sm ${textSecondary}`}>Agrega preguntas para este estado</p>
          </div>
        ) : (
          questions.map((question) => (
            <div key={question.id} className={`${cardBg} rounded-xl border ${cardBorder} p-4 shadow-sm`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className={`font-medium ${textPrimary}`}>{question.text}</p>
                  <div className="flex gap-3 mt-2">
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                      {question.type === "multiple" ? "Opción múltiple" : "Respuesta abierta"}
                    </span>
                    <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300">
                      {question.position === "start" ? "Al inicio" : "Al final"}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => removeQuestion(question.id)}
                  className={`p-2 rounded-lg transition-all ${isDark ? "hover:bg-slate-700 text-red-400" : "hover:bg-red-50 text-red-600"}`}
                >
                  <i className="bi bi-trash"></i>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
