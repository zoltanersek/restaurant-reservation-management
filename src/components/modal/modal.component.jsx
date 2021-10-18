import React from "react";
import "./modal.styles.scss";

const Modal = ({ title, hideModalHandler, children }) => {
  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      hideModalHandler();
    }
  };

  return (
    <div className="modal" onClick={handleOutsideClick}>
      <div className="modal-content">
        <div className="modal-header">
          <span className="modal-close" onClick={hideModalHandler}>
            &times;
          </span>
          <h2>{title}</h2>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
