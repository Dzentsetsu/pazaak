import { SyntheticEvent, useState } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import { ACTION } from "../Game/Game";
import "./Modal.css";
export default function Modal(props: {
  show: boolean;
  dispatch: Function;
  content?: String;
  modalMessage: String;
}) {
  const handleModal = (e: SyntheticEvent) => {
    e.stopPropagation();
    props.dispatch({ type: ACTION.CLOSE_MODAL });
  };

  return ReactDOM.createPortal(
    <CSSTransition in={props.show} timeout={0} classNames="modal">
      <div className="modal" onClick={handleModal}>
        <div className="modal-content">
          <div className="modal-body">{props.modalMessage || "Вы выйграли сет"}</div>
          <button className="modal-button " onClick={handleModal}>
            <span id="blink">OK</span>
          </button>
        </div>
      </div>
    </CSSTransition>,
    document.getElementById("portal")!
  );
}
