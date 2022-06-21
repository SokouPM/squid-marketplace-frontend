import { useRouter } from "next/router"
import CircularProgress from "@mui/material/CircularProgress"
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
        <div className="w-full px-5 flex items-center justify-center">
          <CircularProgress
            sx={{
              color: "#cc0023",
            }}
          />
          <p className="ml-3 w-max">Chargement du panier...</p>
        </div>
      )}
    </Layout>
  )
}

export default ArticlePage
