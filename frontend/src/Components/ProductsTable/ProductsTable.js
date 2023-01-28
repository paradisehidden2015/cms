import React, { useEffect, useState } from "react";
import "./ProductsTable.css";
import DeleteModal from "./../DeleteModal/DeleteModal";
import DetailsModal from "./../DetailsModal/DetailsModal";
import EditModal from "./../EditModal/EditModal";
import { BiRename } from "react-icons/bi";
import { BsBag, BsCurrencyDollar } from "react-icons/bs";
import { AiOutlineLineChart } from "react-icons/ai";
import { FaRegAddressBook } from "react-icons/fa";
import { HiOutlineColorSwatch } from "react-icons/hi";
import ErrorBox from "../ErrorBox/ErrorBox";

export default function ProductsTable({ allProduct, getAllProducts }) {
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowDetailsModal, setIsShowDetailsModal] = useState(false);
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [productId, setProductId] = useState(null);
  const [mainProductInfos, setMainProductInfos] = useState({});
  ///////////////////////////////////////////////////////////////////////////////////////////////
  const [productNewTitle, setProductNewTitle] = useState("");
  const [productNewPrice, setProductNewPrice] = useState("");
  const [productNewCount, setProductNewCount] = useState("");
  const [productNewImg, setProductNewImg] = useState("");
  const [productNewPopularity, setProductNewPopularity] = useState("");
  const [productNewSale, setProductNewSale] = useState("");
  const [productNewColors, setProductNewColors] = useState("");
  ///////////////////////////////////////////////////////////////////////////////////////////////deleteModalCancel
  const deleteModalCancelAction = () => setIsShowDeleteModal(false);
  const closeDetailsModal = () => setIsShowDetailsModal(false);
  //////////////////////////////////////////////////////////////////////////////////////////////deleteModalSubmit
  const deleteModalSubmitAction = () => {
    fetch(`http://localhost:8000/api/products/${productId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((result) => {
        setIsShowDeleteModal(false);
        getAllProducts();
      });
  };
  ///////////////////////////////////////////////////////////////////////////////////////////////updateProduct
  const updateProductInfos = (e) => {
    e.preventDefault();
    const productsNewInfos = {
      title: productNewTitle,
      price: productNewPrice,
      count: productNewCount,
      img: productNewImg,
      popularity: productNewPopularity,
      sale: productNewSale,
      colors: productNewColors,
    };

    fetch(`http://localhost:8000/api/products/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productsNewInfos),
    })
      .then((response) => response.json())
      .then((result) => {
        setIsShowEditModal(false);
        getAllProducts();
      });
  };
  /////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <>
      {allProduct.length ? (
        <table className="products-table">
          <thead>
            <tr className="products-table-heading-tr">
              <th>عکس</th>
              <th>اسم</th>
              <th>قیمت</th>
              <th>موجودی</th>
            </tr>
          </thead>
          <tbody>
            {allProduct.map((product) => (
              <tr key={product.id} className="products-table-tr">
                <td>
                  <img
                    src={product.img}
                    alt="oil image"
                    className="products-table-img"
                  />
                </td>
                <td>{product.title}</td>
                <td>{product.price.toLocaleString()} تومان</td>
                <td>{product.count}</td>
                <td>
                  <button
                    className="products-table-btn"
                    onClick={() => {
                      setIsShowDetailsModal(true);
                      setMainProductInfos(product);
                    }}
                  >
                    جزییات
                  </button>
                  <button
                    className="products-table-btn"
                    onClick={() => {
                      setIsShowDeleteModal(true);
                      setProductId(product.id);
                    }}
                  >
                    حذف
                  </button>
                  <button
                    className="products-table-btn"
                    onClick={() => {
                      setIsShowEditModal(true);
                      setProductId(product.id);
                      setProductNewTitle(product.title);
                      setProductNewPrice(product.price);
                      setProductNewCount(product.count);
                      setProductNewImg(product.img);
                      setProductNewPopularity(product.popularity);
                      setProductNewSale(product.sale);
                      setProductNewColors(product.colors);
                    }}
                  >
                    ویرایش
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <ErrorBox msg="هیچ محصولی یافت نشد" />
      )}

      {isShowDeleteModal && (
        <DeleteModal
          title="آیا از حذف اطمینان دارید؟"
          submitAction={deleteModalSubmitAction}
          cancelAction={deleteModalCancelAction}
        />
      )}
      {isShowDetailsModal && (
        <DetailsModal onHide={closeDetailsModal}>
          <table className="cms-table">
            <thead>
              <tr>
                <th>محبوبیت</th>
                <th>فروش</th>
                <th>رنگ بندی</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{mainProductInfos.popularity}%</td>
                <td>{mainProductInfos.sale.toLocaleString()}</td>
                <td>{mainProductInfos.colors}</td>
              </tr>
            </tbody>
          </table>
        </DetailsModal>
      )}
      {isShowEditModal && (
        <EditModal
          onClose={() => setIsShowEditModal(false)}
          onSubmit={updateProductInfos}
        >
          <div className="edit-products-form-group">
            <span>
              <BiRename />
            </span>
            <input
              type="text"
              placeholder="عنوان جدید را وارد کنید"
              className="edit-products-input"
              value={productNewTitle}
              onChange={(e) => setProductNewTitle(e.target.value)}
            />
          </div>
          <div className="edit-products-form-group">
            <span>
              <BsCurrencyDollar />
            </span>
            <input
              type="text"
              placeholder="قیمت جدید را وارد کنید"
              className="edit-products-input"
              value={productNewPrice.toLocaleString()}
              onChange={(e) => setProductNewPrice(e.target.value)}
            />
          </div>
          <div className="edit-products-form-group">
            <span>
              <BsBag />
            </span>
            <input
              type="text"
              placeholder="موجودی جدید را وارد کنید"
              className="edit-products-input"
              value={productNewCount}
              onChange={(e) => setProductNewCount(e.target.value)}
            />
          </div>
          <div className="edit-products-form-group">
            <span>
              <FaRegAddressBook />
            </span>
            <input
              type="text"
              placeholder="آدرس کاور جدید را وارد کنید"
              className="edit-products-input"
              value={productNewImg}
              onChange={(e) => setProductNewImg(e.target.value)}
            />
          </div>
          <div className="edit-products-form-group">
            <span>
              <AiOutlineLineChart />
            </span>
            <input
              type="text"
              placeholder="محبوبیت جدید را وارد کنید"
              className="edit-products-input"
              value={productNewPopularity.toLocaleString()}
              onChange={(e) => setProductNewPopularity(e.target.value)}
            />
          </div>
          <div className="edit-products-form-group">
            <span>
              <AiOutlineLineChart />
            </span>
            <input
              type="text"
              placeholder="میزان فروش جدید را وارد کنید"
              className="edit-products-input"
              value={productNewSale.toLocaleString()}
              onChange={(e) => setProductNewSale(e.target.value)}
            />
          </div>
          <div className="edit-products-form-group">
            <span>
              <HiOutlineColorSwatch />
            </span>
            <input
              type="text"
              placeholder="تعداد رنگ بندی جدید را وارد کنید"
              className="edit-products-input"
              value={productNewColors}
              onChange={(e) => setProductNewColors(e.target.value)}
            />
          </div>
        </EditModal>
      )}
    </>
  );
}
