import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";
import { gql, useQuery } from "@apollo/client";

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

export default function Home() {
  console.log("Render clientes");
  const { loading, error, data } = useQuery(CLIENTES);

  const spinner = (
    <button type="button" className="bg-indigo-500 ..." disabled>
      <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24"></svg>
      Cargando...
    </button>
  );

  if (loading) return spinner;

  return (
    <div>
      <Layout>
        <h1 className="text-4xl text-cyan-800 font-light">Clientes</h1>

        <table className="table-auto shadow-md mt-10 w-full w-lg">
          <thead className="bg-gray-800">
            <tr className="text-white">
              <th className="w-1/5 py-2">Nombre</th>
              <th className="w-1/5 py-2">Empresa</th>
              <th className="w-1/5 py-2">Email</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {data.obtenerClientesVendedor.map((cliente) => (
              <tr key={cliente.id}>
                <td className="border px-4 py-2">
                  {cliente.nombre} {cliente.apellido}
                </td>
                <td className="border px-4 py-2">{cliente.empresa}</td>
                <td className="border px-4 py-2">{cliente.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Layout>
    </div>
  );
}
