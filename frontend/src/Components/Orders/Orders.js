import React, { useEffect, useState } from "react";
import ErrorBox from "../ErrorBox/ErrorBox";
import DeleteModal from "../DeleteModal/DeleteModal";
import EditModal from "./../EditModal/EditModal";
import DetailsModal from "./../DetailsModal/DetailsModal";
import "./Orders.css";
import { BiRename } from "react-icons/bi";

export default function Orders() {
  const [allOrders, setAllOrders] = useState([]);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [isShowDetailsModal, setIsShowDetailsModal] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [mainOrderInfos, setMainOrderInfos] = useState({});
  ///////////////////////////////////////////////////////////////////////////////////////////////
  const [orderNewFirsName, setOrderNewFirsName] = useState("");
  const [orderNewLastName, setOrderNewLastName] = useState("");
  const [orderNewUsername, setOrderNewUsername] = useState("");
  const [orderNewPassword, setOrderNewPassword] = useState("");
  const [orderNewPhone, setOrderNewPhone] = useState("");
  const [orderNewCity, setOrderNewCity] = useState("");
  const [orderNewEmail, setOrderNewEmail] = useState("");
  const [orderNewAddress, setOrderNewAddress] = useState("");
  const [orderNewScore, setOrderNewScore] = useState("");
  const [orderNewBuy, setOrderNewBuy] = useState("");
  //////////////////////////////////////////////////////////////////////////////////////////////useEffect
  useEffect(() => {
    getAllOrders();
  }, []);
  //////////////////////////////////////////////////////////////////////////////////////////////getAllOrders
  const getAllOrders = () => {
    fetch("http://localhost:8000/api/orders/")
      .then((response) => response.json())
      .then((result) => setAllOrders(result));
  };
  ///////////////////////////////////////////////////////////////////////////////////////////////deleteModalCancel
  const deleteModalCancelAction = () => setIsShowDeleteModal(false);
  const closeEditModal = () => setIsShowEditModal(false);
  const closeDetailsModal = () => setIsShowDetailsModal(false);

  //////////////////////////////////////////////////////////////////////////////////////////////deleteModalSubmit
  const deleteModalSubmitAction = () => {
    fetch(`http://localhost:8000/api/orders/${orderId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((result) => {
        setIsShowDeleteModal(false);
        getAllOrders();
      });
  };
  ///////////////////////////////////////////////////////////////////////////////////////////////updateOrder
  const updateOrder = (e) => {
    e.preventDefault();
    const OrdersNewInfos = {
      firsName: orderNewFirsName,
      lastName: orderNewLastName,
      username: orderNewUsername,
      password: orderNewPassword,
      phone: orderNewPhone,
      city: orderNewCity,
      email: orderNewEmail,
      address: orderNewAddress,
      score: orderNewScore,
      buy: orderNewBuy,
    };

    fetch(`http://localhost:8000/api/orders/${orderId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(OrdersNewInfos),
    })
      .then((response) => response.json())
      .then((result) => {
        setIsShowEditModal(false);
        getAllOrders();
      });
  };
  /////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div className="cms-main">
      {allOrders.length ? (
        <>
          <h1 className="cms-title">لیست سفارشات</h1>
          <table className="cms-table">
            <thead>
              <tr>
                <th>نام و نام خانوادگی</th>
                <th>یوزرنیم</th>
                <th>رمز عبور</th>
                <th>شماره تماس</th>
                <th>ایمیل</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {allOrders.map((order) => (
                <tr>
                  <td>
                    {order.firsName} {order.lastName}
                  </td>
                  <td>{order.username}</td>
                  <td>{order.password}</td>
                  <td>{order.phone}</td>
                  <td>{order.email}</td>
                  <td>
                    <button
                      onClick={() => {
                        setIsShowDeleteModal(true);
                        setOrderId(order.id);
                      }}
                    >
                      حذف
                    </button>
                    <button
                      onClick={() => {
                        setMainOrderInfos(order);
                        setIsShowDetailsModal(true);
                      }}
                    >
                      جزییات
                    </button>
                    <button
                      onClick={() => {
                        setIsShowEditModal(true);
                        setOrderId(order.id);
                        setOrderNewFirsName(order.firsName);
                        setOrderNewLastName(order.lastName);
                        setOrderNewUsername(order.username);
                        setOrderNewPassword(order.password);
                        setOrderNewPhone(order.phone);
                        setOrderNewCity(order.city);
                        setOrderNewEmail(order.email);
                        setOrderNewAddress(order.address);
                        setOrderNewScore(order.score);
                        setOrderNewBuy(order.buy);
                      }}
                    >
                      ویرایش
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <ErrorBox msg="هیچ سفارشی یافت نشد" />
      )}
      {isShowDeleteModal && (
        <DeleteModal
          title="آیا از حذف اطمینان دارید؟"
          submitAction={deleteModalSubmitAction}
          cancelAction={deleteModalCancelAction}
        />
      )}
      {isShowEditModal && (
        <EditModal onClose={closeEditModal} onSubmit={updateOrder}>
          <div className="edit-order-info-input-group">
            <span>
              <BiRename />
            </span>
            <input
              type="text"
              className="edit-order-info-input"
              value={orderNewFirsName}
              onChange={(e) => setOrderNewFirsName(e.target.value)}
              placeholder="مقدار جدید را وارد نمایید"
            />
          </div>
          <div className="edit-order-info-input-group">
            <span>
              <BiRename />
            </span>
            <input
              type="text"
              className="edit-order-info-input"
              value={orderNewLastName}
              onChange={(e) => setOrderNewLastName(e.target.value)}
              placeholder="مقدار جدید را وارد نمایید"
            />
          </div>
          <div className="edit-order-info-input-group">
            <span>
              <BiRename />
            </span>
            <input
              type="text"
              className="edit-order-info-input"
              value={orderNewUsername}
              onChange={(e) => setOrderNewUsername(e.target.value)}
              placeholder="مقدار جدید را وارد نمایید"
            />
          </div>
          <div className="edit-order-info-input-group">
            <span>
              <BiRename />
            </span>
            <input
              type="text"
              className="edit-order-info-input"
              value={orderNewPassword}
              onChange={(e) => setOrderNewPassword(e.target.value)}
              placeholder="مقدار جدید را وارد نمایید"
            />
          </div>
          <div className="edit-order-info-input-group">
            <span>
              <BiRename />
            </span>
            <input
              type="text"
              className="edit-order-info-input"
              value={orderNewPhone}
              onChange={(e) => setOrderNewPhone(e.target.value)}
              placeholder="مقدار جدید را وارد نمایید"
            />
          </div>
          <div className="edit-order-info-input-group">
            <span>
              <BiRename />
            </span>
            <input
              type="text"
              className="edit-order-info-input"
              value={orderNewCity}
              onChange={(e) => setOrderNewCity(e.target.value)}
              placeholder="مقدار جدید را وارد نمایید"
            />
          </div>
          <div className="edit-order-info-input-group">
            <span>
              <BiRename />
            </span>
            <input
              type="text"
              className="edit-order-info-input"
              value={orderNewEmail}
              onChange={(e) => setOrderNewEmail(e.target.value)}
              placeholder="مقدار جدید را وارد نمایید"
            />
          </div>
          <div className="edit-order-info-input-group">
            <span>
              <BiRename />
            </span>
            <textarea
              className="edit-order-info-input"
              value={orderNewAddress}
              onChange={(e) => setOrderNewAddress(e.target.value)}
              placeholder="مقدار جدید را وارد نمایید"
            ></textarea>
          </div>
          <div className="edit-order-info-input-group">
            <span>
              <BiRename />
            </span>
            <input
              type="text"
              className="edit-order-info-input"
              value={orderNewScore}
              onChange={(e) => setOrderNewScore(e.target.value)}
              placeholder="مقدار جدید را وارد نمایید"
            />
          </div>
          <div className="edit-order-info-input-group">
            <span>
              <BiRename />
            </span>
            <input
              type="text"
              className="edit-order-info-input"
              value={orderNewBuy}
              onChange={(e) => setOrderNewBuy(e.target.value)}
              placeholder="مقدار جدید را وارد نمایید"
            />
          </div>
        </EditModal>
      )}
      {isShowDetailsModal && (
        <DetailsModal onHide={closeDetailsModal}>
          <table className="cms-table">
            <thead>
              <tr>
                <th>شهر</th>
                <th>آدرس</th>
                <th>امتیاز</th>
                <th>میزان خرید</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{mainOrderInfos.city}</td>
                <td>{mainOrderInfos.address}</td>
                <td>{mainOrderInfos.score}</td>
                <td>{mainOrderInfos.buy}</td>
              </tr>
            </tbody>
          </table>
        </DetailsModal>
      )}
    </div>
  );
}
