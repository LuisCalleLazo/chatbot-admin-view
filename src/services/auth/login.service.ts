import { authApi } from '../api';
import type {LoginData, LoginResponse } from '../../interfaces/IAuth';
import type { Response } from '../../interfaces/IResponse';


export const loginServ= async (loginData : LoginData) => 
{
  try
  {
    const response = await authApi.post<Response<LoginResponse>>('auth/login', loginData);
    console.log(response.data);
    localStorage.setItem('token', response.data.data.currentToken);
    localStorage.setItem('refreshToken', response.data.data.refreshToken);
    localStorage.setItem('user',  JSON.stringify(response.data.data.user));

    
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