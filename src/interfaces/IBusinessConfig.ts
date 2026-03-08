export interface BusinessImage {
  id: number
  businessConfigId: number
  url?: string
}

export interface BusinessConfig {
  id: number
  typeBusiness: number
  name: string
  email: string
  phoneNumber: string
  description: string
  methodAttention: string
  conversationExpHours: number
  qrExpHours: number
  plan: string
  businessImages?: BusinessImage[]
}

