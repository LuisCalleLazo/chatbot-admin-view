import { useState } from "react"
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input, Textarea } from "../../../components"
import { useChatbotSettings } from "../../../hooks/chatbot/useChatbotSettings"

export const ChatbotSettingsView = () => {
  const {
    settings,
    loading,
    saving,
    initializing,
    schemaReady,
    handleFieldChange,
    saveSettings,
    initializeSchema,
  } = useChatbotSettings()

  const [showWebhookInfo, setShowWebhookInfo] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    void saveSettings()
  }

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
          Configuración de canales del Chatbot
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Conecta tu chatbot con WhatsApp y Telegram configurando los tokens y URLs necesarios.
        </p>
      </div>

      {/* ─── Inicializar schema ────────────────────────────────────────────── */}
      <Card variant="elevated">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <i className="bi bi-database-gear text-xl" />
            Base de datos del Chatbot
          </CardTitle>
          <CardDescription>
            Inicializa el schema de base de datos de tu chatbot. Solo se necesita hacer una vez.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div
                className={`w-3 h-3 rounded-full ${
                  schemaReady ? "bg-emerald-500" : "bg-amber-400"
                }`}
              />
              <span className="text-sm text-slate-700 dark:text-slate-300">
                {schemaReady
                  ? "Schema inicializado correctamente"
                  : "Schema aún no inicializado"}
              </span>
            </div>

            <Button
              type="button"
              variant={schemaReady ? "outline" : "primary"}
              icon={<i className={`bi ${schemaReady ? "bi-arrow-clockwise" : "bi-database-add"}`} />}
              loading={initializing}
              disabled={loading || initializing}
              onClick={() => void initializeSchema()}
            >
              {schemaReady ? "Re-inicializar schema" : "Inicializar ahora"}
            </Button>
          </div>

          {!schemaReady && (
            <p className="mt-3 text-xs text-amber-600 dark:text-amber-400 flex items-center gap-1">
              <i className="bi bi-exclamation-triangle-fill" />
              Debes inicializar el schema antes de que el chatbot pueda recibir mensajes.
            </p>
          )}
        </CardContent>
      </Card>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* ─── Config general ────────────────────────────────────────────────── */}
        <Card variant="elevated">
          <CardHeader>
            <CardTitle>Configuración general</CardTitle>
            <CardDescription>
              Nombre del schema y mensaje de bienvenida principal del chatbot.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Nombre del Schema"
                value={settings.schemaName}
                onChange={(e) => handleFieldChange("schemaName", e.target.value)}
                placeholder="mi_negocio_schema"
                leftIcon={<i className="bi bi-database text-lg" />}
                fullWidth
                disabled={loading}
                helperText="Identificador único de tu base de datos de chatbot"
              />

              <div className="md:col-span-2">
                <Textarea
                  label="Mensaje principal del chatbot"
                  value={settings.messagePrincipal}
                  onChange={(e) => handleFieldChange("messagePrincipal", e.target.value)}
                  placeholder="¡Hola! Soy el asistente virtual de [tu negocio]. ¿En qué te puedo ayudar hoy?"
                  rows={3}
                  fullWidth
                  disabled={loading}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ─── WhatsApp Business ─────────────────────────────────────────────── */}
        <Card variant="elevated">
          <CardHeader>
            <CardTitle>
              <i className="bi bi-whatsapp me-2 text-emerald-500" />
              WhatsApp Business
            </CardTitle>
            <CardDescription>
              Configura los datos de tu número y credenciales de la API de WhatsApp.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="WhatsApp Phone Number Id"
                value={settings.whatsappPhoneNumberId}
                onChange={(e) => handleFieldChange("whatsappPhoneNumberId", e.target.value)}
                placeholder="Ej: 1234567890"
                leftIcon={<i className="bi bi-telephone text-lg" />}
                fullWidth
                disabled={loading}
              />

              <Input
                label="WhatsApp Access Token"
                type="password"
                value={settings.whatsappAccessToken}
                onChange={(e) => handleFieldChange("whatsappAccessToken", e.target.value)}
                placeholder="Token de acceso de Meta"
                leftIcon={<i className="bi bi-key text-lg" />}
                fullWidth
                disabled={loading}
              />
            </div>

            {/* ─── Webhook Info (readonly) ──────────────────────────────────── */}
            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                    Información del Webhook
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Copia estos datos para configurar el webhook en Meta.
                    El token es generado automáticamente y no se puede modificar.
                  </p>
                </div>
                {/* Toggle */}
                <button
                  type="button"
                  onClick={() => setShowWebhookInfo(!showWebhookInfo)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    showWebhookInfo ? "bg-blue-600" : "bg-slate-300 dark:bg-slate-600"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                      showWebhookInfo ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              {showWebhookInfo && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-top-2 duration-300">
                  {/* URL del Webhook */}
                  <ReadonlyCopyField
                    label="URL del Webhook"
                    value={`https://chatbot-business.duckdns.org/api/webhook/${settings.userId ?? ""}`}
                    icon="bi-link-45deg"
                  />

                  {/* Token de Verificación (generado por backend) */}
                  <ReadonlyCopyField
                    label="Token de Verificación (generado por el sistema)"
                    value={settings.whatsappWebhookVerifyToken}
                    icon="bi-shield-lock"
                    masked
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* ─── Telegram ──────────────────────────────────────────────────────── */}
        <Card variant="elevated">
          <CardHeader>
            <CardTitle>
              <i className="bi bi-telegram me-2 text-sky-500" />
              Telegram
            </CardTitle>
            <CardDescription>
              Configura el token del bot de Telegram que utilizará el chatbot.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Telegram Bot Token"
                type="password"
                value={settings.telegramToken}
                onChange={(e) => handleFieldChange("telegramToken", e.target.value)}
                placeholder="Token provisto por BotFather"
                leftIcon={<i className="bi bi-telegram text-lg" />}
                fullWidth
                disabled={loading}
              />
            </div>
          </CardContent>
        </Card>

        {/* ─── Guardar ─────────────────────────────────────────────────────── */}
        <div className="flex justify-end">
          <Button
            type="submit"
            icon={<i className="bi bi-check-circle" />}
            size="lg"
            loading={saving}
            disabled={loading}
          >
            Guardar configuración
          </Button>
        </div>
      </form>
    </div>
  )
}

