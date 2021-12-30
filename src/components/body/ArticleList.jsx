// import UseApi from "./hooks/UseApi";
// import Image from "next/image";
import Rating from "@mui/material/Rating";
import CircularProgress from "@mui/material/CircularProgress";
import { IoMdStar } from "react-icons/io";
import { GiSquid } from "react-icons/gi";
import datas from "/src/datas/products.json";
import styles from "/styles/components/body/ArticleList.module.css";

const ArticleList = (url) => {
  // const datas = UseApi(url);

  const stockRender = (stockNumber) => {
    if (stockNumber > 5) {
      return (
        <p className={styles.inStock}>
          <GiSquid /> En stock
        </p>
      );
    }
    if (stockNumber <= 5 && stockNumber > 0) {
      return (
        <p className={styles.lessThanSix}>
          <GiSquid /> Plus que {stockNumber} en stock
        </p>
      );
    }
    if (stockNumber >= 0) {
      return (
        <p className={styles.outOfStock}>
          <GiSquid /> L’article n’est plus disponible
        </p>
      );
    }
  };

  if (!datas) {
    return (
      <div className={styles.loading}>
        <CircularProgress
          sx={{
            color: "#cc0023",
          }}
        />
        <p>Chargement des produits...</p>
      </div>
    );
  }

  return (
    <ul className={styles.articleList}>
      {datas.map((item) => (
        <li className={styles.articleItem} key={item.id}>
          {/* <Image src={item.imgUrl} alt="image de l'article" /> */}
          <img src={item.imgUrl} alt="image de l'article" />
          <p className={styles.articleName}>{item.name}</p>
          <div className={styles.priceAndStockLine}>
            <p>{item.price} €</p>
            {stockRender(item.stock)}
          </div>

          <div className={styles.ratingLine}>
            <p className={styles.voteNumber}>( {item.voteNumber} )</p>
            <Rating
              name="read-only"
              value={item.rating}
              precision={0.5}
              readOnly
              emptyIcon={<IoMdStar color="#272727" fontSize="inherit" />}
              sx={{
                width: 300,
                color: "#cc0023",
              }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ArticleList;
