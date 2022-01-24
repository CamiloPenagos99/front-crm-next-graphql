import router, { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { Mensaje } from "../../utils/mensaje";
import { Error } from "../../utils/error";
import { useFormik } from "formik";
import { gql, useQuery, useMutation } from "@apollo/client";
import * as Yup from "yup";
import Loader from "../../utils/loader";
import { Formik } from "formik";

const OBTENERCLIENTE = gql`
  query obtenerCliente($idCliente: ID!) {
    obtenerCliente(idCliente: $idCliente) {
      apellido
      id
      nombre
      empresa
      email
    }
  }
`;
const EditarCliente = () => {
  const router = useRouter();
  const { id } = router.query;

  const { loading, error, data } = useQuery(OBTENERCLIENTE, {
    variables: { idCliente: id },
  });

  //esquema de validación
  const validationSchema = Yup.object({
    nombre: Yup.string().required("El nombre es obligatorio"),
    apellido: Yup.string().required("El apellido es obligatorio"),
    empresa: Yup.string().required("La empresa es obligatorio"),
    email: Yup.string()
      .email("Formato de email, no valido")
      .required("El email es obligatorio"),
    //telefono: Yup.string().optional("El telefono es obligatorio"),
  });

  if (loading) return <Loader message="Cargando información"></Loader>;
  const { obtenerCliente } = data;

  /*  
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
        if (response) router.push("/"); //redireccionamiento a clientes
      } catch (e) {
        console.error(e.message);
      }
    },
  });
*/
  return (
    <Layout>
      {!data ? (
        <Loader message="Cargando información"></Loader>
      ) : (
        <>
          <h1 className="text-4xl text-cyan-800 font-light">Editar Cliente:</h1>
          <div className="flex justify-center mt-5">
            <div className="w-full max-w-lg">
              <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={obtenerCliente}
              >
                {(props) => {
                  console.log(props);

                  return (
                    <form
                      className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                      /*  onSubmit={formik.handleSubmit} */
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
                          htmlFor="apellido"
                        >
                          Apellido:
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline focus:ring focus:ring-blue-300"
                          id="apellido"
                          type="text"
                          placeholder="apellido"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.apellido}
                        ></input>
                      </div>
                      {props.touched.apellido && props.errors.apellido ? (
                        <div
                          className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded relative"
                          role="alert"
                        >
                          <strong className="font-bold">Error: </strong>
                          <p className="block sm:inline">
                            {props.errors.apellido}
                          </p>
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
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.empresa}
                        ></input>
                      </div>
                      {props.touched.empresa && props.errors.empresa ? (
                        <div
                          className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded relative"
                          role="alert"
                        >
                          <strong className="font-bold">Error: </strong>
                          <p className="block sm:inline">
                            {props.errors.empresa}
                          </p>
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
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.email}
                        ></input>
                      </div>
                      {props.touched.email && props.errors.email ? (
                        <div
                          className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded relative"
                          role="alert"
                        >
                          <strong className="font-bold">Error: </strong>
                          <p className="block sm:inline">
                            {props.errors.email}
                          </p>
                        </div>
                      ) : null}

                      <input
                        type="submit"
                        className="bg-blue-700 w-full mt-5 p-2 text-white uppercase tw-hover:underline tw-no-underline"
                        value="Editar"
                      />
                      <div>
                        {false ? (
                          // eslint-disable-next-line react/jsx-no-undef
                          <Mensaje
                            title="Cliente registrado"
                            desc="Cliente registrado correctamente"
                          ></Mensaje>
                        ) : null}
                      </div>
                      <div>
                        {error ? (
                          // eslint-disable-next-line react/jsx-no-undef
                          <Error
                            title="Error de registro"
                            desc="Error al registrar cliente"
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
  );
};

export default EditarCliente;
