import axios from 'axios'
import { chatbotApi } from '../api'
import type { Response } from '../../interfaces/IResponse'
import type { ChatbotSettings } from '../../interfaces/IChatbotSettings'
import { ManageErrorAxios } from '../../utils/ManageErrorAxios'

export const getChatbotSettings = async () => {
  try {
    // Ajusta el endpoint cuando tengas la API lista
    const response = await chatbotApi.get<Response<ChatbotSettings>>('v1/chatbot-settings')
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      ManageErrorAxios(error)
    }
    throw error
  }
}

export const updateChatbotSettings = async (payload: ChatbotSettings) => {
  try {
    // Ajusta método (POST/PUT) y endpoint según tu API
    const response = await chatbotApi.put<Response<ChatbotSettings>>('v1/chatbot-settings', payload)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      ManageErrorAxios(error)
    }
    throw error
  }
}

