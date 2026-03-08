import axios from 'axios'
import { chatbotApi } from '../api'
import type { Response } from '../../interfaces/IResponse'
import type { DashboardSummary } from '../../interfaces/IDashboard'
import { ManageErrorAxios } from '../../utils/ManageErrorAxios'

export const getDashboardSummary = async () => {
  try {
    // Ajusta el endpoint cuando la API esté lista
    const response = await chatbotApi.get<Response<DashboardSummary>>('v1/dashboard/summary')
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      ManageErrorAxios(error)
    }
    throw error
  }
}

