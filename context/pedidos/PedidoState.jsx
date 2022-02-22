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

  const agregaClientePedido = (cliente) => {
    dispatch({
      type: SELECCIONAR_CLIENTE,
      payload: cliente,
    });
  };

  const agregaProductosPedido = (productos) => {
    dispatch({
      type: SELECCIONAR_PRODUCTO,
      payload: productos,
    });
  };
  return (
    <StorePedidoContext.Provider
      value={{ agregaClientePedido, state, agregaProductosPedido }}
    >
      {props.children}
    </StorePedidoContext.Provider>
  );
};

export default PedidoState;
