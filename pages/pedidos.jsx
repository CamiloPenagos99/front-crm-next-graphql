import { gql, useQuery } from "@apollo/client";
import Layout from "../components/Layout";
import Loader from "../utils/loader";

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
        <h1 className="text-4xl text-cyan-800 font-light">Productos</h1>
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
