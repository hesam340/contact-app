import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import MainActions from "components/modules/MainActions";
import UsersList from "components/modules/usersList";
import Search from "components/modules/Search";
import { useUser } from "context/UserContext";
import Modal from "components/modules/Modal";
import searchUsers from "utils/searchUsers";
import api from "configs/api";

import styles from "./HomePage.module.css";
import Loader from "components/modules/Loader";

function HomePage() {
  const { users } = useUser();

  const [checkBox, setCheckBox] = useState(false);
  const [displayed, setDisplayed] = useState([]);
  const [modal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setDisplayed(users);
    setLoading(false);
  }, [users]);

  useEffect(() => {
    setDisplayed(searchUsers(search, users));
  }, [search]);

  const confirmHandler = async () => {
    try {
      await Promise.all(deleted.map((item) => api.delete(`/users/${item.id}`)));

      const remainedUsers = displayed.filter(
        (item) => !deleted.some((i) => i.id === item.id)
      );

      setDisplayed(remainedUsers);
      setDeleted([]);
      setShowModal(false);
      setCheckBox(false);

      toast.success("مخاطبین مورد نظر با موفقیت حذف شدند");
    } catch (error) {
      toast.error("مشکلی پیش آمده است ، لطفا دوباره تلاش کنید");
    }
  };

  if (loading) return <Loader />;

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
                key={user.id}
                data={user}
                checkBox={checkBox}
                setDeleted={setDeleted}
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
