import styles from "./Input.module.css";

function Input({
  title,
  name,
  placeholder,
  value,
  changeHandler,
  children,
  direction,
  error,
  errorText,
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
          value={value}
          onChange={changeHandler}
          className={`${direction ? styles.ltr : ""} ${
            error ? styles.error : ""
          }`}
        />
        <span>{errorText}</span>
      </div>
    </div>
  );
}

export default Input;
