import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { Mensaje } from "../../utils/mensaje";
import { Error } from "../../utils/error";
import { Formik } from "formik";
import * as Yup from "yup";
import { useFormik } from "formik";
import { gql, useMutation, useQuery } from "@apollo/client";
import Loader from "../../utils/loader";
import Swal from "sweetalert2";
import { useState } from "react";

const OBTENERPRODUCTO = gql`
  query ObtenerProducto($idProducto: ID!) {
    obtenerProducto(id: $idProducto) {
      nombre
      precio
      stock
    }
  }
`;

const EDITARPRODUCTO = gql`
  mutation ActualizarProducto(
    $producto: ProductoUpdateInput!
    $idProducto: ID!
  ) {
    actualizarProducto(producto: $producto, id: $idProducto) {
      id
      nombre
      stock
      precio
    }
  }
`;
const EditarProducto = () => {
  const [editado, setEditado] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  const { loading, error, data } = useQuery(OBTENERPRODUCTO, {
    variables: { idProducto: id },
  });

  const [actualizarProducto] = useMutation(EDITARPRODUCTO);

  const validationSchema = Yup.object({
    nombre: Yup.string().required("El nombre es requerido"),
    precio: Yup.number()
      .typeError("El precio, debe ser un valor numerico")
      .required("El precio es requerido")
      .positive("No se aceptan cantidades negativas"),
    stock: Yup.number()
      .typeError("El stock, debe ser un valor numerico")
      .required("La cantidad stock es requerida")
      .positive("No se aceptan cantidades negativas")
      .integer("El stock debe ser un entero"),
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
                <Formik
                  enableReinitialize
                  initialValues={dataProducto}
                  validationSchema={validationSchema}
                  onSubmit={async (values) => {
                    try {
                      console.log("Enviando data edición", values, id);
                      const { nombre, precio, stock } = values;
                      const nuevoPrecio = parseInt(precio);
                      const nuevoStock = parseInt(stock);
                      const response = await actualizarProducto({
                        variables: {
                          producto: {
                            nombre,
                            stock: nuevoStock,
                            precio: nuevoPrecio,
                          },
                          idProducto: id,
                        },
                      });
                      if (response) {
                        setEditado(true);
                        console.log("cambio estado");
                        router.push("/productos");
                      }
                    } catch (error) {
                      console.log("Error en la edición");
                      Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: error.message,
                        footer: '<a href="">Why do I have this issue?</a>',
                      });
                    }
                  }}
                >
                  {(props) => {
                    return (
                      <form
                        className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                        onSubmit={props.handleSubmit}
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
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.nombre}
                          ></input>
                        </div>
                        {props.touched.nombre && props.errors.nombre ? (
                          <div
                            className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded relative"
                            role="alert"
                          >
                            <strong className="font-bold">Error: </strong>
                            <p className="block sm:inline">
                              {props.errors.nombre}
                            </p>
                          </div>
                        ) : null}
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
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.precio}
                          ></input>
                        </div>
                        {props.touched.precio && props.errors.precio ? (
                          <div
                            className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded relative"
                            role="alert"
                          >
                            <strong className="font-bold">Error: </strong>
                            <p className="block sm:inline">
                              {props.errors.precio}
                            </p>
                          </div>
                        ) : null}
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
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.stock}
                          ></input>
                        </div>
                        {props.touched.stock && props.errors.stock ? (
                          <div
                            className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded relative"
                            role="alert"
                          >
                            <strong className="font-bold">Error: </strong>
                            <p className="block sm:inline">
                              {props.errors.stock}
                            </p>
                          </div>
                        ) : null}

                        <input
                          type="submit"
                          className="bg-blue-600 w-full mt-5 p-2 text-white uppercase tw-hover:underline tw-no-underline"
                          value="Editar"
                        />
                        <div>
                          {editado ? (
                            // eslint-disable-next-line react/jsx-no-undef
                            <Mensaje
                              title="Producto editado"
                              desc="Producto editado correctamente"
                            ></Mensaje>
                          ) : null}
                        </div>
                        <div>
                          {error ? (
                            // eslint-disable-next-line react/jsx-no-undef
                            <Error
                              title="Error de registro"
                              desc="Error al registrar producto"
                            ></Error>
                          ) : null}
                        </div>
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
