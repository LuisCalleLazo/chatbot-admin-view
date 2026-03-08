import axios from 'axios'
import { chatbotApi } from '../api'
import type { Response } from '../../interfaces/IResponse'
import type { ConversationChannel, ConversationSummary, ConversationDetail } from '../../interfaces/IConversation'
import { ManageErrorAxios } from '../../utils/ManageErrorAxios'

export const getConversations = async (channel: ConversationChannel) => {
  try {
    // Ajusta el endpoint y parámetros cuando tengas la API lista
    const response = await chatbotApi.get<Response<ConversationSummary[]>>('v1/conversations', {
      params: { channel },
    })
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      ManageErrorAxios(error)
    }
    throw error
  }
}

export const getConversationDetail = async (id: number, channel: ConversationChannel) => {
  try {
    const response = await chatbotApi.get<Response<ConversationDetail>>(`v1/conversations/${id}`, {
      params: { channel },
    })
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      ManageErrorAxios(error)
    }
    throw error
  }
}

