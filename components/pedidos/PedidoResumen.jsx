const PedidoResumen = (props) => {
  return (
    <>
      <div className="flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-xl border p-8 w-3xl">
          <div className="mb-3">
            <h1 className="font-semibold text-blue-500 text-lg">
              Pedido actual:
            </h1>
          </div>
          <div className="flex justify-left items-center">
            <div className="w-4/5">
              <div>
                <span className="font-semibold text-gray-800">Cliente: </span>
                <span className="text-gray-800">
                  {props.nombre} {props.apellido}
                </span>
              </div>
              <div>
                <span className="font-semibold text-gray-800">Cantidad: </span>
                <span className="text-gray-800">{props.cantidad}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-800">Productos: </span>
                <span className="text-gray-800">
                  {props.productos.map((producto) => {
                    return <li key={producto.id}>{producto.nombre}</li>;
                  })}
                </span>
              </div>
              <div>
                <span className="font-semibold text-gray-800">Total: </span>
                <span className="font-bold text-green-500">
                  + {props.total} $
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PedidoResumen;
