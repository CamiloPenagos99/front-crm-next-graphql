import Layout from "../components/Layout";
import AsignarCliente from "../components/pedidos/AsignaCliente";
import SelectItem from "../utils/selectItems";

const NuevoPedido = () => {
  return (
    <>
      <Layout>
        <div>
          <h1 className="text-4xl text-cyan-800 font-light">Nuevo Pedido:</h1>
          <h2 className="text-2xl text-blue-800 font-light pt-4 pb-4">Seleccionar productos:</h2>
          <SelectItem></SelectItem>
          <AsignarCliente></AsignarCliente>
        </div>
      </Layout>
    </>
  );
};

export default NuevoPedido;
