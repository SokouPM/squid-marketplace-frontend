import Autocomplete from "@mui/material/Autocomplete"
import options from "/src/datas/productsName"
import { FaSearch } from "react-icons/fa"

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
          <button className="searchButton px-3 h-8 text-white rounded-r-full hover:bg-gray-200">
            <FaSearch />
          </button>
        </form>
      )}
    />
  )
}

export default SearchBar
