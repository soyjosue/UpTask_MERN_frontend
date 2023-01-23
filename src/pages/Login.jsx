import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import useAlert from "../hooks/useAlert";
import useAuth from "../hooks/useAuth";

import usuarioService from "../services/usuarioService";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [Alerta, showAlerta, clearAlerta] = useAlert();

  const { setAuth } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    clearAlerta();

    if([email, password].includes('')) {
      showAlerta('Todos los campos son obligatorios.', true);
      return;
    }

    try {
      const { data } = await usuarioService.autenticar(email, password);

      localStorage.setItem('token', data.token);
      setAuth(data);
      navigate('/proyectos');
    } catch (error) {
      showAlerta(error.response.data.msg, true);
    }
  }

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Inicia sesión y administra tus <span className="text-slate-700">proyectos.</span>
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
            placeholder="Email de Registro"
            value={email}
            onChange={({target:{value}}) => setEmail(value)}
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
        </div>

        <div className="my-5">
          <label
            htmlFor="password"
            className="uppercase text-gray-600 block text-xl font-bold"
          >Contraseña</label>

          <input
            id="password"
            type="password"
            placeholder="Contraseña de Registro"
            value={password}
            onChange={({target:{value}}) => setPassword(value)}
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
        </div>

        <input
          type="submit"
          value="Iniciar Sesión"
          className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/registrar"
        >¿No tienes una cuenta? Regístrate</Link>

        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="olvide-password"
        >Olvide Mi Contraseña</Link>
      </nav>
    </>
  )
}

export default Login