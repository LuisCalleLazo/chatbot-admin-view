import { Button, Input, Textarea, Select, Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../../components"
import { useBusinessConfig } from "../../../hooks/chatbot/useBusinessConfig"

const businessTypes = [
  // TypeBusiness enum:
  // 1 FoodAndBeverage, 2 RetailStore, 3 ServiceWithAppointment,
  // 4 DigitalBusiness, 5 Accommodation, 6 DeliveryOnly, 7 EventBased
  { id: 1, label: "Comida y Bebidas", icon: "bi-cup-hot" }, // FoodAndBeverage
  { id: 2, label: "Tienda física / Retail", icon: "bi-shop" }, // RetailStore
  { id: 3, label: "Servicios con cita", icon: "bi-calendar2-check" }, // ServiceWithAppointment
  { id: 4, label: "Negocio digital", icon: "bi-pc-display" }, // DigitalBusiness
  { id: 5, label: "Alojamiento / Hotelería", icon: "bi-building" }, // Accommodation
  { id: 6, label: "Solo delivery", icon: "bi-truck" }, // DeliveryOnly
  { id: 7, label: "Eventos", icon: "bi-calendar-event" }, // EventBased
]

const planOptions = [
  { value: "Basic", label: "Basic" },
  { value: "Professional", label: "Professional" },
  { value: "Enterprise", label: "Enterprise" },
]

export const AdminSettingsBusinessView = () => {
  const {
    config,
    loading,
    saving,
    selectedImages,
    handleFieldChange,
    handleImagesChange,
    saveBusinessConfig,
  } = useBusinessConfig()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    void saveBusinessConfig()
  }

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
          Configuración del Negocio
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Define la información principal de tu negocio y cómo se mostrará en el chatbot.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
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
                  type="button"
                  onClick={() => handleFieldChange("typeBusiness", type.id)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 text-center ${
                    config.typeBusiness === type.id
                      ? "border-blue-600 bg-blue-50 dark:bg-blue-950/50 shadow-md"
                      : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  }`}
                >
                  <i
                    className={`bi ${type.icon} text-2xl block mb-2 ${
                      config.typeBusiness === type.id
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-slate-500 dark:text-slate-400"
                    }`}
                  ></i>
                  <span
                    className={`text-xs font-medium ${
                      config.typeBusiness === type.id
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    {type.label}
                  </span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated">
          <CardHeader>
            <CardTitle>Información del negocio</CardTitle>
            <CardDescription>Datos básicos de contacto y descripción</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Nombre del negocio"
                value={config.name}
                onChange={(e) => handleFieldChange("name", e.target.value)}
                placeholder="Nombre de tu negocio"
                leftIcon={<i className="bi bi-shop text-lg"></i>}
                fullWidth
                disabled={loading}
              />

              <Input
                label="Teléfono"
                type="tel"
                value={config.phoneNumber}
                onChange={(e) => handleFieldChange("phoneNumber", e.target.value)}
                placeholder="+56 9 12345678"
                leftIcon={<i className="bi bi-telephone text-lg"></i>}
                fullWidth
                disabled={loading}
              />

              <div className="md:col-span-2">
                <Input
                  label="Correo electrónico"
                  type="email"
                  value={config.email}
                  onChange={(e) => handleFieldChange("email", e.target.value)}
                  placeholder="contacto@minegocio.com"
                  leftIcon={<i className="bi bi-envelope text-lg"></i>}
                  fullWidth
                  disabled={loading}
                />
              </div>

              <div className="md:col-span-2">
                <Textarea
                  label="Descripción"
                  value={config.description}
                  onChange={(e) => handleFieldChange("description", e.target.value)}
                  placeholder="Cuéntanos sobre tu negocio..."
                  rows={4}
                  fullWidth
                  disabled={loading}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated">
          <CardHeader>
            <CardTitle>Atención y expiración</CardTitle>
            <CardDescription>Configura cómo y por cuánto tiempo se mantienen activas las conversaciones</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Input
                label="Método de atención"
                value={config.methodAttention}
                onChange={(e) => handleFieldChange("methodAttention", e.target.value)}
                placeholder="Presencial, Delivery, Mixto, etc."
                leftIcon={<i className="bi bi-people text-lg"></i>}
                fullWidth
                disabled={loading}
              />

              <Input
                label="Exp. conversación (horas)"
                type="number"
                min={1}
                value={config.conversationExpHours}
                onChange={(e) =>
                  handleFieldChange("conversationExpHours", Number(e.target.value) || 0)
                }
                placeholder="24"
                leftIcon={<i className="bi bi-clock-history text-lg"></i>}
                fullWidth
                disabled={loading}
              />

              <Input
                label="Exp. QR (horas)"
                type="number"
                min={1}
                value={config.qrExpHours}
                onChange={(e) => handleFieldChange("qrExpHours", Number(e.target.value) || 0)}
                placeholder="24"
                leftIcon={<i className="bi bi-qr-code text-lg"></i>}
                fullWidth
                disabled={loading}
              />

              <div className="md:col-span-3">
                <Select
                  label="Plan"
                  fullWidth
                  value={config.plan}
                  onChange={(e) => handleFieldChange("plan", e.target.value)}
                  options={planOptions}
                  disabled={loading}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated">
          <CardHeader>
            <CardTitle>Imágenes del negocio</CardTitle>
            <CardDescription>
              Sube imágenes que se usarán en el chatbot (logo, portada, galería, etc.)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => handleImagesChange(e.target.files)}
                fullWidth
              />

              {selectedImages.length > 0 && (
                <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 p-4">
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
                    Imágenes seleccionadas ({selectedImages.length})
                  </p>
                  <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-300">
                    {selectedImages.map((file, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <i className="bi bi-image text-blue-500"></i>
                        <span className="truncate">{file.name}</span>
                        <span className="text-xs text-slate-400">
                          ({Math.round(file.size / 1024)} KB)
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {config.businessImages && config.businessImages.length > 0 && (
                <div className="rounded-lg border border-slate-200 dark:border-slate-700 p-4">
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
                    Imágenes registradas actualmente
                  </p>
                  <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-300">
                    {config.businessImages.map((img) => (
                      <li key={img.id} className="flex items-center gap-2">
                        <i className="bi bi-check-circle text-emerald-500"></i>
                        <span>Imagen #{img.id}</span>
                        {img.url && (
                          <a
                            href={img.url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs text-blue-500 hover:underline"
                          >
                            Ver
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button
            type="submit"
            icon={<i className="bi bi-check-circle"></i>}
            size="lg"
            loading={saving}
            disabled={loading}
          >
            Guardar cambios
          </Button>
        </div>
      </form>
    </div>
  )
}
