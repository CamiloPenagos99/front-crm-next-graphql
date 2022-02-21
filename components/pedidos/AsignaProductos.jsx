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
  const [cliente, setCliente] = useState([]);
  //store context
  const storeContext = useContext(StorePedidoContext);
  const { agregaClientePedido } = storeContext;
  const { loading, error, data } = useQuery(PRODUCTOS);

  useEffect(() => {
    agregaClientePedido(cliente);
  }, [cliente]);

  const agregarCliente = (cliente) => {
    setCliente(cliente);
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
        onChange={(selectClient) => agregarCliente(selectClient)}
        placeholder="Seleccione el producto"
        noOptionsMessage={() => "No hay productos..."}
        getOptionLabel={(opciones) => {
          return opciones.nombre;
        }}
        getOptionValue={(opciones) => {
          return opciones.id;
        }}
      />
    </>
  );
};
export default AsignarProductos;
