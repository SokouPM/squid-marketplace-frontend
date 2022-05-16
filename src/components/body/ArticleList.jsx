import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import Rating from "@mui/material/Rating"
import CircularProgress from "@mui/material/CircularProgress"
import { IoMdStar } from "react-icons/io"
import { GiSquid, GiGiantSquid } from "react-icons/gi"
import api from "../services/api"
import styles from "../../../styles/components/body/ArticleList.module.css"

const ArticleList = ({ limit }) => {
  const [articles, setArticles] = useState(null)
  const [apiError, setApiError] = useState(null)

  useEffect(() => {
    api
      .get("/articles")
      .then((response) => setArticles(response.data))
      .catch((error) =>
        setApiError(error.response ? error.response.data.error : error.message)
      )
  }, [])

  const stockRender = (stockNumber) => {
    const alertLimitNb = 10

    if (stockNumber > alertLimitNb) {
      return (
        <p className={styles.inStock}>
          <GiSquid /> En stock
        </p>
      )
    }

    if (stockNumber <= alertLimitNb && stockNumber > 0) {
      return (
        <p className={styles.lessThan}>
          <GiSquid /> Plus que {stockNumber} en stock
        </p>
      )
    }

    if (stockNumber >= 0) {
      return (
        <p className={styles.outOfStock}>
          <GiSquid /> L’article n’est plus disponible
        </p>
      )
    }
  }

  if (apiError) {
    return (
      <div>
        <p>{apiError}</p>
      </div>
    )
  }

  if (!articles) {
    return (
      <div className={styles.loading}>
        <CircularProgress
          sx={{
            color: "#cc0023",
          }}
        />
        <p>Chargement des produits...</p>
      </div>
    )
  }

  if (!articles.length) {
    return (
      <div className={styles.loading}>
        <GiGiantSquid className="text-5xl" /> <p>Pas encore d'article</p>
      </div>
    )
  }

  return (
    <ul className={styles.articleList}>
      {articles.map((item, index) =>
        index < limit ? (
          <Link
            href={{
              pathname: `/articles/${item.id}`,
            }}
            key={item.id}
            passHref
          >
            <li className={styles.articleItem}>
              <div className={styles.articleImageBorder}>
                <Image
                  src="https://place-hold.it/500x300"
                  alt="image de l'article"
                  objectFit="contain"
                  objectPosition="top"
                  layout="fill"
                />
              </div>
              <p className={styles.articleName}>{item.name}</p>
              <div className={styles.priceAndStockLine}>
                <p>{item.price} €</p>
                {stockRender(item.stock)}
              </div>

              <div className={styles.ratingLine}>
                <p className={styles.voteNumber}>( {item.ratings.length} )</p>
                <Rating
                  name="read-only"
                  value={item.rating}
                  precision={0.5}
                  readOnly
                  icon={<IoMdStar color="#cc0023" fontSize="inherit" />}
                  emptyIcon={<IoMdStar color="#272727" fontSize="inherit" />}
                  sx={{
                    width: 300,
                    color: "#cc0023",
                  }}
                />
              </div>
            </li>
          </Link>
        ) : null
      )}
    </ul>
  )
}

export default ArticleList
