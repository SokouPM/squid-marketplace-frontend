import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Layout from "../../src/components/Layout"
import ArticleSort from "../../src/components/body/ArticleSort"
import api from "../../src/components/services/api"

const ArticlesByCategoryPage = () => {
  const {
    query: { categoryId },
  } = useRouter()
  const [articles, setArticles] = useState(null)
  const [apiError, setApiError] = useState(null)

  useEffect(() => {
    if (categoryId && !isNaN(categoryId)) {
      api
        .get(`/articles/getByCategory?id=${categoryId}`)
        .then((response) => setArticles(response.data))
        .catch(() => setApiError("Erreur de chargement"))
    }
  }, [categoryId])

  return (
    <Layout
      page="Articles par catégories"
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

export default ArticlesByCategoryPage
