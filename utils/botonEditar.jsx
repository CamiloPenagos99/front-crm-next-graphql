const BotonEditar = ({ funcion, id }) =>{

    return (
        <button
            type="button"
            className="flex justify-center bg-gray-800 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
            onClick={() => funcion(id)}
          >
            Editar
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>
    )
}

export default BotonEditar