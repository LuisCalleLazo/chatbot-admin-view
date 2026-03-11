// src/hooks/chatbot/useConversations.ts
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import type { ConversationChannel, ConversationSummary, MessageDto } from '../../interfaces/IConversation'
import { executeAsyncAction } from '../../utils'
import { getConversations, getConversationDetail, sendTextMessage, sendFileMessage } from '../../services'

export const useConversations = () => {
  const [channel, setChannel] = useState<ConversationChannel>('whatsapp')
  const [filterStatus, setFilterStatus] = useState('all')
  const [conversations, setConversations] = useState<ConversationSummary[]>([])
  const [selectedConversationId, setSelectedConversationId] = useState<number | null>(null)
  const [messages, setMessages] = useState<MessageDto[]>([])
  const [loadingList, setLoadingList] = useState(false)
  const [loadingMessages, setLoadingMessages] = useState(false)
  const [sending, setSending] = useState(false)
  const [text, setText] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    void loadConversations()
    setSelectedConversationId(null)
    setMessages([])
  }, [channel, filterStatus])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const loadConversations = async () => {
    setLoadingList(true)
    await executeAsyncAction({
      asyncFunction: async () => await getConversations(channel, filterStatus),
      successAction: (response) => setConversations(response.data ?? []),
      errorAction: () => toast.error('No se pudieron cargar las conversaciones'),
      finalAction: () => setLoadingList(false),
    })
  }

  const selectConversation = async (id: number) => {
    setSelectedConversationId(id)
    setMessages([])
    setLoadingMessages(true)
    await executeAsyncAction({
      asyncFunction: async () => await getConversationDetail(id, channel),
      successAction: (response) => setMessages(response.data?.messages ?? []),
      errorAction: () => toast.error('No se pudieron cargar los mensajes'),
      finalAction: () => setLoadingMessages(false),
    })
  }

  const handleSend = async () => {
    if (!selectedConversationId) return
    if (!text.trim() && !file) return

    setSending(true)
    await executeAsyncAction({
      asyncFunction: async () =>
        file
          ? await sendFileMessage(selectedConversationId, file, text.trim() || undefined)
          : await sendTextMessage(selectedConversationId, text.trim()),
      successAction: () => {
        // optimistic: add outbound message to list
        const newMsg: MessageDto = {
          id: Date.now(),
          direction: 'outbound',
          messageType: file ? 'image' : 'text',
          content: file ? file.name : text.trim(),
          status: 'sent',
          sentAt: new Date().toISOString(),
        }
        setMessages((prev) => [...prev, newMsg])
        setText('')
        setFile(null)
        if (fileInputRef.current) fileInputRef.current.value = ''
      },
      errorAction: () => toast.error('No se pudo enviar el mensaje'),
      finalAction: () => setSending(false),
    })
  }

  const selectedConversation = conversations.find((c) => c.id === selectedConversationId) ?? null

  return {
    channel, setChannel,
    filterStatus, setFilterStatus,
    conversations,
    selectedConversationId, selectedConversation,
    messages, messagesEndRef,
    loadingList, loadingMessages, sending,
    text, setText,
    file, setFile, fileInputRef,
    loadConversations,
    selectConversation,
    handleSend,
  }
}