import { Link, useNavigate } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { toast } from "react-toastify";

import { useUser } from "context/userContext";
import api from "configs/api";
import Modal from "./Modal";

import styles from "./UsersList.module.css";

function UsersList({ data, checkBox, setDeleted }) {
  const { fullName, email, id } = data;
  const [showModal, setShowModal] = useState(false);
  const [checked, setChecked] = useState(false);
  const { setReload } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    setDeleted((item) => {
      if (checked) {
        return [...item, data];
      } else {
        return item.filter((user) => user.id !== id);
      }
    });
  }, [checked]);

  useEffect(() => {
    if (!checkBox) {
      setChecked(false);
    }
  }, [checkBox]);

  const confirmHandler = async () => {
    try {
      await api.delete(`/users/${id}`);
      toast.success("مخاطب مورد نظر حذف گردید");
      setReload((reload) => !reload);
      setShowModal(false);
    } catch (error) {
      toast.error("مشکلی پیش آمده است ، لطفا دوباره تلاش کنید");
      setShowModal(false);
    }
  };

  return (
    <li className={styles.user}>
      {checkBox && (
        <input
          type="checkbox"
          checked={checked}
          onChange={() => setChecked((checked) => !checked)}
        />
      )}
      <p className={styles.title}>
        <Link to={`/details/${id}`}>{fullName}</Link>
      </p>
      <span>
        <Link to={`/details/${id}`}>{email}</Link>
      </span>
      <div className={styles.actions}>
        <button onClick={() => navigate(`/edit/${id}`)}>
          ویرایش
          <FaRegEdit />
        </button>
        <button onClick={() => setShowModal(true)}>
          حذف
          <RiDeleteBin6Line />
        </button>
      </div>
      {showModal && (
        <Modal
          type={"حذف یک مخاطب"}
          action={"حذف"}
          setShowModal={setShowModal}
          confirmHandler={confirmHandler}
        />
      )}
    </li>
  );
}

export default UsersList;
