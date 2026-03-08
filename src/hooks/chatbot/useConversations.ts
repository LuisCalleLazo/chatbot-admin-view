import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import type { ConversationChannel, ConversationSummary, ConversationMessage } from '../../interfaces/IConversation'
import { executeAsyncAction } from '../../utils'
import { getConversations, getConversationDetail } from '../../services'

const defaultChannel: ConversationChannel = 'whatsapp'

export const useConversations = () => {
  const [channel, setChannel] = useState<ConversationChannel>(defaultChannel)
  const [conversations, setConversations] = useState<ConversationSummary[]>([])
  const [selectedConversationId, setSelectedConversationId] = useState<number | null>(null)
  const [messages, setMessages] = useState<ConversationMessage[]>([])
  const [loadingList, setLoadingList] = useState<boolean>(false)
  const [loadingMessages, setLoadingMessages] = useState<boolean>(false)

  useEffect(() => {
    void loadConversations()
    setSelectedConversationId(null)
    setMessages([])
  }, [channel])

  const loadConversations = async () => {
    setLoadingList(true)
    await executeAsyncAction({
      asyncFunction: async () => await getConversations(channel),
      successAction: (response) => {
        setConversations(response.data ?? [])
      },
      errorAction: () => {
        toast.error('No se pudieron cargar las conversaciones')
      },
      finalAction: () => setLoadingList(false),
    })
  }

  const selectConversation = async (id: number) => {
    setSelectedConversationId(id)
    setLoadingMessages(true)
    await executeAsyncAction({
      asyncFunction: async () => await getConversationDetail(id, channel),
      successAction: (response) => {
        setMessages(response.data?.messages ?? [])
      },
      errorAction: () => {
        toast.error('No se pudieron cargar los mensajes de la conversación')
      },
      finalAction: () => setLoadingMessages(false),
    })
  }

  const selectedConversation =
    conversations.find((c) => c.id === selectedConversationId) ?? null

  return {
    channel,
    setChannel,
    conversations,
    selectedConversationId,
    selectedConversation,
    messages,
    loadingList,
    loadingMessages,
    loadConversations,
    selectConversation,
  }
}

