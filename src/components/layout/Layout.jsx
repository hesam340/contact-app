import { Link } from "react-router-dom";

import styles from "./Layout.module.css";

function Layout({ children }) {
  return (
    <>
      <header className={styles.header}>
        <Link to="/">
          <h1>Contact App</h1>
        </Link>
        <p>Botostart Project | Bootcamp | Hesam Khaki</p>
      </header>
      <div className={styles.main}>{children}</div>
      <footer className={styles.footer}>
        <p>❤️ Created with</p>
      </footer>
    </>
  );
}

export default Layout;
