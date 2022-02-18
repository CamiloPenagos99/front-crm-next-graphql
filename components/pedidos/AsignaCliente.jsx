import Select from "react-select";
import { useState, useEffect } from "react";

const options = [
  { id: "1", cliente: "Camilo" },
  { id: "2", cliente: "James" },
  { id: "3", cliente: "Cristhian" },
];
const AsignarCliente = () => {
  const [cliente, setCliente] = useState([]);

  useEffect(() => {
    console.log(cliente);
  }, [cliente]);

  const agregarCliente = (cliente) => {
    setCliente(cliente);
  };
  return (
    <>
      <h2 className="text-2xl text-blue-800 font-light pt-4 pb-4">
        Asignar cliente al pedido:
      </h2>
      <Select
        options={options}
        onChange={(selectClient) => agregarCliente(selectClient)}
        placeholder="Seleccione el cliente"
        noOptionsMessage={() => "No hay clientes..."}
        getOptionLabel={(opciones) => {
          return opciones.cliente;
        }}
        getOptionValue={(opciones) => {
          return opciones.id;
        }}
      />
    </>
  );
};
export default AsignarCliente;
