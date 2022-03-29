import Image from "next/image"
import Rating from "@mui/material/Rating"
import { GiSquid } from "react-icons/gi"
import { IoMdStar } from "react-icons/io"
import data from "/src/datas/product.json"
import styles from "/styles/components/body/ArticleList.module.css"

const ArticleInfo = () => {
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

  return (
    <section className={styles.articlesInfo}>
      <div className={styles.articlesImg}>
        <ul>
          {data.images.map((item, index) =>
            index > 0 ? (
              <li key={index}>
                <Image
                  src={item}
                  alt="squid market place article"
                  width={200}
                  height={90}
                />
              </li>
            ) : null
          )}
        </ul>
        <div>
          {data.images.map((item, index) =>
            index === 0 ? (
              <Image
                key={index}
                src={item}
                alt="squid market place article"
                width={550}
                height={350}
              />
            ) : null
          )}
        </div>
      </div>
      <div className={styles.articlesDesc}>
        <div className={styles.articleNameAndPrice}>
          <p className={styles.articleName}>{data.name}</p>
          <p className={styles.articlePrice}>{data.price} €</p>
        </div>
        <div className={styles.articleDescription}>{data.description}</div>
        <div className={styles.ratingLine}>
          <p className={styles.voteNumber}>( {data.ratings.length} )</p>
          <Rating
            name="read-only"
            value={data.rating}
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
        <div className={styles.articleStock}>{stockRender(data.stock)}</div>
        <button className={styles.cartButton}>Ajouter au pannier</button>
      </div>
    </section>
  )
}

export default ArticleInfo
