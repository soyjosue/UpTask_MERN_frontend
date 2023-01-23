import clienteAxios from "../config/clienteAxios";

const usuarioService = {};

usuarioService.controller = 'usuarios';

usuarioService.createUsuarioAPI = async function(usuario) {
  const respueta = await clienteAxios.post(`/${this.controller}`, usuario);

  return respueta;
}

usuarioService.confirmarCuenta = async function(token) {
  const respuesta = await clienteAxios(`/${this.controller}/confirmar/${token}`);

  return respuesta;
}

usuarioService.olvidePassword = async function(email) {
  const respuesta = await clienteAxios.post(`/${this.controller}/olvide-password`, { email });

  return respuesta;
}

usuarioService.comprobarToken = async function(token) {
  var result = await clienteAxios(`/${this.controller}/olvide-password/${token}`);

  return result;
}

usuarioService.nuevoPassword = async function(token, password) {
  const respuesta = await clienteAxios.post(`/${this.controller}/olvide-password/${token}`, { password });

  return respuesta;
}

usuarioService.autenticar = async function(email, password) {
  const respuesta = await clienteAxios.post(`/${this.controller}/login`, { email, password });

  return respuesta;
}

usuarioService.perfil = async function(token) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  }
  const respuesta = await clienteAxios(`/usuarios/perfil`, config);

  return respuesta;
}

export default usuarioService;