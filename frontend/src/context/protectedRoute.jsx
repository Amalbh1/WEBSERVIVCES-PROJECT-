import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = () => {
  const auth = useAuth();
  if (auth.token) return <Navigate to="/profile" />;
  return <Outlet />;
};

export default ProtectedRoute;
