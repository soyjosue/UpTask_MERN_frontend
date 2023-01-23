import clienteAxios from "../config/clienteAxios";

const proyectoService = {};

proyectoService.controller = 'proyectos';
proyectoService.axiosConfig = () => (
  {
    headers: {
      "Content-Type" : "application/json",
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }
)

proyectoService.crear = async function (proyecto) {
  const resultado = await clienteAxios.post(`/${this.controller}`, proyecto, this.axiosConfig());

  return resultado;
}

proyectoService.obtener = async function () {
  const resultado = clienteAxios.get(`/${this.controller}`, this.axiosConfig());

  return resultado;
}

proyectoService.obtenerById = async function (id) {
  const resultado = clienteAxios.get(`/${this.controller}/${id}`, this.axiosConfig());

  return resultado;
}

proyectoService.editar = async function (proyecto) {
  const resultado = await clienteAxios.put(`/${this.controller}/${proyecto.id}`, proyecto, this.axiosConfig());

  return resultado;
}

proyectoService.delete = async function (id) {
  const resultado = await clienteAxios.delete(`/${this.controller}/${id}`, this.axiosConfig());
  return resultado;
}

proyectoService.obtenerColaborador = async function (email) {
  const resultado = await clienteAxios.post(`/${this.controller}/colaboradores`, {email}, this.axiosConfig());

  return resultado;
}

proyectoService.agregarColaborador = async function (proyecto, email) {
  const resultado = await clienteAxios.post(`/${this.controller}/colaboradores/${proyecto._id}`, email, this.axiosConfig());

  return resultado;
}

proyectoService.eliminarColaborador = async function (proyecto, colaborador) {
  const resultado = await clienteAxios.post(`/${this.controller}/eliminar-colaborador/${proyecto._id}`, {id: colaborador._id}, this.axiosConfig());

  return resultado;
}



export default proyectoService;
