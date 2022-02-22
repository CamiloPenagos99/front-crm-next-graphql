import Select from "react-select";
import { useState, useEffect, useContext } from "react";
import { useQuery, gql } from "@apollo/client";
import Loader from "../../utils/loader";
import StorePedidoContext from "../../context/pedidos/PedidoContext";

const PRODUCTOS = gql`
  query Query {
    obtenerProductos {
      id
      nombre
      precio
      stock
    }
  }
`;
const AsignarProductos = () => {
  const [productos, setProductos] = useState([]);
  //store context
  const storeContext = useContext(StorePedidoContext);
  const { agregaProductosPedido } = storeContext;
  const { loading, error, data } = useQuery(PRODUCTOS);

  useEffect(() => {
    agregaProductosPedido(productos);
  }, [productos]);

  const agregarProducto = (productos) => {
    setProductos(productos);
  };

  if (loading) return <Loader message="Cargando productos"></Loader>;

  const options = data.obtenerProductos;
  console.log("options", options);
  return (
    <>
      <p className="mt-10 bg-white border-l-4 border-blue-800 text-gray-600 p-2 text-sm font-bold pb-3">
        Asignar productos al pedido:
      </p>
      <Select
        options={options}
        isMulti="true"
        onChange={(selectProduct) => agregarProducto(selectProduct)}
        placeholder="Seleccione el producto"
        noOptionsMessage={() => "No hay productos..."}
        getOptionLabel={(opciones) => {
          return `${opciones.nombre} - stock: ${opciones.stock}`;
        }}
        getOptionValue={(opciones) => {
          return opciones.id;
        }}
      />
    </>
  );
};
export default AsignarProductos;
