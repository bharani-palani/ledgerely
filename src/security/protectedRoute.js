import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

export const ProtectedRoute = ({ children, accessGiven }) => {
  const userContext = useContext(UserContext);
  return accessGiven.includes(userContext.userData.type) ? (
    children
  ) : (
    <Navigate to='/' />
  );
};
