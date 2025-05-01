import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import MainActions from "components/modules/MainActions";
import UsersList from "components/modules/usersList";
import Search from "components/modules/Search";
import { useUser } from "context/FormContext";
import Modal from "components/modules/Modal";
import searchUsers from "utils/searchUsers";

import styles from "./HomePage.module.css";

function HomePage() {
  const [state, dispatch] = useUser();

  const [checkBox, setCheckBox] = useState(false);
  const [displayed, setDisplayed] = useState([]);
  const [modal, setShowModal] = useState(false);
  const [deleted, setDeleted] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setDisplayed(state.users);
  }, [state]);

  useEffect(() => {
    setDisplayed(searchUsers(search, state.users));
  }, [search]);

  const confirmHandler = () => {
    try {
      dispatch({ type: "DELETE_GROUP_USERS", payload: deleted });

      setDisplayed(state.users);
      setDeleted([]);
      setShowModal(false);
      setCheckBox(false);

      toast.success("مخاطبین مورد نظر با موفقیت حذف شدند");
    } catch (error) {
      toast.error("مشکلی پیش آمده است ، لطفا دوباره تلاش کنید");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchBox}>
        <Search search={search} setSearch={setSearch} />
        <MainActions
          deleted={deleted}
          checkBox={checkBox}
          setCheckBox={setCheckBox}
          setShowModal={setShowModal}
          setDeleted={setDeleted}
        />
      </div>
      <div className={styles.list}>
        <div className={styles.topSeperator}></div>
        {displayed.length ? (
          <ul>
            {displayed.map((user) => (
              <UsersList
                key={user.userId}
                data={user}
                checkBox={checkBox}
                setDeleted={setDeleted}
                dispatch={dispatch}
              />
            ))}
          </ul>
        ) : (
          <p className={styles.text}>هیچ مخاطبی برای نمایش وجود ندارد!</p>
        )}
        <div className={styles.bottomSeperator}></div>
      </div>
      {modal && (
        <Modal
          type={"حذف گروهی مخاطبین"}
          action={"حذف"}
          setShowModal={setShowModal}
          confirmHandler={confirmHandler}
        />
      )}
    </div>
  );
}

export default HomePage;
