import React from "react";
import styles from "../styles/dialog.module.css";

const Dialog = ({
  modalId = "wanderlust-modal",
  title = "Example modal",
  body = <p>test</p>
}) => {
  return (
    <dialog id={modalId} className={`${styles.dialog} dark:bg-black/30 bg-white/30`} style={{ position: 'fixed' }}>
      <header>
        {title}
        <button
          className="outline-none button button-close"
          onClick={() => {
            const dialog = document.getElementById(modalId);
            dialog.close();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="15" y1="9" x2="9" y2="15"></line>
            <line x1="9" y1="9" x2="15" y2="15"></line>
          </svg>
        </button>
      </header>
      {body}
    </dialog>
  );
};

export default Dialog;
