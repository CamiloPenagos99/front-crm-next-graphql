import React, { Component } from "react";
import Select from "react-select";
import { useEffect, useState } from "react";

const options = [
  { id: "Televisor led", nombre: "tv" },
  { id: "Audifonos", nombre: "audifonos" },
  { id: "Mouse Gamer", nombre: "mouse" },
];

const SelectItem = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    console.log(productos);
  }, [productos]);

  const agregarProducto = (productos) => {
    setProductos(productos);
  };

  return (
    <>
      <Select
        isMulti="true"
        options={options}
        onChange={(productos) => agregarProducto(productos)}
        label="Seleccione el producto"
        noOptionsMessage={() => "No hay productos..."}
        getOptionLabel={(opciones) => {
          return opciones.id;
        }}
        getOptionValue={(opciones) => {
          return opciones.nombre;
        }}
      />
    </>
  );
};

export default SelectItem;
