/* eslint-disable @next/next/no-img-element */
import Link from "next/link"
import { useState, useEffect } from "react"
import CircularProgress from "@mui/material/CircularProgress"
import { FiAlertTriangle } from "react-icons/fi"
import api from "../services/api"

const ArticleOnCartInfos = ({ articleId }) => {
  const [article, setArticle] = useState(null)
  const [apiError, setApiError] = useState(null)

  useEffect(() => {
    if (articleId && !isNaN(articleId)) {
      api
        .get(`/articles/byId?id=${articleId}`)
        .then((response) => setArticle(response.data))
        .catch((err) => {
          if (err.response.status === 404) {
            err.response.data = { error: "Non trouvé" }
          }

          setApiError(err.response.data.error)
        })
    }
  }, [articleId])

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

  if (!article) {
    return (
      <div className="w-full flex items-center justify-center mt-10 p-5">
        <CircularProgress
          sx={{
            color: "#cc0023",
          }}
          className="mr-5"
        />
        <p>Chargement de l'article...</p>
      </div>
    )
  }

  return (
    <Link href={`/articles/${articleId}`}>
      <a className="flex">
        <img
          src={article.images[0].url}
          alt="Squid Marketplace image article"
          width={200}
        />
        <h3 className="ml-5 text-lg font-bold">{article.name}</h3>
      </a>
    </Link>
  )
}

export default ArticleOnCartInfos
