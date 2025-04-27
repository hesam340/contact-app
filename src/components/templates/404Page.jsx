import { Link } from "react-router-dom";

import styles from "./PageNotFound.module.css";

function PageNotFound() {
  return (
    <div className={styles.container}>
      <img src="./404.webp" alt="404" />
      <div>
        <p>صفحه مورد نظر شما یافت نشد !</p>
        <Link to="/">برگشت به صفحه اصلی</Link>
      </div>
    </div>
  );
}

export default PageNotFound;
