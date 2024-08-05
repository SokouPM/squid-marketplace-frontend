import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Layout from "../../src/components/Layout"
import ArticleSort from "../../src/components/body/ArticleSort"
import { supabase } from "../../src/utils/supabase"

const ArticlesByCategoryPage = () => {
  const {
    query: { categoryName },
  } = useRouter()
  const [articles, setArticles] = useState(null)
  const [apiError, setApiError] = useState(null)

  useEffect(() => {
    getArticlesByCategory(categoryName)
  }, [categoryName])

  async function getArticlesByCategory(categoryName) {
    const { data, error } = await supabase
      .from("article")
      .select(
        `name,
        price,
        category:category_name,
        articleImage:article_image(url),
        stock,
        color,
        category:category_name,
        ratingNb:customer_to_article!left(rating.count()),
        ratingAvg:customer_to_article!left(rating.avg())`
      )
      .eq("category_name", categoryName)
    setArticles(data)
    setApiError(error?.message)
  }

  return (
    <Layout
      page="Articles par catégories"
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

export default ArticlesByCategoryPage
