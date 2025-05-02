import { MdOutlineMobileFriendly } from "react-icons/md";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { LuBriefcaseBusiness } from "react-icons/lu";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import { IoCreateOutline } from "react-icons/io5";

import { FiUser } from "react-icons/fi";

import { useUser } from "context/UserContext";

import styles from "./DetailsPage.module.css";

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
          <span>{detail?.fullName}</span>
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
        <div>
          <p>
            <IoCreateOutline />
            تاریخ ثبت :
          </p>
          <span>{new Date(detail?.createdOn).toLocaleDateString("fa-IR")}</span>
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
