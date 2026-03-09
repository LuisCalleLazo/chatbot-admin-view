import {
  Button,
  Input,
  Textarea,
  Select,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../../components";
import { useBusinessConfig } from "../../../hooks/chatbot/useBusinessConfig";

const businessTypes = [
  { id: 1, label: "Comida y Bebidas", icon: "bi-cup-hot" },
  { id: 2, label: "Tienda física / Retail", icon: "bi-shop" },
  { id: 3, label: "Servicios con cita", icon: "bi-calendar2-check" },
  { id: 4, label: "Negocio digital", icon: "bi-pc-display" },
  { id: 5, label: "Alojamiento / Hotelería", icon: "bi-building" },
  { id: 6, label: "Solo delivery", icon: "bi-truck" },
  { id: 7, label: "Eventos", icon: "bi-calendar-event" },
];

const planOptions = [
  { value: "Basic", label: "Basic" },
  { value: "Professional", label: "Professional" },
  { value: "Enterprise", label: "Enterprise" },
];

export const AdminSettingsBusinessView = () => {
  const {
    config,
    loading,
    saving,
    selectedImages,
    handleFieldChange,
    handleImagesChange,
    saveBusinessConfig,
    handleDeleteImage,
    handleToggleImagePrincipal,
  } = useBusinessConfig();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void saveBusinessConfig();
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
          Configuración del Negocio
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Define la información principal de tu negocio y cómo se mostrará en el
          chatbot.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* ─── Tipo de negocio ─────────────────────────────────────────────── */}
        <Card variant="elevated">
          <CardHeader>
            <CardTitle>Tipo de negocio</CardTitle>
            <CardDescription>
              Selecciona la categoría que mejor describe tu negocio
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-3">
              {businessTypes.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => handleFieldChange("typeBusiness", type.id)}
                  disabled={loading}
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
                  />
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

        {/* ─── Información básica ──────────────────────────────────────────── */}
        <Card variant="elevated">
          <CardHeader>
            <CardTitle>Información del negocio</CardTitle>
            <CardDescription>
              Datos básicos de contacto y descripción
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Nombre del negocio"
                value={config.name}
                onChange={(e) => handleFieldChange("name", e.target.value)}
                placeholder="Nombre de tu negocio"
                leftIcon={<i className="bi bi-shop text-lg" />}
                fullWidth
                disabled={loading}
              />

              <Input
                label="Teléfono"
                type="tel"
                value={config.phoneNumber}
                onChange={(e) =>
                  handleFieldChange("phoneNumber", e.target.value)
                }
                placeholder="+56 9 12345678"
                leftIcon={<i className="bi bi-telephone text-lg" />}
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
                  leftIcon={<i className="bi bi-envelope text-lg" />}
                  fullWidth
                  disabled={loading}
                />
              </div>

              <div className="md:col-span-2">
                <Textarea
                  label="Descripción"
                  value={config.description}
                  onChange={(e) =>
                    handleFieldChange("description", e.target.value)
                  }
                  placeholder="Cuéntanos sobre tu negocio..."
                  rows={4}
                  fullWidth
                  disabled={loading}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ─── Atención y expiración ───────────────────────────────────────── */}
        <Card variant="elevated">
          <CardHeader>
            <CardTitle>Atención y expiración</CardTitle>
            <CardDescription>
              Configura cómo y por cuánto tiempo se mantienen activas las
              conversaciones
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Input
                label="Método de atención"
                value={config.methodAttention}
                onChange={(e) =>
                  handleFieldChange("methodAttention", e.target.value)
                }
                placeholder="Presencial, Delivery, Mixto…"
                leftIcon={<i className="bi bi-people text-lg" />}
                fullWidth
                disabled={loading}
              />

              <Input
                label="Exp. conversación (horas)"
                type="number"
                min={1}
                value={config.conversationExpHours}
                onChange={(e) =>
                  handleFieldChange(
                    "conversationExpHours",
                    Number(e.target.value) || 0,
                  )
                }
                placeholder="24"
                leftIcon={<i className="bi bi-clock-history text-lg" />}
                fullWidth
                disabled={loading}
              />

              <Input
                label="Exp. QR (horas)"
                type="number"
                min={1}
                value={config.qrExpHours}
                onChange={(e) =>
                  handleFieldChange("qrExpHours", Number(e.target.value) || 0)
                }
                placeholder="24"
                leftIcon={<i className="bi bi-qr-code text-lg" />}
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

        {/* ─── Imágenes del negocio ────────────────────────────────────────── */}
        <Card variant="elevated">
          <CardHeader>
            <CardTitle>Imágenes del negocio</CardTitle>
            <CardDescription>
              Sube imágenes que se usarán en el chatbot (logo, portada, galería,
              etc.). Las imágenes se guardan en Cloudinary.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Selector de archivos */}
              <Input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => handleImagesChange(e.target.files)}
                fullWidth
              />

              {/* Preview de imágenes seleccionadas (nuevas) */}
              {selectedImages.length > 0 && (
                <div className="rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30 p-4">
                  <p className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-2">
                    <i className="bi bi-upload me-1" />
                    Nuevas imágenes a subir ({selectedImages.length})
                  </p>
                  <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-300">
                    {selectedImages.map((file, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <i className="bi bi-image text-blue-500" />
                        <span className="truncate">{file.name}</span>
                        <span className="text-xs text-slate-400 ml-auto shrink-0">
                          ({Math.round(file.size / 1024)} KB)
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Imágenes ya guardadas */}
              {config.businessImages.length > 0 && (
                <div className="rounded-lg border border-slate-200 dark:border-slate-700 p-4 space-y-3">
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                    Imágenes registradas ({config.businessImages.length})
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {config.businessImages.map((img) => (
                      <div
                        key={img.id}
                        className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50"
                      >
                        {/* Thumbnail */}
                        {img.file ? (
                          <img
                            src={img.file}
                            alt={`Imagen #${img.id}`}
                            className="w-12 h-12 rounded-lg object-cover shrink-0 border border-slate-200 dark:border-slate-600"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-slate-200 dark:bg-slate-700 flex items-center justify-center shrink-0">
                            <i className="bi bi-image text-slate-400 text-xl" />
                          </div>
                        )}

                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-slate-700 dark:text-slate-200 truncate">
                            Imagen #{img.id}
                          </p>
                          {img.file && (
                            <a
                              href={img.file}
                              target="_blank"
                              rel="noreferrer"
                              className="text-xs text-blue-500 hover:underline"
                            >
                              Ver en Cloudinary
                            </a>
                          )}
                        </div>

                        {/* Toggle principal */}
                        <button
                          type="button"
                          title={
                            img.isInMessagePrincipal
                              ? "Quitar del mensaje principal"
                              : "Usar en mensaje principal"
                          }
                          onClick={() =>
                            void handleToggleImagePrincipal(
                              img.id,
                              img.isInMessagePrincipal,
                            )
                          }
                          className={`shrink-0 p-1.5 rounded-lg transition-colors ${
                            img.isInMessagePrincipal
                              ? "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 hover:bg-emerald-100"
                              : "text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700"
                          }`}
                        >
                          <i
                            className={`bi ${img.isInMessagePrincipal ? "bi-star-fill" : "bi-star"} text-base`}
                          />
                        </button>

                        {/* Eliminar */}
                        <button
                          type="button"
                          title="Eliminar imagen"
                          onClick={() => void handleDeleteImage(img.id)}
                          className="shrink-0 p-1.5 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                        >
                          <i className="bi bi-trash text-base" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <p className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1">
                    <i className="bi bi-star-fill text-emerald-500" />= imagen
                    usada en el mensaje principal del chatbot
                  </p>
                </div>
              )}
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
            Guardar cambios
          </Button>
        </div>
      </form>
    </div>
  );
};
