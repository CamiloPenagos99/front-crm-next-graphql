const PedidoResumen = (props) => {
  return (
    <>
      <div className="flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-xl border p-8 w-3xl">
          <div className="mb-4">
            <h1 className="font-semibold text-gray-500 ">Pedido actual:</h1>
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
                <span className="font-semibold text-gray-800">Productos: </span>
                <span className="text-gray-800">
                 4
                </span>
              </div>
              <div>
                <span className="font-semibold text-gray-800">Total: </span>
                <span className="font-bold text-green-500">
                  + 12.5 $
                </span>
              </div>
              <div className="font-semibold">
                <a href className="text-blue-600 mr-2">
                  Enviar
                </a>
                <a href className="text-gray-400">
                  Rechazar
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PedidoResumen;
