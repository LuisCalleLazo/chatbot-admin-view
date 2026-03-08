import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input } from "../../../components"
import { useChatbotSettings } from "../../../hooks/chatbot/useChatbotSettings"

export const ChatbotSettingsView = () => {
  const { settings, loading, saving, handleFieldChange, saveSettings } = useChatbotSettings()

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

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card variant="elevated">
          <CardHeader>
            <CardTitle>WhatsApp Business</CardTitle>
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
                leftIcon={<i className="bi bi-telephone text-lg"></i>}
                fullWidth
                disabled={loading}
              />

              <Input
                label="WhatsApp API URL"
                value={settings.whatsappApiUrl}
                onChange={(e) => handleFieldChange("whatsappApiUrl", e.target.value)}
                placeholder="https://graph.facebook.com/v19.0/..."
                leftIcon={<i className="bi bi-link-45deg text-lg"></i>}
                fullWidth
                disabled={loading}
              />

              <Input
                label="WhatsApp Access Token"
                type="password"
                value={settings.whatsappAccessToken}
                onChange={(e) => handleFieldChange("whatsappAccessToken", e.target.value)}
                placeholder="Token de acceso"
                leftIcon={<i className="bi bi-key text-lg"></i>}
                fullWidth
                disabled={loading}
              />

              <Input
                label="WhatsApp Webhook Verify Token"
                type="password"
                value={settings.whatsappWebhookVerifyToken}
                onChange={(e) => handleFieldChange("whatsappWebhookVerifyToken", e.target.value)}
                placeholder="Token de verificación del webhook"
                leftIcon={<i className="bi bi-shield-lock text-lg"></i>}
                fullWidth
                disabled={loading}
              />
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated">
          <CardHeader>
            <CardTitle>Telegram</CardTitle>
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
                leftIcon={<i className="bi bi-telegram text-lg"></i>}
                fullWidth
                disabled={loading}
              />
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
            Guardar configuración
          </Button>
        </div>
      </form>
    </div>
  )
}
