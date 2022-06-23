import { useEffect, useState } from "react"
import Layout from "../src/components/Layout"
import ArticleSort from "../src/components/body/ArticleSort"
import api from "../src/components/services/api"

const ArticlesPage = () => {
  const [articles, setArticles] = useState(null)
  const [apiError, setApiError] = useState(null)

  useEffect(() => {
    api
      .get("/articles")
      .then((response) => setArticles(response.data))
      .catch(() => setApiError("Erreur de chargement"))
  }, [])

  return (
    <Layout
      page="Articles"
      diplayheader={1}
      diplaybreadcrumbs={1}
      diplayfooter={1}
    >
      <div className="border rounded mb-5">
        <ArticleSort articlesArray={articles} apiError={apiError} />
      </div>
    </Layout>
  )
}

export default ArticlesPage
