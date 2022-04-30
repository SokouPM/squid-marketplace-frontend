import Autocomplete from "@mui/material/Autocomplete"
import { FaSearch } from "react-icons/fa"
import options from "/src/datas/productsName"

const SearchBar = () => {
  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <Autocomplete
      className="flex items-center"
      options={options}
      renderInput={(params) => (
        <form
          className="flex items-center"
          ref={params.InputProps.ref}
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            {...params.inputProps}
            className="h-8 w-80 px-3 rounded-l-full"
          />
          <button className="bg-secondary hover-bg-tertiary hover-text-primary px-3 h-8 text-white rounded-r-full transition-all">
            <FaSearch />
          </button>
        </form>
      )}
    />
  )
}

export default SearchBar
