import BotonEliminar from "../utils/botonEliminar";

function confirmarEliminarProducto(id) {
  alert("Eliminando el producto... " + id);
}
export const Product = ({ producto }) => {
  return (
    <>
      <tr key={producto.id}>
        <td className="p-2 whitespace-nowrap">
          <div className="flex items-center">
            <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3"></div>
            <div className="font-medium text-gray-800">{producto.nombre}</div>
          </div>
        </td>
        <td className="p-2 whitespace-nowrap">
          <div className="text-left">{producto.stock}</div>
        </td>
        <td className="p-2 whitespace-nowrap">
          <div className="text-left font-medium text-green-500">
            ${producto.precio}
          </div>
        </td>
        <td className="p-2 whitespace-nowrap">
          <div className="text-lg text-center">
            {producto.id.substring(producto.id.length - 5)}
          </div>
        </td>
        <td className="p-2 whitespace-nowrap">
          <div className="text-lg text-center">
            <BotonEliminar
              funcion={confirmarEliminarProducto}
              id={producto.id}
            ></BotonEliminar>
          </div>
        </td>
      </tr>
    </>
  );
};