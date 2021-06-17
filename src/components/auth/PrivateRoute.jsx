import React, { ReactElement } from "react";
import { Navigate, Route } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export const PrivateRoute = ({ path, ...props }) => {
  const { login } = useAuth();
  return login ? (
    <Route {...props} path={path} />
  ) : (
    <Navigate state={{ from: path }} replace to="/login" />
  );
};
