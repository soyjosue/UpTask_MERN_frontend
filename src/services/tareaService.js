import clienteAxios from "../config/clienteAxios";

const tareaService = {};

tareaService.controller = "tareas";
tareaService.axiosConfig = () => (
  {
    headers: {
      "Content-Type" : "application/json",
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }
)

tareaService.crear = async function(tarea) {
  const respuesta = await clienteAxios.post(`/${this.controller}`, tarea, this.axiosConfig());

  return respuesta;
}

tareaService.completar = async function(id) {
  const respuesta = await clienteAxios.post(`/${this.controller}/estado/${id}`, {}, this.axiosConfig());

  return respuesta;
}

tareaService.editar = async function(tarea) {
  const respuesta = await clienteAxios.put(`/${this.controller}/${tarea.id}`, tarea, this.axiosConfig());

  return respuesta;
}

tareaService.eliminar = async function(id) {
  const respuesta = await clienteAxios.delete(`/${this.controller}/${id}`, this.axiosConfig());

  return respuesta;
}


export default tareaService;