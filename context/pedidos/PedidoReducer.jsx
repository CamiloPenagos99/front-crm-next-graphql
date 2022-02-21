import {
  SELECCIONAR_CLIENTE,
  SELECCIONAR_PRODUCTO,
  CANTIDAD_PRODUCTOS,
} from "../../types/index.js";

const PedidoReducer = (state, action) => {
  switch (action.type) {
    case SELECCIONAR_CLIENTE: {
      return {
        ...state,
        cliente: action.payload,
      };
    }
    default:
      return state;
  }
};

export default PedidoReducer;
