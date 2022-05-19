import React, { useState } from "react"
// import Link from "next/link"
import { RiShoppingCartLine } from "react-icons/ri"
import { CgClose } from "react-icons/cg"
import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"
import ArticlesOnCart from "./ArticlesOnCart"

const ChartBar = () => {
  const [state, setState] = useState({
    right: false,
  })

  const toggleDrawer = (anchor, open) => () => {
    setState({ ...state, [anchor]: open })
  }

  const list = (anchor) => (
    <Box
      className="bg-primary h-screen overflow-auto flex flex-col text-white"
      sx={{ width: 550 }}
      // onClick={toggleDrawer(anchor, false)}
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
      <ArticlesOnCart />
      <button className="w-2/3 mt-5 mx-auto bg-secondary hover-text-primary hover-bg-tertiary px-10 py-2 rounded-full text-white transition-all">
        Commander
      </button>
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
              0
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
