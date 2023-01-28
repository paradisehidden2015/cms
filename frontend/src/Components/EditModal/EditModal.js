import React, { useEffect, useRef } from "react";

import "./EditModal.css";

export default function EditModal({ children, onClose, onSubmit }) {
  const close = useRef();
  useEffect(() => {
    const checkKey = (e) => {
      if (e.keyCode === 27) {
        onClose();
      }
    };
    close.current.addEventListener("click", function () {
      onClose();
    });
    window.addEventListener("keydown", checkKey);
    return () => window.removeEventListener("keydown", checkKey);
  }, []);

  return (
    <div className="modal-parent active">
      <form className="edit-modal-form">
        <span id="close" ref={close}>
          &times;
        </span>
        <h1>اطلاعات جدید را وارد نمایید</h1>

        {children}

        <button className="edit-form-submit" onClick={onSubmit}>
          ثبت اطلاعات جدید
        </button>
      </form>
    </div>
  );
}
