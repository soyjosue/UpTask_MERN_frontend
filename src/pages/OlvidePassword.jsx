import { useState } from "react";
import { Link } from "react-router-dom";

import useAlert from "../hooks/useAlert";

import usuarioService from "../services/usuarioService";

const OlvidePassword = () => {
  const [email, setEmail] = useState('');

  const [Alerta, showAlerta, clearAlerta] = useAlert();

  const handleSubmit = async e => {
    e.preventDefault();
    clearAlerta();

    if(email === '' || email.length < 6) {
      showAlerta('El email es obligatorio.', true);
      return;
    }

    try {
      const { data } = await usuarioService.olvidePassword(email);

      showAlerta(data.msg, false);
    } catch (error) {
      showAlerta(error.response.data.msg, true)
    }
  }

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Recupera tu acceso y no pierdas tus <span className="text-slate-700">proyectos.</span>
      </h1>

      <Alerta />

      <form
        className="my-10 bg-white shadow rounded-lg p-10"
        onSubmit={handleSubmit}
      >

        <div className="my-5">
          <label
            htmlFor="email"
            className="uppercase text-gray-600 block text-xl font-bold"
          >Email</label>

          <input
            id="email"
            type="email"
            value={email}
            onChange={({ target: { value } }) => setEmail(value)}
            placeholder="Email de Registro"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
        </div>

        <input
          type="submit"
          value="Enviar Instrucciones"
          className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/"
        >¿Ya tienes una cuenta? Inicia Sesión</Link>

        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/registrar"
        >¿No tienes una cuenta? Regístrate</Link>
      </nav>
    </>
  )
}

export default OlvidePassword