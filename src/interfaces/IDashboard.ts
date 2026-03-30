// interfaces/IDashboard.ts

export interface DashboardStats {
  conversations: number
  customers: number
  orders: number
  revenueBs: number
  revenueChangePercent: number
  conversationsChangePercent: number
}

export interface DashboardRecentConversation {
  id: number
  phone: string
  status: string
  time: string
}

export interface DashboardTopProduct {
  name: string
  amountBs: number
  valuePercent: number
  color: string
}

export interface DashboardSummary {
  stats: DashboardStats
  recentConversations: DashboardRecentConversation[]
  topProducts: DashboardTopProduct[]
  conversationsPerDay: Array<{ day: string; value: number }>
}