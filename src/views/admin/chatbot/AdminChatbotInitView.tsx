import React, { useState } from "react"
import { useTheme } from "../../../context"

export const AdminChatbotInitView = () => {
  const { isDark } = useTheme()
  const [initialMessage, setInitialMessage] = useState("")
  const [files, setFiles] = useState<File[]>([])
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; size: string }[]>([])

  const cardBg = isDark ? "bg-slate-800/50 backdrop-blur-sm" : "bg-white/80 backdrop-blur-sm"
  const cardBorder = isDark ? "border-slate-700/50" : "border-gray-200/50"
  const inputBg = isDark ? "bg-slate-700 text-white" : "bg-gray-50 text-gray-900"
  const inputBorder = isDark ? "border-slate-600" : "border-gray-300"
  const textPrimary = isDark ? "text-slate-50" : "text-gray-900"
  const textSecondary = isDark ? "text-slate-400" : "text-gray-600"
  const labelBg = isDark ? "bg-slate-700 hover:bg-slate-600" : "bg-blue-50 hover:bg-blue-100"

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setFiles((prev) => [...prev, ...newFiles])

      newFiles.forEach((file) => {
        const size = (file.size / 1024).toFixed(2)
        setUploadedFiles((prev) => [...prev, { name: file.name, size: `${size} KB` }])
      })
    }
  }

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSave = () => {
    console.log("Mensaje inicial guardado:", initialMessage)
    console.log("Archivos:", files)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className={`text-3xl font-bold ${textPrimary}`}>Configurar Inicio del Chatbot</h1>
        <p className={`mt-2 ${textSecondary}`}>Define el mensaje inicial y los archivos que se enviarán a los clientes</p>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Message Section */}
        <div className={`lg:col-span-2 ${cardBg} rounded-xl border ${cardBorder} p-6 shadow-sm`}>
          <h2 className={`text-lg font-bold ${textPrimary} mb-4`}>Mensaje inicial</h2>

          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium ${textPrimary} mb-2`}>Mensaje de bienvenida</label>
              <textarea
                value={initialMessage}
                onChange={(e) => setInitialMessage(e.target.value)}
                placeholder="Escribe el mensaje inicial que recibirán todos los clientes..."
                className={`w-full h-40 px-4 py-2 rounded-lg border ${inputBorder} ${inputBg} focus:ring-2 focus:ring-blue-500 outline-none transition-all`}
              />
            </div>

            <button
              onClick={handleSave}
              className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md"
            >
              <i className="bi bi-check-circle mr-2"></i>
              Guardar mensaje
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className={`${cardBg} rounded-xl border ${cardBorder} p-6 shadow-sm`}>
          <h2 className={`text-lg font-bold ${textPrimary} mb-4`}>Información</h2>
          <div className="space-y-4">
            <div className={`p-3 rounded-lg ${isDark ? "bg-slate-700" : "bg-blue-50"}`}>
              <p className={`text-xs ${textSecondary} mb-1`}>Archivos cargados</p>
              <p className={`text-2xl font-bold ${textPrimary}`}>{uploadedFiles.length}</p>
            </div>
            <div className={`p-3 rounded-lg ${isDark ? "bg-slate-700" : "bg-green-50"}`}>
              <p className={`text-xs ${textSecondary} mb-1`}>Caracteres mensaje</p>
              <p className={`text-2xl font-bold ${textPrimary}`}>{initialMessage.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* File Upload Section */}
      <div className={`${cardBg} rounded-xl border ${cardBorder} p-6 shadow-sm`}>
        <h2 className={`text-lg font-bold ${textPrimary} mb-4`}>Archivos adjuntos</h2>

        <div className="space-y-4">
          {/* Upload Area */}
          <label className={`border-2 border-dashed ${inputBorder} rounded-lg p-8 cursor-pointer transition-all ${labelBg}`}>
            <input type="file" multiple onChange={handleFileChange} className="hidden" />
            <div className="text-center">
              <i className={`bi bi-cloud-arrow-up text-3xl ${isDark ? "text-blue-400" : "text-blue-600"} mb-2 block`}></i>
              <p className={`font-medium ${textPrimary}`}>Sube archivos aquí</p>
              <p className={`text-sm ${textSecondary}`}>o haz clic para seleccionar</p>
            </div>
          </label>

          {/* File List */}
          {uploadedFiles.length > 0 && (
            <div className="space-y-2">
              <h3 className={`font-medium ${textPrimary}`}>Archivos cargados:</h3>
              {uploadedFiles.map((file, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-lg ${isDark ? "bg-slate-700" : "bg-gray-50"}`}
                >
                  <div className="flex items-center gap-3">
                    <i className={`bi bi-file-earmark text-lg ${isDark ? "text-blue-400" : "text-blue-600"}`}></i>
                    <div>
                      <p className={`text-sm font-medium ${textPrimary}`}>{file.name}</p>
                      <p className={`text-xs ${textSecondary}`}>{file.size}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFile(index)}
                    className={`p-2 rounded-lg transition-all ${isDark ? "hover:bg-slate-600 text-red-400" : "hover:bg-red-50 text-red-600"}`}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
