import { useState } from "react";

import useProyectos from "../hooks/useProyectos";

const FormularioColaborador = () => {
  const [email, setEmail] = useState('');

  const { mostrarAlerta, Alerta, submitColaborador } = useProyectos();


  const handleSubmit = e => {
    e.preventDefault();

    if (email === '') {
      mostrarAlerta('El email es obligatorio.', true);
      return;
    }

    submitColaborador(email);
  }

  return (
    <form
      className="bg-white py-10 px-5 w-full md:w-1/2 rounded-lg shadow"
      onSubmit={handleSubmit}
    >

      <Alerta />

      <div className="mb-5">
        <label
          htmlFor="email"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Email Colaborador
        </label>
        <input
          id="email"
          type="email"
          placeholder="Email del Usuario"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          value={email}
          onChange={({ target: { value } }) => setEmail(value)}
        />
      </div>

      <input
        type="submit"
        className="bg-sky-600 hover:bg-sky-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors rounded text-sm"
        value="Buscar Colaborador"
      />
    </form>
  )
}

export default FormularioColaborador