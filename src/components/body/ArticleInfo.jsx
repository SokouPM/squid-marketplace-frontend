/* eslint-disable @next/next/no-img-element */
import { useContext, useEffect, useState } from "react"
import Rating from "@mui/material/Rating"
import { IoMdStar } from "react-icons/io"
import CircularProgress from "@mui/material/CircularProgress"
import { FiAlertTriangle } from "react-icons/fi"
import AppContext from "../AppContext"
import StockRender from "./StockRender"
import { supabase } from "../../utils/supabase"

const addToCart = (article, sessionId) => {
  if (!localStorage.getItem("cart")) {
    // create local cart if not exist
    localStorage.setItem("cart", JSON.stringify([]))
  }

  const cart = JSON.parse(localStorage.getItem("cart"))

  if (cart.length) {
    let addArticle = true

    cart.map((item) => {
      if (item.name === article.name) {
        item.quantity++

        if (item.quantity > 10) {
          item.quantity = 10
        }

        addArticle = false

        if (sessionId) {
          // TODO
        }
      }
    })

    if (addArticle) {
      const name = article.name
      const price = article.price
      const articleForCart = { name, price }
      articleForCart.quantity = 1

      cart.push(articleForCart)

      if (sessionId) {
        // TODO
      }
    }
  } else {
    const name = article.name
    const price = article.price
    const articleForCart = { name, price }
    articleForCart.quantity = 1

    cart.push(articleForCart)

    if (sessionId) {
      // TODO
    }
  }

  localStorage.setItem("cart", JSON.stringify(cart))
}

const ArticleInfo = ({ articleName }) => {
  const { setCartTotalArticle, session } = useContext(AppContext)
  const [article, setArticle] = useState(null)
  const [apiError, setApiError] = useState(null)
  const [imageSelected, setImageSelected] = useState(0)

  let sessionId = null

  if (session) {
    sessionId = JSON.parse(session).id
  }

  useEffect(() => {
    if (articleName) {
      getArticle(articleName)
    }
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

  if (!article || !articleName) {
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
    <section className="flex items-start justify-between mt-5">
      <div className="flex w-3/5">
        <ul className="mr-2">
          {article.articleImage.map((item, index) => (
            <li
              key={index}
              className={`mb-1 ${
                index === imageSelected &&
                "border-4 border-secondary cursor-pointer"
              }`}
              onMouseOver={() => setImageSelected(index)}
            >
              <img
                src={item.url}
                alt="squid market place article"
                width={500 / 3}
              />
            </li>
          ))}
        </ul>
        <div className="mr-4">
          {article.articleImage.map(
            (item, index) =>
              index === imageSelected && (
                <img
                  key={index}
                  src={item.url}
                  alt="squid market place article"
                  width={500 * 1.2}
                />
              )
          )}
        </div>
      </div>
      <div className="w-2/5 flex flex-col items-left">
        <div className="flex pb-2 items-center justify-between">
          <p className="text-2xl font-bold">{article.name}</p>
          <p className="text-2xl">{article.price} €</p>
        </div>
        <div className="text-justify py-3">{article.description}</div>
        <div className="flex items-end justify-left py-3">
          <Rating
            name="read-only"
            value={article.ratingAvg[0].avg}
            precision={1}
            readOnly
            icon={<IoMdStar color="#cc0023" fontSize="inherit" />}
            emptyIcon={<IoMdStar color="#272727" fontSize="inherit" />}
            sx={{
              width: "auto",
              color: "#cc0023",
            }}
          />
          <p className="w-max text-sm mr-1 italic text-slate-400">
            ( {article.ratingNb[0].count} )
          </p>
        </div>
        <div className="py-3 mb-6">
          <StockRender stockNumber={article.stock} />
        </div>

        {article.stock > 0 ? (
          <button
            onClick={() => {
              addToCart(article, sessionId)
              setCartTotalArticle(setCartTotalArticle + 1)
            }}
            className="w-2/3 mx-auto bg-secondary hover-text-primary hover-bg-tertiary px-10 py-2 rounded-full text-white transition-all"
          >
            Ajouter au panier
          </button>
        ) : (
          <button className="w-2/3 mx-auto bg-secondary px-10 py-2 rounded-full text-white opacity-25 cursor-not-allowed">
            Ajouter au panier
          </button>
        )}
      </div>
    </section>
  )
}

export default ArticleInfo
