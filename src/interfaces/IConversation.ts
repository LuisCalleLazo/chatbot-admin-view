export type ConversationChannel = 'whatsapp' | 'telegram'

export interface ConversationSummary {
  id: number
  phone: string
  status: string
  messages: number
  date: string
  state: string
  channel: ConversationChannel
}

export interface ConversationMessage {
  id: number
  from: 'user' | 'bot'
  text: string
  time: string
}

export interface ConversationDetail {
  conversation: ConversationSummary
  messages: ConversationMessage[]
}

