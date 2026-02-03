export const menuOptions = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: "bi-speedometer2", // Mejor para un dashboard
    href: "/admin/",
  },
  {
    id: "chatbot",
    label: "Chatbot Negocio",
    icon: "bi-robot", // Icono de robot para chatbot
    subOptions: [
      {
        id: "chatbot-init",
        label: "Inicio de chatbot",
        icon: "bi-play-circle", // Icono de inicio/play
        href: "/admin/chatbot/init",
      },
      {
        id: "questions-and-responses",
        label: "Preguntas y Respuestas",
        icon: "bi-chat-left-dots", // Icono de conversación/chat
        href: "/admin/chatbot/questions-and-responses/",
      },
      {
        id: "states",
        label: "Estados de chatbot",
        icon: "bi-diagram-3", // Icono de flujo/estados
        href: "/admin/chatbot/states",
      },
      {
        id: "conversations",
        label: "Conversaciones",
        icon: "bi-chat-left-text", // Icono de mensajes/conversaciones
        href: "/admin/chatbot/conversations",
      },
    ],
  },
  {
    id: "settings",
    label: "Configuración",
    icon: "bi-gear-fill", // Gear relleno para mejor visibilidad
    subOptions: [
      {
        id: "settings-business",
        label: "Negocio",
        icon: "bi-building", // Icono de edificio/negocio
        href: "/admin/settings/business",
      },
    ],
  },
]