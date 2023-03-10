import React, { useEffect, useState } from "react";
import ErrorBox from "../ErrorBox/ErrorBox";
import "./Comments.css";
import DetailsModal from "./../DetailsModal/DetailsModal";
import DeleteModal from "./../DeleteModal/DeleteModal";
import EditModal from "./../EditModal/EditModal";

export default function Comments() {
  const [allComments, setAllComments] = useState([]);
  const [isShowDetailsModal, setIsShowDetailsModal] = useState(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [isShowAcceptModal, setIsShowAcceptModal] = useState(false);
  const [isShowRejectModal, setIsShowRejectModal] = useState(false);
  const [mainCommentBody, setMainCommentBody] = useState("");
  const [commentId, setCommentId] = useState(null);
  ////////////////////////////////////////////////////////////////////////////////////////////useEffect
  useEffect(() => {
    getAllComments();
  }, []);
  ////////////////////////////////////////////////////////////////////////////////////////////getAllComments
  function getAllComments() {
    fetch(`http://localhost:8000/api/comments`)
      .then((res) => res.json())
      .then((result) => {
        setAllComments(result);
      });
  }
  ////////////////////////////////////////////////////////////////////////////////////////////closeModal
  const closeDetailsModal = () => setIsShowDetailsModal(false);
  const closeDeleteModal = () => setIsShowDeleteModal(false);
  const closeEditModal = () => setIsShowEditModal(false);
  const closeAcceptModal = () => setIsShowAcceptModal(false);
  const closeRejectModal = () => setIsShowRejectModal(false);
  ////////////////////////////////////////////////////////////////////////////////////////////rejectComment
  const rejectComment = () => {
    fetch(`http://localhost:8000/api/comments/reject/${commentId}`, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((result) => {
        setIsShowRejectModal(false);
        getAllComments();
      });
  };
  ////////////////////////////////////////////////////////////////////////////////////////////AcceptComment
  const AcceptComment = () => {
    fetch(`http://localhost:8000/api/comments/accept/${commentId}`, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((result) => {
        setIsShowAcceptModal(false);
        getAllComments();
      });
  };
  ////////////////////////////////////////////////////////////////////////////////////////////deleteComment
  const deleteComment = () => {
    fetch(`http://localhost:8000/api/comments/${commentId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((result) => {
        setIsShowDeleteModal(false);
        getAllComments();
      });
  };
  ////////////////////////////////////////////////////////////////////////////////////////////updateComment
  const updateComment = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8000/api/comments/${commentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ body: mainCommentBody }),
    })
      .then((response) => response.json())
      .then((result) => {
        setIsShowEditModal(false);
        getAllComments();
      });
  };
  ////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div>
      <div className="cms-main">
        {allComments.length ? (
          <>
            <h1 className="cms-title">???????? ?????????? ????</h1>
            <table className="cms-table">
              <thead>
                <tr>
                  <th>?????? ??????????</th>
                  <th>??????????</th>
                  <th>??????????</th>
                  <th>??????????</th>
                  <th>????????</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {allComments.map((comment) => (
                  <tr key={comment.id}>
                    <td>{comment.userID}</td>
                    <td>{comment.productID}</td>
                    <td>
                      <button
                        onClick={() => {
                          setMainCommentBody(comment.body);
                          setIsShowDetailsModal(true);
                        }}
                      >
                        ???????? ??????
                      </button>
                    </td>
                    <td>{comment.date}</td>
                    <td>{comment.hour}</td>
                    <td>
                      <button
                        onClick={() => {
                          setIsShowDeleteModal(true);
                          setCommentId(comment.id);
                        }}
                      >
                        ??????
                      </button>
                      <button
                        onClick={() => {
                          setIsShowEditModal(true);
                          setMainCommentBody(comment.body);
                          setCommentId(comment.id);
                        }}
                      >
                        ????????????
                      </button>
                      <button>????????</button>
                      {comment.isAccept === 0 ? (
                        <button
                          onClick={() => {
                            setIsShowAcceptModal(true);
                            setCommentId(comment.id);
                          }}
                        >
                          ??????????
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setIsShowRejectModal(true);
                            setCommentId(comment.id);
                          }}
                        >
                          ????
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <ErrorBox msg="?????? ???????????? ???????? ??????" />
        )}
        {isShowDetailsModal && (
          <DetailsModal onHide={closeDetailsModal}>
            <p className="text-modal">{mainCommentBody}</p>
          </DetailsModal>
        )}
        {isShowDeleteModal && (
          <DeleteModal
            title="?????? ???? ?????? ?????????????? ????????????"
            cancelAction={closeDeleteModal}
            submitAction={deleteComment}
          />
        )}
        {isShowEditModal && (
          <EditModal onSubmit={updateComment} onClose={closeEditModal}>
            <textarea
              value={mainCommentBody}
              onChange={(e) => setMainCommentBody(e.target.value)}
            ></textarea>
          </EditModal>
        )}
        {isShowAcceptModal && (
          <DeleteModal
            title="?????? ???? ?????????? ?????????????? ????????????"
            cancelAction={closeAcceptModal}
            submitAction={AcceptComment}
          />
        )}
        {isShowRejectModal && (
          <DeleteModal
            title="?????? ???? ???? ?????????? ?????????????? ????????????"
            cancelAction={closeRejectModal}
            submitAction={rejectComment}
          />
        )}
      </div>
    </div>
  );
}
