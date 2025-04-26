const nameValidation = (name) => {
  if (!name) return { error: "لطفا این فیلد را خالی نگذارید" };
  if (name.length < 7 || name.length > 25)
    return { error: "تعداد کاراکترها باید بین 7 تا 25 کاراکتر باشد" };
  return null;
};

const emailValidation = (email) => {
  if (!email) return { error: "لطفا ایمیل را وارد کنید" };
  const emailREGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const testEmail = emailREGEX.test(email);
  if (!testEmail) return { error: "لطفا ایمیل معتبر وارد کنید" };
  return null;
};

const mobileValidation = (mobile) => {
  if (!mobile) return { error: "لطفا شماره همراه را وارد کنید" };
  const mobileRegex = /^(0|0098|\+98)9(0[1-5]|[1 3]\d|2[0-2]|98)\d{7}$/;
  const testMobile = mobileRegex.test(mobile);
  if (!testMobile) return { error: "لطفا شماره همراه معتبر وارد کنید" };
  return null;
};

const formValidation = (form) => {
  const errors = {};

  const nameError = nameValidation(form.name);
  if (nameError) errors.name = nameError.error;

  const emailError = emailValidation(form.email);
  if (emailError) errors.email = emailError.error;

  const mobileError = mobileValidation(form.mobile);
  if (mobileError) errors.mobile = mobileError.error;

  if (!form.job) errors.job = "لطفا شغل را وارد کنید";

  return {
    errors,
  };
};

export { nameValidation, emailValidation, mobileValidation, formValidation };
