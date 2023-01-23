import { useContext } from "react";

import ProyectosContext from "../context/ProyectosProvider";

const useProyectos = () => useContext(ProyectosContext);

export default useProyectos;
