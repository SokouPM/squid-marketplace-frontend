import React, { useState, useContext, useEffect } from "react"
import { RiShoppingCartLine } from "react-icons/ri"
import { CgClose } from "react-icons/cg"
import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"
import AppContext from "../AppContext"
import CartArticlesList from "./CartArticlesList"

const ChartBar = () => {
  const { cartTotalArticle, setCartTotalArticle } = useContext(AppContext)
  const [state, setState] = useState({
    right: false,
  })

  const toggleDrawer = (anchor, open) => () => {
    setState({ ...state, [anchor]: open })
  }

  useEffect(() => {
    let cart = []

    if (typeof window !== "undefined") {
      if (!localStorage.getItem("cart")) {
        localStorage.setItem("cart", JSON.stringify([]))
      }

      cart = JSON.parse(localStorage.getItem("cart"))
    }

    const totalQuantity = cart.reduce(
      (previousValue, currentValue) => previousValue + currentValue.quantity,
      0
    )

    setCartTotalArticle(totalQuantity)
  })

  const list = (anchor) => (
    <Box
      className="bg-primary h-screen overflow-auto flex flex-col text-white"
      sx={{ width: 550 }}
    >
      <div className="flex items-center justify-between pt-3 mb-2">
        <p className="font-bold underline ml-12">Votre panier :</p>
        <button
          className="hover-bg-secondary transition-all p-2 text-2xl rounded-full ml-2 mr-5"
          onClick={toggleDrawer(anchor, false)}
        >
          <CgClose />
        </button>
      </div>
      <CartArticlesList />
    </Box>
  )

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <button
            className="hover-bg-secondary text-primary p-2 ml-5 rounded-full bg-white relative transition-all hover:text-white"
            onClick={toggleDrawer(anchor, true)}
          >
            <RiShoppingCartLine className="text-2xl" />
            <div className="bg-secondary h-5 w-5 text-white flex items-center justify-center rounded-full absolute -top-2 -right-1">
              {cartTotalArticle}
            </div>
          </button>

          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  )
}

export default ChartBar
