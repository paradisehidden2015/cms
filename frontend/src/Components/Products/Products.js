import React, { useEffect, useState } from "react";
import AddNewProduct from "../AddNewProduct/AddNewProduct";
import ProductsTable from "../ProductsTable/ProductsTable";
import "./Products.css";

export default function Products() {
  const [allProduct, setAllProduct] = useState([]);
  ////////////////////////////////////////////////////useEffect///////////////////////////////////
  useEffect(() => {
    getAllProducts();
  }, []);
  ////////////////////////////////////////////////////getAllProducts///////////////////////////////
  const getAllProducts = () => {
    fetch("http://localhost:8000/api/products/")
      .then((response) => response.json())
      .then((result) => setAllProduct(result));
  };
  ////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <>
      <AddNewProduct getAllProducts={getAllProducts} />
      <ProductsTable allProduct={allProduct} getAllProducts={getAllProducts} />
    </>
  );
}
