import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import usuarioService from '../services/usuarioService';

import useAlert from "../hooks/useAlert";

const ConfirmarCuenta = () => {
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  const { id } = useParams();
  const [Alerta, showAlert, clearAlerta] = useAlert();


  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const { data } = await usuarioService.confirmarCuenta(id);

        showAlert(data.msg, false)
        setCuentaConfirmada(true);
      } catch (error) {
        showAlert(error.response.data.msg, true)
      }
    }

    confirmarCuenta();
  }, [])

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Confirma tu cuenta y comienza a crear tus <span className="text-slate-700">proyectos.</span>
      </h1>

      <div className='mt-20 md:mt-10 shadow-lg px-5 py-10 rounded-xl bg-white'>
        <Alerta />
        {cuentaConfirmada && (
          <Link
            className="block text-center my-5 text-slate-500 uppercase text-sm"
            to="/"
          >Inicia Sesión</Link>
        )}
      </div>
    </>
  )
}

export default ConfirmarCuenta