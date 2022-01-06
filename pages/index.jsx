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
    }
  }
`;

export default function Home() {
  const { loading, error, data } = useQuery(CLIENTES);
  return (
    <div>
      <Layout>
        <h1 className="text-2xl text-gray-800 font-light">Clientes</h1>
        <div>{JSON.stringify(data)}</div>
      </Layout>
    </div>
  );
}
