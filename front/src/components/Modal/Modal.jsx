import styles from "./Modal.module.scss";

const Modal = ({ open, onClose, children }) => {
  if (!open) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;