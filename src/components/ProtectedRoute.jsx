import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function (){
  const {user, loading} = useAuth();

  if(loading) return <h1>Cargando...</h1>
  if(!user) {
    return <Navigate to='/' replace />
  }
  return <Outlet />;
}