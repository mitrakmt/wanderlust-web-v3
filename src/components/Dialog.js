import Styles from "../styles/dialog.module.css";

const Dialog = ({
  modalId = "wanderlust-modal",
  title = "Wanderlust Modal",
  body = <p></p>
}) => {
  return (
    <dialog id={modalId} className={`${Styles.dialog} bg-gray-100/80 dark:bg-gray-800/80`} style={{ position: 'fixed' }}>
      <header>
        <p className="text-3xl text-gray-900 dark:text-gray-200">{title}</p>
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
            className="text-gray-900 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-800 transition-colors"
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
