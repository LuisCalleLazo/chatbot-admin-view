

import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';
import { useAuth } from '../../context';


export const useRefreshToken = () => {
  const { refreshToken, init } = useAuth();

  if(init)
  {
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        const decoded = jwtDecode(token);
        const expiresAt = decoded.exp != undefined ? decoded.exp : 1;
        const now = Date.now() / 1000; // Convertir milisegundos a segundos
        const timeUntilExpiration = expiresAt - now;

        const timer = setTimeout(() => {
          refreshToken();
        }, timeUntilExpiration * 1000); // Convertir segundos a milisegundos

        return () => clearTimeout(timer);
      }
    }, [refreshToken]);
  }
};
