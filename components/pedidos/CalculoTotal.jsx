const CalculoTotal = () => {
  return (
    <>
      <p className="mt-10 bg-white border-l-4 border-pink-600 text-gray-600 p-2 text-sm font-bold pb-3">
        Total del pedido:
      </p>
      <div className="flex items-center mt-5 justify-between bg-white p-3 border-solid border-2 border-gray-500">
        <h2 className="font-semibold text-base text-gray-900">Total a pagar:</h2>
        <p className="font-semibold text-green-800 mt-1">$200</p>
      </div>
    </>
  );
};

export default CalculoTotal;
