import { Navigate } from "react-router-dom";
import { LoadingValidate } from "../loading/LoadingValidate";
import { useAuth } from "../../context";

export const PrivateAdminRoute: React.FC<{element: React.ReactElement}> = ({ element }) =>
{
  const { isAuthenticated, loading, admin} = useAuth();
  
  if (loading)
    return <LoadingValidate />;

  if (isAuthenticated == false || admin != 'Admin') 
    return <Navigate to="/home" replace />;

  if(admin == 'Admin' && isAuthenticated == true)  
    return element;


  return element
}

export const PrivateHomeRoute: React.FC<{element: React.ReactElement}> = ({ element }) =>
{
  const { isAuthenticated, loading, admin} = useAuth();
  
  if (loading)
    return <LoadingValidate />;

  if (isAuthenticated == false || admin != 'Admin') 
    return <Navigate to="/home" replace />;

  if(admin == 'Admin' && isAuthenticated == true)  
    return <Navigate to="/admin" replace />;


  return element
}