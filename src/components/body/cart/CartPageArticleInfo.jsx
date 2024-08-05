/* eslint-disable @next/next/no-img-element */
import Link from "next/link"
import { useEffect, useState } from "react"
import CircularProgress from "@mui/material/CircularProgress"
import { FiAlertTriangle } from "react-icons/fi"
import { supabase } from "../../../utils/supabase"

const ArticleOnCartInfos = ({ articleName, price, quantity }) => {
  const [article, setArticle] = useState(null)
  const [apiError, setApiError] = useState(null)

  useEffect(() => {
    getArticle(articleName)
  }, [articleName])

  async function getArticle(articleName) {
    const { data, error } = await supabase
      .from("article")
      .select(
        `name,
        description,
        price,
        color,
        category:category_name,
        articleImage:article_image(url),
        stock,
        ratingNb:customer_to_article!left(rating.count()),
        ratingAvg:customer_to_article!left(rating.avg())`
      )
      .eq("name", articleName)
      .maybeSingle()

    setArticle(data)
    setApiError(error?.message)
  }

  if (apiError) {
    return (
      <div className="w-full flex items-center justify-center mt-10 p-5 bg-red-200 rounded">
        <p className="text-3xl font-bold flex items-center justify-center text-red-600">
          <FiAlertTriangle className="text-5xl mr-3" />
          {apiError}
        </p>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="w-full flex items-center justify-center mt-10 p-5">
        <CircularProgress
          sx={{
            color: "#cc0023",
          }}
          className="mr-5"
        />
        <p>Chargement de l'article...</p>
      </div>
    )
  }

  return (
    <Link href={`/articles/${articleName}`}>
      <a className="flex">
        <img
          src={article.articleImage[0].url}
          alt="Squid Marketplace image article"
          width={200}
        />
        <div className="ml-5 w-full relative">
          <h3 className="text-lg font-bold">{article.name}</h3>
          <p>{article.description}</p>
          <p className="absolute bottom-0">
            Prix / quantité : {price}*{quantity}
          </p>
        </div>
      </a>
    </Link>
  )
}

export default ArticleOnCartInfos
