import { chatbotApi } from '../api';
import type { Response } from '../../interfaces/IResponse';


export const getOrGenerateDbClient = async () => 
{
  try
  {
    const response = await chatbotApi.post<Response<boolean>>('auth/login');
    console.log(response.data);

    
    return response.data;

  }catch(error)
  {
    // if (axios.isAxiosError(error)) {
    //   ManageErrorAxios(error);
    // }
    // console.log(error);
    throw error;
  }
}