const ProductoResumen = ({ producto }) => {
  const { nombre, precio } = producto;
  return (
    <>
      <div className="md:flex md:justify-between md:items-center mt-5">
        <div className="md:w-2/4 mb-2 md:mb-0">
          <p className="text-sm">{nombre}</p>
          <p className="text-green-500">${precio}</p>
        </div>
        <input
          className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline md:ml-4"
          type="number"
          placeholder="cantidad"
        ></input>
      </div>
    </>
  );
};

export default ProductoResumen;
