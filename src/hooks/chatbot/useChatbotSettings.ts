import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import type { ChatbotSettings } from '../../interfaces/IChatbotSettings'
import { executeAsyncAction } from '../../utils'
import {
  getChatbotSettings,
  updateChatbotSettings,
  initializeChatbotSchema,
  type ChatbotSettingsPayload,
} from '../../services'

const defaultChatbotSettings: ChatbotSettings = {
  schemaName: '',
  messagePrincipal: '',
  whatsappPhoneNumberId: '',
  whatsappAccessToken: '',
  whatsappWebhookVerifyToken: '', // solo lectura, lo genera el backend
  telegramToken: '',
}

export const useChatbotSettings = () => {
  const [settings, setSettings] = useState<ChatbotSettings>(defaultChatbotSettings)
  const [loading, setLoading] = useState<boolean>(false)
  const [saving, setSaving] = useState<boolean>(false)
  const [initializing, setInitializing] = useState<boolean>(false)
  const [schemaReady, setSchemaReady] = useState<boolean>(false)

  useEffect(() => {
    void loadSettings()
  }, [])

  const loadSettings = async () => {
    setLoading(true)
    await executeAsyncAction({
      asyncFunction: async () => await getChatbotSettings(),
      successAction: (response) => {
        if (response) {
          setSettings(response)
          // Si tiene schemaName es porque el schema ya fue inicializado
          setSchemaReady(!!response.schemaName)
        }
      },
      errorAction: () => {
        toast.error('No se pudo cargar la configuración del chatbot')
      },
      finalAction: () => setLoading(false),
    })
  }

  const handleFieldChange = <K extends keyof ChatbotSettings>(
    field: K,
    value: ChatbotSettings[K]
  ) => {
    // No permitir editar el webhookVerifyToken desde el frontend
    if (field === 'whatsappWebhookVerifyToken') return
    setSettings((prev) => ({ ...prev, [field]: value }))
  }

  const saveSettings = async () => {
    // Construir payload sin el token inmutable
    const payload: ChatbotSettingsPayload = {
      schemaName: settings.schemaName,
      messagePrincipal: settings.messagePrincipal,
      whatsappPhoneNumberId: settings.whatsappPhoneNumberId,
      whatsappAccessToken: settings.whatsappAccessToken,
      telegramToken: settings.telegramToken,
    }

    setSaving(true)
    await executeAsyncAction({
      asyncFunction: async () => await updateChatbotSettings(payload),
      successAction: (response) => {
        if (response) {
          setSettings(response)
          setSchemaReady(!!response.schemaName)
        }
        toast.success('Configuración de canales del chatbot guardada correctamente')
      },
      errorAction: () => {
        toast.error('No se pudo guardar la configuración del chatbot')
      },
      finalAction: () => setSaving(false),
    })
  }

  /**
   * Llama a POST /api/chatbot para crear el schema de BD del cliente.
   * Solo se necesita ejecutar una vez.
   */
  const initializeSchema = async () => {
    setInitializing(true)
    await executeAsyncAction({
      asyncFunction: async () => await initializeChatbotSchema(),
      successAction: (response) => {
        if (response.data) {
          setSchemaReady(true)
          toast.success('¡Chatbot inicializado correctamente! Schema de base de datos creado.')
        } else {
          toast.info('El schema ya fue inicializado previamente.')
          setSchemaReady(true)
        }
      },
      errorAction: () => {
        toast.error('No se pudo inicializar el chatbot')
      },
      finalAction: () => setInitializing(false),
    })
  }

  return {
    settings,
    loading,
    saving,
    initializing,
    schemaReady,
    handleFieldChange,
    saveSettings,
    initializeSchema,
    reload: loadSettings,
  }
}