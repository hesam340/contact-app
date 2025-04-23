import styles from "./Search.module.css";

function Search({ search, setSearch }) {
  const changeHandler = (e) => {
    setSearch(e.target.value);
    
  };

  return (
    <div className={styles.search}>
      <span>جستجو :</span>
      <input
        type="text"
        value={search}
        placeholder="جستجو در نام یا ایمیل"
        onChange={changeHandler}
      />
    </div>
  );
}

export default Search;
