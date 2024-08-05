import { useEffect, useState } from "react"
import Layout from "../src/components/Layout"
import ArticleSort from "../src/components/body/ArticleSort"
import { supabase } from "../src/utils/supabase"

const ArticlesPage = () => {
  const [articles, setArticles] = useState(null)
  const [apiError, setApiError] = useState(null)

  useEffect(() => {
    getArticles()
  }, [])

  async function getArticles() {
    const { data, error } = await supabase.from("article").select(
      `name,
        price,
        category:category_name,
        articleImage:article_image(url),
        stock,
        color,
        ratingNb:customer_to_article!left(rating.count()),
        ratingAvg:customer_to_article!left(rating.avg())`
    )
    setArticles(data)
    setApiError(error?.message)
  }

  return (
    <Layout
      page="Articles"
      diplayheader={1}
      diplaybreadcrumbs={1}
      diplayfooter={1}
    >
      <div className="border rounded pb-5 mb-5">
        <ArticleSort articlesArray={articles} apiError={apiError} />
      </div>
    </Layout>
  )
}

export default ArticlesPage
