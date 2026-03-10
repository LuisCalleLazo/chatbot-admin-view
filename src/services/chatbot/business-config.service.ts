import axios from 'axios'
import { chatbotApi } from '../api'
import type { BusinessConfig } from '../../interfaces/IBusinessConfig'
import { ManageErrorAxios } from '../../utils/ManageErrorAxios'

export interface BusinessConfigPayload {
  typeBusiness: number
  name: string
  email: string
  phoneNumber: string
  description: string
  methodAttention: string
  conversationExpHours: number
  qrExpHours: number
  images?: File[]
}

/**
 * GET /api/config/business
 * Obtiene la config del negocio. Si no existe, el backend la crea automáticamente.
 */
export const getBusinessConfig = async () => {
  try {
    const response = await chatbotApi.get<BusinessConfig>('/config/business')
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) ManageErrorAxios(error)
    throw error
  }
}

/**
 * PUT /api/config/business
 * Actualiza los campos de configuración del negocio.
 */
export const updateBusinessConfig = async (payload: BusinessConfigPayload) => {
  try {
    // Separar campos de texto e imágenes
    const { images, ...fields } = payload

    // 1. Actualizar datos del negocio
    const response = await chatbotApi.put<BusinessConfig>('/config/business', fields)

    // 2. Subir imágenes nuevas si hay
    if (images && images.length > 0) {
      await uploadBusinessImages(images)
    }

    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) ManageErrorAxios(error)
    throw error
  }
}

/**
 * POST /api/config/business/images
 * Sube imágenes al negocio. Cada imagen se sube individualmente.
 */
export const uploadBusinessImages = async (files: File[], isInMessagePrincipal = false) => {
  try {
    const uploadPromises = files.map((file) => {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('isInMessagePrincipal', String(isInMessagePrincipal))
      return chatbotApi.post('/config/business/images', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
    })
    await Promise.all(uploadPromises)
  } catch (error) {
    if (axios.isAxiosError(error)) ManageErrorAxios(error)
    throw error
  }
}

/**
 * PATCH /api/config/business/images/:imageId
 * Actualiza metadatos de una imagen (isInMessagePrincipal).
 */
export const updateBusinessImageMeta = async (imageId: number, isInMessagePrincipal: boolean) => {
  try {
    const response = await chatbotApi.patch(`/config/business/images/${imageId}`, {
      isInMessagePrincipal,
    })
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) ManageErrorAxios(error)
    throw error
  }
}

/**
 * DELETE /api/config/business/images/:imageId
 * Elimina una imagen del negocio.
 */
export const deleteBusinessImage = async (imageId: number) => {
  try {
    await chatbotApi.delete(`/config/business/images/${imageId}`)
  } catch (error) {
    if (axios.isAxiosError(error)) ManageErrorAxios(error)
    throw error
  }
}