import styles from "./Modal.module.css";

function Modal({ type, action, setShowModal, confirmHandler }) {
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <p>شما در حال {type} می‌باشید ، آیا از این عملیات مطمئن هستید ؟ ‌</p>
        <div className={styles.buttons}>
          <button onClick={confirmHandler}>{action}</button>
          <button onClick={() => setShowModal(false)}>انصراف</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
