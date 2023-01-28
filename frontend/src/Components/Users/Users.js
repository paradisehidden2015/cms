import React, { useEffect, useState } from "react";
import DeleteModal from "../DeleteModal/DeleteModal";
import EditModal from "./../EditModal/EditModal";
import DetailsModal from "./../DetailsModal/DetailsModal";
import ErrorBox from "../ErrorBox/ErrorBox";
import "./Users.css";
import { BiRename } from "react-icons/bi";

export default function Users() {
  const [allUsers, setAllUsers] = useState([]);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [isShowDetailsModal, setIsShowDetailsModal] = useState(false);
  const [userId, setUserId] = useState(null);
  const [mainUserInfos, setMainUserInfos] = useState({});
  //////////////////////////////////////////////////////////////////////////////////////////////////
  const [userNewFirsName, setUserNewFirsName] = useState("");
  const [userNewLastName, setUserNewLastName] = useState("");
  const [userNewUsername, setUserNewUsername] = useState("");
  const [userNewPassword, setUserNewPassword] = useState("");
  const [userNewPhone, setUserNewPhone] = useState("");
  const [userNewCity, setUserNewCity] = useState("");
  const [userNewEmail, setUserNewEmail] = useState("");
  const [userNewAddress, setUserNewAddress] = useState("");
  const [userNewScore, setUserNewScore] = useState("");
  const [userNewBuy, setUserNewBuy] = useState("");
  ////////////////////////////////////////////////////useEffect///////////////////////////////////
  useEffect(() => {
    getAllUsers();
  }, []);
  ////////////////////////////////////////////////////getAllUsers///////////////////////////////
  const getAllUsers = () => {
    fetch("http://localhost:8000/api/users/")
      .then((response) => response.json())
      .then((result) => setAllUsers(result));
  };
  ///////////////////////////////////////////////////////////////////////////////////////////////deleteModalCancel
  const deleteModalCancelAction = () => setIsShowDeleteModal(false);
  const closeEditModal = () => setIsShowEditModal(false);
  const closeDetailsModal = () => setIsShowDetailsModal(false);

  //////////////////////////////////////////////////////////////////////////////////////////////deleteModalSubmit
  const deleteModalSubmitAction = () => {
    fetch(`http://localhost:8000/api/users/${userId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((result) => {
        setIsShowDeleteModal(false);
        getAllUsers();
      });
  };
  ///////////////////////////////////////////////////////////////////////////////////////////////updateUser
  const updateUser = (e) => {
    e.preventDefault();
    const usersNewInfos = {
      firsName: userNewFirsName,
      lastName: userNewLastName,
      username: userNewUsername,
      password: userNewPassword,
      phone: userNewPhone,
      city: userNewCity,
      email: userNewEmail,
      address: userNewAddress,
      score: userNewScore,
      buy: userNewBuy,
    };

    fetch(`http://localhost:8000/api/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usersNewInfos),
    })
      .then((response) => response.json())
      .then((result) => {
        setIsShowEditModal(false);
        getAllUsers();
      });
  };
  /////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div className="cms-main">
      {allUsers.length ? (
        <>
          <h1 className="cms-title">لیست کاربران</h1>
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
              {allUsers.map((user) => (
                <tr>
                  <td>
                    {user.firsName} {user.lastName}
                  </td>
                  <td>{user.username}</td>
                  <td>{user.password}</td>
                  <td>{user.phone}</td>
                  <td>{user.email}</td>
                  <td>
                    <button
                      onClick={() => {
                        setIsShowDeleteModal(true);
                        setUserId(user.id);
                      }}
                    >
                      حذف
                    </button>
                    <button
                      onClick={() => {
                        setMainUserInfos(user);
                        setIsShowDetailsModal(true);
                      }}
                    >
                      جزییات
                    </button>
                    <button
                      onClick={() => {
                        setIsShowEditModal(true);
                        setUserId(user.id);
                        setUserNewFirsName(user.firsName);
                        setUserNewLastName(user.lastName);
                        setUserNewUsername(user.username);
                        setUserNewPassword(user.password);
                        setUserNewPhone(user.phone);
                        setUserNewCity(user.city);
                        setUserNewEmail(user.email);
                        setUserNewAddress(user.address);
                        setUserNewScore(user.score);
                        setUserNewBuy(user.buy);
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
        <ErrorBox msg="هیچ کاربری یافت نشد" />
      )}
      {isShowDeleteModal && (
        <DeleteModal
          title="آیا از حذف اطمینان دارید؟"
          submitAction={deleteModalSubmitAction}
          cancelAction={deleteModalCancelAction}
        />
      )}
      {isShowEditModal && (
        <EditModal onClose={closeEditModal} onSubmit={updateUser}>
          <div className="edit-user-info-input-group">
            <span>
              <BiRename />
            </span>
            <input
              type="text"
              className="edit-user-info-input"
              value={userNewFirsName}
              onChange={(e) => setUserNewFirsName(e.target.value)}
              placeholder="مقدار جدید را وارد نمایید"
            />
          </div>
          <div className="edit-user-info-input-group">
            <span>
              <BiRename />
            </span>
            <input
              type="text"
              className="edit-user-info-input"
              value={userNewLastName}
              onChange={(e) => setUserNewLastName(e.target.value)}
              placeholder="مقدار جدید را وارد نمایید"
            />
          </div>
          <div className="edit-user-info-input-group">
            <span>
              <BiRename />
            </span>
            <input
              type="text"
              className="edit-user-info-input"
              value={userNewUsername}
              onChange={(e) => setUserNewUsername(e.target.value)}
              placeholder="مقدار جدید را وارد نمایید"
            />
          </div>
          <div className="edit-user-info-input-group">
            <span>
              <BiRename />
            </span>
            <input
              type="text"
              className="edit-user-info-input"
              value={userNewPassword}
              onChange={(e) => setUserNewPassword(e.target.value)}
              placeholder="مقدار جدید را وارد نمایید"
            />
          </div>
          <div className="edit-user-info-input-group">
            <span>
              <BiRename />
            </span>
            <input
              type="text"
              className="edit-user-info-input"
              value={userNewPhone}
              onChange={(e) => setUserNewPhone(e.target.value)}
              placeholder="مقدار جدید را وارد نمایید"
            />
          </div>
          <div className="edit-user-info-input-group">
            <span>
              <BiRename />
            </span>
            <input
              type="text"
              className="edit-user-info-input"
              value={userNewCity}
              onChange={(e) => setUserNewCity(e.target.value)}
              placeholder="مقدار جدید را وارد نمایید"
            />
          </div>
          <div className="edit-user-info-input-group">
            <span>
              <BiRename />
            </span>
            <input
              type="text"
              className="edit-user-info-input"
              value={userNewEmail}
              onChange={(e) => setUserNewEmail(e.target.value)}
              placeholder="مقدار جدید را وارد نمایید"
            />
          </div>
          <div className="edit-user-info-input-group">
            <span>
              <BiRename />
            </span>
            <textarea
              className="edit-user-info-input"
              value={userNewAddress}
              onChange={(e) => setUserNewAddress(e.target.value)}
              placeholder="مقدار جدید را وارد نمایید"
            ></textarea>
          </div>
          <div className="edit-user-info-input-group">
            <span>
              <BiRename />
            </span>
            <input
              type="text"
              className="edit-user-info-input"
              value={userNewScore}
              onChange={(e) => setUserNewScore(e.target.value)}
              placeholder="مقدار جدید را وارد نمایید"
            />
          </div>
          <div className="edit-user-info-input-group">
            <span>
              <BiRename />
            </span>
            <input
              type="text"
              className="edit-user-info-input"
              value={userNewBuy}
              onChange={(e) => setUserNewBuy(e.target.value)}
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
                <td>{mainUserInfos.city}</td>
                <td>{mainUserInfos.address}</td>
                <td>{mainUserInfos.score}</td>
                <td>{mainUserInfos.buy}</td>
              </tr>
            </tbody>
          </table>
        </DetailsModal>
      )}
    </div>
  );
}
