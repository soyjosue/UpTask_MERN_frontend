import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import FormularioColaborador from "../components/FormularioColaborador";
import LoadingFull from "../components/LoadingFull";

import useProyectos from "../hooks/useProyectos";

const NuevoColaborador = () => {

  const params = useParams();
  const { obtenerProyecto, proyecto, cargando, colaborador, agregarColaborador, Alerta } = useProyectos();

  useEffect(() => {
    obtenerProyecto(params.id);
  }, []);

  if (!proyecto?._id) return <Alerta />

  if (cargando) return <LoadingFull />

  return (
    <>
      <div className="flex justify-center gap-2 items-center">
        <div>
          <Link
            to={`/proyectos/${proyecto?._id}`}
            className="block bg-sky-600 text-white p-2 rounded-lg text-center m-3"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
            </svg>

          </Link>
        </div>

        <h1 className="text-4xl font-black">Añadir Colaborador(a) al Proyecto: {proyecto.nombre}</h1>
      </div>

      <div className="mt-10 flex justify-center">
        <FormularioColaborador />
      </div>

      {colaborador?._id && (
        <div className="flex justify-center mt-10">

          <div className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow w-full">
            <h2 className="text-center mb-10 text-2xl font-bold">Resultado:</h2>

            <div className="flex justify-between items-center">
              <p>{colaborador.nombre} - {colaborador.email}</p>

              <button
                type="button"
                className="bg-slate-500 px-5 py-2 rounded-lg uppercase text-white font-bold text-sm"
                onClick={() => agregarColaborador({
                  email: colaborador.email
                })}
              >Agregar al Proyecto</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default NuevoColaborador