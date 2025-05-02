import { MdOutlineMobileFriendly } from "react-icons/md";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { LuBriefcaseBusiness } from "react-icons/lu";
import { IoMdArrowRoundBack } from "react-icons/io";
import { userSchema } from "validation/userSchema";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiUser } from "react-icons/fi";
import { toast } from "react-toastify";

import Input from "components/modules/Input";
import Modal from "components/modules/Modal";
import api from "configs/api";

import styles from "./AddPage.module.css";

function AddPage({ editedData }) {
  const [form, setForm] = useState({});

  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (editedData) reset(editedData);
  }, [editedData]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(userSchema), mode: "onTouched" });

  const confirmHandler = async (e) => {
    e.preventDefault();
    try {
      if (editedData) {
        await api.put(`/users/${editedData.id}`, form);
      } else {
        await api.post("/users", form);
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
    console.log(data);
  };

  return (
    <form className={styles.container}>
      {editedData ? <h1>فرم ویرایش کاربر</h1> : <h1>فرم افزودن کاربر</h1>}
      <Input
        title="نام و نام خانوادگی :"
        placeholder="مثال : حسام خاکی"
        name="fullName"
        direction={false}
        register={register}
        errors={errors}
      >
        <FiUser />
      </Input>
      <Input
        title="ایمیل :"
        placeholder="example : bootcamp@gmail.com"
        name="email"
        direction={true}
        register={register}
        errors={errors}
      >
        <MdOutlineMarkEmailRead />
      </Input>
      <Input
        title="شغل :"
        placeholder="مثال : فرانت اند دولوپر"
        name="job"
        direction={false}
        register={register}
        errors={errors}
      >
        <LuBriefcaseBusiness />
      </Input>
      <Input
        title="شماره همراه :"
        placeholder="example : 09105667406"
        name="mobile"
        direction={true}
        register={register}
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
