import { useRouter } from "next/router"
import Layout from "../../src/components/Layout"
import ArticleListByCategory from "../../src/components/body/ArticleListByCategory"

const ArticlesByCategoryPage = () => {
  const {
    query: { categoryId },
  } = useRouter()

  return (
    <Layout
      page="Mentions légales"
      diplayheader={1}
      diplaybreadcrumbs={1}
      diplayfooter={1}
    >
      <ArticleListByCategory categoryId={categoryId} />
    </Layout>
  )
}

export default ArticlesByCategoryPage
