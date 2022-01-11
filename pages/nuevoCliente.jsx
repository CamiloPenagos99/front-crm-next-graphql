import Layout from "../components/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";

const nuevoCliente = () => {
  const formik = useFormik({
    initialValues: {
      nombre: "",
      apellido: "",
    },
    validationSchema: Yup.object({
      nombre: Yup.string()
        .email("El email no es valido")
        .required("El email es obligatorio"),
      password: Yup.string().required("El password es obligatorio"),
    }),

    onSubmit: async (valores) => {
      try {
        const response = await autenticacion({
          variables: {
            input: {
              ...valores,
            },
          },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  return (
    <Layout>
      <h1 className="text-4xl text-cyan-800 font-light">Registrar Cliente:</h1>
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <form className="bg-white shadow-md px-8 pt-6 pb-8 mb-4">
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

            <div className="mb-5">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 py-1"
                htmlFor="telefono"
              >
                Telefono:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline focus:ring focus:ring-blue-300"
                id="telefono"
                type="tel"
                placeholder="telefono"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.telefono}
              ></input>
            </div>

            <input
                type="submit"
                className="bg-blue-400 w-full mt-5 p-2 text-white uppercase tw-hover:underline tw-no-underline"
                value="Registrar"
              />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default nuevoCliente;
