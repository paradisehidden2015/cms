import React, { useEffect, useState } from "react";
import ErrorBox from "../ErrorBox/ErrorBox";
import DeleteModal from "../DeleteModal/DeleteModal";
import EditModal from "./../EditModal/EditModal";
import DetailsModal from "./../DetailsModal/DetailsModal";
import "./Offs.css";
import { BiRename } from "react-icons/bi";

export default function Offs() {
  const [allOffs, setAllOffs] = useState([]);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [isShowDetailsModal, setIsShowDetailsModal] = useState(false);
  const [offId, setOffId] = useState(null);
  const [mainOffInfos, setMainOffInfos] = useState({});
  //////////////////////////////////////////////////////////////////////////////////////////////////
  const [offNewFirsName, setOffNewFirsName] = useState("");
  const [offNewLastName, setOffNewLastName] = useState("");
  const [offNewUsername, setOffNewUsername] = useState("");
  const [offNewPassword, setOffNewPassword] = useState("");
  const [offNewPhone, setOffNewPhone] = useState("");
  const [offNewCity, setOffNewCity] = useState("");
  const [offNewEmail, setOffNewEmail] = useState("");
  const [offNewAddress, setOffNewAddress] = useState("");
  const [offNewScore, setOffNewScore] = useState("");
  const [offNewBuy, setOffNewBuy] = useState("");
  //////////////////////////////////////////////////////////////////////////////////////////////useEffect
  useEffect(() => {
    getAllOffs();
  }, []);
  //////////////////////////////////////////////////////////////////////////////////////////////getAllOffs
  const getAllOffs = () => {
    fetch("http://localhost:8000/api/offs/")
      .then((response) => response.json())
      .then((result) => setAllOffs(result));
  };
  ///////////////////////////////////////////////////////////////////////////////////////////////deleteModalCancel
  const deleteModalCancelAction = () => setIsShowDeleteModal(false);
  const closeEditModal = () => setIsShowEditModal(false);
  const closeDetailsModal = () => setIsShowDetailsModal(false);

  //////////////////////////////////////////////////////////////////////////////////////////////deleteModalSubmit
  const deleteModalSubmitAction = () => {
    fetch(`http://localhost:8000/api/offs/${offId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((result) => {
        setIsShowDeleteModal(false);
        getAllOffs();
      });
  };
  ///////////////////////////////////////////////////////////////////////////////////////////////updateOff
  const updateOff = (e) => {
    e.preventDefault();
    const OffsNewInfos = {
      firsName: offNewFirsName,
      lastName: offNewLastName,
      username: offNewUsername,
      password: offNewPassword,
      phone: offNewPhone,
      city: offNewCity,
      email: offNewEmail,
      address: offNewAddress,
      score: offNewScore,
      buy: offNewBuy,
    };

    fetch(`http://localhost:8000/api/offs/${offId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(OffsNewInfos),
    })
      .then((response) => response.json())
      .then((result) => {
        setIsShowEditModal(false);
        getAllOffs();
      });
  };
  /////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div className="cms-main">
      {allOffs.length ? (
        <>
          <h1 className="cms-title">???????? ?????????? ????</h1>
          <table className="cms-table">
            <thead>
              <tr>
                <th>?????? ?? ?????? ????????????????</th>
                <th>??????????????</th>
                <th>?????? ????????</th>
                <th>?????????? ????????</th>
                <th>??????????</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {allOffs.map((off) => (
                <tr>
                  <td>
                    {off.firsName} {off.lastName}
                  </td>
                  <td>{off.username}</td>
                  <td>{off.password}</td>
                  <td>{off.phone}</td>
                  <td>{off.email}</td>
                  <td>
                    <button
                      onClick={() => {
                        setIsShowDeleteModal(true);
                        setOffId(off.id);
                      }}
                    >
                      ??????
                    </button>
                    <button
                      onClick={() => {
                        setMainOffInfos(off);
                        setIsShowDetailsModal(true);
                      }}
                    >
                      ????????????
                    </button>
                    <button
                      onClick={() => {
                        setIsShowEditModal(true);
                        setOffId(off.id);
                        setOffNewFirsName(off.firsName);
                        setOffNewLastName(off.lastName);
                        setOffNewUsername(off.username);
                        setOffNewPassword(off.password);
                        setOffNewPhone(off.phone);
                        setOffNewCity(off.city);
                        setOffNewEmail(off.email);
                        setOffNewAddress(off.address);
                        setOffNewScore(off.score);
                        setOffNewBuy(off.buy);
                      }}
                    >
                      ????????????
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <ErrorBox msg="?????? ???????????? ???????? ??????" />
      )}
      {isShowDeleteModal && (
        <DeleteModal
          title="?????? ???? ?????? ?????????????? ????????????"
          submitAction={deleteModalSubmitAction}
          cancelAction={deleteModalCancelAction}
        />
      )}
      {isShowEditModal && (
        <EditModal onClose={closeEditModal} onSubmit={updateOff}>
          <div className="edit-off-info-input-group">
            <span>
              <BiRename />
            </span>
            <input
              type="text"
              className="edit-off-info-input"
              value={offNewFirsName}
              onChange={(e) => setOffNewFirsName(e.target.value)}
              placeholder="?????????? ???????? ???? ???????? ????????????"
            />
          </div>
          <div className="edit-off-info-input-group">
            <span>
              <BiRename />
            </span>
            <input
              type="text"
              className="edit-off-info-input"
              value={offNewLastName}
              onChange={(e) => setOffNewLastName(e.target.value)}
              placeholder="?????????? ???????? ???? ???????? ????????????"
            />
          </div>
          <div className="edit-off-info-input-group">
            <span>
              <BiRename />
            </span>
            <input
              type="text"
              className="edit-off-info-input"
              value={offNewUsername}
              onChange={(e) => setOffNewUsername(e.target.value)}
              placeholder="?????????? ???????? ???? ???????? ????????????"
            />
          </div>
          <div className="edit-off-info-input-group">
            <span>
              <BiRename />
            </span>
            <input
              type="text"
              className="edit-off-info-input"
              value={offNewPassword}
              onChange={(e) => setOffNewPassword(e.target.value)}
              placeholder="?????????? ???????? ???? ???????? ????????????"
            />
          </div>
          <div className="edit-off-info-input-group">
            <span>
              <BiRename />
            </span>
            <input
              type="text"
              className="edit-off-info-input"
              value={offNewPhone}
              onChange={(e) => setOffNewPhone(e.target.value)}
              placeholder="?????????? ???????? ???? ???????? ????????????"
            />
          </div>
          <div className="edit-off-info-input-group">
            <span>
              <BiRename />
            </span>
            <input
              type="text"
              className="edit-off-info-input"
              value={offNewCity}
              onChange={(e) => setOffNewCity(e.target.value)}
              placeholder="?????????? ???????? ???? ???????? ????????????"
            />
          </div>
          <div className="edit-off-info-input-group">
            <span>
              <BiRename />
            </span>
            <input
              type="text"
              className="edit-off-info-input"
              value={offNewEmail}
              onChange={(e) => setOffNewEmail(e.target.value)}
              placeholder="?????????? ???????? ???? ???????? ????????????"
            />
          </div>
          <div className="edit-off-info-input-group">
            <span>
              <BiRename />
            </span>
            <textarea
              className="edit-off-info-input"
              value={offNewAddress}
              onChange={(e) => setOffNewAddress(e.target.value)}
              placeholder="?????????? ???????? ???? ???????? ????????????"
            ></textarea>
          </div>
          <div className="edit-off-info-input-group">
            <span>
              <BiRename />
            </span>
            <input
              type="text"
              className="edit-off-info-input"
              value={offNewScore}
              onChange={(e) => setOffNewScore(e.target.value)}
              placeholder="?????????? ???????? ???? ???????? ????????????"
            />
          </div>
          <div className="edit-off-info-input-group">
            <span>
              <BiRename />
            </span>
            <input
              type="text"
              className="edit-off-info-input"
              value={offNewBuy}
              onChange={(e) => setOffNewBuy(e.target.value)}
              placeholder="?????????? ???????? ???? ???????? ????????????"
            />
          </div>
        </EditModal>
      )}
      {isShowDetailsModal && (
        <DetailsModal onHide={closeDetailsModal}>
          <table className="cms-table">
            <thead>
              <tr>
                <th>??????</th>
                <th>????????</th>
                <th>????????????</th>
                <th>?????????? ????????</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{mainOffInfos.city}</td>
                <td>{mainOffInfos.address}</td>
                <td>{mainOffInfos.score}</td>
                <td>{mainOffInfos.buy}</td>
              </tr>
            </tbody>
          </table>
        </DetailsModal>
      )}
    </div>
  );
}
