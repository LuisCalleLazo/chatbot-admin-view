import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import type { BusinessConfig } from '../../interfaces/IBusinessConfig'
import { executeAsyncAction } from '../../utils'
import { getBusinessConfig, updateBusinessConfig, type BusinessConfigPayload } from '../../services'

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
    loadBusinessConfig()
  }, [])

  const loadBusinessConfig = async () => {
    setLoading(true)
    await executeAsyncAction({
      asyncFunction: async () => await getBusinessConfig(),
      successAction: (response) => {
        if (response.data) {
          setConfig(response.data)
        }
      },
      errorAction: () => {
        toast.error('No se pudo cargar la configuración del negocio')
      },
      finalAction: () => setLoading(false),
    })
  }

  const handleFieldChange = <K extends keyof BusinessConfig>(field: K, value: BusinessConfig[K]) => {
    setConfig((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleImagesChange = (files: FileList | null) => {
    if (!files) return
    const filesArray = Array.from(files)
    setSelectedImages(filesArray)
  }

  const saveBusinessConfig = async () => {
    const payload: BusinessConfigPayload = {
      ...config,
      images: selectedImages,
    }

    setSaving(true)
    await executeAsyncAction({
      asyncFunction: async () => await updateBusinessConfig(payload),
      successAction: (response) => {
        if (response.data) {
          setConfig(response.data)
        }
        setSelectedImages([])
        toast.success('Configuración de negocio guardada correctamente')
      },
      errorAction: () => {
        toast.error('No se pudo guardar la configuración del negocio')
      },
      finalAction: () => setSaving(false),
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
    reload: loadBusinessConfig,
  }
}

