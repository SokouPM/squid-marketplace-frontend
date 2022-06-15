import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import CircularProgress from "@mui/material/CircularProgress"
import api from "../../../../src/components/services/api"
import Layout from "../../../../src/components/Layout"
import ArticleForm from "../../../../src/components/body/admin/ArticleForm"

const ModifyArticlePage = () => {
  const {
    query: { articleId },
  } = useRouter()

  const [article, setArticle] = useState(null)
  const [apiError, setApiError] = useState(null)

  useEffect(() => {
    if (articleId && !isNaN(articleId)) {
      api
        .get(`/articles/byId?id=${articleId}`)
        .then((response) => setArticle(response.data))
        .catch((error) =>
          setApiError(
            error.response ? error.response.data : error.message
          )
        )
    }
  }, [articleId])

  return (
    <Layout
      page="Administration / Modifier un article"
      fullwidth={1}
      diplayadminheader={1}
      diplayfooter={1}
    >
      {article ? (
        <>
          <h2 className="my-5 text-3xl text-center font-bold">
            Modifier l'article "{articleId}"
          </h2>
          {apiError && <p>{apiError}</p>}
          <ArticleForm article={article} />
        </>
      ) : (
        <div className="flex items-center justify-center mt-20">
          <CircularProgress
            sx={{
              color: "#cc0023",
            }}
          />
          <p className="ml-3">Chargement du formulaire...</p>
        </div>
      )}
    </Layout>
  )
}

export default ModifyArticlePage
