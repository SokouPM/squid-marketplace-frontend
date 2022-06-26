import Link from "next/link"
import { useState, useEffect, useContext } from "react"
import swal from "sweetalert"
import CircularProgress from "@mui/material/CircularProgress"
import { FiAlertTriangle } from "react-icons/fi"
import AppContext from "../../AppContext"
import api from "../../services/api"

const CategoriesList = () => {
  const { router } = useContext(AppContext)
  const [categories, setCategories] = useState(null)
  const [apiError, setApiError] = useState(null)

  useEffect(() => {
    api
      .get("/category")
      .then((response) => setCategories(response.data))
      .catch((err) => {
        if (err.response.status === 404) {
          err.response.data = { error: "Non trouvé" }
        }

        setApiError(err.response.data.error)
      })
  }, [])

  const deleteCategory = async (categoryId) => {
    await api.delete(`/category?id=${categoryId}`)
    setTimeout(() => {
      router.reload()
    }, 1000)
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
              key={item.id}
              className={`font-bold ${index % 2 ? "bg-gray-100" : "bg-white"}`}
            >
              <td className="w-5/6 pl-3 border-x">{item.name}</td>
              <td className="flex items-center justify-center border-x p-1">
                <Link
                  href={`/administration/categories/${item.id}/modify`}
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
                        deleteCategory(item.id)
                        setTimeout(() => {
                          router.reload()
                        }, 1000)
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
