import Link from "next/link"
import { useContext, useEffect, useState } from "react"
import swal from "sweetalert"
import CircularProgress from "@mui/material/CircularProgress"
import { FiAlertTriangle } from "react-icons/fi"
import AppContext from "../../AppContext"
import { supabase } from "../../../utils/supabase"

const CategoriesList = () => {
  const { router } = useContext(AppContext)
  const [categories, setCategories] = useState(null)
  const [apiError, setApiError] = useState(null)

  useEffect(() => {
    getCategories()
  }, [])

  const deleteCategory = async () => {
    // TODO
    setTimeout(() => {
      router.reload()
    }, 1000)
  }

  const getCategories = async () => {
    const { data, error } = await supabase
      .from("category")
      .select("name")
      .order("name", { ascending: true })

    error && setApiError(error.message)
    data && setCategories(data)
  }

  if (apiError) {
    return (
      <div className="w-full flex items-center justify-center mt-10 p-5 bg-red-200 rounded">
        <p className="text-3xl font-bold flex items-center justify-center text-red-600">
          <FiAlertTriangle className="text-5xl mr-3" />
          {apiError}
        </p>
      </div>
    )
  }

  if (!categories) {
    return (
      <div className="flex items-center justify-center">
        <CircularProgress
          sx={{
            color: "#cc0023",
          }}
        />
        <p className="ml-3">Chargement des categories...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <table className="w-5/6 mb-5">
        <thead>
          <tr className="bg-slate-500 text-left">
            <th className="border pl-3 p-2 font-bold text-white">Nom</th>
            <th className="border"></th>
          </tr>
        </thead>
        <tbody>
          {categories.map((item, index) => (
            <tr
              key={item.name}
              className={`font-bold ${index % 2 ? "bg-gray-100" : "bg-white"}`}
            >
              <td className="w-5/6 pl-3 border-x">{item.name}</td>
              <td className="flex items-center justify-center border-x p-1">
                <Link
                  href={`/administration/categories/${item.name}/modify`}
                  passHref
                >
                  <button className="p-1 mr-1 w-1/2 rounded bg-blue-600 text-white transition-all hover:bg-blue-300">
                    Modifier
                  </button>
                </Link>
                <button
                  className="p-1 w-1/2 rounded bg-red-600 text-white transition-all hover:bg-red-300"
                  onClick={() => {
                    swal({
                      title: `Vous êtes sûr de vouloir supprimer la catégorie "${item.name}" ?`,
                      text: "Cette action est définitive !",
                      icon: "warning",
                      buttons: ["Non", "Oui"],
                      dangerMode: true,
                    }).then((willDelete) => {
                      if (willDelete) {
                        swal({
                          title: `La catégorie "${item.name}" à été supprimée`,
                          icon: "success",
                        })
                        deleteCategory(item.name)
                      }
                    })
                  }}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot className="bg-slate-500 text-left">
          <tr>
            <td className="border pl-3 p-2 font-bold text-white">Nom</td>
            <td className="border"></td>
          </tr>
        </tfoot>
      </table>
      <Link href="/administration/categories/add" passHref>
        <button className="p-3 w-1/6 mb-5 rounded bg-green-600 text-white transition-all hover:bg-green-300">
          Ajouter une catégorie
        </button>
      </Link>
    </div>
  )
}

export default CategoriesList
