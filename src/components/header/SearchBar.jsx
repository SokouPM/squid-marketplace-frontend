import Autocomplete from "@mui/material/Autocomplete"
import options from "/src/datas/productsName"
import { FaSearch } from "react-icons/fa"
import styles from "/styles/components/header/searchBar.module.css"

const SearchBar = () => {
  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <Autocomplete
      className={styles.searchBarContent}
      options={options}
      renderInput={(params) => (
        <form
          className={styles.searchBar}
          ref={params.InputProps.ref}
          onSubmit={handleSubmit}
        >
          <input type="text" {...params.inputProps} />
          <button>
            <FaSearch />
          </button>
        </form>
      )}
    />
  )
}

export default SearchBar
