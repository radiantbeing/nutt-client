import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Index() {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return <Navigate to="/home" />;
  } else {
    return <Navigate to="/welcome" />;
  }
}
