import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import type { DashboardSummary } from '../../interfaces/IDashboard'
import { executeAsyncAction } from '../../utils'
import { getDashboardSummary } from '../../services'

const defaultDashboardSummary: DashboardSummary = {
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
  const [summary, setSummary] = useState<DashboardSummary>(defaultDashboardSummary)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    loadDashboard()
  }, [])

  const loadDashboard = async () => {
    setLoading(true)
    await executeAsyncAction({
      asyncFunction: async () => await getDashboardSummary(),
      successAction: (response) => {
        if (response.data) {
          setSummary(response.data)
        }
      },
      errorAction: () => {
        toast.error('No se pudo cargar la información del dashboard')
      },
      finalAction: () => setLoading(false),
    })
  }

  return {
    summary,
    loading,
    reload: loadDashboard,
  }
}

