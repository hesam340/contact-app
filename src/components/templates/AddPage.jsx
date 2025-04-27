import { MdOutlineMobileFriendly } from "react-icons/md";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { LuBriefcaseBusiness } from "react-icons/lu";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useEffect, useState } from "react";
import { FiUser } from "react-icons/fi";
import { toast } from "react-toastify";

import { mobileValidation } from "utils/formValidate";
import { emailValidation } from "utils/formValidate";
import { nameValidation } from "utils/formValidate";
import { formValidation } from "utils/formValidate";
import { useForm } from "context/FormContext";
import Input from "components/modules/Input";
import Modal from "components/modules/Modal";
import api from "configs/api";

import styles from "./AddPage.module.css";

function AddPage({ data }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    job: "",
    mobile: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [state, dispatch] = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (data) setForm(data);
  }, [data]);

  const changeHandler = (e) => {
    const { value, name } = e.target;
    const trimmedValue = value.trimStart();
    setForm({ ...form, [name]: trimmedValue });

    let error = null;
    switch (name) {
      case "name":
        error = nameValidation(trimmedValue);
        break;
      case "email":
        error = emailValidation(trimmedValue);
        break;
      case "job":
        error = !trimmedValue && { error: "لطفا شغل را وارد کنید" };
        break;
      case "mobile":
        error = mobileValidation(trimmedValue);
        break;
      default:
        break;
    }

    dispatch({
      type: "INPUT_ERROR",
      payload: { name, error: error ? error.error : "" },
    });
  };

  const confirmHandler = async (e) => {
    e.preventDefault();
    try {
      if (data) {
        await api.put(`/users/${data.id}`, form);
      } else {
        await api.post("/users", form);
      }
      toast.success(
        data ? "اطلاعات مخاطب مورد نظر ویرایش شد" : "مخاطب مورد نظر اضافه شد"
      );
      setForm({
        name: "",
        email: "",
        job: "",
        mobile: "",
      });
      if (data) navigate("/");
      setShowModal(false);
    } catch (error) {
      toast.error("مشکلی پیش آمده است ، لطفا دوباره تلاش کنید");
      setShowModal(false);
    }
  };

  const addHandler = (e) => {
    e.preventDefault();
    const { errors } = formValidation(form);

    let isError = false;
    for (let key in errors) {
      dispatch({
        type: "INPUT_ERROR",
        payload: { name: key, error: errors[key] },
      });
      isError = true;
    }
    if (isError) return;

    setShowModal(true);
  };

  return (
    <form className={styles.container}>
      {data ? <h1>فرم ویرایش کاربر</h1> : <h1>فرم افزودن کاربر</h1>}
      <Input
        title="نام و نام خانوادگی :"
        placeholder="مثال : حسام خاکی"
        name="name"
        value={form.name}
        changeHandler={changeHandler}
        direction={false}
        error={!!state.errors.name}
        errorText={state.errors.name}
      >
        <FiUser />
      </Input>
      <Input
        title="ایمیل :"
        placeholder="example : bootcamp@gmail.com"
        name="email"
        value={form.email}
        changeHandler={changeHandler}
        direction={true}
        error={!!state.errors.email}
        errorText={state.errors.email}
      >
        <MdOutlineMarkEmailRead />
      </Input>
      <Input
        title="شغل :"
        placeholder="مثال : فرانت اند دولوپر"
        name="job"
        value={form.job}
        changeHandler={changeHandler}
        direction={false}
        error={!!state.errors.job}
        errorText={state.errors.job}
      >
        <LuBriefcaseBusiness />
      </Input>
      <Input
        title="شماره همراه :"
        placeholder="example : 09105667406"
        name="mobile"
        value={form.mobile}
        changeHandler={changeHandler}
        direction={true}
        error={!!state.errors.mobile}
        errorText={state.errors.mobile}
      >
        <MdOutlineMobileFriendly />
      </Input>
      {data ? (
        <button onClick={addHandler}>ویرایش</button>
      ) : (
        <button onClick={addHandler}>افزودن</button>
      )}
      <Link to="/">
        برگشت به صفحه اصلی
        <IoMdArrowRoundBack />
      </Link>
      {showModal && (
        <Modal
          type={data ? "ویرایش یک مخاطب" : "اضافه کردن یک مخاطب جدید"}
          action={data ? "ویرایش" : "افزودن"}
          setShowModal={setShowModal}
          confirmHandler={confirmHandler}
        />
      )}
    </form>
  );
}

export default AddPage;
