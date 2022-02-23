import { useContext } from "react";
import StorePedidoContext from "../../context/pedidos/PedidoContext";
import ProductoResumen from "./ProductosResumen";

const ResumenPedido = () => {
  const context = useContext(StorePedidoContext);
  const productos = context.state.productos;
  return (
    <>
      <p className="mt-10 bg-white border-l-4 border-red-800 text-gray-600 p-2 text-sm font-bold pb-3">
        Seleccionar cantidades:
      </p>
      {productos.length > 0 ? (
        <>
          {productos.map((producto) => (
            <ProductoResumen
              key={producto.id}
              producto={producto}
            ></ProductoResumen>
          ))}
        </>
      ) : (
        <p className="mt-5 text-sm text-gray-500"> Aún no hay productos</p>
      )}
    </>
  );
};

export default ResumenPedido;
