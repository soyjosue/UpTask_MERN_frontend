import { useContext } from "react";
import AuthContext from "../context/authProvider";

const useAuth = () => useContext(AuthContext);

export default useAuth;