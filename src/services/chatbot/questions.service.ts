import axios from 'axios'
import { chatbotApi } from '../api'
import { ManageErrorAxios } from '../../utils/ManageErrorAxios'
import type { Response } from '../../interfaces/IResponse'
import type { QuestionToCustomer, QuestionPayload, ExportExcelOptions } from '../../interfaces/IQuestions'

export const getQuestionsByState = async (statePresent: string) => {
  try {
    const response = await chatbotApi.get<Response<QuestionToCustomer[]>>(
      `v1/questions?statePresent=${statePresent}`
    )
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      ManageErrorAxios(error)
    }
    throw error
  }
}

export const createQuestion = async (payload: QuestionPayload) => {
  try {
    const response = await chatbotApi.post<Response<QuestionToCustomer>>('v1/questions', payload)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      ManageErrorAxios(error)
    }
    throw error
  }
}

export const updateQuestion = async (id: number, payload: Partial<QuestionPayload>) => {
  try {
    const response = await chatbotApi.put<Response<QuestionToCustomer>>(`v1/questions/${id}`, payload)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      ManageErrorAxios(error)
    }
    throw error
  }
}

export const deleteQuestion = async (id: number) => {
  try {
    const response = await chatbotApi.delete<Response<boolean>>(`v1/questions/${id}`)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      ManageErrorAxios(error)
    }
    throw error
  }
}

export const exportToExcel = async (options: ExportExcelOptions) => {
  try {
    const response = await chatbotApi.post<Response<Blob>>(
      'v1/questions/export-excel',
      options,
      {
        responseType: 'blob',
      }
    )
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      ManageErrorAxios(error)
    }
    throw error
  }
}
