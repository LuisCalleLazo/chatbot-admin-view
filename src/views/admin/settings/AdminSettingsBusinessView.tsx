import { useState } from "react"
// import { useTheme } from "../../../context"
import { Button, Input, Textarea, Select, Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../../components"

export const AdminSettingsBusinessView = () => {
  // const { isDark } = useTheme()
  const [businessType, setBusinessType] = useState("restaurant")
  const [businessName, setBusinessName] = useState("Mi Negocio")
  const [businessPhone, setBusinessPhone] = useState("+56 9 12345678")
  const [businessEmail, setBusinessEmail] = useState("contacto@minegocio.com")
  const [businessDescription, setBusinessDescription] = useState("")

  const businessTypes = [
    { id: "restaurant", label: "Restaurante", icon: "bi-cup-hot" },
    { id: "shop", label: "Tienda", icon: "bi-shop" },
    { id: "service", label: "Servicios", icon: "bi-tools" },
    { id: "delivery", label: "Delivery", icon: "bi-truck" },
    { id: "salon", label: "Salón de Belleza", icon: "bi-scissors" },
    { id: "other", label: "Otro", icon: "bi-briefcase" },
  ]

  const handleSave = () => {
    console.log({
      businessType,
      businessName,
      businessPhone,
      businessEmail,
      businessDescription,
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
          Configuración del Negocio
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Personaliza la información de tu negocio
        </p>
      </div>

      {/* Business Type Selection */}
      <Card variant="elevated">
        <CardHeader>
          <CardTitle>Tipo de negocio</CardTitle>
          <CardDescription>Selecciona la categoría que mejor describe tu negocio</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {businessTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setBusinessType(type.id)}
                className={`p-4 rounded-xl border-2 transition-all duration-200 text-center ${
                  businessType === type.id
                    ? "border-blue-600 bg-blue-50 dark:bg-blue-950/50 shadow-md"
                    : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                }`}
              >
                <i
                  className={`bi ${type.icon} text-2xl block mb-2 ${
                    businessType === type.id
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-slate-500 dark:text-slate-400"
                  }`}
                ></i>
                <span className={`text-xs font-medium ${
                  businessType === type.id 
                    ? "text-blue-600 dark:text-blue-400" 
                    : "text-slate-700 dark:text-slate-300"
                }`}>
                  {type.label}
                </span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Business Information */}
      <Card variant="elevated">
        <CardHeader>
          <CardTitle>Información del negocio</CardTitle>
          <CardDescription>Datos básicos de contacto y descripción</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Nombre del negocio"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="Nombre de tu negocio"
              leftIcon={<i className="bi bi-shop text-lg"></i>}
              fullWidth
            />

            <Input
              label="Teléfono"
              type="tel"
              value={businessPhone}
              onChange={(e) => setBusinessPhone(e.target.value)}
              placeholder="+56 9 12345678"
              leftIcon={<i className="bi bi-telephone text-lg"></i>}
              fullWidth
            />

            <div className="md:col-span-2">
              <Input
                label="Correo electrónico"
                type="email"
                value={businessEmail}
                onChange={(e) => setBusinessEmail(e.target.value)}
                placeholder="contacto@minegocio.com"
                leftIcon={<i className="bi bi-envelope text-lg"></i>}
                fullWidth
              />
            </div>

            <div className="md:col-span-2">
              <Textarea
                label="Descripción"
                value={businessDescription}
                onChange={(e) => setBusinessDescription(e.target.value)}
                placeholder="Cuéntanos sobre tu negocio..."
                rows={4}
                fullWidth
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Button 
              onClick={handleSave}
              icon={<i className="bi bi-check-circle"></i>}
              size="lg"
            >
              Guardar cambios
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Chatbot Configuration */}
      <Card variant="elevated">
        <CardHeader>
          <CardTitle>Configuración del chatbot</CardTitle>
          <CardDescription>Personaliza el comportamiento del asistente virtual</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
              label="Tono de atención"
              fullWidth
              options={[
                { value: "formal", label: "Formal" },
                { value: "casual", label: "Casual" },
                { value: "friendly", label: "Amigable" },
              ]}
            />

            <Select
              label="Horario de atención"
              fullWidth
              options={[
                { value: "24/7", label: "24/7" },
                { value: "custom", label: "Personalizado" },
              ]}
            />

            <div className="flex items-start gap-3 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
              <input
                type="checkbox"
                defaultChecked
                className="mt-1 w-5 h-5 rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
              />
              <div className="flex-1">
                <p className="font-medium text-slate-900 dark:text-slate-100">
                  Notificaciones de mensajes
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  Recibe alertas de nuevos mensajes
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
              <input
                type="checkbox"
                defaultChecked
                className="mt-1 w-5 h-5 rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
              />
              <div className="flex-1">
                <p className="font-medium text-slate-900 dark:text-slate-100">
                  Respuesta automática
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  Envía respuesta cuando no estés disponible
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security & Privacy */}
      <Card variant="elevated">
        <CardHeader>
          <CardTitle>Seguridad y privacidad</CardTitle>
          <CardDescription>Administra la seguridad de tu cuenta</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
              <div className="flex-1">
                <p className="font-medium text-slate-900 dark:text-slate-100">
                  Cambiar contraseña
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  Actualiza tu contraseña de forma regular
                </p>
              </div>
              <Button variant="outline" size="sm">
                Cambiar
              </Button>
            </div>

            <div className="border-t border-slate-200 dark:border-slate-700"></div>

            <div className="flex items-center justify-between p-4 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
              <div className="flex-1">
                <p className="font-medium text-slate-900 dark:text-slate-100">
                  Eliminar cuenta
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  Esta acción no se puede deshacer
                </p>
              </div>
              <Button variant="danger" size="sm">
                Eliminar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}