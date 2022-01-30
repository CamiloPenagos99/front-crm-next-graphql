import Layout from "../components/Layout";
import { gql, useQuery, useMutation } from "@apollo/client";
import Link from "next/link";

import { Cliente } from "../components/Cliente";

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

const ELIMINARCLIENTE = gql`
  mutation EliminarCliente($eliminarClienteId: ID!) {
    eliminarCliente(id: $eliminarClienteId)
  }
`;

export default function Home() {
  const { loading, error, data } = useQuery(CLIENTES);

  console.log("Render clientes");
  const spinner = (
    <button type="button" className="bg-indigo-500 ..." disabled>
      <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24"></svg>
      Cargando...
    </button>
  );

  if (error)
    return (
      <div
        className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3"
        role="alert"
      >
        <p className="font-bold">Error del servidor</p>
        <p className="text-sm">{error.message}</p>
      </div>
    );

  return (
    <div>
      <Layout>
        <h1 className="text-4xl text-cyan-800 font-light">Clientes</h1>

        <br />
        <Link href="/nuevoCliente">
          <a className="text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-800 dark:border-gray-700 text-sm hover:bg-blue-500 mb-3">
            Registrar cliente
          </a>
        </Link>

        {!data ? (
          spinner
        ) : (
          <table className="table-auto shadow-md mt-10 w-full w-lg">
            <thead className="bg-gray-800">
              <tr className="text-white">
                <th className="w-1/5 py-2">Nombre</th>
                <th className="w-1/5 py-2">Empresa</th>
                <th className="w-1/5 py-2">Email</th>
                <th className="w-1/5 py-2">Acción</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {data.obtenerClientesVendedor.map((cliente) => (
                <Cliente key={cliente.id} cliente={cliente}></Cliente>
              ))}
            </tbody>
          </table>
        )}
      </Layout>
    </div>
  );
}
