import { RotatingLines } from "react-loader-spinner";

import styles from "./loader.module.css";

function Loader() {
  return (
    <div className={styles.loader}>
      <RotatingLines
        width="100px"
        height="100px"
        strokeColor="#304ffe"
        strokeWidth="3"
      />
    </div>
  );
}

export default Loader;
