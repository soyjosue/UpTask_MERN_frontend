import { useState, useEffect, createContext } from "react";
import usuarioService from "../services/usuarioService";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const autenticarUsuario = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setCargando(false);
        return;
      }

      try {
        const { data } = await usuarioService.perfil(token);
        data.token = token;

        setAuth(data);
        // navigate('/proyectos')
      } catch (error) {
        setAuth({});
      } finally {
        setCargando(false);
      }
    }

    autenticarUsuario();
  }, []);


  const cerrarSesionAuth = () => {
    setAuth({});
  }

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        cargando,
        cerrarSesionAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export {
  AuthProvider
}

export default AuthContext;
