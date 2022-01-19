import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";
import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import Swal from "sweetalert2";

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
  const { loading, error, data } = useQuery(CLIENTES);
  //console.log("Render clientes", data);
  const spinner = (
    <button type="button" className="bg-indigo-500 ..." disabled>
      <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24"></svg>
      Cargando...
    </button>
  );

  const confirmarEliminarCliente = (id) => {
    Swal.fire({
      title: "¿Estas seguro, de eliminar cliente?",
      text: "Eliminar al cliente, es irreversible",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borrar",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(`Confirmar la eliminación del cliente: ${id}`);
        Swal.fire(
          "Eliminado",
          "El cliente se ha eliminado correctamente",
          "completo"
        );
      }
    });
  };

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
                <tr key={cliente.id}>
                  <td className="border px-4 py-2">
                    {cliente.nombre} {cliente.apellido}
                  </td>
                  <td className="border px-4 py-2">{cliente.empresa}</td>
                  <td className="border px-4 py-2">{cliente.email}</td>
                  <td className="border px-4 py-2">
                    <button
                      type="button"
                      className="flex justify-center bg-red-800 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
                      onClick={() => confirmarEliminarCliente(cliente.id)}
                    >
                      Eliminar
                      <svg
                        className="w-4 h-4 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Layout>
    </div>
  );
}
