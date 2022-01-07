import { gql, useQuery } from "@apollo/client";
import router, { useRouter } from "next/router";

const USUARIO = gql`
  query obtenerUsuario {
    obtenerUsuario {
      id
      nombre
      apellido
    }
  }
`;

export const Header = ({ nombre, id }) => {
  const { loading, error, data } = useQuery(USUARIO);

  const handleLogOut = () => {
    console.log('Cerrar sesion')
    localStorage.removeItem("tkn");
    router.push("/login");
  };

  if (loading) return <p>Cargango información...</p>;
  return (
    <div className="flex justify-end">
      <div className="p-2">
        <div className="inline-flex items-center bg-white leading-none text-pink-600 rounded-full p-2 shadow text-teal text-sm">
          <button
            onClick={handleLogOut}
            className="inline-flex bg-pink-600 text-white rounded-full h-6 px-3 justify-center items-center"
          >
            Cerrar sesion:
          </button>
          <span className="inline-flex px-2">
            {data.obtenerUsuario.nombre} {data.obtenerUsuario.apellido}
          </span>
        </div>
      </div>
    </div>
  );
};
