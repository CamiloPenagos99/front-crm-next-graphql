import Link from "next/link";
import { useRouter } from "next/router";

const Sidebar = () => {
  //routing de next
  const router = useRouter();

  return (
    <aside className="bg-gray-800 sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5">
      <div>
        <p className="text-white text-2xl text-lg font-semibold tracking-widest text-stone-200 uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline">
          CRM Clientes
        </p>
      </div>
      <nav className="mt-5 list-none">
        <li className={router.pathname==="/" ? "bg-blue-800 p-3" : "p-3"}>
          <Link href="/">
            <a className="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-gray-200 rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
              Clientes
            </a>
          </Link>
        </li>
        <li>
          <Link href="/pedidos">
            <a className="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-gray-200 rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
              Pedidos
            </a>
          </Link>
        </li>
        <li>
          <Link href="/productos">
            <a className="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-gray-200 rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
              Producto
            </a>
          </Link>
        </li>
      </nav>
    </aside>
  );
};

export default Sidebar;
