import Layout from "../components/Layout";
import { gql, useQuery, useMutation } from "@apollo/client";
import Loader from "../utils/loader";
import { Product } from "../components/Product";

const PRODUCTOS = gql`
  query Query {
    obtenerProductos {
      id
      nombre
      precio
      stock
    }
  }
`;

const Productos = () => {
  const { loading, error, data } = useQuery(PRODUCTOS);
  console.log("render productos", "loading:" + loading);
  //console.log("render productos", "data:" + JSON.stringify(data));
  return (
    <div>
      <Layout>
        <h1 className="text-2xl text-gray-800 font-light">Productos</h1>
        {data ? (
          <section className="antialiased bg-gray-100 text-gray-600 h-screen px-4">
            <div className="flex flex-col justify-center h-full">
              {/* Table */}
              <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-20">
                <header className="px-5 py-4 border-b border-gray-100">
                  <h2 className="font-semibold text-gray-800">Productos</h2>
                </header>
                <div className="p-3">
                  <div className="overflow-x-auto">
                    <table className="table-auto w-full">
                      <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                        <tr>
                          <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-left">
                              Nombre
                            </div>
                          </th>
                          <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-left">Stock</div>
                          </th>
                          <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-left">
                              Precio
                            </div>
                          </th>
                          <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-center">Id</div>
                          </th>
                          <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-center">Acción</div>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-sm divide-y divide-gray-100">
                        {data.obtenerProductos.map((product) => {
                          return <Product key={product.id} producto={product}></Product>;
                        })}
                        {console.log(data.obtenerProductos)}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <Loader message="Cargando información"></Loader>
        )}
      </Layout>
    </div>
  );
};

export default Productos;
