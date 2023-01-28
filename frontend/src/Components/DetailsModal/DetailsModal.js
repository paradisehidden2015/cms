import React, { useEffect, useRef } from "react";
import "./DetailsModal.css";

export default function DetailsModal({ onHide, children }) {
  const close = useRef();
  useEffect(() => {
    const checkKey = (e) => {
      if (e.keyCode === 27) {
        onHide();
      }
    };
    close.current.addEventListener("click", function () {
      onHide();
    });
    window.addEventListener("keydown", checkKey);
    return () => window.removeEventListener("keydown", checkKey);
  }, []);

  return (
    <div className="modal-parent active">
      <div className="details-modal">
        <span id="close" ref={close}>
          &times;
        </span>
        {children}
      </div>
    </div>
  );
}
