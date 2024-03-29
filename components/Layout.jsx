import Head from "next/head";
import Sidebar from "./Sidebar";
import { useRouter } from "next/router";
import { useAuth } from "../hooks/useAuth";
import { Header } from "./Header";

const Layout = ({ children }) => {
  const { authenticated } = useAuth();
  console.log("Estado de usuario:", authenticated);
  //router hook
  const router = useRouter();

  const handlerClick = () => {
    router.push("/login");
  };
  return (
    <>
      <Head>
        <title>CRM - Administración</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css"
        />
      </Head>

      {router.pathname === "/login" || router.pathname === "/registro" ? (
        <div className="bg-gray-200 min-h-screen flex flex-col justify-center">
          <div> {children}</div>
        </div>
      ) : !authenticated ? (
        <div className="bg-gray-200 min-h-screen flex flex-col justify-center">
          <div role="alert" className="sm:w-2/3 xl:w-4/5 sm:min-h-screen p-5">
            <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
              No autorizado
            </div>
            <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
              <p>El usuario no ha iniciado sesion</p>
            </div>
            <button
              onClick={handlerClick}
              className="mr-4 bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 border-b-4 border-gray-700 hover:border-blue-500 rounded"
            >
              Iniciar sesion
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-gray-200 min-h-screen">
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="sm:w-2/3 xl:w-4/5 sm:min-h-screen p-5">
              <Header></Header>
              {children}
            </main>
          </div>
        </div>
      )}
    </>
  );
};

export default Layout;
