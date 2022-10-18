import styles from './Modal.module.scss';

const Modal = ({ showModal, close, children, deleteItem, slug, text }) => {
  return (
    <>
      <div className={showModal ? styles.display : styles.modal}>
        <div
          className={styles.modal__wrapper}
          style={{
            opacity: showModal ? '1' : '0',
          }}
        >
          <div className={styles.modal__header}>
            <h3 className={styles.modal__title}>{text}</h3>
          </div>
          <div className={styles.modal__body}>
            <p>{children}</p>
          </div>
          <div className={styles.modal__footer}>
            <button className={styles['modal__btn-cancel']} onClick={close}>
              CANCEL
            </button>
            <button
              className={styles['modal__btn-delete']}
              onClick={() => deleteItem(slug)}
            >
              DELETE
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
