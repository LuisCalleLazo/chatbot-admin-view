// src/interfaces/IConversation.ts
export type ConversationChannel = 'whatsapp' | 'telegram'

export interface ConversationSummary {
  id: number
  phone: string
  firstName?: string
  lastName?: string
  status: 'active' | 'completed' | 'pending'
  state: string
  messageCount: number
  lastMessageAt: string
  startedAt: string
}

export interface MessageDto {
  id: number
  direction: 'inbound' | 'outbound'
  messageType: 'text' | 'image' | 'interactive' | 'button'
  content: string
  mediaUrl?: string
  status: string
  sentAt: string
}

export interface ConversationDetail extends ConversationSummary {
  messages: MessageDto[]
}