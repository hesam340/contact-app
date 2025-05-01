import { MdOutlineMobileFriendly } from "react-icons/md";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { yupResolver } from "@hookform/resolvers/yup";
import { LuBriefcaseBusiness } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiUser } from "react-icons/fi";
import { toast } from "react-toastify";

import { userSchema } from "validation/userSchema";
import { useUser } from "context/FormContext";
import Input from "components/modules/Input";
import Modal from "components/modules/Modal";

import styles from "./AddPage.module.css";

function AddPage({ editedData }) {
  const [form, setForm] = useState({});

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
    mode: "onTouched",
  });

  const [showModal, setShowModal] = useState(false);
  const [state, dispatch] = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (editedData) reset(editedData);
  }, [editedData]);

  const confirmHandler = () => {
    try {
      if (editedData) {
        dispatch({ type: "EDIT_USER", payload: form });
      } else {
        dispatch({ type: "ADD_USER", payload: form });
      }
      toast.success(
        editedData
          ? "اطلاعات مخاطب مورد نظر ویرایش شد"
          : "مخاطب مورد نظر اضافه شد"
      );
      reset({
        fullName: "",
        email: "",
        job: "",
        mobile: "",
      });
      if (editedData) navigate("/");
      setShowModal(false);
    } catch (error) {
      toast.error("مشکلی پیش آمده است ، لطفا دوباره تلاش کنید");
      setShowModal(false);
    }
  };

  const addHandler = (data) => {
    setForm(data);
    setShowModal(true);
  };

  return (
    <form className={styles.container}>
      {editedData ? <h1>فرم ویرایش کاربر</h1> : <h1>فرم افزودن کاربر</h1>}
      <Input
        title="نام و نام خانوادگی :"
        placeholder="مثال : حسام خاکی"
        name="fullName"
        register={register}
        direction={false}
        errors={errors}
      >
        <FiUser />
      </Input>
      <Input
        title="ایمیل :"
        placeholder="example : bootcamp@gmail.com"
        name="email"
        register={register}
        direction={true}
        errors={errors}
      >
        <MdOutlineMarkEmailRead />
      </Input>
      <Input
        title="شغل :"
        placeholder="مثال : فرانت اند دولوپر"
        name="job"
        register={register}
        direction={false}
        errors={errors}
      >
        <LuBriefcaseBusiness />
      </Input>
      <Input
        title="شماره همراه :"
        placeholder="example : 09105667406"
        name="mobile"
        register={register}
        direction={true}
        errors={errors}
      >
        <MdOutlineMobileFriendly />
      </Input>
      {editedData ? (
        <button onClick={handleSubmit(addHandler)}>ویرایش</button>
      ) : (
        <button onClick={handleSubmit(addHandler)}>افزودن</button>
      )}
      <Link to="/">
        برگشت به صفحه اصلی
        <IoMdArrowRoundBack />
      </Link>
      {showModal && (
        <Modal
          type={editedData ? "ویرایش یک مخاطب" : "اضافه کردن یک مخاطب جدید"}
          action={editedData ? "ویرایش" : "افزودن"}
          setShowModal={setShowModal}
          confirmHandler={confirmHandler}
        />
      )}
    </form>
  );
}

export default AddPage;
