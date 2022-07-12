import React, { useEffect, useCallback } from "react";
import "./style.css";
const Modal = ({ visible, onClose, children }) => {
  const escFunction = useCallback(
    (e) => {
      if (e.keyCode === 27) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);
    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, [escFunction]);

  if (visible)
    return (
      <>
        <div
          id="modal"
          className="modal--backdrop"
          onClick={() => onClose()}
          data-aos="fade-down"
          data-aos-delay="50"
          data-aos-offset="-100"
          data-aos-easing="ease-in-out"
        />
        <div className="modal--container">{children}</div>
      </>
    );
};

export default Modal;
