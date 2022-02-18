import Layout from "../components/Layout";
import AsignarCliente from "../components/pedidos/AsignaCliente";
import SelectItem from "../utils/selectItems";

//Context de pedidos
import StorePedidoContext from "../context/pedidos/PedidoContext";
import { useContext } from "react";

const NuevoPedido = () => {
  //consumir un store

  const context = useContext(StorePedidoContext);
  const { holaMundo } = context;

  holaMundo();
  console.log("Provider: ", context);

  return (
    <>
      <Layout>
        <div>
          <h1 className="text-4xl text-cyan-800 font-light">Nuevo Pedido:</h1>
          <h2 className="text-2xl text-blue-800 font-light pt-4 pb-4">
            Seleccionar productos:
          </h2>
          <SelectItem></SelectItem>
          <AsignarCliente></AsignarCliente>
        </div>
      </Layout>
    </>
  );
};

export default NuevoPedido;