// ─── Componente auxiliar: campo readonly con botón copiar ─────────────────────

interface ReadonlyCopyFieldProps {
  label: string
  value: string
  icon?: string
  masked?: boolean
}

const ReadonlyCopyField = ({ label, value, icon = "bi-clipboard", masked = false }: ReadonlyCopyFieldProps) => {
  const [copied, setCopied] = useState(false)
  const [visible, setVisible] = useState(!masked)

  const handleCopy = () => {
    void navigator.clipboard.writeText(value).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
        {label}
      </label>
      <div className="relative flex items-center">
        {icon && (
          <i className={`bi ${icon} absolute left-3 text-slate-400 text-base pointer-events-none`} />
        )}
        <input
          type={masked && !visible ? "password" : "text"}
          readOnly
          value={value || "—"}
          className="w-full pl-9 pr-20 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-slate-100 font-mono text-sm focus:outline-none select-all"
        />
        <div className="absolute right-2 flex items-center gap-1">
          {masked && (
            <button
              type="button"
              onClick={() => setVisible(!visible)}
              className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
              title={visible ? "Ocultar" : "Mostrar"}
            >
              <i className={`bi ${visible ? "bi-eye-slash" : "bi-eye"} text-base`} />
            </button>
          )}
          <button
            type="button"
            onClick={handleCopy}
            className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
            title="Copiar"
          >
            <i className={`bi ${copied ? "bi-clipboard-check text-emerald-500" : "bi-clipboard"} text-base`} />
          </button>
        </div>
      </div>
    </div>
  )
}