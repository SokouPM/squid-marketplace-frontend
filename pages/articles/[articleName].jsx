import { useRouter } from "next/router"
import Layout from "/src/components/Layout"
import ArticleInfo from "/src/components/body/ArticleInfo"

const ArticlePage = () => {
  const {
    query: { articleName },
  } = useRouter()

  return (
    <Layout
      page="Article"
      diplayheader="true"
      diplaybreadcrumbs="true"
      diplayfooter="true"
    >
      <ArticleInfo articleName={articleName} />
    </Layout>
  )
}

export default ArticlePage
