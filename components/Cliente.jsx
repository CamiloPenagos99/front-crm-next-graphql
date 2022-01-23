import { gql, useQuery, useMutation } from "@apollo/client";
import Swal from "sweetalert2";

export const Cliente = ({ cliente }) => {
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

  const [eliminarCliente] = useMutation(
    ELIMINARCLIENTE /*{
    update(cache) {
      // obtener una copia del objeto de cache
      const { obtenerClientesVendedor } = cache.readQuery({ query: CLIENTES });

      // reescribir el cache
      cache.writeQuery({
        query: CLIENTES,
        data: {
          obtenerClientesVendedor: obtenerClientesVendedor.filter(
            (actual) => actual.id !== id
          ),
        },
      });
    },
    
  }*/
  );
  const confirmarEliminarCliente = (idCliente) => {
    Swal.fire({
      title: "¿Estas seguro, de eliminar cliente?",
      text: "Eliminar al cliente, es irreversible",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#053476",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borrar",
      cancelButtonText: "No, cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          console.log(`Eliminando... ${idCliente}`);

          const response = await eliminarCliente({
            variables: {
              eliminarClienteId: idCliente + "",
            },
          });
          console.log("Se elimino: ", response);
          Swal.fire(
            "Eliminado",
            "El cliente se ha eliminado correctamente",
            "completo"
          );
        } catch (error) {
          console.error(error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message,
            footer: '<a href="">Why do I have this issue?</a>',
          });
        }
      }
    });
  };

  const confirmarEditarCliente = (id) => {
    Swal.fire({
      title: "¿Quieres editar el Cliente?",
      text: "Asegurate de registrar la información correcta",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#475B63",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, editar cliente",
      cancelButtonText: "No, cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("Entrar en modo edición");
      }
    });
  };

  return (
    <>
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
          <button
            type="button"
            className="flex justify-center bg-gray-800 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
            onClick={() => confirmarEditarCliente(cliente.id)}
          >
            Editar
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>
        </td>
      </tr>
    </>
  );
};
