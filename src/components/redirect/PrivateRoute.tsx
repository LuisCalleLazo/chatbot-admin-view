import { Navigate } from "react-router-dom";
import { LoadingValidate } from "../loading/LoadingValidate";
import { useAuth } from "../../context";

export const PrivateAdminRoute: React.FC<{element: React.ReactElement}> = ({ element }) =>
{
  const { isAuthenticated, loading, admin, worker, customer} = useAuth();
  
  if (loading)
    return <LoadingValidate />;

  if (isAuthenticated == false) 
    return <Navigate to="/home" replace />;

  if(worker == 'false' && customer == 'false' && admin == 'false' && isAuthenticated == true)  return <Navigate to="/register" replace />;
  if(worker == 'true') return <Navigate to="/worker" replace />;
  if(customer == 'true') return <Navigate to="/customer" replace />;


  return element
}