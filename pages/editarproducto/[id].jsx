import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { Mensaje } from "../../utils/mensaje";
import { Error } from "../../utils/error";
import { Formik } from "formik";
import { useFormik } from "formik";
import { gql, useQuery } from "@apollo/client";
import Loader from "../../utils/loader";

const OBTENERPRODUCTO = gql`
  query ObtenerProducto($idProducto: ID!) {
    obtenerProducto(id: $idProducto) {
      nombre
      precio
      stock
    }
  }
`;
const EditarProducto = () => {
  const router = useRouter();
  const { id } = router.query;
  const { loading, error, data } = useQuery(OBTENERPRODUCTO, {
    variables: { idProducto: id },
  });

  const dataProducto = data ? data.obtenerProducto : loading;
  console.log(dataProducto);

  return (
    <>
      <Layout>
        {!data ? (
          <Loader message="Cargando información"></Loader>
        ) : (
          <>
            <h1 className="text-4xl text-cyan-800 font-light">
              Editar Producto:
            </h1>
            <div className="flex justify-center mt-5">
              <div className="w-full max-w-lg">
                <Formik enableReinitialize initialValues={dataProducto}>
                  {(props) => {
                    return (
                      <form
                        className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                        //onSubmit={props.handleSubmit}
                      >
                        <div className="mb-5">
                          <label
                            className="block text-gray-700 text-sm font-bold mb-2 py-1"
                            htmlFor="nombre"
                          >
                            Nombre:
                          </label>
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline focus:ring focus:ring-blue-300"
                            id="nombre"
                            type="text"
                            placeholder="nombre"
                            /*
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          */
                            value={props.values.nombre}
                          ></input>
                        </div>
                        {/* {props.touched.nombre && props.errors.nombre ? (
                        <div
                          className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded relative"
                          role="alert"
                        >
                          <strong className="font-bold">Error: </strong>
                          <p className="block sm:inline">{props.errors.nombre}</p>
                        </div>
                      ) : null} */}
                        <div className="mb-5">
                          <label
                            className="block text-gray-700 text-sm font-bold mb-2 py-1"
                            htmlFor="precio"
                          >
                            Precio:
                          </label>
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline focus:ring focus:ring-blue-300"
                            id="precio"
                            type="text"
                            placeholder="precio"
                            /*
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          */
                            value={props.values.precio}
                          ></input>
                        </div>
                        {/* {props.touched.precio && props.errors.precio ? (
                        <div
                          className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded relative"
                          role="alert"
                        >
                          <strong className="font-bold">Error: </strong>
                          <p className="block sm:inline">{props.errors.precio}</p>
                        </div>
                      ) : null} */}
                        <div className="mb-5">
                          <label
                            className="block text-gray-700 text-sm font-bold mb-2 py-1"
                            htmlFor="stock"
                          >
                            Stock:
                          </label>
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline focus:ring focus:ring-blue-300"
                            id="stock"
                            type="text"
                            placeholder="stock"
                            /*
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          */
                            value={props.values.stock}
                          ></input>
                        </div>
                        {/* {props.touched.stock && props.errors.stock ? (
                        <div
                          className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded relative"
                          role="alert"
                        >
                          <strong className="font-bold">Error: </strong>
                          <p className="block sm:inline">{props.errors.stock}</p>
                        </div>
                      ) : null} */}

                        <input
                          type="submit"
                          className="bg-blue-600 w-full mt-5 p-2 text-white uppercase tw-hover:underline tw-no-underline"
                          value="Editar"
                        />
                        {/*         <div>
                        {data ? (
                          <Mensaje
                            title="Produto registrado"
                            desc="Produto registrado correctamente"
                          ></Mensaje>
                        ) : null}
                      </div>
                      <div>
                        {error ? (
                          <Error
                            title="Error de registro"
                            desc="Error al registrar produto"
                          ></Error>
                        ) : null}
                      </div> */}
                      </form>
                    );
                  }}
                </Formik>
              </div>
            </div>
          </>
        )}
      </Layout>
    </>
  );
};

export default EditarProducto;
