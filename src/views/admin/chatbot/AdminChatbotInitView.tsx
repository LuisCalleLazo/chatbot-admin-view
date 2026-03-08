import React, { useState, useRef } from "react"
import { useTheme } from "../../../context"

interface FileItem {
  id: string
  name: string
  size: string
  type: string
  progress?: number
}

export const AdminChatbotInitView = () => {
  const { isDark } = useTheme()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [initialMessage, setInitialMessage] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [uploadedFiles, setUploadedFiles] = useState<FileItem[]>([])
  const [isDragging, setIsDragging] = useState(false)

  // Theme classes
  const theme = {
    bg: isDark ? "bg-slate-900" : "bg-gray-50",
    cardBg: isDark ? "bg-slate-800/80 backdrop-blur-xl" : "bg-white/90 backdrop-blur-xl",
    cardBorder: isDark ? "border-slate-700/50" : "border-gray-200/60",
    inputBg: isDark ? "bg-slate-900/50 text-slate-100" : "bg-gray-50 text-gray-900",
    inputBorder: isDark ? "border-slate-600 focus:border-blue-500" : "border-gray-300 focus:border-blue-500",
    textPrimary: isDark ? "text-slate-100" : "text-gray-900",
    textSecondary: isDark ? "text-slate-400" : "text-gray-500",
    textMuted: isDark ? "text-slate-500" : "text-gray-400",
    accent: "blue",
    success: "emerald",
    danger: "rose"
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processFiles(Array.from(e.target.files))
    }
  }

  const processFiles = (newFiles: File[]) => {
    const validFiles = newFiles.filter(file => {
      const isValid = file.size <= 10 * 1024 * 1024 // 10MB limit
      if (!isValid) {
        alert(`El archivo ${file.name} excede el límite de 10MB`)
      }
      return isValid
    })

    setFiles(prev => [...prev, ...validFiles])

    validFiles.forEach((file, idx) => {
      console.log(idx);
      const id = Math.random().toString(36).substr(2, 9)
      const size = file.size > 1024 * 1024 
        ? `${(file.size / (1024 * 1024)).toFixed(2)} MB`
        : `${(file.size / 1024).toFixed(2)} KB`

      setUploadedFiles(prev => [...prev, {
        id,
        name: file.name,
        size,
        type: file.type,
        progress: 0
      }])

      // Simulate upload progress
      simulateUpload(id)
    })
  }

  const simulateUpload = (id: string) => {
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 30
      if (progress >= 100) {
        progress = 100
        clearInterval(interval)
      }
      setUploadedFiles(prev => 
        prev.map(f => f.id === id ? { ...f, progress: Math.min(progress, 100) } : f)
      )
    }, 200)
  }

  const removeFile = (id: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== id))
    setFiles(prev => prev.filter((_, i) => i !== uploadedFiles.findIndex(f => f.id === id)))
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFiles = Array.from(e.dataTransfer.files)
    processFiles(droppedFiles)
  }

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSaving(false)
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
    console.log("Mensaje inicial guardado:", initialMessage)
    console.log("Archivos:", files)
  }

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return 'bi-image'
    if (type.includes('pdf')) return 'bi-file-earmark-pdf'
    if (type.includes('word') || type.includes('document')) return 'bi-file-earmark-word'
    return 'bi-file-earmark'
  }

  const maxChars = 500
  const charCount = initialMessage.length
  const isOverLimit = charCount > maxChars

  return (
    <div className={`min-h-screen ${theme.bg} p-6 lg:p-8`}>
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className={`text-3xl font-bold ${theme.textPrimary} tracking-tight`}>
              Configuración del Chatbot
            </h1>
            <p className={`mt-2 ${theme.textSecondary} text-lg`}>
              Personaliza la experiencia inicial de tus clientes
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${isDark ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-100 text-emerald-700'}`}>
              <i className="bi bi-check-circle-fill mr-2"></i>
              Cambios guardados automáticamente
            </span>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          
          {/* Left Column - Message Configuration */}
          <div className="xl:col-span-2 space-y-6">
            
            {/* Welcome Message Card */}
            <div className={`${theme.cardBg} rounded-2xl border ${theme.cardBorder} shadow-lg shadow-black/5 overflow-hidden`}>
              <div className={`px-6 py-4 border-b ${theme.cardBorder} ${isDark ? 'bg-slate-800/50' : 'bg-gray-50/50'}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
                    <i className="bi bi-chat-dots-fill text-xl"></i>
                  </div>
                  <div>
                    <h2 className={`text-lg font-semibold ${theme.textPrimary}`}>Mensaje de Bienvenida</h2>
                    <p className={`text-sm ${theme.textSecondary}`}>Este será el primer mensaje que verán tus clientes</p>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="relative">
                  <textarea
                    value={initialMessage}
                    onChange={(e) => setInitialMessage(e.target.value)}
                    placeholder="Ej: ¡Hola! 👋 Bienvenido a nuestro servicio de atención al cliente. Estoy aquí para ayudarte con cualquier consulta que tengas..."
                    className={`w-full h-48 px-4 py-3 rounded-xl border-2 ${theme.inputBorder} ${theme.inputBg} placeholder:text-gray-400 focus:ring-4 focus:ring-blue-500/10 resize-none transition-all`}
                    maxLength={maxChars + 50}
                  />
                  <div className="absolute bottom-3 right-3 flex items-center gap-2">
                    <span className={`text-xs font-medium ${isOverLimit ? 'text-rose-500' : theme.textMuted}`}>
                      {charCount}/{maxChars}
                    </span>
                  </div>
                </div>

                {isOverLimit && (
                  <div className="flex items-center gap-2 text-rose-500 text-sm">
                    <i className="bi bi-exclamation-triangle-fill"></i>
                    <span>Has excedido el límite de caracteres recomendado</span>
                  </div>
                )}

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className={`flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2`}
                  >
                    {isSaving ? (
                      <>
                        <i className="bi bi-arrow-repeat animate-spin"></i>
                        <span>Guardando...</span>
                      </>
                    ) : saveSuccess ? (
                      <>
                        <i className="bi bi-check-lg"></i>
                        <span>¡Guardado!</span>
                      </>
                    ) : (
                      <>
                        <i className="bi bi-check-circle-fill"></i>
                        <span>Guardar configuración</span>
                      </>
                    )}
                  </button>
                  
                  <button
                    onClick={() => setInitialMessage('')}
                    className={`px-4 py-3 rounded-xl border ${theme.cardBorder} ${theme.textSecondary} hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors`}
                    title="Limpiar mensaje"
                  >
                    <i className="bi bi-trash3"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* File Upload Card */}
            <div className={`${theme.cardBg} rounded-2xl border ${theme.cardBorder} shadow-lg shadow-black/5 overflow-hidden`}>
              <div className={`px-6 py-4 border-b ${theme.cardBorder} ${isDark ? 'bg-slate-800/50' : 'bg-gray-50/50'}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDark ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-600'}`}>
                    <i className="bi bi-paperclip text-xl"></i>
                  </div>
                  <div>
                    <h2 className={`text-lg font-semibold ${theme.textPrimary}`}>Archivos Adjuntos</h2>
                    <p className={`text-sm ${theme.textSecondary}`}>Imágenes o documentos que se enviarán automáticamente</p>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Drag & Drop Zone */}
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 ${
                    isDragging 
                      ? 'border-blue-500 bg-blue-500/5 scale-[1.02]' 
                      : `${theme.inputBorder} ${isDark ? 'hover:bg-slate-800/50' : 'hover:bg-gray-50'}`
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/*,.pdf,.doc,.docx"
                  />
                  
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${isDark ? 'bg-slate-700' : 'bg-gray-100'} transition-transform ${isDragging ? 'scale-110' : ''}`}>
                    <i className={`bi bi-cloud-arrow-up text-3xl ${isDark ? 'text-blue-400' : 'text-blue-600'}`}></i>
                  </div>
                  
                  <p className={`font-semibold ${theme.textPrimary} mb-1`}>
                    {isDragging ? 'Suelta los archivos aquí' : 'Arrastra archivos aquí'}
                  </p>
                  <p className={`text-sm ${theme.textSecondary}`}>
                    o haz clic para seleccionar • Máx. 10MB por archivo
                  </p>
                  
                  <div className="flex justify-center gap-2 mt-4">
                    <span className={`text-xs px-2 py-1 rounded-md ${isDark ? 'bg-slate-700 text-slate-400' : 'bg-gray-200 text-gray-600'}`}>PNG</span>
                    <span className={`text-xs px-2 py-1 rounded-md ${isDark ? 'bg-slate-700 text-slate-400' : 'bg-gray-200 text-gray-600'}`}>JPG</span>
                    <span className={`text-xs px-2 py-1 rounded-md ${isDark ? 'bg-slate-700 text-slate-400' : 'bg-gray-200 text-gray-600'}`}>PDF</span>
                    <span className={`text-xs px-2 py-1 rounded-md ${isDark ? 'bg-slate-700 text-slate-400' : 'bg-gray-200 text-gray-600'}`}>DOC</span>
                  </div>
                </div>

                {/* File List */}
                {uploadedFiles.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className={`font-semibold ${theme.textPrimary}`}>
                        Archivos ({uploadedFiles.length})
                      </h3>
                      <button
                        onClick={() => {
                          setUploadedFiles([])
                          setFiles([])
                        }}
                        className={`text-sm text-rose-500 hover:text-rose-600 font-medium`}
                      >
                        Eliminar todos
                      </button>
                    </div>
                    
                    <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
                      {uploadedFiles.map((file) => (
                        <div
                          key={file.id}
                          className={`group flex items-center gap-4 p-4 rounded-xl ${isDark ? 'bg-slate-700/50 hover:bg-slate-700' : 'bg-gray-50 hover:bg-gray-100'} transition-all border ${theme.cardBorder}`}
                        >
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isDark ? 'bg-slate-600' : 'bg-white'} shadow-sm`}>
                            <i className={`bi ${getFileIcon(file.type)} text-2xl ${isDark ? 'text-blue-400' : 'text-blue-600'}`}></i>
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <p className={`font-medium ${theme.textPrimary} truncate`}>{file.name}</p>
                            <p className={`text-sm ${theme.textSecondary}`}>{file.size}</p>
                            
                            {/* Progress bar */}
                            {file.progress && file.progress < 100 && (
                              <div className="mt-2 h-1.5 bg-gray-200 dark:bg-slate-600 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-blue-500 rounded-full transition-all duration-300"
                                  style={{ width: `${file.progress}%` }}
                                />
                              </div>
                            )}
                          </div>

                          <button
                            onClick={() => removeFile(file.id)}
                            className={`p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all ${isDark ? 'hover:bg-rose-500/20 text-rose-400' : 'hover:bg-rose-50 text-rose-600'}`}
                          >
                            <i className="bi bi-x-lg"></i>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Stats & Preview */}
          <div className="space-y-6">
            
            {/* Quick Stats */}
            <div className={`${theme.cardBg} rounded-2xl border ${theme.cardBorder} shadow-lg shadow-black/5 p-6`}>
              <h3 className={`font-semibold ${theme.textPrimary} mb-4`}>Resumen</h3>
              
              <div className="space-y-4">
                <div className={`p-4 rounded-xl ${isDark ? 'bg-slate-700/50' : 'bg-blue-50'} border ${theme.cardBorder}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-sm ${theme.textSecondary}`}>Archivos adjuntos</span>
                    <i className={`bi bi-files ${isDark ? 'text-blue-400' : 'text-blue-600'}`}></i>
                  </div>
                  <p className={`text-3xl font-bold ${theme.textPrimary}`}>{uploadedFiles.length}</p>
                </div>

                <div className={`p-4 rounded-xl ${isDark ? 'bg-slate-700/50' : 'bg-emerald-50'} border ${theme.cardBorder}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-sm ${theme.textSecondary}`}>Caracteres usados</span>
                    <i className={`bi bi-type ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}></i>
                  </div>
                  <p className={`text-3xl font-bold ${theme.textPrimary}`}>
                    {charCount}<span className={`text-lg ${theme.textMuted} font-normal`}>/{maxChars}</span>
                  </p>
                  <div className="mt-2 h-1.5 bg-gray-200 dark:bg-slate-600 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-300 ${isOverLimit ? 'bg-rose-500' : 'bg-emerald-500'}`}
                      style={{ width: `${Math.min((charCount / maxChars) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Live Preview */}
            <div className={`${theme.cardBg} rounded-2xl border ${theme.cardBorder} shadow-lg shadow-black/5 overflow-hidden`}>
              <div className={`px-6 py-4 border-b ${theme.cardBorder} ${isDark ? 'bg-slate-800/50' : 'bg-gray-50/50'}`}>
                <h3 className={`font-semibold ${theme.textPrimary}`}>Vista Previa</h3>
              </div>
              
              <div className={`p-6 ${isDark ? 'bg-slate-900/50' : 'bg-gray-100'}`}>
                {/* Chat Bubble */}
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    <i className="bi bi-robot"></i>
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className={`p-4 rounded-2xl rounded-tl-sm ${isDark ? 'bg-slate-700' : 'bg-white'} shadow-sm`}>
                      {initialMessage ? (
                        <p className={`${theme.textPrimary} whitespace-pre-wrap`}>{initialMessage}</p>
                      ) : (
                        <p className={`${theme.textMuted} italic`}>El mensaje de bienvenida aparecerá aquí...</p>
                      )}
                    </div>
                    
                    {/* File previews in chat */}
                    {uploadedFiles.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {uploadedFiles.slice(0, 3).map((file) => (
                          <div 
                            key={file.id}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg ${isDark ? 'bg-slate-700' : 'bg-white'} shadow-sm text-sm`}
                          >
                            <i className={`bi ${getFileIcon(file.type)} ${isDark ? 'text-blue-400' : 'text-blue-600'}`}></i>
                            <span className={`${theme.textSecondary} truncate max-w-[100px]`}>{file.name}</span>
                          </div>
                        ))}
                        {uploadedFiles.length > 3 && (
                          <div className={`px-3 py-2 rounded-lg ${isDark ? 'bg-slate-700' : 'bg-white'} shadow-sm text-sm ${theme.textSecondary}`}>
                            +{uploadedFiles.length - 3} más
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className={`p-6 rounded-2xl ${isDark ? 'bg-amber-500/10 border border-amber-500/20' : 'bg-amber-50 border border-amber-200'}`}>
              <div className="flex gap-3">
                <i className={`bi bi-lightbulb text-xl ${isDark ? 'text-amber-400' : 'text-amber-600'}`}></i>
                <div>
                  <h4 className={`font-semibold ${isDark ? 'text-amber-200' : 'text-amber-800'} mb-1`}>Consejo</h4>
                  <p className={`text-sm ${isDark ? 'text-amber-300/80' : 'text-amber-700'}`}>
                    Mantén tu mensaje de bienvenida breve y amigable. Incluye el nombre de tu empresa y una pregunta abierta para iniciar la conversación.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}