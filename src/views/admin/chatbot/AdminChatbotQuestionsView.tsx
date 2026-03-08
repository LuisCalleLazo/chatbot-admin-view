import { useState } from 'react'
import { useTheme } from '../../../context'
import { useQuestions } from '../../../hooks/chatbot/useQuestions'
import { Modal, Button, Input, Card, CardContent, CardHeader, CardTitle } from '../../../components'
import type { ExportExcelOptions } from '../../../interfaces/IQuestions'

export const AdminChatbotQuestionsView = () => {
  const { isDark } = useTheme()
  const {
    selectedState,
    setSelectedState,
    questions,
    loading,
    saving,
    exporting,
    handleCreateQuestion,
    handleDeleteQuestion,
    handleExportToExcel,
  } = useQuestions()

  const [showExportModal, setShowExportModal] = useState(false)
  const [exportOptions, setExportOptions] = useState<ExportExcelOptions>({
    includeQuestions: true,
    includeResponses: true,
    includePhone: true,
    includePaymentStatus: false,
    includeWantsServiceButNotPaid: false,
    includePaid: false,
    includeSchedule: false,
  })

  const [newQuestion, setNewQuestion] = useState('')
  const [newQuestionOptions, setNewQuestionOptions] = useState<string[]>([''])
  const [orderNumber, setOrderNumber] = useState<number>(1)
  const [editingQuestion, setEditingQuestion] = useState<number | null>(null)
  const [editQuestionText, setEditQuestionText] = useState('')
  const [editQuestionOptions, setEditQuestionOptions] = useState<string[]>([''])

  const states = [
    { id: 'welcome', label: 'Bienvenida', color: 'from-blue-500 to-blue-600' },
    { id: 'browsing_catalog', label: 'Explorando Catálogo', color: 'from-purple-500 to-purple-600' },
    { id: 'ordering', label: 'Realizando Pedido', color: 'from-orange-500 to-orange-600' },
    { id: 'service', label: 'Servicio', color: 'from-green-500 to-green-600' },
    { id: 'waiting_payment', label: 'Esperando Pago', color: 'from-red-500 to-red-600' },
    { id: 'confirmed', label: 'Confirmado', color: 'from-emerald-500 to-emerald-600' },
  ]

  const cardBg = isDark ? 'bg-slate-800/50 backdrop-blur-sm' : 'bg-white/80 backdrop-blur-sm'
  const cardBorder = isDark ? 'border-slate-700/50' : 'border-gray-200/50'
  const inputBg = isDark ? 'bg-slate-700 text-white' : 'bg-white text-gray-900'
  const inputBorder = isDark ? 'border-slate-600' : 'border-gray-300'
  const textPrimary = isDark ? 'text-slate-50' : 'text-gray-900'
  const textSecondary = isDark ? 'text-slate-400' : 'text-gray-600'

  const sortedQuestions = [...questions].sort((a, b) => a.orderNumber - b.orderNumber)

  const handleAddOption = (index: number) => {
    const newOptions = [...newQuestionOptions]
    newOptions.splice(index + 1, 0, '')
    setNewQuestionOptions(newOptions)
  }

  const handleRemoveOption = (index: number) => {
    if (newQuestionOptions.length > 1) {
      const newOptions = newQuestionOptions.filter((_, i) => i !== index)
      setNewQuestionOptions(newOptions)
    }
  }

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...newQuestionOptions]
    newOptions[index] = value
    setNewQuestionOptions(newOptions)
  }

  const handleSubmitQuestion = () => {
    if (!newQuestion.trim()) {
      return
    }

    const options = newQuestionOptions.filter((opt) => opt.trim() !== '')
    const payload = {
      statePresent: selectedState,
      orderNumber,
      question: newQuestion,
      options: options.length > 0 ? options : undefined,
    }

    handleCreateQuestion(payload)
    setNewQuestion('')
    setNewQuestionOptions([''])
    setOrderNumber(1)
  }

  const handleStartEdit = (question: typeof questions[0]) => {
    setEditingQuestion(question.id)
    setEditQuestionText(question.question)
    setEditQuestionOptions(question.options && question.options.length > 0 ? question.options : [''])
  }

  const handleCancelEdit = () => {
    setEditingQuestion(null)
    setEditQuestionText('')
    setEditQuestionOptions([''])
  }

  const handleSaveEdit = async (id: number) => {
    const options = editQuestionOptions.filter((opt) => opt.trim() !== '')
    // Aquí podrías llamar a handleUpdateQuestion si lo implementas
    handleCancelEdit()
  }

  const handleExport = () => {
    handleExportToExcel(exportOptions)
    setShowExportModal(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className={`text-3xl font-bold ${textPrimary}`}>Preguntas y Respuestas</h1>
          <p className={`mt-2 ${textSecondary}`}>
            Configura preguntas personalizadas para cada estado del chatbot
          </p>
        </div>
        <Button
          onClick={() => setShowExportModal(true)}
          icon={<i className="bi bi-download"></i>}
          variant="primary"
        >
          Exportar a Excel
        </Button>
      </div>

      {/* States Selection */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {states.map((state) => (
          <button
            key={state.id}
            onClick={() => setSelectedState(state.id)}
            className={`px-4 py-3 rounded-lg font-medium transition-all duration-200 text-white ${
              selectedState === state.id
                ? `bg-gradient-to-r ${state.color} shadow-lg scale-105`
                : `bg-gradient-to-r ${state.color} opacity-60 hover:opacity-100`
            }`}
          >
            {state.label}
          </button>
        ))}
      </div>

      {/* Add Question Form */}
      <Card variant="elevated">
        <CardHeader>
          <CardTitle>Agregar pregunta</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <Input
                  label="Pregunta"
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  placeholder="¿Qué deseas preguntar?"
                  fullWidth
                  disabled={loading || saving}
                />
              </div>
              <div>
                <Input
                  label="Orden"
                  type="number"
                  min={1}
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(Number(e.target.value) || 1)}
                  fullWidth
                  disabled={loading || saving}
                />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium ${textPrimary} mb-2`}>
                Opciones (dejar vacío para respuesta abierta)
              </label>
              <div className="space-y-2">
                {newQuestionOptions.map((option, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={option}
                      onChange={(e) => handleOptionChange(index, e.target.value)}
                      placeholder={`Opción ${index + 1}`}
                      fullWidth
                      disabled={loading || saving}
                    />
                    {newQuestionOptions.length > 1 && (
                      <button
                        onClick={() => handleRemoveOption(index)}
                        className={`px-3 py-2 rounded-lg transition-all ${
                          isDark
                            ? 'hover:bg-slate-700 text-red-400'
                            : 'hover:bg-red-50 text-red-600'
                        }`}
                        disabled={loading || saving}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    )}
                    <button
                      onClick={() => handleAddOption(index)}
                      className={`px-3 py-2 rounded-lg transition-all ${
                        isDark
                          ? 'hover:bg-slate-700 text-blue-400'
                          : 'hover:bg-blue-50 text-blue-600'
                      }`}
                      disabled={loading || saving}
                    >
                      <i className="bi bi-plus-circle"></i>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                onClick={handleSubmitQuestion}
                icon={<i className="bi bi-plus-circle"></i>}
                loading={saving}
                disabled={loading || !newQuestion.trim()}
              >
                Agregar pregunta
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Questions List */}
      <div className="space-y-4">
        {loading ? (
          <Card variant="elevated">
            <CardContent>
              <div className="text-center py-8">
                <i className={`bi bi-hourglass-split text-4xl ${textSecondary} mb-4 block animate-spin`}></i>
                <p className={`font-medium ${textPrimary}`}>Cargando preguntas...</p>
              </div>
            </CardContent>
          </Card>
        ) : sortedQuestions.length === 0 ? (
          <Card variant="elevated">
            <CardContent>
              <div className="text-center py-8 border-dashed">
                <i className={`bi bi-inbox text-4xl ${textSecondary} mb-4 block`}></i>
                <p className={`font-medium ${textPrimary}`}>No hay preguntas aún</p>
                <p className={`text-sm ${textSecondary}`}>Agrega preguntas para este estado</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          sortedQuestions.map((question) => (
            <Card key={question.id} variant="elevated">
              <CardContent>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                        Orden #{question.orderNumber}
                      </span>
                      {question.options && question.options.length > 0 ? (
                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                          Opción múltiple ({question.options.length} opciones)
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300">
                          Respuesta abierta
                        </span>
                      )}
                    </div>
                    {editingQuestion === question.id ? (
                      <div className="space-y-2">
                        <Input
                          value={editQuestionText}
                          onChange={(e) => setEditQuestionText(e.target.value)}
                          fullWidth
                        />
                        {editQuestionOptions.map((opt, idx) => (
                          <Input
                            key={idx}
                            value={opt}
                            onChange={(e) => {
                              const newOpts = [...editQuestionOptions]
                              newOpts[idx] = e.target.value
                              setEditQuestionOptions(newOpts)
                            }}
                            placeholder={`Opción ${idx + 1}`}
                            fullWidth
                          />
                        ))}
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => handleSaveEdit(question.id)}>
                            Guardar
                          </Button>
                          <Button size="sm" variant="ghost" onClick={handleCancelEdit}>
                            Cancelar
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className={`font-medium ${textPrimary} mb-2`}>{question.question}</p>
                        {question.options && question.options.length > 0 && (
                          <ul className="list-disc list-inside space-y-1 mt-2">
                            {question.options.map((option, idx) => (
                              <li key={idx} className={`text-sm ${textSecondary}`}>
                                {option}
                              </li>
                            ))}
                          </ul>
                        )}
                      </>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleStartEdit(question)}
                      className={`p-2 rounded-lg transition-all ${
                        isDark ? 'hover:bg-slate-700 text-blue-400' : 'hover:bg-blue-50 text-blue-600'
                      }`}
                      disabled={loading || saving}
                    >
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button
                      onClick={() => handleDeleteQuestion(question.id)}
                      className={`p-2 rounded-lg transition-all ${
                        isDark ? 'hover:bg-slate-700 text-red-400' : 'hover:bg-red-50 text-red-600'
                      }`}
                      disabled={loading || saving}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Export Modal */}
      <Modal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        title="Exportar a Excel"
        description="Selecciona qué datos deseas incluir en el archivo Excel"
        size="lg"
        footer={
          <>
            <Button variant="ghost" onClick={() => setShowExportModal(false)} disabled={exporting}>
              Cancelar
            </Button>
            <Button onClick={handleExport} loading={exporting} disabled={exporting}>
              Exportar
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={exportOptions.includeQuestions}
                onChange={(e) =>
                  setExportOptions({ ...exportOptions, includeQuestions: e.target.checked })
                }
                className="w-5 h-5 rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-slate-700 dark:text-slate-300 font-medium">
                Incluir preguntas
              </span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={exportOptions.includeResponses}
                onChange={(e) =>
                  setExportOptions({ ...exportOptions, includeResponses: e.target.checked })
                }
                className="w-5 h-5 rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-slate-700 dark:text-slate-300 font-medium">
                Incluir respuestas
              </span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={exportOptions.includePhone}
                onChange={(e) =>
                  setExportOptions({ ...exportOptions, includePhone: e.target.checked })
                }
                className="w-5 h-5 rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-slate-700 dark:text-slate-300 font-medium">
                Incluir datos de celular
              </span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={exportOptions.includePaymentStatus}
                onChange={(e) =>
                  setExportOptions({ ...exportOptions, includePaymentStatus: e.target.checked })
                }
                className="w-5 h-5 rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-slate-700 dark:text-slate-300 font-medium">
                Incluir estado de pago
              </span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={exportOptions.includeWantsServiceButNotPaid}
                onChange={(e) =>
                  setExportOptions({
                    ...exportOptions,
                    includeWantsServiceButNotPaid: e.target.checked,
                  })
                }
                className="w-5 h-5 rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-slate-700 dark:text-slate-300 font-medium">
                Incluir si quiere el servicio pero no pagó
              </span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={exportOptions.includePaid}
                onChange={(e) =>
                  setExportOptions({ ...exportOptions, includePaid: e.target.checked })
                }
                className="w-5 h-5 rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-slate-700 dark:text-slate-300 font-medium">
                Incluir si pagó
              </span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={exportOptions.includeSchedule}
                onChange={(e) =>
                  setExportOptions({ ...exportOptions, includeSchedule: e.target.checked })
                }
                className="w-5 h-5 rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-slate-700 dark:text-slate-300 font-medium">
                Incluir horario (si hay)
              </span>
            </label>
          </div>
        </div>
      </Modal>
    </div>
  )
}
