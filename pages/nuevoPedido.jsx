import Layout from "../components/Layout";
import AsignarCliente from "../components/pedidos/AsignaCliente";
import SelectItem from "../utils/selectItems";
import PedidoResumen from "../components/pedidos/PedidoResumen";
import router from "next/router";

//Context de pedidos
import StorePedidoContext from "../context/pedidos/PedidoContext";
import { useContext, useState } from "react";

import AsignarProductos from "../components/pedidos/AsignaProductos";
import ResumenPedido from "../components/pedidos/ResumenPedido";
import CalculoTotal from "../components/pedidos/CalculoTotal";
import { gql, useMutation } from "@apollo/client";
import { Mensaje } from "../utils/mensaje";
import { Error } from "../utils/error";

const NUEVO_PEDIDO = gql`
  mutation NuevoPedido($input: InputPedido!) {
    nuevoPedido(input: $input) {
      total
      vendedor
      id
    }
  }
`;
const NuevoPedido = () => {
  //consumir un store
  console.log("renderizado nuevo...");

  const context = useContext(StorePedidoContext);
  //const [habilitado, setHabilitado] = useState(false);

  console.log("Provider: ", context);
  const { nombre, apellido } = context.state.cliente;
  const productos = context.state.productos;
  const total = context.state.total;
  const validarFormularioPedido = () => {
    console.log("validar formulario: ", {
      nombre,
      productos: productos.length,
      total,
    });
    if (!nombre || productos.length == 0 || total == 0) {
      //setHabilitado(true);
      return "opacity-50 cursor-not-allowed";
    }
    return "rounded";
  };

  const validarEnvioFormularioPedido = async () => {
    console.log("Enviar nuevo pedido: ", true);
    try {
      const response = await nuevoPedido({
        variables: {
          input: {
            cliente: context.state.cliente.id,
            pedido: productos.map((producto) => {
              return { id: producto.id, cantidad: producto.cantidad };
            }),
          },
        },
      });
      console.log({ response });
      if (response) {
        setTimeout(() => router.push("/pedidos"), 1000);
      }
    } catch (error) {
      console.error(error.message);
      setTimeout(() => router.push("/pedidos"), 2000);
    }
  };

  const [nuevoPedido, { data, loading, error }] = useMutation(NUEVO_PEDIDO);
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
              <CalculoTotal></CalculoTotal>
              <button
                type="button"
                onClick={validarEnvioFormularioPedido}
                className={`bg-blue-700 rounded w-full mt-5 p-2 text-white uppercase font-bold hover:bg-blue-500 ${validarFormularioPedido()}`}
              >
                Registrar pedido
              </button>
              <div>
                {data ? (
                  <Mensaje
                    title="Pedido registrado"
                    desc="Produto registrado correctamente"
                  ></Mensaje>
                ) : null}
              </div>
              <div>
                {error ? (
                  <Error
                    title="Error de registro"
                    desc={`Error al registrar pedido: ${error.message}`}
                  ></Error>
                ) : null}
              </div>
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
              total={total}
            ></PedidoResumen>
          </div>
        )}
      </Layout>
    </>
  );
};

export default NuevoPedido;
