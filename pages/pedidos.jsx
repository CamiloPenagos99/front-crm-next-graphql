import { gql, useQuery } from "@apollo/client";
import Layout from "../components/Layout";
import Loader from "../utils/loader";
import Link from "next/dist/client/link";

const PEDIDOS = gql`
  query ObtenerPedidos {
    obtenerPedidos {
      id
      pedido {
        id
        cantidad
      }
      total
      cliente
      vendedor
      estado
    }
  }
`;
const Pedidos = () => {
  const { loading, error, data } = useQuery(PEDIDOS);
  return (
    <div>
      <Layout>
        <h1 className="text-4xl text-cyan-800 font-light">Pedidos</h1>
        <br />
        <Link href="/nuevoPedido">
          <a className="text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:ring-gray-400 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-800 dark:border-gray-700 text-sm hover:bg-blue-500 mb-3">
            Nuevo pedido
          </a>
        </Link>
        {data ? (
          <div>{JSON.stringify(data.obtenerPedidos)}</div>
        ) : (
          <Loader message="Cargando información"></Loader>
        )}
      </Layout>
    </div>
  );
};

export default Pedidos;
