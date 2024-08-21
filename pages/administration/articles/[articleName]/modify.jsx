import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import CircularProgress from "@mui/material/CircularProgress"
import Layout from "../../../../src/components/Layout"
import ArticleForm from "../../../../src/components/body/admin/ArticleForm"
import { supabase } from "../../../../src/utils/supabase"

const ModifyArticlePage = () => {
  const {
    query: { articleName },
  } = useRouter()

  const [article, setArticle] = useState(null)
  const [apiError, setApiError] = useState(null)

  useEffect(() => {
    if (articleName) {
      getArticleByName()
    }
  }, [articleName])

  const getArticleByName = async () => {
    const { data, error } = await supabase
      .from("article")
      .select(
        `name,
        price,
        category:category_name,
        articleImage:article_image(url),
        description,
        stock,
        color`
      )
      .eq("name", articleName)
      .single()

    error && setApiError(error.message)
    data && setArticle(data)
  }

  return (
    <Layout
      page="Administration / Modifier un article"
      fullwidth={1}
      diplayadminheader={1}
      diplayfooter={1}
    >
      {article ? (
        <>
          <h2 className="my-5 text-3xl text-center font-bold">
            Modifier l'article "{articleName}"
          </h2>
          {apiError && <p>{apiError}</p>}
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

ModifyArticlePage.private = true
ModifyArticlePage.administration = true

export default ModifyArticlePage
