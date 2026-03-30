// hooks/chatbot/useDashboard.ts

import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import type { DashboardSummary } from '../../interfaces/IDashboard'
import { getDashboardSummary } from '../../services/chatbot/dashboard.service'

const defaultSummary: DashboardSummary = {
  stats: {
    conversations: 0,
    customers: 0,
    orders: 0,
    revenueBs: 0,
    revenueChangePercent: 0,
    conversationsChangePercent: 0,
  },
  recentConversations: [],
  topProducts: [],
  conversationsPerDay: [],
}

export const useDashboard = () => {
  const [summary, setSummary] = useState<DashboardSummary>(defaultSummary)
  const [loading, setLoading] = useState(false)

  useEffect(() => { loadDashboard() }, [])

  const loadDashboard = async () => {
    setLoading(true)
    try {
      const response = await getDashboardSummary()
      if (response.succeeded && response.data) {
        setSummary(response.data)
      }
    } catch {
      toast.error('No se pudo cargar la información del dashboard')
    } finally {
      setLoading(false)
    }
  }

  return { summary, loading, reload: loadDashboard }
}