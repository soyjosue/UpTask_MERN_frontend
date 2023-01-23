import { useState } from "react";

import Alerta from "../components/Alerta";

const useAlert = () => {
  const [alertaObject, setAlertaObject] = useState({});

  const alerta = () => {
    return (
      <>
        {alertaObject.msg && (<Alerta alerta={alertaObject} />)}
      </>
    )
  }

  const showAlerta = (msg, error, timeout = null) => {
    setAlertaObject({ msg, error })

    if(timeout) {
      setTimeout(() => {
        setAlertaObject({});
      }, timeout);
    }
  }

  const clearAlerta = () => setAlertaObject({});

  return [alerta, showAlerta, clearAlerta, alertaObject];
}

export default useAlert;
