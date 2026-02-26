import { AxiosError } from "axios";

export const ManageErrorAxios = (error : AxiosError) => 
{
  if (error.response) {
    // El servidor respondió con un código de estado fuera del rango de 2xx
    console.error("Login error:", error.response.status, error.response.data);
    // Aquí puedes manejar diferentes códigos de estado según tus necesidades
    switch (error.response.status) {
      case 400:
        console.error("Solicitud incorrecta o datos no válidos");
        break;
      case 401:
        console.error("No autorizado");
        break;
      case 500:
        console.error("Error interno del servidor");
        break;
      default:
        console.error("Otro error HTTP");
    }
  } else if (error.request) {
    // La solicitud fue hecha pero no se recibió respuesta
    console.error("No response was received");
  } else {
    // Algo sucedió en la configuración de la solicitud que disparó un Error
    console.error("Error setting up the request");
  }
}