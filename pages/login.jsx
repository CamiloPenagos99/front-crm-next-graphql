import Layout from "../components/Layout";

const Login = () => {
  return (
    <>
      <Layout>
        <h1 className="text-center text-2xl text-black font-light">Login</h1>
        <div className="flex justify-center mt-5">
          <div className="w-full max-w-sm">
            <form className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4 py-1">
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
                ></input>
              </div>
              <input type="submit" className="bg-gray-800 w-full mt-5 p-2 text-white uppercase tw-hover:underline tw-no-underline" value="Iniciar Sesion" />
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Login;
