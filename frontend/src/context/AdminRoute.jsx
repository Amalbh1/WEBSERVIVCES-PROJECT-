import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminRoutes = () => {
  const auth = useAuth();
  if (auth.user.role !== "admin") return <Navigate to="/profile" />;
  return <Outlet />;
};

export default AdminRoutes;
