import { useRouter } from "next/router"
import Layout from "../../src/components/Layout"
import ArticleListByCategory from "../../src/components/body/ArticleListByCategory"
import ArticleSort from "../../src/components/body/ArticleSort"

const ArticlesByCategoryPage = () => {
  const {
    query: { categoryId },
  } = useRouter()

  return (
    <Layout
      page="Articles par catégories"
      diplayheader={1}
      diplaybreadcrumbs={1}
      diplayfooter={1}
    >
      <div className="border rounded mb-5">
        <ArticleSort />
        <ArticleListByCategory categoryId={categoryId} />
      </div>
    </Layout>
  )
}

export default ArticlesByCategoryPage
