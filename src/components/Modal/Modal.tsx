import { SyntheticEvent, useState } from "react";
import { CSSTransition } from "react-transition-group";
import "./Modal.css";
export default function Modal(props: { show: boolean; onClose: Function }) {
  const handleModal = (e: SyntheticEvent) => {
    e.stopPropagation();
    props.onClose(false);
  };

  return (
    <CSSTransition in={props.show} timeout={0} classNames="modal">
      <div className="modal" onClick={handleModal}>
        <div className="modal-content">
          <h4 className="modal-title">Modal title</h4>
          <div className="modal-body">This is modal content</div>
          <div className="modal-footer">
            <button className="modal-button" onClick={handleModal}>
              Close
            </button>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
}
