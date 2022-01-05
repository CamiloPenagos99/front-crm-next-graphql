import Layout from "../components/Layout";
import { Formik } from "formik";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, gql } from "@apollo/client";

const LOGIN = gql`
  mutation Autenticacion($input: LoginUsuarioInput!) {
    autenticacion(input: $input) {
      token
    }
  }
`;

const Login = () => {
  //Crear usuario, Mutation
  const [autenticacion, { data, loading, error }] = useMutation(LOGIN);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
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
        console.log("response:", response.data.autenticacion.token);
        localStorage.setItem("tkn", response.data.autenticacion.token);
      } catch (e) {
        console.error(e);
      }
    },
  });

  //if (loading) return <div>Validando en el servidor...</div>;
  console.log("error de inicio:", error);

  const mostrarError = () => {
    return (
      <div
        className="bg-red-100 border-t-4 border-red-500 rounded-b text-red-900 px-4 py-3 shadow-md"
        role="alert"
      >
        <div className="flex">
          <div className="py-1">
            <svg
              className="fill-current h-6 w-6 text-red-500 mr-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
            </svg>
          </div>
          <div>
            <p className="font-bold">Error al iniciar sesion</p>
            <p className="text-sm text-red-500">
              {JSON.parse(JSON.stringify(error)).graphQLErrors[0].message}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Layout>
        <h1 className="text-center text-4xl text-black font-light font-mono">
          Login
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
                  htmlFor="email"
                >
                  Email:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline focus:ring focus:ring-blue-300"
                  id="email"
                  type="email"
                  placeholder="Email"
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
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
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
                value="Inicio Sesion"
              />
              <div>{error ? mostrarError() : null}</div>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Login;
