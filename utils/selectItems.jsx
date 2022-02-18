import React, { Component } from "react";
import Select from "react-select";
import { useEffect, useState } from "react";

const options = [
  { id: "1", nombre: "Televisor HD" },
  { id: "2", nombre: "Audifonos" },
  { id: "3", nombre: "Teclado" },
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
        placeholder="Seleccione el producto"
        noOptionsMessage={() => "No hay productos..."}
        getOptionLabel={(opciones) => {
          return opciones.nombre;
        }}
        getOptionValue={(opciones) => {
          return opciones.id;
        }}
      />
    </>
  );
};

export default SelectItem;
