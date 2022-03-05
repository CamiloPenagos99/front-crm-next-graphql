import { useEffect, useState } from "react";
import BotonEliminar from "../utils/botonEliminar";

const Pedido = (props) => {
  console.log("Objeto Pedido", props.pedido);
  const { id, total, cliente, estado } = props.pedido;
  console.log("Objeto Pedido Cliente", cliente);
  const [estadoPedido, setEstadoPedido] = useState(estado);

  useEffect(() => {
    if (estadoPedido) {
      setEstadoPedido(estadoPedido);
    }
  }, [estadoPedido]);

  return (
    <>
      <div className="mt-4 bg-white rounded p-6 md:grid md:grid-cols-2 md:gap-4 shadow-lg">
        <div>
          <p className="font-bold text-red-800 ">
            Cliente:
            <span className="text-base text-gray-700">
              {" "}
              {cliente.nombre} {cliente.apellido}
            </span>
          </p>
          <p className="font-bold text-gray-400 text-xs mt-2 flex items-center my-2 mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 MR-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            Contacto:
            <span className="ml-1 text-sm text-gray-500">{cliente.email}</span>
          </p>
          <h2 className="text-gray-700 font-bold mt-10 text-sm">
            Estado pedido:
          </h2>
          <select
            name=""
            id=""
            value={estadoPedido}
            className="opacity-75 mt-2 appearance-none hover:bg-blue-700 bg-blue-200 border border-gray-400 text-gray p-2 text-center rounded leading-tight uppercase text-xs font-bold"
          >
            <option value="COMPLETADO">COMPLETADO</option>
            <option value="PENDIENTE">PENDIENTE</option>
            <option value="CANCELADO">CANCELADO</option>
          </select>
        </div>
        <div>
          <h2 className="text-gray-800 font-bold mt-2">Resumen del pedido:</h2>
          {props.pedido.pedido.map((articulo) => {
            return (
              <div key={articulo.id} className="mt-2">
                <p className="text-sm text-gray-600">Producto: {articulo.id}</p>
                <p className="text-sm text-gray-400">
                  Cantidad: {articulo.cantidad}
                </p>
              </div>
            );
          })}
          <p className="font-bold mt-6">
            Total: <span className="text-green-600">${total}</span>
          </p>
          <div className="w-32 mt-2">
            <BotonEliminar></BotonEliminar>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pedido;
