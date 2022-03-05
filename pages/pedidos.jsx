import { gql, useQuery } from "@apollo/client";
import Layout from "../components/Layout";
import Loader from "../utils/loader";
import Link from "next/dist/client/link";
import Pedido from "../components/Pedido";

const PEDIDOS = gql`
  query ObtenerPedidosVendedor {
  obtenerPedidosVendedor {
    vendedor
    id
    total
    pedido {
      id
      cantidad
    }
    cliente {
      id
      nombre
      apellido
      email
    }
    vendedor
    estado
  }
}
`;
const Pedidos = () => {
  const { loading, error, data } = useQuery(PEDIDOS);
  if (error) return <h1>ERROR {JSON.stringify(error)}</h1>;
  console.log("todos los pedidos:", data);
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
          <div>
            {data.obtenerPedidosVendedor.map((pedido) => {
              return <Pedido pedido={pedido} key={pedido.id}></Pedido>;
            })}
          </div>
        ) : (
          <Loader message="Cargando información"></Loader>
        )}
      </Layout>
    </div>
  );
};

export default Pedidos;
