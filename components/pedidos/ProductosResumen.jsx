import { useContext, useState, useEffect } from "react";
import StorePedidoContext from "../../context/pedidos/PedidoContext";
const ProductoResumen = ({ producto }) => {
  console.log("Render componente producto");

  const { nombre, precio } = producto;
  const [cantidad, setCantidad] = useState(0);
  console.log("cantidad", cantidad);
  const context = useContext(StorePedidoContext);
  const { agregarCantidadProductos } = context;
  console.log("context producto", context);

  useEffect(() => {
    console.log("efecto cambia cantidad");
    actualizarCantidad();
  }, [cantidad]);

  const actualizarCantidad = () => {
    const nuevoProducto = { ...producto, cantidad: Number(cantidad) };
    agregarCantidadProductos(nuevoProducto);
    console.log("producto: ", nuevoProducto);
  };
  return (
    <>
      <div className="md:flex md:justify-between md:items-center mt-5">
        <div className="md:w-2/4 mb-2 md:mb-0">
          <p className="text-sm">{nombre}</p>
          <p className="text-green-500">${precio}</p>
        </div>
        <input
          className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline md:ml-4"
          type="number"
          placeholder="cantidad"
          onChange={(e) => setCantidad(e.target.value)}
          value={cantidad}
        ></input>
      </div>
    </>
  );
};

export default ProductoResumen;
