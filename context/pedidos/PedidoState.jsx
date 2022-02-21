import { useReducer } from "react";
import StorePedidoContext from "./PedidoContext";
import {
  SELECCIONAR_CLIENTE,
  SELECCIONAR_PRODUCTO,
  CANTIDAD_PRODUCTOS,
} from "../../types";
import PedidoReducer from "./PedidoReducer";

const PedidoState = (props) => {
  //State de pedidos

  const initialState = {
    cliente: {},
    productos: [],
    total: 0,
  };

  const holaMundo = () => {
    console.log("Hola mundo desde reducer");
  };

  const [state, dispatch] = useReducer(PedidoReducer, initialState);
  return (
    <StorePedidoContext.Provider value={{ holaMundo }}>
      {props.children}
    </StorePedidoContext.Provider>
  );
};

export default PedidoState;
