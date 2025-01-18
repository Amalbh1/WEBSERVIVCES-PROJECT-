import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = () => {
  const auth = useAuth();
  if (!auth.token) return <Navigate to="/" />;
  return <Outlet />;
};

export default PrivateRoute;
