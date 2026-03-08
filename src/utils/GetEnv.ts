export const getEnv = () => {

  return {
    VITE_CHATBOT_API: import.meta.env.VITE_CHATBOT_API,
    VITE_AUTH_API: import.meta.env.VITE_AUTH_API
  }
}