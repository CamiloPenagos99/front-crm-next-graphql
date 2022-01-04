import Layout from "../components/Layout";
import { Formik } from "formik";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, gql } from "@apollo/client";

const LOGIN = gql`
  mutation NuevoVendedor($input: UsuarioInput!) {
    usuario(input: $input) {
      nombre
      apellido
      email
      id
    }
  }
`;

const Login = () => {

   //Crear usuario, Mutation
   const [usuario] = useMutation(LOGIN);

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
      alert(JSON.stringify(valores));
    },
  });
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
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Login;
