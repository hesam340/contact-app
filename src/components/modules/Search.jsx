import styles from "./Search.module.css";

function Search({ search, setSearch }) {
  return (
    <div className={styles.search}>
      <label htmlFor="search">جستجو :</label>
      <input
        type="text"
        id="search"
        value={search}
        placeholder="جستجو در نام یا ایمیل"
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}

export default Search;
