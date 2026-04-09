import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

const ProtectedRoute = () => {
  const { user, loading } = useAuthStore();

  console.log(user)

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;