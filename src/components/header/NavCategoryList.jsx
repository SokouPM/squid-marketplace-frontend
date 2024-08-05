import Link from "next/link"
import { useEffect, useState } from "react"
import CircularProgress from "@mui/material/CircularProgress"
import { FiAlertTriangle } from "react-icons/fi"
import { supabase } from "../../utils/supabase"

const NavCategoriesList = () => {
  const [categories, setCategories] = useState(null)
  const [apiError, setApiError] = useState(null)

  useEffect(() => {
    getAllCategories()
  }, [])

  async function getAllCategories() {
    const { data, error } = await supabase.from("category").select("name")
    setCategories(data)
    setApiError(error?.message)
  }

  if (apiError) {
    return (
      <div className="w-full flex items-center justify-center py-2 bg-red-200 rounded">
        <p className="font-bold flex items-center justify-center text-red-600">
          <FiAlertTriangle className="text-xl mr-3" />
          {apiError}
        </p>
      </div>
    )
  }

  if (!categories) {
    return (
      <div className="w-full px-5 flex items-center justify-center">
        <CircularProgress
          sx={{
            color: "#cc0023",
          }}
        />
        <p className="ml-3 w-max">Chargement des categories...</p>
      </div>
    )
  }

  if (!categories.length) {
    return null
  }

  return (
    <div className="w-full flex flex-col items-start justify-center">
      {categories.map((item) => (
        <Link key={item.name} href={`/categories/${item.name}`}>
          <a className="w-full hover-text-secondary transition-all pl-4 py-1 hover:pl-6 hover:bg-black/30">
            {item.name}
          </a>
        </Link>
      ))}
    </div>
  )
}

export default NavCategoriesList
