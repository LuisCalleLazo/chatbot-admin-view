export interface ChatbotSettings {
  id?: number
  userId?: number
  schemaName: string
  messagePrincipal: string
  whatsappPhoneNumberId: string
  whatsappAccessToken: string
  whatsappWebhookVerifyToken: string // readonly - generado por backend
  telegramToken: string
}