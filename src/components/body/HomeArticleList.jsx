/* eslint-disable @next/next/no-img-element */
import Link from "next/link"
import { useEffect, useState } from "react"
import Rating from "@mui/material/Rating"
import CircularProgress from "@mui/material/CircularProgress"
import { IoMdStar } from "react-icons/io"
import { GiGiantSquid } from "react-icons/gi"
import { FiAlertTriangle } from "react-icons/fi"
import api from "../services/api"
import StockRender from "./StockRender"

const ArticleList = ({ limit }) => {
  const [articles, setArticles] = useState(null)
  const [apiError, setApiError] = useState(null)

  useEffect(() => {
    api
      .get("/articles/trending")
      .then((response) => setArticles(response.data))
      .catch((err) => {
        if (err.response.status === 404) {
          err.response.data = { error: "Non trouvé" }
        }

        setApiError(err.response.data.error)
      })
  }, [])

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

  if (!articles) {
    return (
      <div className="w-full flex items-center justify-center mt-10 p-5">
        <CircularProgress
          sx={{
            color: "#cc0023",
          }}
          className="mr-5"
        />
        <p>Chargement des articles...</p>
      </div>
    )
  }

  if (!articles.length) {
    return (
      <div className="w-full flex items-center justify-center mt-10 p-5">
        <GiGiantSquid className="text-5xl mr-3 text-secondary" />
        <p>Pas encore d'article</p>
      </div>
    )
  }

  return (
    <ul className="w-5/6 mx-auto flex items-center justify-between flex-wrap mt-5">
      {articles.map(
        (item, index) =>
          index < limit && (
            <Link
              href={{
                pathname: `/articles/${item.id}`,
              }}
              key={index}
              passHref
            >
              <li className="border rounded my-5 cursor-pointer shadow transition-all hover:scale-110 hover:shadow-2xl bg-white">
                <div className="w-full">
                  <img
                    src={item.images[0].url}
                    alt="image de l'article"
                    className="rounded-t"
                    width="450"
                    height="250"
                  />
                </div>
                <div className="px-2 pb-2">
                  <p className="mb-4 font-bold text-2xl">{item.name}</p>
                  <div className="mb-3 w-full flex items-center justify-between  text-xl">
                    <p>{item.price} €</p>
                    <StockRender stockNumber={item.stock} />
                  </div>

                  <div className="w-full flex items-end justify-end">
                    <p className="w-max text-sm mr-1 italic text-slate-400">
                      ( {item.ratings.length} )
                    </p>
                    <Rating
                      name="read-only"
                      value={item.rating}
                      precision={0.5}
                      readOnly
                      icon={<IoMdStar color="#cc0023" fontSize="inherit" />}
                      emptyIcon={
                        <IoMdStar color="#272727" fontSize="inherit" />
                      }
                      sx={{
                        width: "auto",
                        color: "#cc0023",
                      }}
                    />
                  </div>
                </div>
              </li>
            </Link>
          )
      )}
    </ul>
  )
}

export default ArticleList
