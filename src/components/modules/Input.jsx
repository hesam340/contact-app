import styles from "./Input.module.css";

function Input({
  title,
  name,
  placeholder,
  children,
  direction,
  register,
  errors,
}) {
  return (
    <div className={styles.container}>
      <div className={styles.label}>
        {children}
        <label htmlFor={name}>{title}</label>
      </div>
      <div className={styles.input}>
        <input
          type="text"
          placeholder={placeholder}
          name={name}
          id={name}
          {...register(name)}
          className={`${direction ? styles.ltr : ""} ${
            errors[name] ? styles.error : ""
          }`}
        />
        <span>{errors[name]?.message}</span>
      </div>
    </div>
  );
}

export default Input;
