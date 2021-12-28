import Layout from "../components/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, gql } from "@apollo/client";
import { useState } from "react";

const NUEVA_CUENTA = gql`
  mutation NuevoVendedor($input: UsuarioInput!) {
    usuario(input: $input) {
      nombre
      apellido
      email
      id
    }
  }
`;
const Registro = () => {
  //state operacion

  const [mensaje, setMensaje] = useState(null);
  //Crear usuario, Mutation
  const [usuario] = useMutation(NUEVA_CUENTA);
  //validación del formulario

  const formik = useFormik({
    initialValues: {
      nombre: "",
      apellido: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required("El Nombre es Obligatorio"),
      apellido: Yup.string().required("El Apellido es Obligatorio"),
      email: Yup.string()
        .email("El Email no es valido")
        .required("El Email es Obligatorio"),
      password: Yup.string()
        .required("El Password es Obligatorio")
        .min(6, "El Password debe ser de minimo, 6 digitos"),
    }),
    //se ejecuta cuando se da submit al form
    onSubmit: async (valores) => {
      console.log("Enviando...", valores);
      try {
        const { data } = await usuario({
          variables: {
            input: {
              ...valores,
            },
          },
        });
        console.log("User", data);
        if (data) {
          setMensaje(true);
        }
        //alert(`¡Usuario ${data.usuario.nombre} creado correctamente!`);
      } catch (error) {
        console.log("error", error);
      }
    },
  });

  const mostrar = () => {
    return (
      <div
        className="bg-green-100 border-t-4 border-green-500 rounded-b text-green-900 px-4 py-3 shadow-md"
        role="alert"
      >
        <div className="flex">
          <div className="py-1">
            <svg
              className="fill-current h-6 w-6 text-green-500 mr-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
            </svg>
          </div>
          <div>
            <p className="font-bold">Usuario creado correctamente</p>
            <p className="text-sm text-green-500">
              El usuario vendedor, ha sido registrado en el sistema.
            </p>
          </div>
        </div>
      </div>
    );
  };

  //Validar el formulario con Formik y Yup
  return (
    <>
      <Layout>
        <h1 className="text-center text-4xl text-black font-light font-mono">
          Registro
        </h1>
        <div className="flex justify-center mt-5">
          <div className="w-full max-w-sm">
            <form
              className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4 py-1"
              onSubmit={formik.handleSubmit}
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
                  placeholder="Nombre"
                  value={formik.values.nombre}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                ></input>
              </div>
              {formik.touched.nombre && formik.errors.nombre ? (
                <div
                  className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded relative"
                  role="alert"
                >
                  <strong className="font-bold">Error: </strong>
                  <p className="block sm:inline">{formik.errors.nombre}</p>
                </div>
              ) : null}

              <div className="mb-5">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2 py-1"
                  htmlFor="apellido"
                >
                  Apellido:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline focus:ring focus:ring-blue-300"
                  id="apellido"
                  type="text"
                  placeholder="Apellido"
                  value={formik.values.apellido}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                ></input>
              </div>

              {formik.touched.apellido && formik.errors.apellido ? (
                <div
                  className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded relative"
                  role="alert"
                >
                  <strong className="font-bold">Error: </strong>
                  <p className="block sm:inline">{formik.errors.apellido}</p>
                </div>
              ) : null}

              <div className="mb-5">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2 py-1"
                  htmlFor="email"
                >
                  Email:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline focus:ring focus:ring-blue-300"
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                ></input>
              </div>

              {formik.touched.email && formik.errors.email ? (
                <div
                  className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded relative"
                  role="alert"
                >
                  <strong className="font-bold">Error: </strong>
                  <p className="block sm:inline">{formik.errors.email}</p>
                </div>
              ) : null}
              <div className="mb-5">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2 py-1"
                  htmlFor="password"
                >
                  Contraseña:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline focus:ring focus:ring-blue-300"
                  id="password"
                  type="password"
                  placeholder="Contraseña"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                ></input>
              </div>
              {formik.touched.password && formik.errors.password ? (
                <div
                  className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded relative"
                  role="alert"
                >
                  <strong className="font-bold">Error: </strong>
                  <p className="block sm:inline">{formik.errors.password}</p>
                </div>
              ) : null}

              <input
                type="submit"
                className="bg-gray-800 w-full mt-5 p-2 text-white uppercase tw-hover:underline tw-no-underline"
                value="Registro Usuario"
              />
              <label
                className="block text-gray-700 text-sm font-bold mb-2 py-1"
                htmlFor="nombre"
              >
                {mensaje && mostrar()}
              </label>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Registro;
