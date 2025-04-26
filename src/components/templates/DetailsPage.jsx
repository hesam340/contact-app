import { MdOutlineMobileFriendly } from "react-icons/md";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { LuBriefcaseBusiness } from "react-icons/lu";
import { Link, useParams } from "react-router-dom";
import { FiUser } from "react-icons/fi";

import { useUser } from "context/UserContext";

import styles from "./DetailsPage.module.css";
import { IoMdArrowRoundBack } from "react-icons/io";

function DetailsPage() {
  const { id } = useParams();

  const { users } = useUser();
  const detail = users.find((item) => item.id === id);

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div>
          <p>
            <FiUser />
            نام و نام خانوادگی :
          </p>
          <span>{detail?.name}</span>
        </div>
        <div>
          <p>
            <MdOutlineMarkEmailRead />
            ایمیل :
          </p>
          <span>{detail?.email}</span>
        </div>
        <div>
          <p>
            <LuBriefcaseBusiness />
            شغل :
          </p>
          <span>{detail?.job}</span>
        </div>
        <div>
          <p>
            <MdOutlineMobileFriendly />
            شماره همراه :
          </p>
          <span>{detail?.mobile}</span>
        </div>
      </div>
      <Link to="/">
        برگشت به صفحه اصلی
        <IoMdArrowRoundBack />
      </Link>
    </div>
  );
}

export default DetailsPage;
