import Layout from "../components/Layout";
import AsignarCliente from "../components/pedidos/AsignaCliente";
import SelectItem from "../utils/selectItems";
import PedidoResumen from "../components/pedidos/PedidoResumen";

//Context de pedidos
import StorePedidoContext from "../context/pedidos/PedidoContext";
import { useContext } from "react";

import AsignarProductos from "../components/pedidos/AsignaProductos";
import ResumenPedido from "../components/pedidos/ResumenPedido";

const NuevoPedido = () => {
  //consumir un store
  console.log("renderizado nuevo...");

  const context = useContext(StorePedidoContext);

  console.log("Provider: ", context);
  const { nombre, apellido } = context.state.cliente;
  const productos = context.state.productos;

  return (
    <>
      <Layout>
        <div>
          <h1 className="text-4xl text-cyan-800 font-light">Nuevo Pedido:</h1>
          <div className="flex justify-center mt-5">
            <div className="w-full max-w-lg">
              <AsignarCliente></AsignarCliente>
              <AsignarProductos></AsignarProductos>
              <ResumenPedido></ResumenPedido>
            </div>
          </div>
        </div>
        {!nombre | !apellido ? (
          <></>
        ) : (
          <div className="mt-6 mb-6">
            <PedidoResumen
              nombre={nombre}
              apellido={apellido}
              cantidad={productos.length}
              productos={productos}
            ></PedidoResumen>
          </div>
        )}
      </Layout>
    </>
  );
};

export default NuevoPedido;
