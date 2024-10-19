import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  user?: string;
  children: ReactNode;
}

const PrivateRoute = ({ user = undefined, children }: ProtectedRouteProps) => {
  if (!user) {
    return <Navigate to="/sign-in" replace />;
  }
  return children;
};

export default PrivateRoute;
