import UsersList from "components/modules/usersList";
import { useUser } from "context/UserContext";

import styles from "./HomePage.module.css";
import Search from "components/modules/Search";
import { useEffect, useState } from "react";

function HomePage() {
  const { users } = useUser();
  const [displayed, setDisplayed] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setDisplayed(users);
  }, [users]);

  return (
    <div className={styles.container}>
      <div>
        <Search search={search} setSearch={setSearch} />
      </div>
      <div className={styles.list}>
        <div className={styles.topSeperator}></div>
        {displayed.length ? (
          <ul>
            {displayed.map((user) => (
              <UsersList key={user.id} data={user} />
            ))}
          </ul>
        ) : (
          <p>هیچ مخاطبی برای نمایش وجود ندارد!</p>
        )}
        <div className={styles.bottomSeperator}></div>
      </div>
    </div>
  );
}

export default HomePage;
