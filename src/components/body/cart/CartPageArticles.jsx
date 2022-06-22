/* eslint-disable @next/next/no-img-element */
import Link from "next/link"
import CircularProgress from "@mui/material/CircularProgress"
import { GiGiantSquid } from "react-icons/gi"
import CartPageArticleInfo from "./CartPageArticleInfo"

const getTotalPrice = (cart, total) => {
  cart.map((item) => {
    total += item.price * item.quantity
  })

  return total
}

const CartPageArticles = () => {
  let cart = []
  let total = 0

  if (typeof window !== "undefined") {
    cart = JSON.parse(localStorage.getItem("cart"))
  }

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
    <div className="mb-10">
      <div className="w-full flex items-start">
        <div className="flex flex-col w-5/6">
          {cart.map((item, index) => (
            <Link key={index} href={`/articles/${item.id}`}>
              <a className="mb-3 transition-all p-2 border rounded cursor-pointer hover:bg-slate-100">
                <CartPageArticleInfo
                  articleId={item.id}
                  price={item.price}
                  quantity={item.quantity}
                />
              </a>
            </Link>
          ))}
        </div>
        <div className="border rounded p-5 ml-10 w-2/6">
          <p className="font-bold text-3xl">
            Total : {getTotalPrice(cart, total)} €
          </p>
        </div>
      </div>
      <Link href="/cart/delivery-address">
        <a className="w-1/4 mt-5 bg-secondary hover-text-primary hover-bg-tertiary px-10 py-2 rounded-full text-white text-center transition-all">
          Valider er payer
        </a>
      </Link>
    </div>
  )
}

export default CartPageArticles
