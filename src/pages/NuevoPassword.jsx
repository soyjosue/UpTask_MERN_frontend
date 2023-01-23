import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import useAlert from "../hooks/useAlert";

import usuarioService from "../services/usuarioService";

const NuevoPassword = () => {
  const [password, setPassword] = useState('');
  const [tokenValido, setTokenValido] = useState(false);
  const [passwordModificado, setPasswordModificado] = useState(false);

  const { token } = useParams();
  const [Alerta, showAlerta, clearAlerta] = useAlert();

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await usuarioService.comprobarToken(token);
        setTokenValido(true);
      } catch (error) {
        showAlerta(error.response.data.msg, true);
      }
    }

    comprobarToken();
  }, [])

  const handleSubmit = async e => {
    e.preventDefault();
    clearAlerta();

    if (password.length < 6) {
      showAlerta('La contraseña debe tener más de 6 caracteres.', true);
      return;
    }

    try {
      const { data } = await usuarioService.nuevoPassword(token, password);

      showAlerta(data.msg, false);
      setPasswordModificado(true);
    } catch (error) {
      showAlerta(error.response.data.msg, true);
    }
  }

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Restablecer tu password y no pierdas acceso a tus <span className="text-slate-700">proyectos.</span>
      </h1>

      <Alerta />

      {passwordModificado ? (
        <div className="my-10 bg-white shadow rounded-lg p-10">
          <Link
            className="text-center block bg-sky-700 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
            to="/"
          >Inicia Sesión</Link>
        </div>
      ) : (
        <>
          {tokenValido && (
            <form
              onSubmit={handleSubmit}
              className="my-10 bg-white shadow rounded-lg p-10"
            >
              <div className="my-5">
                <label
                  htmlFor="password"
                  className="uppercase text-gray-600 block text-xl font-bold"
                >Nueva Contraseña</label>

                <input
                  id="password"
                  type="password"
                  placeholder="Escribe tu Nueva Contraseña"
                  className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                  value={password}
                  onChange={({ target: { value } }) => setPassword(value)}
                />
              </div>

              <input
                type="submit"
                value="Guardar Nueva Contraseña"
                className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
              />
            </form>
          )}
        </>
      )}
    </>
  )
}

export default NuevoPassword