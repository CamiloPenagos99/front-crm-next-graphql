import {
  SELECCIONAR_CLIENTE,
  SELECCIONAR_PRODUCTO,
  CANTIDAD_PRODUCTOS,
  TOTAL_PEDIDO,
} from "../../types/index.js";

const PedidoReducer = (state, action) => {
  switch (action.type) {
    case SELECCIONAR_CLIENTE: {
      return {
        ...state,
        cliente: action.payload,
      };
    }
    case SELECCIONAR_PRODUCTO: {
      return {
        ...state,
        productos: action.payload,
      };
    }

    case CANTIDAD_PRODUCTOS: {
      return {
        ...state,
        productos: state.productos.map((producto) => {
          const retorno =
            producto.id == action.payload.id ? action.payload : producto;

          return retorno;
        }),
      };
    }

    case TOTAL_PEDIDO: {
      return {
        ...state,
        total: state.productos.reduce((acumulado, producto) => {
          return acumulado + producto.cantidad * producto.precio;
        }, 0),
      };
    }
    default:
      return state;
  }
};

export default PedidoReducer;
