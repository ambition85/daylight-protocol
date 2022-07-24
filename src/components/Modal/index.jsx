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

  if (visible) {
    // console.log("ModlaOpen")
    // const windowOffset = window.scrollY
    // document.body.setAttribute('style', `position: fixed !important; top:${windowOffset}px; overflow-y: hidden !important;`)
    // const style = document.body.getAttribute('style')
    // console.log("Style: ", style)
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
  } else {
    // document.body.setAttribute('style', ``)
  }
};

export default Modal;
