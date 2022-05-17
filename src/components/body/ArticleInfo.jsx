import Image from "next/image"
import Rating from "@mui/material/Rating"
import { GiSquid } from "react-icons/gi"
import { IoMdStar } from "react-icons/io"
import data from "../../datas/product.json"

const stockRender = (stockNumber) => {
  const alertLimitNb = 10

  if (stockNumber > alertLimitNb) {
    return (
      <p className="flex items-center justify-left font-bold text-green-700">
        <GiSquid className="mr-1 text-xl" /> En stock
      </p>
    )
  }

  if (stockNumber <= alertLimitNb && stockNumber > 0) {
    return (
      <p className="flex items-center justify-left font-bold text-yellow-500">
        <GiSquid className="mr-1 text-xl" /> Plus que {stockNumber} en stock
      </p>
    )
  }

  if (stockNumber >= 0) {
    return (
      <p className="flex items-center justify-left font-bold text-red-600">
        <GiSquid className="mr-1 text-xl" /> L’article n’est plus disponible
      </p>
    )
  }
}

const ArticleInfo = () => {
  return (
    <section className="flex items-start justify-between mt-5">
      <div className="flex w-3/5">
        <ul className="mr-2">
          {data.images.map(
            (item, index) =>
              index > 0 && (
                <li key={index}>
                  <Image
                    src={item}
                    alt="squid market place article"
                    width={500 / 3}
                    height={300 / 3}
                  />
                </li>
              )
          )}
        </ul>
        <div>
          {data.images.map(
            (item, index) =>
              index === 0 && (
                <Image
                  key={index}
                  src={item}
                  alt="squid market place article"
                  width={500 * 1.2}
                  height={300 * 1.2}
                />
              )
          )}
        </div>
      </div>
      <div className="w-2/5 flex flex-col items-left">
        <div className="flex pb-2 items-center justify-between">
          <p className="text-2xl font-bold">{data.name}</p>
          <p className="text-2xl">{data.price} €</p>
        </div>
        <div className="text-justify py-3">{data.description}</div>
        <div className="flex items-end justify-left py-3">
          <Rating
            name="read-only"
            value={data.rating}
            precision={0.5}
            readOnly
            icon={<IoMdStar color="#cc0023" fontSize="inherit" />}
            emptyIcon={<IoMdStar color="#272727" fontSize="inherit" />}
            sx={{
              width: "auto",
              color: "#cc0023",
            }}
          />
          <p className="w-max text-sm mr-1 italic text-slate-400">
            ( {data.ratings.length} )
          </p>
        </div>
        <div className=" py-3 mb-6">{stockRender(data.stock)}</div>
        <button className="w-2/3 mx-auto bg-secondary hover-text-primary hover-bg-tertiary px-10 py-2 rounded-full text-white transition-all">
          Ajouter au panier
        </button>
      </div>
    </section>
  )
}

export default ArticleInfo
