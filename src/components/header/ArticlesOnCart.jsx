/* eslint-disable @next/next/no-img-element */
import { useCallback, useState } from "react"
import Link from "next/link"
import CircularProgress from "@mui/material/CircularProgress"
import { FaPlus, FaMinus } from "react-icons/fa"
import { GiGiantSquid } from "react-icons/gi"

const changeQuantity = (articleId, isMore) => {
  let cart = JSON.parse(localStorage.getItem("cart"))

  cart.map((item) => {
    if (item.id === articleId) {
      if (isMore) {
        item.quantity++
      } else {
        item.quantity--

        if (item.quantity <= 0) {
          cart = cart.filter((item) => item.id !== articleId)
        }
      }
    }
  })

  localStorage.setItem("cart", JSON.stringify(cart))
}

const getTotalPrice = (cart, total) => {
  cart.map((item) => {
    total += item.price * item.quantity
  })

  return total
}

const ArticlesOnChart = () => {
  const [, forceUpdate] = useState()
  const doUpdate = useCallback(() => forceUpdate({}), [])
  let total = 0

  if (!localStorage.getItem("cart")) {
    localStorage.setItem("cart", JSON.stringify([]))
  }

  const cart = JSON.parse(localStorage.getItem("cart"))

  if (!cart) {
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

  if (!cart.length) {
    return (
      <div className="w-full px-5 flex flex-col items-center justify-center">
        <GiGiantSquid className="text-9xl mt-3 text-secondary" />
        <p className="ml-3 w-max">
          Vous n'avez pas d'article dans votre panier
        </p>
      </div>
    )
  }

  return (
    <>
      <ul>
        {cart.map((item, index) => (
          <li
            key={index}
            className="px-5 mb-3 hover-text-secondary transition-all pl-4 py-1 hover:pl-6 hover:bg-black/30"
          >
            <div className="flex items-start">
              <Link href={`/articles/${item.id}`}>
                <a>
                  <img
                    src={item.images[0].url}
                    alt="Image de l'article"
                    width={500 / 2.5}
                    height={300 / 2.5}
                    className="cursor-pointer"
                  />
                </a>
              </Link>
              <div className="ml-5 w-1/2">
                <Link href={`/articles/${item.id}`}>
                  <a>
                    <p className="text-lg font-bold leading-none mb-2">
                      {item.name}
                    </p>
                    <p>Prix : {item.price * item.quantity} €</p>
                  </a>
                </Link>
                <div className="w-full flex items-center justify-center mt-3">
                  <button
                    onClick={() => changeQuantity(item.id, false) + doUpdate()}
                    className="hover-bg-secondary text-primary p-2 rounded-full bg-white relative transition-all hover:text-white"
                  >
                    <FaMinus />
                  </button>
                  <p className="mx-3">{item.quantity}</p>
                  <button
                    onClick={() => changeQuantity(item.id, true) + doUpdate()}
                    className="hover-bg-secondary text-primary p-2 rounded-full bg-white relative transition-all hover:text-white"
                  >
                    <FaPlus />
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <p className="font-bold text-xl ml-20">
        Total : {getTotalPrice(cart, total)} €
      </p>
      <Link href="/cart">
        <a className="w-2/3 mt-5 mx-auto bg-secondary hover-text-primary hover-bg-tertiary px-10 py-2 rounded-full text-center text-white transition-all">
          Commander
        </a>
      </Link>
    </>
  )
}

export default ArticlesOnChart
