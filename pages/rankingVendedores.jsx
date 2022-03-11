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

const CONSULTARRANKINGVENDEDORES = gql`
  query MejoresVendedores {
    mejoresVendedores {
      vendedor {
        id
        nombre
        apellido
        email
      }
      total
    }
  }
`;

const RankingVendedores = () => {
  const { loading, error, data, startPolling, stopPolling } = useQuery(
    CONSULTARRANKINGVENDEDORES
  );

  useEffect(() => {
    startPolling(1000);
    return () => {
      stopPolling();
    };
  }, [startPolling, stopPolling]);

  if (!data || loading) return <Loader message="Cargando información"></Loader>;
  console.log(data.mejoresVendedores);

  const formatData = data.mejoresVendedores.map((topVendedor) => {
    if (topVendedor.vendedor.length > 0) {
      return {
        name: topVendedor.vendedor[0].nombre,
        total: parseInt(topVendedor.total),
      };
    } else {
      return {
        name: "na",
        total: parseInt(topVendedor.total),
      };
    }
  });

  console.log("formatData", formatData);
  return (
    <Layout>
      <>
        <h1 className="text-4xl text-cyan-800 font-light">
          Ranking de Vendedores:
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

export default RankingVendedores;
