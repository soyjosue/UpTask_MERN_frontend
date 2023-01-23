import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

import useProyectos from "../hooks/useProyectos";

const FormularioProyecto = () => {
  const [id, setId] = useState(null);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fechaEntrega, setFechaEntrega] = useState('');
  const [cliente, setCliente] = useState('');

  const params = useParams();

  const { Alerta, mostrarAlerta, submitProyecto, proyecto, obtenerProyecto } = useProyectos();

  useEffect(() => {
    return () => {
      if (params.id) {
        setId(proyecto._id);
        setNombre(proyecto.nombre);
        setDescripcion(proyecto.descripcion);
        setFechaEntrega(proyecto.fechaEntrega?.split('T')[0]);
        setCliente(proyecto.cliente);
      }
    }
  }, [params])

  const handleSubmit = async e => {
    e.preventDefault();

    if ([nombre, descripcion, fechaEntrega, cliente].includes('')) {
      mostrarAlerta('Todos los campos son obligatorios.', true);
      return;
    }

    // Pasar los datos
    await submitProyecto({ id, nombre, descripcion, fechaEntrega, cliente });

    setId('');
    setNombre('');
    setDescripcion('');
    setFechaEntrega('');
    setCliente('');
  }

  return (
    <form
      className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow"
      onSubmit={handleSubmit}
    >
      <Alerta />

      <InputTextForm
        id="nombre"
        label="Nombre Proyecto"
        placeholder="Nombre del Proyecto"
        value={nombre}
        setValue={setNombre}
      />

      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="descripcion"
        >Descripción</label>

        <textarea
          id="descripcion"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Descripción del Proyecto"
          value={descripcion}
          onChange={({ target: { value } }) => setDescripcion(value)}
        />
      </div>

      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="fecha-entrega"
        >Fecha Entrega</label>

        <input
          id="fecha-entrega"
          type="date"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          value={fechaEntrega}
          onChange={({ target: { value } }) => setFechaEntrega(value)}
        />
      </div>

      <InputTextForm
        id="cliente"
        label="Nombre Cliente"
        placeholder="Nombre del Cliente"
        value={cliente}
        setValue={setCliente}
      />

      <input
        type="submit"
        value={id ? 'Actualizar Proyecto' : 'Crear Proyecto'}
        className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
      />
    </form>
  )
}

const InputTextForm = ({ id, label, placeholder, value, setValue }) => {
  return (
    <div className="mb-5">
      <label
        className="text-gray-700 uppercase font-bold text-sm"
        htmlFor={id}
      >{label}</label>

      <input
        id={id}
        type="text"
        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
        placeholder={placeholder}
        value={value}
        onChange={({ target: { value: valueText } }) => setValue(valueText)}
      />
    </div>
  )
}

export default FormularioProyecto