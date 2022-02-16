import Layout from "../components/Layout";
import SelectItem from "../utils/selectItems";

const NuevoPedido = () => {
  return (
    <>
      <Layout>
        <div>
          <h1 className="text-4xl text-cyan-800 font-light">Nuevo Pedido:</h1>
          <p className="pt-4 pb-4">Seleccionar productos: </p>
          <SelectItem></SelectItem>
        </div>
      </Layout>
    </>
  );
};

export default NuevoPedido;
