import axios from 'axios'
import { chatbotApi } from '../api'
import type { Response } from '../../interfaces/IResponse'
import type { ChatbotSettings } from '../../interfaces/IChatbotSettings'
import { ManageErrorAxios } from '../../utils/ManageErrorAxios'

export interface ChatbotSettingsPayload {
  schemaName: string
  messagePrincipal: string
  whatsappPhoneNumberId: string
  whatsappAccessToken: string
  telegramToken: string
  // whatsappWebhookVerifyToken NO se envía: es inmutable, solo lo genera el backend
}

/**
 * GET /api/config/chat
 * Obtiene la config de canales del usuario. Si no existe, el backend la crea
 * generando automáticamente el WhatsappWebhookVerifyToken.
 */
export const getChatbotSettings = async () => {
  try {
    const response = await chatbotApi.get<Response<ChatbotSettings>>('/config/chat')
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) ManageErrorAxios(error)
    throw error
  }
}

/**
 * PUT /api/config/chat
 * Actualiza la configuración de canales. El WebhookVerifyToken NO se puede cambiar.
 */
export const updateChatbotSettings = async (payload: ChatbotSettingsPayload) => {
  try {
    const response = await chatbotApi.put<Response<ChatbotSettings>>('/config/chat', payload)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) ManageErrorAxios(error)
    throw error
  }
}

/**
 * POST /api/chatbot
 * Crea el schema de base de datos para el cliente.
 * Se llama una sola vez al inicializar el chatbot del usuario.
 */
export const initializeChatbotSchema = async () => {
  try {
    const response = await chatbotApi.post<Response<boolean>>('/chatbot')
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) ManageErrorAxios(error)
    throw error
  }
}