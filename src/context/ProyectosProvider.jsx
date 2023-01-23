import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";

import useAlert from "../hooks/useAlert";
import useAuth from "../hooks/useAuth";

import proyectoService from "../services/proyectoService";
import tareaService from "../services/tareaService";

let socket;

const ProyectosContext = createContext();

const ProyectosProvider = ({ children }) => {
  const [tarea, setTarea] = useState({});
  const [proyecto, setProyecto] = useState({});
  const [proyectos, setProyectos] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [buscador, setBuscador] = useState(false);
  const [colaborador, setColaborador] = useState({});
  const [modalEliminarTarea, setModalEliminarTarea] = useState(false);
  const [modalFormularioTarea, setModalFormularioTarea] = useState(false);
  const [modalEliminarColaborador, setModalEliminarColaborador] = useState(false);

  const navigate = useNavigate();

  const [Alerta, showAlerta, clearAlerta, alertaObject] = useAlert();
  const { auth } = useAuth();

  useEffect(() => {
    const obtenerProyectos = async () => {
      try {
        const { data } = await proyectoService.obtener();

        setProyectos(data);
      } catch (error) {
        console.log(error);
      }
    }

    if (auth.token) {
      obtenerProyectos()
    }
  }, [auth]);

  useEffect(() => {
    socket = io(import.meta.env.VITE_API_URL);
  }, []);

  const mostrarAlerta = (message, error) => showAlerta(message, error, 3000);

  const submitProyecto = async proyecto => {
    if (proyecto.id) {
      await editarProyecto(proyecto);
    } else {
      await nuevoProyecto(proyecto);
    }
  }

  const editarProyecto = async proyecto => {
    try {
      const { data } = await proyectoService.editar(proyecto);

      // TODO : Sincronizar el state
      const proyectosActualizado = proyectos.map(proyectoState => proyectoState._id === data._id ? data : proyectoState);
      setProyectos(proyectosActualizado);

      // TODO : Mostrar la alerta
      mostrarAlerta('Proyecto Actualizado Correctamente.', false)
      setTimeout(() => {
        navigate('/proyectos')
      }, 3000);

      // TODO : Redireccionar
    } catch (error) {
      console.log(error);
    }
  }

  const nuevoProyecto = async proyecto => {
    try {
      const { data } = await proyectoService.crear(proyecto);

      mostrarAlerta('Proyecto Creado Correctamente.', false);

      setProyectos([
        ...proyectos,
        data
      ])

      setTimeout(() => {
        navigate('/proyectos')
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  }

  const obtenerProyecto = async id => {
    setCargando(true);
    setProyecto({})
    try {
      const { data } = await proyectoService.obtenerById(id);

      setProyecto(data);
      clearAlerta();
    } catch (error) {
      navigate('/proyectos')
      mostrarAlerta(error.response.data.msg, true);
    }
    setCargando(false);
  }

  const handleModalTarea = () => {
    setModalFormularioTarea(!modalFormularioTarea);
    setTarea({});
  }

  const eliminarProyecto = async id => {
    try {
      const { data } = await proyectoService.delete(id);

      var proyectosActualizados = proyectos.filter(proyectoState => proyectoState._id !== id);
      setProyectos(proyectosActualizados);
      setProyecto({});

      mostrarAlerta(data.msg, false);

      setTimeout(() => {
        navigate('/proyectos')
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  }

  const submitTarea = async tarea => {
    if (tarea?.id) {
      await editarTarea(tarea);
    } else {
      await crearTarea(tarea);
    }
  }

  const crearTarea = async tarea => {
    try {
      const { data } = await tareaService.crear(tarea);

      clearAlerta();
      setModalFormularioTarea(false);

      // SOCKET IO
      socket.emit('nueva tarea', data);
    } catch (error) {
      console.log(error);
    }
  }

  const editarTarea = async tarea => {
    try {
      const { data } = await tareaService.editar(tarea);

      clearAlerta();
      setModalFormularioTarea(false);

      // SOCKET
      socket.emit('actualizar tarea', data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleModalEditarTarea = tarea => {
    setTarea(tarea);
    setModalFormularioTarea(true);
  }

  const handleModalEliminarTarea = tarea => {
    setTarea(tarea);
    setModalEliminarTarea(!modalEliminarTarea);
  }

  const eliminarTarea = async () => {
    try {
      const { data } = await tareaService.eliminar(tarea._id);

      mostrarAlerta(data.msg, false);

      // SOCKET
      socket.emit('eliminar tarea', tarea);

      setModalEliminarTarea(false);
      setTarea({});

    } catch (error) {
      console.log(error);
    }
  }

  const submitColaborador = async email => {
    setCargando(true);
    try {
      const { data } = await proyectoService.obtenerColaborador(email);

      setColaborador(data);
      clearAlerta();
    } catch (error) {
      mostrarAlerta(error.response.data.msg, true);
      setColaborador({});
    }

    setCargando(false);
  }

  const agregarColaborador = async email => {
    try {
      const { data } = await proyectoService.agregarColaborador(proyecto, email);

      mostrarAlerta(data.msg, false);
    } catch (error) {
      mostrarAlerta(error.response.data.msg, true);
    }
  }

  const handleModalEliminarColaborador = (colaborador) => {
    setModalEliminarColaborador(!modalEliminarColaborador);

    setColaborador(colaborador);
  }

  const eliminarColaborador = async () => {
    try {
      const { data } = await proyectoService.eliminarColaborador(proyecto, colaborador);

      const proyectoActualizado = { ...proyecto };
      proyectoActualizado.colaboradores = proyectoActualizado.colaboradores.filter(c => c._id !== colaborador._id);
      setProyecto(proyectoActualizado);

      mostrarAlerta(data.msg, false);
      setColaborador({});
      setModalEliminarColaborador(false);
    } catch (error) {
      console.log(error.response);
      mostrarAlerta(error.response.data.msg, false);
    }
  }

  const completarTarea = async id => {
    try {
      const { data } = await tareaService.completar(id);

      setTarea({});
      clearAlerta();

      // SOCKET
      socket.emit('cambiar estado', data);
    } catch (error) {
      console.log(error.response);
    }
  }

  const handleBuscador = () => {
    setBuscador(!buscador);
  }

  // Socket io
  const submitTareasProyecto = tarea => {
    const proyectoActualizado = { ...proyecto }
    proyectoActualizado.tareas = [...proyectoActualizado.tareas, tarea];
    setProyecto(proyectoActualizado);
  }

  const eliminarTareaProyecto = tarea => {
    const proyectoActualizado = { ...proyecto };
    proyectoActualizado.tareas = proyectoActualizado.tareas.filter(t => t._id !== tarea._id);
    setProyecto(proyectoActualizado);
  }

  const actualizarTareaProyecto = tarea => {
    const proyectoActualizado = { ...proyecto };
      proyectoActualizado.tareas = proyectoActualizado.tareas.map(t => t._id === tarea._id ? tarea : t);
      setProyecto(proyectoActualizado);
  }

  const cambiarEstadoTarea = tarea => {
    const proyectoActualizado = { ...proyecto };
    proyectoActualizado.tareas = proyectoActualizado.tareas.map(t => t._id === tarea._id ? tarea : t);
    setProyecto(proyectoActualizado);
  }

  const cerrarSesionProyectos = () => {
    setProyectos([]);
    setProyecto({});
    clearAlerta();
  }

  return (
    <ProyectosContext.Provider
      value={{
        proyectos,
        setProyectos,
        Alerta,
        mostrarAlerta,
        clearAlerta,
        submitProyecto,
        obtenerProyecto,
        proyecto,
        setProyecto,
        cargando,
        eliminarProyecto,
        modalFormularioTarea,
        handleModalTarea,
        submitTarea,
        handleModalEditarTarea,
        tarea,
        modalEliminarTarea,
        handleModalEliminarTarea,
        eliminarTarea,
        submitColaborador,
        colaborador,
        agregarColaborador,
        handleModalEliminarColaborador,
        modalEliminarColaborador,
        eliminarColaborador,
        alertaObject,
        completarTarea,
        buscador,
        handleBuscador,
        submitTareasProyecto,
        eliminarTareaProyecto,
        actualizarTareaProyecto,
        cambiarEstadoTarea,
        cerrarSesionProyectos
      }}
    >
      {children}
    </ProyectosContext.Provider>
  );
}

export {
  ProyectosProvider
}

export default ProyectosContext;
