import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import type { ChatbotSettings } from '../../interfaces/IChatbotSettings'
import { executeAsyncAction } from '../../utils'
import { getChatbotSettings, updateChatbotSettings } from '../../services'

const defaultChatbotSettings: ChatbotSettings = {
  whatsappPhoneNumberId: '',
  whatsappAccessToken: '',
  whatsappApiUrl: '',
  whatsappWebhookVerifyToken: '',
  telegramToken: '',
}

export const useChatbotSettings = () => {
  const [settings, setSettings] = useState<ChatbotSettings>(defaultChatbotSettings)
  const [loading, setLoading] = useState<boolean>(false)
  const [saving, setSaving] = useState<boolean>(false)

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    setLoading(true)
    await executeAsyncAction({
      asyncFunction: async () => await getChatbotSettings(),
      successAction: (response) => {
        if (response.data) {
          setSettings(response.data)
        }
      },
      errorAction: () => {
        toast.error('No se pudo cargar la configuración del chatbot')
      },
      finalAction: () => setLoading(false),
    })
  }

  const handleFieldChange = <K extends keyof ChatbotSettings>(field: K, value: ChatbotSettings[K]) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const saveSettings = async () => {
    setSaving(true)
    await executeAsyncAction({
      asyncFunction: async () => await updateChatbotSettings(settings),
      successAction: (response) => {
        if (response.data) {
          setSettings(response.data)
        }
        toast.success('Configuración de canales del chatbot guardada correctamente')
      },
      errorAction: () => {
        toast.error('No se pudo guardar la configuración del chatbot')
      },
      finalAction: () => setSaving(false),
    })
  }

  return {
    settings,
    loading,
    saving,
    handleFieldChange,
    saveSettings,
    reload: loadSettings,
  }
}

