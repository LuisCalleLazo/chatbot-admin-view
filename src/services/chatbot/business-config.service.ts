import axios from 'axios'
import { chatbotApi } from '../api'
import type { Response } from '../../interfaces/IResponse'
import type { BusinessConfig } from '../../interfaces/IBusinessConfig'
import { ManageErrorAxios } from '../../utils/ManageErrorAxios'

export interface BusinessConfigPayload extends Omit<BusinessConfig, 'businessImages'> {
  images?: File[]
}

export const getBusinessConfig = async () => {
  try {
    // Ajusta el endpoint cuando tengas la API lista
    const response = await chatbotApi.get<Response<BusinessConfig>>('v1/business-config')
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      ManageErrorAxios(error)
    }
    throw error
  }
}

export const updateBusinessConfig = async (payload: BusinessConfigPayload) => {
  try {
    const formData = new FormData()

    if (payload.id) {
      formData.append('id', String(payload.id))
    }

    formData.append('typeBusiness', String(payload.typeBusiness))
    formData.append('name', payload.name)
    formData.append('email', payload.email)
    formData.append('phoneNumber', payload.phoneNumber)
    formData.append('description', payload.description)
    formData.append('methodAttention', payload.methodAttention)
    formData.append('conversationExpHours', String(payload.conversationExpHours))
    formData.append('qrExpHours', String(payload.qrExpHours))
    formData.append('plan', payload.plan)

    if (payload.images && payload.images.length > 0) {
      payload.images.forEach((file, index) => {
        // Ajusta el nombre del campo según lo que espere tu API (por ejemplo "images", "businessImages", etc.)
        formData.append(`images[${index}]`, file)
      })
    }

    // Ajusta método (POST/PUT) y endpoint según tu API
    const response = await chatbotApi.put<Response<BusinessConfig>>('v1/business-config', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      ManageErrorAxios(error)
    }
    throw error
  }
}

