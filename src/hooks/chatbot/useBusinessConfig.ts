import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import type { BusinessConfig } from '../../interfaces/IBusinessConfig'
import { executeAsyncAction } from '../../utils'
import {
  getBusinessConfig,
  updateBusinessConfig,
  deleteBusinessImage,
  updateBusinessImageMeta,
  type BusinessConfigPayload,
} from '../../services'

const defaultBusinessConfig: BusinessConfig = {
  id: 0,
  typeBusiness: 1,
  name: '',
  email: '',
  phoneNumber: '',
  description: '',
  methodAttention: '',
  conversationExpHours: 24,
  qrExpHours: 24,
  plan: 'Basic',
  businessImages: [],
}

export const useBusinessConfig = () => {
  const [config, setConfig] = useState<BusinessConfig>(defaultBusinessConfig)
  const [loading, setLoading] = useState<boolean>(false)
  const [saving, setSaving] = useState<boolean>(false)
  const [selectedImages, setSelectedImages] = useState<File[]>([])

  useEffect(() => {
    void loadBusinessConfig()
  }, [])

  const loadBusinessConfig = async () => {
    setLoading(true)
    await executeAsyncAction({
      asyncFunction: async () => await getBusinessConfig(),
      successAction: (response) => {
        if (response.data) {
          // Normalizar: asegura que businessImages siempre sea array
          setConfig({
            ...response.data,
            businessImages: response.data.businessImages ?? [],
          })
        }
      },
      errorAction: () => {
        toast.error('No se pudo cargar la configuración del negocio')
      },
      finalAction: () => setLoading(false),
    })
  }

  const handleFieldChange = <K extends keyof BusinessConfig>(
    field: K,
    value: BusinessConfig[K]
  ) => {
    setConfig((prev) => ({ ...prev, [field]: value }))
  }

  const handleImagesChange = (files: FileList | null) => {
    if (!files) return
    setSelectedImages(Array.from(files))
  }

  const saveBusinessConfig = async () => {
    const payload: BusinessConfigPayload = {
      typeBusiness: config.typeBusiness,
      name: config.name,
      email: config.email,
      phoneNumber: config.phoneNumber,
      description: config.description,
      methodAttention: config.methodAttention,
      conversationExpHours: config.conversationExpHours,
      qrExpHours: config.qrExpHours,
      images: selectedImages,
    }

    setSaving(true)
    await executeAsyncAction({
      asyncFunction: async () => await updateBusinessConfig(payload),
      successAction: (response) => {
        if (response.data) {
          setConfig({
            ...response.data,
            businessImages: response.data.businessImages ?? [],
          })
        }
        setSelectedImages([])
        toast.success('Configuración del negocio guardada correctamente')
      },
      errorAction: () => {
        toast.error('No se pudo guardar la configuración del negocio')
      },
      finalAction: () => setSaving(false),
    })
  }

  const handleDeleteImage = async (imageId: number) => {
    await executeAsyncAction({
      asyncFunction: async () => {
        await deleteBusinessImage(imageId)
        return { succeeded: true, message: '', data: null }
      },
      successAction: () => {
        setConfig((prev) => ({
          ...prev,
          businessImages: prev.businessImages.filter((img) => img.id !== imageId),
        }))
        toast.success('Imagen eliminada')
      },
      errorAction: () => {
        toast.error('No se pudo eliminar la imagen')
      },
    })
  }

  const handleToggleImagePrincipal = async (imageId: number, current: boolean) => {
    await executeAsyncAction({
      asyncFunction: async () => {
        await updateBusinessImageMeta(imageId, !current)
        return { succeeded: true, message: '', data: null }
      },
      successAction: () => {
        setConfig((prev) => ({
          ...prev,
          businessImages: prev.businessImages.map((img) =>
            img.id === imageId ? { ...img, isInMessagePrincipal: !current } : img
          ),
        }))
      },
      errorAction: () => {
        toast.error('No se pudo actualizar la imagen')
      },
    })
  }

  return {
    config,
    loading,
    saving,
    selectedImages,
    handleFieldChange,
    handleImagesChange,
    saveBusinessConfig,
    handleDeleteImage,
    handleToggleImagePrincipal,
    reload: loadBusinessConfig,
  }
}