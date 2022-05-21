import Image from "next/image"
import Link from "next/link"
import CircularProgress from "@mui/material/CircularProgress"
import { FaPlus, FaMinus } from "react-icons/fa"
import products from "../../datas/products.json"

const ArticlesOnChart = () => {
  let quantity = Math.floor(Math.random() * 5)

  if (quantity === 0) {
    quantity = 1
  }

  if (!products) {
    return (
      <div className="w-full px-5 flex items-center justify-center">
        <CircularProgress
          sx={{
            color: "#cc0023",
          }}
        />
        <p className="ml-3 w-max">Chargement du panier...</p>
      </div>
    )
  }

  return (
    <ul>
      {products.map((item, index) => (
        <li
          key={index}
          className="px-5 mb-3 hover-text-secondary transition-all pl-4 py-1 hover:pl-6 hover:bg-black/30"
        >
          <div className="flex items-start">
            <Link href={`/articles/${item.id}`} passHref>
              <Image
                src={item.images[0]}
                alt="Image de l'article"
                width={500 / 2.5}
                height={300 / 2.5}
                className="cursor-pointer"
              />
            </Link>
            <div className="ml-5 w-1/2">
              <Link href={`/articles/${item.id}`}>
                <a>
                  <p className="text-lg font-bold leading-none mb-2">
                    {item.name}
                  </p>
                  <p>Prix : {item.price * quantity} €</p>
                </a>
              </Link>
              <div className="w-full flex items-center justify-center mt-3">
                <button className="hover-bg-secondary text-primary p-2 rounded-full bg-white relative transition-all hover:text-white">
                  <FaMinus />
                </button>
                <p className="mx-3">{quantity}</p>
                <button className="hover-bg-secondary text-primary p-2 rounded-full bg-white relative transition-all hover:text-white">
                  <FaPlus />
                </button>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default ArticlesOnChart
