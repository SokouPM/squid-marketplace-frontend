import { useState, useContext, useEffect } from "react"
import Autocomplete from "@mui/material/Autocomplete"
import { FaSearch } from "react-icons/fa"
import AppContext from "../AppContext"
import api from "../services/api"

const SearchBar = () => {
  const { router } = useContext(AppContext)
  const [value, setValue] = useState("")
  const [articlesNames, setArticlesNames] = useState("")

  useEffect(() => {
    api
      .get("/articles/listName")
      .then((response) => setArticlesNames(response.data))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    articlesNames.map((item) => {
      if (value === item.label) {
        router.push(`/articles/${item.id}`)
      }
    })
  }

  if (!articlesNames) {
    return null
  }

  return (
    <Autocomplete
      className="flex items-center"
      options={articlesNames}
      noOptionsText="Pas d'article correspondant"
      onInputChange={(e, newInputValue) => {
        setValue(newInputValue)
      }}
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
