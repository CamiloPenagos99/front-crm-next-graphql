import Layout from "../components/Layout";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";
import { useQuery, gql } from "@apollo/client";
import Loader from "../utils/loader";
import { useEffect } from "react";

const CONSULTARRANKINGCLIENTE = gql`
  query MejoresClientes {
    mejoresClientes {
      total
      cliente {
        nombre
        apellido
        empresa
        email
      }
    }
  }
`;

const RankingClientes = () => {
  const { loading, error, data, startPolling, stopPolling } = useQuery(
    CONSULTARRANKINGCLIENTE
  );

  useEffect(() => {
    startPolling(1000);
    return () => {
      stopPolling();
    };
  }, [startPolling, stopPolling]);

  if (!data || loading) return <Loader message="Cargando información"></Loader>;
  console.log("ranking", data);

  const formatData = data.mejoresClientes.map((topCliente) => {
    if (topCliente.cliente.length > 0) {
      return {
        name: topCliente.cliente[0].nombre,
        total: parseInt(topCliente.total),
      };
    } else {
      return {
        name: "na",
        total: parseInt(topCliente.total),
      };
    }
  });

  console.log("formatData", formatData);
  return (
    <Layout>
      <>
        <h1 className="text-4xl text-cyan-800 font-light">
          Ranking de Clientes:
        </h1>
        <div className="mt-4">
          <div className="mt-4">
            <BarChart
              className="mt-8"
              width={550}
              height={550}
              data={formatData}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="total" fill="#3182c3" />
            </BarChart>
          </div>
        </div>
      </>
    </Layout>
  );
};

export default RankingClientes;
