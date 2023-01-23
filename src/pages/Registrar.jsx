import { useState } from "react";
import { Link } from "react-router-dom";

import useAlert from "../hooks/useAlert";

import usuarioService from "../services/usuarioService";

const Registrar = () => {
  const [usuarioRegister, setUsuarioRegister] = useState({
    nombre: '',
    email: '',
    password: ''
  });

  const [repetirPassword, setRepetirPassword] = useState('');
  const [Alerta, showAlert, clearAlerta] = useAlert();

  const isValidForm = () => {
    const { nombre, email, password } = usuarioRegister;

    if ([nombre, email, password, repetirPassword].includes('')) {
      showAlert('Todos los campos son obligatorios.', true);
      return false;
    }

    if (password !== repetirPassword) {
      showAlert('Las contraseña no son iguales.', true);
      return false;
    }

    if (password.length < 6) {
      showAlert('La contraseña es muy corta, agrega mínimo 6 caracteres.', true);
      return false;
    }

    return true;
  }

  const handleSubmit = async e => {
    e.preventDefault();
    clearAlerta(); // Reiniciando Alerta

    if (!isValidForm()) return;

    // Crear el usuario en la API
    try {
      const { data } = await usuarioService.createUsuarioAPI(usuarioRegister);

      showAlert(data.msg, false);

      setUsuarioRegister({
        nombre: '',
        email: '',
        password: ''
      });
      setRepetirPassword('');

    } catch (error) {
      showAlert(error.response.data.msg, true);
    }
  }

  const handleChangeInput = e => setUsuarioRegister(
    {
      ...usuarioRegister,
      [e.target.name]: e.target.value
    }
  );

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Crea tu cuenta y administra tus <span className="text-slate-700">proyectos.</span>
      </h1>

      <Alerta />

      <form
        className="my-10 bg-white shadow rounded-lg p-10"
        onSubmit={handleSubmit}
      >
        <div className="my-5">
          <label
            htmlFor="password"
            className="uppercase text-gray-600 block text-xl font-bold"
          >Nombre</label>

          <input
            id="nombre"
            name="nombre"
            type="text"
            placeholder="Tu Nombre"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={usuarioRegister.nombre}
            onChange={handleChangeInput}
          />
        </div>

        <div className="my-5">
          <label
            htmlFor="email"
            className="uppercase text-gray-600 block text-xl font-bold"
          >Email</label>

          <input
            id="email"
            type="email"
            name="email"
            placeholder="Email de Registro"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={usuarioRegister.email}
            onChange={handleChangeInput}
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
            name="password"
            placeholder="Contraseña de Registro"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={usuarioRegister.password}
            onChange={handleChangeInput}
          />
        </div>

        <div className="my-5">
          <label
            htmlFor="password2"
            className="uppercase text-gray-600 block text-xl font-bold"
          >Repetir Contraseña</label>

          <input
            id="password2"
            type="password"
            placeholder="Repetir tu contraseña"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={repetirPassword}
            onChange={({ target: { value } }) => setRepetirPassword(value)}
          />
        </div>

        <input
          type="submit"
          value="Crear Cuenta"
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
          to="/olvide-password"
        >Olvide Mi Contraseña</Link>
      </nav>
    </>
  )
}

export default Registrar;