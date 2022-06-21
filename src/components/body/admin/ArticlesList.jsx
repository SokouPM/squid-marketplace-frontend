import Link from "next/link"
import { useState, useEffect, useContext } from "react"
import swal from "sweetalert"
import CircularProgress from "@mui/material/CircularProgress"
import { FiAlertTriangle } from "react-icons/fi"
import api from "../../services/api"
import AppContext from "../../AppContext"

const ArticlesList = () => {
  const { router } = useContext(AppContext)
  const [articles, setArticles] = useState(null)
  const [apiError, setApiError] = useState(null)

  useEffect(() => {
    api
      .get("/articles")
      .then((response) => setArticles(response.data))
      .catch((error) =>
        setApiError(error.response ? error.response.data : error.message)
      )
  }, [])

  const deleteArticle = async (articleId) => {
    await api.delete(`/articles?id=${articleId}`)
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

  if (!articles) {
    return (
      <div className="w-full flex items-center justify-center mt-10 p-5">
        <CircularProgress
          sx={{
            color: "#cc0023",
          }}
          className="mr-5"
        />
        <p>Chargement des articles...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <table className="mb-5 w-full">
        <thead>
          <tr className="bg-slate-500 text-left">
            <th className="border w-1/6 pl-3 p-2 font-bold text-white">Nom</th>
            <th className="border pl-3 p-2 font-bold text-white">Prix</th>
            <th className="border pl-3 p-2 font-bold text-white">Quantité</th>
            <th className="border pl-3 p-2 font-bold text-white">Catégorie</th>
            <th className="border pl-3 p-2 font-bold text-white">Couleur</th>
            <th className="border w-3/6 pl-3 p-2 font-bold text-white">
              Description
            </th>
            <th className="border"></th>
          </tr>
        </thead>
        <tbody>
          {articles.map((item, index) => (
            <tr
              key={item.id}
              className={`font-bold h-28 ${
                index % 2 ? "bg-gray-100" : "bg-white"
              }`}
            >
              <td className="w-1/6 pl-3 h-28 border-x">{item.name}</td>
              <td className="p-3 h-28 border-x whitespace-nowrap">
                {item.price} €
              </td>
              <td className="pl-3 h-28 border-x">{item.stock}</td>
              <td className="pl-3 h-28 border-x">{item.category.name}</td>
              <td className="pl-3 h-28 border-x">{item.color}</td>
              <td className="w-3/6 pl-3 h-28 border-x">{item.description}</td>
              <td className="flex items-center justify-center h-28 border-x p-1">
                <Link
                  href={`/administration/articles/${item.id}/modify`}
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
                      title: `Vous êtes sûr de vouloir supprimer l'article "${item.name}" ?`,
                      text: "Cette action est définitive !",
                      icon: "warning",
                      buttons: ["Non", "Oui"],
                      dangerMode: true,
                    }).then((willDelete) => {
                      if (willDelete) {
                        swal({
                          title: `L'article "${item.name}" à été supprimée`,
                          icon: "success",
                        })
                        deleteArticle(item.id)
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
            <td className="border pl-3 p-2 font-bold text-white">Prix</td>
            <td className="border pl-3 p-2 font-bold text-white">Quantité</td>
            <td className="border pl-3 p-2 font-bold text-white">Catégorie</td>
            <td className="border pl-3 p-2 font-bold text-white">Couleur</td>
            <td className="border pl-3 p-2 font-bold text-white">
              Description
            </td>
            <td className="border"></td>
          </tr>
        </tfoot>
      </table>
      <Link href="/administration/articles/add" passHref>
        <button className="p-3 w-1/6 mb-5 rounded bg-green-600 text-white transition-all hover:bg-green-300">
          Ajouter un article
        </button>
      </Link>
    </div>
  )
}

export default ArticlesList
