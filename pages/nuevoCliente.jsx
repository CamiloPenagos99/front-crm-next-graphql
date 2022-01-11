import Layout from "../components/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, gql } from "@apollo/client";
import { Mensaje } from "../utils/mensaje";
import { Error } from "../utils/error";

const CREARCLIENTE = gql`
  mutation NuevoCliente($input: InputCliente!) {
    nuevoCliente(input: $input) {
      apellido
      email
      nombre
    }
  }
`;

const NuevoCliente = () => {
  console.log("Renderizando componente");
  const [nuevoCliente, { data, loading, error }] = useMutation(CREARCLIENTE);
  const formik = useFormik({
    initialValues: {
      nombre: "",
      apellido: "",
      empresa: "",
      email: "",
      // telefono: "",
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required("El nombre es obligatorio"),
      apellido: Yup.string().required("El apellido es obligatorio"),
      empresa: Yup.string().required("La empresa es obligatorio"),
      email: Yup.string()
        .email("Formato de email, no valido")
        .required("El email es obligatorio"),
      //telefono: Yup.string().optional("El telefono es obligatorio"),
    }),

    onSubmit: async (valores) => {
      try {
        console.log(JSON.stringify(valores));

        const response = await nuevoCliente({
          variables: {
            input: {
              ...valores,
            },
          },
        });
        console.log(response);
      } catch (e) {
        console.error(e.message);
      }
    },
  });

  return (
    <Layout>
      <h1 className="text-4xl text-cyan-800 font-light">Registrar Cliente:</h1>
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <form
            className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
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
                placeholder="nombre"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.nombre}
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
                placeholder="apellido"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.apellido}
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
                htmlFor="empresa"
              >
                Empresa:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline focus:ring focus:ring-blue-300"
                id="empresa"
                type="text"
                placeholder="empresa"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.empresa}
              ></input>
            </div>
            {formik.touched.empresa && formik.errors.empresa ? (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded relative"
                role="alert"
              >
                <strong className="font-bold">Error: </strong>
                <p className="block sm:inline">{formik.errors.empresa}</p>
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
                placeholder="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
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

            <input
              type="submit"
              className="bg-blue-400 w-full mt-5 p-2 text-white uppercase tw-hover:underline tw-no-underline"
              value="Registrar"
            />
            <div>
              {data ? (
                <Mensaje
                  title="Cliente registrado"
                  desc="Cliente registrado correctamente"
                ></Mensaje>
              ) : null}
            </div>
            <div>
              {error ? (
                <Error
                  title="Error de registro"
                  desc="Error al registrar cliente"
                ></Error>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default NuevoCliente;
