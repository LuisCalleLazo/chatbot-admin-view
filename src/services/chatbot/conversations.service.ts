// src/services/conversations.service.ts
import axios from 'axios'
import { chatbotApi } from '../api'
import type { Response } from '../../interfaces/IResponse'
import type { ConversationChannel, ConversationSummary, ConversationDetail } from '../../interfaces/IConversation'
import { ManageErrorAxios } from '../../utils/ManageErrorAxios'

export const getConversations = async (channel: ConversationChannel, status?: string) => {
  try {
    const response = await chatbotApi.get<Response<ConversationSummary[]>>('chatbot/conversations', {
      params: { channel, ...(status && status !== 'all' ? { status } : {}) },
    })
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) ManageErrorAxios(error)
    throw error
  }
}

export const getConversationDetail = async (id: number, channel: ConversationChannel) => {
  try {
    const response = await chatbotApi.get<Response<ConversationDetail>>(`chatbot/conversations/${id}`, {
      params: { channel },
    })
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) ManageErrorAxios(error)
    throw error
  }
}

export const sendTextMessage = async (conversationId: number, text: string) => {
  try {
    const formData = new FormData()
    formData.append('text', text)
    const response = await chatbotApi.post<Response<{ id: number; sentAt: string }>>(
      `chatbot/conversations/${conversationId}/messages`,
      formData
    )
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) ManageErrorAxios(error)
    throw error
  }
}

export const sendFileMessage = async (conversationId: number, file: File, caption?: string) => {
  try {
    const formData = new FormData()
    formData.append('file', file)
    if (caption) formData.append('text', caption)
    const response = await chatbotApi.post<Response<{ id: number; sentAt: string }>>(
      `chatbot/conversations/${conversationId}/messages`,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    )
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) ManageErrorAxios(error)
    throw error
  }
}