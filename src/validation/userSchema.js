import { date, number, object, string } from "yup";
import generateId from "../utils/generateId";

const persianRegex = /^[\u0600-\u06FF\s]+$/;
const mobileRegex = /^(0|0098|\+98)9(0[1-5]|[1 3]\d|2[0-2]|98)\d{7}$/;

export const userSchema = object({
  fullName: string()
    .required("لطفا این فیلد را خالی نگذارید")
    .min(7, "تعداد کاراکترها نباید کمتر از 7 باشد")
    .max(25, "تعداد کاراکترها نباید بیش از 25 باشد")
    .matches(persianRegex, "فقط حروف فارسی تایپ شود")
    .trim(),
  email: string()
    .required("لطفا فیلد ایمیل را خالی نگذارید")
    .email("لطفا ایمیل معتبر وارد کنید")
    .trim()
    .transform((value) => value?.toLowerCase()),
  job: string()
    .required("لطفا فیلد شغل را خالی نگذارید")
    .matches(persianRegex, "فقط حروف فارسی تایپ شود")
    .trim(),
  mobile: string()
    .required("لطفا شماره همراه را وارد کنید")
    .matches(mobileRegex, "لطفا شماره همراه معتبر وارد کنید")
    .trim(),
  createdOn: date().default(() => new Date()),
  userId: number().default(() => generateId()),
});
