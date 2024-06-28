import styles from "./ContactsItem.module.css";

function ContactsItem({
  data: { id, name, lastName, email, phone },
  deleteHandler,
}) {
  return (
    <li className={styles.item}>
      <p>
        {name} {lastName}
      </p>
      <p>{email}</p>
      <p>{phone}</p>
      <button onClick={() => deleteHandler(id)}>Delete</button>
    </li>
  );
}

export default ContactsItem;
