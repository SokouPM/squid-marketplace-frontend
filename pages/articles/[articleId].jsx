import { useRouter } from "next/router"
import Layout from "/src/components/Layout"
import ArticleInfo from "/src/components/body/ArticleInfo"

const ArticlePage = () => {
  const {
    query: { articleId },
  } = useRouter()

  return (
    <Layout
      page="Article"
      diplayheader="true"
      diplaybreadcrumbs="true"
      diplayfooter="true"
    >
      {!isNaN(articleId) ? (
        <ArticleInfo articleId={articleId} />
      ) : (
        <div>⚠ Article Id must be a number</div>
      )}
    </Layout>
  )
}

export default ArticlePage
