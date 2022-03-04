import { useEffect, useState } from "react";

const Pedido = (props) => {
  console.log(props.pedido);
  const { id, total, cliente, estado } = props.pedido;

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
          <p className="font-bold text-gray-800 ">Cliente: {cliente}</p>
          <h2 className="text-gray-800 font-bold mt-10">Estado pedido:</h2>
          <select
            name=""
            id=""
            value={estadoPedido}
            className="mt-2 appearance-none bg-gray-600 border border-gray-400 text-white p-2 text-center rounded leading-tight uppercase text-xs font-bold"
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
              <>
                <div key={articulo.id} className="mt-2">
                  <p>Producto: {articulo.id}</p>
                  <p>Cantidad: {articulo.cantidad}</p>
                </div>
              </>
            );
          })}
        </div>
        <p className="font-bold">Total: <span className="text-green-600">${total}</span></p>
      </div>
    </>
  );
};

export default Pedido;
