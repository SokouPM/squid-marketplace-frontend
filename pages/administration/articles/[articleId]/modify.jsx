import { useRouter } from "next/router"
import CircularProgress from "@mui/material/CircularProgress"
import Layout from "../../../../src/components/Layout"
import ArticleForm from "../../../../src/components/body/admin/ArticleForm"
import article from "../../../../src/datas/category"

const ModifyArticlePage = () => {
  const {
    query: { articleId },
  } = useRouter()

  return (
    <Layout
      page="Administration / Modifier un produit"
      fullwidth={1}
      diplayadminheader={1}
      diplayfooter={1}
    >
      {articleId ? (
        <>
          <h2 className="my-5 text-3xl text-center font-bold">
            Modifier l'article "{articleId}"
          </h2>
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
