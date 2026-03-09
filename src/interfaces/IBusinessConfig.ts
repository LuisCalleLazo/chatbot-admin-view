export interface BusinessImage {
  id: number
  businessConfigId: number
  file: string
  isInMessagePrincipal: boolean
  url?: string // alias para mostrar en UI
}

export interface BusinessConfig {
  id: number
  typeBusiness: number
  qrStatic?: string
  name: string
  email: string
  phoneNumber: string
  description: string
  methodAttention: string
  conversationExpHours: number
  qrExpHours: number
  plan: string
  businessImages: BusinessImage[]
}