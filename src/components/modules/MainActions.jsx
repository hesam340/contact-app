import { AiOutlineUsergroupDelete } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";

import styles from "./MainActions.module.css";

function MainActions({
  deleted,
  setCheckBox,
  setShowModal,
  setDeleted,
  checkBox,
}) {
  const cancelHandler = () => {
    setCheckBox(false);
    setDeleted([]);
  };

  return (
    <div className={styles.mainButtons}>
      <Link to="/add">
        افزودن مخاطب
        <IoMdAddCircleOutline />
      </Link>
      {!deleted.length ? (
        <button
          onClick={() => setCheckBox(true)}
          className={styles.groupDelete}
        >
          حذف گروهی
          <AiOutlineUsergroupDelete />
        </button>
      ) : (
        <button onClick={() => setShowModal(true)}>
          حذف ( {deleted.length} )
        </button>
      )}
      {checkBox && (
        <button onClick={cancelHandler} className={styles.cancel}>
          انصراف
        </button>
      )}
    </div>
  );
}

export default MainActions;
