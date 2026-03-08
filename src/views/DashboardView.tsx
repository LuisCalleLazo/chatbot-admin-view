// import { useTheme } from "../context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components"
import { useDashboard } from "../hooks/chatbot/useDashboard"

const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400',
      green: 'bg-green-50 dark:bg-green-950/50 text-green-600 dark:text-green-400',
      purple: 'bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400',
      orange: 'bg-orange-50 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400',
  }
  return colors[color as keyof typeof colors]
}

const getStatusBadge = (status: string) => {
    const badges = {
      "Completado": "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
      "En proceso": "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
      "Pendiente": "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400",
    }
  return badges[status as keyof typeof badges] || badges["Pendiente"]
}

const formatBs = (amount: number) =>
  new Intl.NumberFormat('es-BO', { style: 'currency', currency: 'BOB' }).format(amount)

export const DashboardView = () => {
  // const { isDark } = useTheme()
  const { summary } = useDashboard()

  const stats = [
    {
      label: "Conversaciones",
      value: summary.stats.conversations.toLocaleString('es-BO'),
      icon: "bi-chat-dots",
      color: "blue",
      trend: `${summary.stats.conversationsChangePercent.toFixed(1)}%`,
    },
    {
      label: "Clientes",
      value: summary.stats.customers.toLocaleString('es-BO'),
      icon: "bi-people",
      color: "green",
      trend: "", // Podrás agregar cambio porcentual cuando lo tengas en la API
    },
    {
      label: "Órdenes",
      value: summary.stats.orders.toLocaleString('es-BO'),
      icon: "bi-bag-check",
      color: "purple",
      trend: "", // Igual que clientes
    },
    {
      label: "Ingresos",
      value: formatBs(summary.stats.revenueBs),
      icon: "bi-currency-dollar",
      color: "orange",
      trend: `${summary.stats.revenueChangePercent.toFixed(1)}%`,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
          Dashboard
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Resumen general de tu negocio
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat, index) => (
          <Card key={index} variant="elevated" padding="md">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  {stat.label}
                </p>
                <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-slate-100">
                  {stat.value}
                </p>
                {stat.trend && (
                  <div className="mt-2 flex items-center text-sm">
                    <span className="text-green-600 dark:text-green-400 font-medium">
                      {stat.trend}
                    </span>
                    <span className="ml-2 text-slate-500 dark:text-slate-500">
                      vs mes anterior
                    </span>
                  </div>
                )}
              </div>
              <div className={`p-3 rounded-xl ${getColorClasses(stat.color)}`}>
                <i className={`bi ${stat.icon} text-2xl`}></i>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Conversations Chart */}
        <Card variant="elevated">
          <CardHeader>
            <CardTitle>Conversaciones por día</CardTitle>
            <CardDescription>Últimos 7 días</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end gap-2">
              {(summary.conversationsPerDay.length
                ? summary.conversationsPerDay
                : [{ day: 'Sin datos', value: 0 }]
              ).map((item, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full relative group">
                    <div
                      className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg transition-all duration-300 hover:from-blue-700 hover:to-blue-500"
                      style={{ height: summary.conversationsPerDay.length ? `${(item.value / Math.max(...summary.conversationsPerDay.map(d => d.value || 1))) * 100}%` : '10%' }}
                    ></div>
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 px-2 py-1 rounded text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {item.value} conversaciones
                    </div>
                  </div>
                  <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                    {item.day}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Revenue Chart */}
        <Card variant="elevated">
          <CardHeader>
            <CardTitle>Ingresos por producto</CardTitle>
            <CardDescription>Top 3 productos este mes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {(summary.topProducts.length
                ? summary.topProducts
                : []
              ).map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {item.name}
                    </span>
                    <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                      {formatBs(item.amountBs)}
                    </span>
                  </div>
                  <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.color ?? 'bg-blue-600'} transition-all duration-500`}
                      style={{ width: `${item.valuePercent}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Conversations */}
      <Card variant="elevated">
        <CardHeader>
          <CardTitle>Conversaciones recientes</CardTitle>
          <CardDescription>Actividad de las últimas horas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Cliente
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Estado
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Hora
                  </th>
                </tr>
              </thead>
              <tbody>
                {(summary.recentConversations.length
                  ? summary.recentConversations
                  : []
                ).map((conv) => (
                  <tr
                    key={conv.id}
                    className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                  >
                    <td className="py-3 px-4 text-sm font-medium text-slate-900 dark:text-slate-100">
                      {conv.phone}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(conv.status)}`}>
                        {conv.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">
                      {conv.time}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}