import BotonEliminar from "../utils/botonEliminar";
import { gql, useQuery, useMutation } from "@apollo/client";
import Swal from "sweetalert2";
import BotonEditar from "../utils/botonEditar";
import { useRouter } from "next/router";

const ELIMINARPRODUCTO = gql`
  mutation EliminarProducto($eliminarProductoId: ID!) {
    eliminarProducto(id: $eliminarProductoId) {
      id
      nombre
      stock
    }
  }
`;

export const Product = ({ producto }) => {
  const router = useRouter();
  function confirmarEliminarProducto(id) {
    Swal.fire({
      title: "¿Estas seguro, de eliminar el producto?",
      text: "Eliminar el producto, es irreversible",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#053476",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borrar",
      cancelButtonText: "No, cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          console.log(`Eliminando... ${id}`);

          const response = await eliminarProducto({
            variables: {
              eliminarProductoId: id,
            },
          });
          console.log("Se elimino: ", response);
          Swal.fire(
            "Eliminado",
            "El producto se ha eliminado correctamente",
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
  }

  const confirmarEditarProducto = (id) => {
    Swal.fire({
      title: "¿Quieres editar el Producto?",
      text: "Asegurate de registrar la información correcta",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#475B63",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, editar producto",
      cancelButtonText: "No, cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        /* router.push({
          pathname: "/editarcliente/[id]",
          query: { id },
        }); */
        router.push(`/editarproducto/${id}`);
      }
    });
  };

  const [eliminarProducto] = useMutation(ELIMINARPRODUCTO);
  return (
    <>
      <tr key={producto.id}>
        <td className="p-2 whitespace-nowrap">
          <div className="flex items-center">
            <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3"></div>
            <div className="font-medium text-gray-800">{producto.nombre}</div>
          </div>
        </td>
        <td className="p-2 whitespace-nowrap">
          <div className="text-left">{producto.stock}</div>
        </td>
        <td className="p-2 whitespace-nowrap">
          <div className="text-left font-medium text-green-500">
            ${producto.precio}
          </div>
        </td>
        <td className="p-2 whitespace-nowrap">
          <div className="text-lg text-center">
            {producto.id.substring(producto.id.length - 5)}
          </div>
        </td>
        <td className="p-2 whitespace-nowrap">
          <div className="text-lg text-center">
            <BotonEliminar
              funcion={confirmarEliminarProducto}
              id={producto.id}
            ></BotonEliminar>
            <BotonEditar
              funcion={confirmarEditarProducto}
              id={producto.id}
            ></BotonEditar>
          </div>
        </td>
      </tr>
    </>
  );
};
