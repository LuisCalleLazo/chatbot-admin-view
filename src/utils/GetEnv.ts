export const getEnv = () => {

  return {
    VITE_HOST_BACKEND: import.meta.env.VITE_HOST_BACKEND,
    VITE_AUTH_API: import.meta.env.VITE_AUTH_API
  }
}