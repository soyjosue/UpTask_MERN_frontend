import {
  Outlet,
  Navigate
} from "react-router-dom";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import LoadingFull from "../components/LoadingFull";

import useAuth from "../hooks/useAuth";

const RutaProtegidaLayout = () => {
  const { auth, cargando } = useAuth();

  if (cargando) return <LoadingFull />;

  return (
    <>
      {auth._id ? (
        <div className="bg-gray-100">
          <Header />

          <div className="md:flex md:min-h-screen">
            <Sidebar />

            <main className="p-10 flex-1">
              <Outlet />
            </main>
          </div>
        </div>
      ) : <Navigate to="/" />}
    </>
  )
}

export default RutaProtegidaLayout