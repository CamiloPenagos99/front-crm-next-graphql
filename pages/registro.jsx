import Layout from "../components/Layout";
import { useFormik } from 'formik'
import * as Yup from 'yup'

const Registro = () => {

  //validación del formulario

  const formik = useFormik({
    initialValues: {
      nombre: '',
      apellido: '',
      email: '',
      password: ''
    },
    onSubmit: valores => {
      console.log('Enviando...', valores)
    }
  });
  return (
    <>
      <Layout>
        <h1 className="text-center text-4xl text-black font-light font-mono">Registro</h1>
        <div className="flex justify-center mt-5">
          <div className="w-full max-w-sm">
            <form className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4 py-1" onSubmit={formik.handleSubmit}>
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
                  placeholder="Apellido"
                  value={formik.values.apellido}
                  onChange={formik.handleChange}
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
                  placeholder="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                ></input>
              </div>
              
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
                ></input>
              </div>


              <input type="submit" className="bg-gray-800 w-full mt-5 p-2 text-white uppercase tw-hover:underline tw-no-underline" value="Registro Usuario" />
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Registro;
