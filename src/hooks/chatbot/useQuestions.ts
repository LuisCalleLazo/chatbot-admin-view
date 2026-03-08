import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { executeAsyncAction } from '../../utils'
import type { QuestionToCustomer, QuestionPayload, ExportExcelOptions } from '../../interfaces/IQuestions'
import {
  getQuestionsByState,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  exportToExcel,
} from '../../services'

export const useQuestions = () => {
  const [selectedState, setSelectedState] = useState<string>('welcome')
  const [questions, setQuestions] = useState<QuestionToCustomer[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [saving, setSaving] = useState<boolean>(false)
  const [exporting, setExporting] = useState<boolean>(false)

  useEffect(() => {
    loadQuestions()
  }, [selectedState])

  const loadQuestions = async () => {
    setLoading(true)
    await executeAsyncAction({
      asyncFunction: async () => await getQuestionsByState(selectedState),
      successAction: (response) => {
        if (response.data) {
          setQuestions(response.data)
        }
      },
      errorAction: () => {
        toast.error('No se pudieron cargar las preguntas')
      },
      finalAction: () => setLoading(false),
    })
  }

  const handleCreateQuestion = async (payload: QuestionPayload) => {
    setSaving(true)
    await executeAsyncAction({
      asyncFunction: async () => await createQuestion(payload),
      successAction: (response) => {
        if (response.data) {
          setQuestions([...questions, response.data])
          toast.success('Pregunta creada correctamente')
        }
      },
      errorAction: () => {
        toast.error('No se pudo crear la pregunta')
      },
      finalAction: () => setSaving(false),
    })
  }

  const handleUpdateQuestion = async (id: number, payload: Partial<QuestionPayload>) => {
    setSaving(true)
    await executeAsyncAction({
      asyncFunction: async () => await updateQuestion(id, payload),
      successAction: (response) => {
        if (response.data) {
          setQuestions(questions.map((q) => (q.id === id ? response.data : q)))
          toast.success('Pregunta actualizada correctamente')
        }
      },
      errorAction: () => {
        toast.error('No se pudo actualizar la pregunta')
      },
      finalAction: () => setSaving(false),
    })
  }

  const handleDeleteQuestion = async (id: number) => {
    await executeAsyncAction({
      asyncFunction: async () => await deleteQuestion(id),
      successAction: () => {
        setQuestions(questions.filter((q) => q.id !== id))
        toast.success('Pregunta eliminada correctamente')
      },
      errorAction: () => {
        toast.error('No se pudo eliminar la pregunta')
      },
    })
  }

  const handleExportToExcel = async (options: ExportExcelOptions) => {
    setExporting(true)
    await executeAsyncAction({
      asyncFunction: async () => await exportToExcel(options),
      successAction: (blob) => {
        const url = window.URL.createObjectURL(blob.data as Blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `respuestas_chatbot_${new Date().toISOString().split('T')[0]}.xlsx`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
        toast.success('Excel exportado correctamente')
      },
      errorAction: () => {
        toast.error('No se pudo exportar el Excel')
      },
      finalAction: () => setExporting(false),
    })
  }

  return {
    selectedState,
    setSelectedState,
    questions,
    loading,
    saving,
    exporting,
    handleCreateQuestion,
    handleUpdateQuestion,
    handleDeleteQuestion,
    handleExportToExcel,
    reload: loadQuestions,
  }
}
