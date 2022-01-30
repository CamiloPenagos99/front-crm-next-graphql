import Layout from "../components/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Mensaje } from "../utils/mensaje";
import { Error } from "../utils/error";
import { useRouter } from "next/router";
import { useQuery, useMutation, gql } from "@apollo/client";
const NUEVOPRODUCTO = gql`
  mutation crearproducto($input: ProductoInput!) {
    producto(input: $input) {
      id
      nombre
    }
  }
`;
const NuevoProcuto = () => {
  const router = useRouter();
  const [producto, { data, loading, error }] = useMutation(NUEVOPRODUCTO);
  const formik = useFormik({
    initialValues: {
      nombre: "",
      precio: "",
      stock: "",
    },
    validationSchema: Yup.object({
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
    }),
    onSubmit: async (valores) => {
      try {
        console.log(JSON.stringify(valores));
        const { nombre, precio, stock } = valores;
        const precioInt = parseInt(precio);
        const stockInt = parseInt(stock);
        const response = await producto({
          variables: {
            input: {
              nombre,
              precio: precioInt,
              stock: stockInt,
            },
          },
        });
        if (response) {
          setTimeout(() => router.push("/productos"), 1000);
        } //redireccionamiento a productos
      } catch (e) {
        console.error(e.message);
      }
    },
  });
  return (
    <Layout>
      <h1 className="text-4xl text-cyan-800 font-light">Agregar Producto:</h1>
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
                htmlFor="precio"
              >
                Precio:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline focus:ring focus:ring-blue-300"
                id="precio"
                type="text"
                placeholder="precio"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.precio}
              ></input>
            </div>
            {formik.touched.precio && formik.errors.precio ? (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded relative"
                role="alert"
              >
                <strong className="font-bold">Error: </strong>
                <p className="block sm:inline">{formik.errors.precio}</p>
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
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.stock}
              ></input>
            </div>
            {formik.touched.stock && formik.errors.stock ? (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded relative"
                role="alert"
              >
                <strong className="font-bold">Error: </strong>
                <p className="block sm:inline">{formik.errors.stock}</p>
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
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default NuevoProcuto;
