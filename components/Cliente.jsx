import { gql, useQuery, useMutation } from "@apollo/client";
import Swal from "sweetalert2";
import router, { useRouter } from "next/router";
import BotonEliminar from "../utils/botonEliminar";
import BotonEditar from "../utils/botonEditar";

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
        /* router.push({
          pathname: "/editarcliente/[id]",
          query: { id },
        }); */
        router.push(`/editarcliente/${id}`);
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
          <BotonEliminar funcion={confirmarEliminarCliente} id={cliente.id}></BotonEliminar>
         <BotonEditar funcion={confirmarEditarCliente} id={cliente.id}></BotonEditar>
        </td>
      </tr>
    </>
  );
};
