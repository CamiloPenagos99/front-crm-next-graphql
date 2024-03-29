import Select from "react-select";
import { useState, useEffect, useContext } from "react";
import { useQuery, gql } from "@apollo/client";
import Loader from "../../utils/loader";
import StorePedidoContext from "../../context/pedidos/PedidoContext";

const CLIENTES = gql`
  query obtenerClientesVendedor {
    obtenerClientesVendedor {
      apellido
      nombre
      id
      empresa
      vendedor
      email
    }
  }
`;
const AsignarCliente = () => {
  const [cliente, setCliente] = useState({});
  //store context
  const storeContext = useContext(StorePedidoContext);
  const { agregaClientePedido } = storeContext;
  const { loading, error, data } = useQuery(CLIENTES);

  useEffect(() => {
    agregaClientePedido(cliente);
  }, [cliente]);

  const agregarCliente = (cliente) => {
    setCliente(cliente);
  };

  if (loading) return <Loader message="Cargando clientes"></Loader>;

  const options = data.obtenerClientesVendedor;
  console.log("options", options);
  return (
    <>
      <p className="mt-10 bg-white border-l-4 border-gray-800 text-gray-600 p-2 text-sm font-bold pb-3">
        Asignar cliente al pedido:
      </p>
      <Select
        options={options}
        onChange={(selectClient) => agregarCliente(selectClient)}
        placeholder="Seleccione el cliente"
        noOptionsMessage={() => "No hay clientes..."}
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
export default AsignarCliente;
