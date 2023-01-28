import React, { useState } from "react";
import "./AddNewProduct.css";
import { BiRename } from "react-icons/bi";
import { BsBag, BsCurrencyDollar } from "react-icons/bs";
import { AiOutlineLineChart } from "react-icons/ai";
import { FaRegAddressBook } from "react-icons/fa";
import { HiOutlineColorSwatch } from "react-icons/hi";

export default function AddNewProduct({ getAllProducts }) {
  const [newProductTitle, setNewProductTitle] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [newProductCount, setNewProductCount] = useState("");
  const [newProductImg, setNewProductImg] = useState("");
  const [newProductPopularity, setNewProductPopularity] = useState("");
  const [newProductSale, setNewProductSale] = useState("");
  const [newProductColors, setNewProductColors] = useState("");
  /////////////////////////////////////////////////////////////////////////////////////////////////addNewProduct
  const newProductsInfos = {
    title: newProductTitle,
    price: newProductPrice,
    count: newProductCount,
    img: newProductImg,
    popularity: newProductPopularity,
    sale: newProductSale,
    colors: newProductColors,
  };

  const addNewProduct = (event) => {
    event.preventDefault();

    fetch(`http://localhost:8000/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProductsInfos),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        getAllProducts();
        emptyInputs();
      });
  };
  /////////////////////////////////////////////////////////////////////////////////////////////////emptyInputs
  function emptyInputs() {
    setNewProductTitle("");
    setNewProductPrice("");
    setNewProductCount("");
    setNewProductImg("");
    setNewProductPopularity("");
    setNewProductSale("");
    setNewProductColors("");
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div className="product-main">
      <h1 className="product-title">افزودن محصول جدید</h1>
      <form action="#" className="add-product-form">
        <div className="add-product-form-wrap">
          <div className="add-product-form-group">
            <BiRename />
            <input
              type="text"
              placeholder="اسم محصول را بنویسید"
              className="add-product-input"
              value={newProductTitle}
              onChange={(e) => setNewProductTitle(e.target.value)}
            />
          </div>
          <div className="add-product-form-group">
            <BsCurrencyDollar />
            <input
              type="text"
              placeholder="قیمت محصول را بنویسید"
              className="add-product-input"
              value={newProductPrice}
              onChange={(e) => setNewProductPrice(e.target.value)}
            />
          </div>
          <div className="add-product-form-group">
            <BsBag />
            <input
              type="text"
              placeholder="موجودی محصول را بنویسید"
              className="add-product-input"
              value={newProductCount}
              onChange={(e) => setNewProductCount(e.target.value)}
            />
          </div>
          <div className="add-product-form-group">
            <FaRegAddressBook />
            <input
              type="text"
              placeholder="آدرس عکس محصول را بنویسید"
              className="add-product-input"
              value={newProductImg}
              onChange={(e) => setNewProductImg(e.target.value)}
            />
          </div>
          <div className="add-product-form-group">
            <AiOutlineLineChart />
            <input
              type="text"
              placeholder="میزان محبوبیت محصول را بنویسید"
              className="add-product-input"
              value={newProductPopularity}
              onChange={(e) => setNewProductPopularity(e.target.value)}
            />
          </div>
          <div className="add-product-form-group">
            <AiOutlineLineChart />
            <input
              type="text"
              placeholder="میزان فروش محصول را بنویسید"
              className="add-product-input"
              value={newProductSale}
              onChange={(e) => setNewProductSale(e.target.value)}
            />
          </div>
          <div className="add-product-form-group">
            <HiOutlineColorSwatch />
            <input
              type="text"
              placeholder="تعداد رنگ بندی محصول را بنویسید"
              className="add-product-input"
              value={newProductColors}
              onChange={(e) => setNewProductColors(e.target.value)}
            />
          </div>
        </div>
        <button className="add-product-submit" onClick={addNewProduct}>
          ثبت محصول
        </button>
      </form>
    </div>
  );
}
