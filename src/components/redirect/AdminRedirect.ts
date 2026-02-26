import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function RedirectorAdmin() {
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    if (
        location.pathname !== "admins" &&
        location.pathname !== "workers" &&
        location.pathname !== "customers" &&
        location.pathname !== "partners") {
      navigate('admins');
    }
  }, [navigate, location]);

  return null;
}