/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import Link from "next/link"
import { useCallback, useState, useContext, useEffect } from "react"
import CircularProgress from "@mui/material/CircularProgress"
import { FaPlus, FaMinus } from "react-icons/fa"
import { GiGiantSquid } from "react-icons/gi"
import ArticleOnCartInfos from "./ArticleOnCartInfos"
import AppContext from "../AppContext"
import api from "../services/api"

const changeQuantity = (sessionId, articleId, isMore) => {
  let cart = JSON.parse(localStorage.getItem("cart"))

  cart.map((item) => {
    if (item.id === articleId) {
      if (isMore) {
        item.quantity++

        if (sessionId) {
          api.put(
            `/carts?idCustomer=${sessionId}&idArticle=${item.id}&quantity=${item.quantity}`
          )
        }
      } else {
        item.quantity--

        if (item.quantity <= 0) {
          cart = cart.filter((item) => item.id !== articleId)

          if (sessionId) {
            api.delete(`/carts?idCustomer=${sessionId}&idArticle=${item.id}`)
          }
        } else {
          if (sessionId) {
            api.put(
              `/carts?idCustomer=${sessionId}&idArticle=${item.id}&quantity=${item.quantity}`
            )
          }
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
  const { session, getDbCart } = useContext(AppContext)
  const [, forceUpdate] = useState()
  const doUpdate = useCallback(() => forceUpdate({}), [])

  useEffect(() => {
    getDbCart(session)
  }, [])

  let total = 0
  let sessionId = null

  if (session) {
    sessionId = JSON.parse(session).id
  }

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
            <div className="flex items-start relative">
              <ArticleOnCartInfos articleId={item.id} />
              <div className="ml-5 w-1/2 absolute right-5 bottom-1">
                <Link href={`/articles/${item.id}`}>
                  <a>
                    <p>Prix : {item.price * item.quantity} €</p>
                  </a>
                </Link>
                <div className="w-full flex items-center justify-center mt-3">
                  <button
                    onClick={() =>
                      changeQuantity(sessionId, item.id, false) + doUpdate()
                    }
                    className="hover-bg-secondary text-primary p-2 rounded-full bg-white transition-all hover:text-white"
                  >
                    <FaMinus />
                  </button>
                  <p className="mx-3">{item.quantity}</p>
                  {item.quantity >= 10 ? (
                    <button
                      className="text-primary p-2 rounded-full bg-white opacity-25 cursor-not-allowed"
                      disabled
                    >
                      <FaPlus />
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        changeQuantity(sessionId, item.id, true) + doUpdate()
                      }
                      className="hover-bg-secondary text-primary p-2 rounded-full bg-white transition-all hover:text-white"
                    >
                      <FaPlus />
                    </button>
                  )}
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
