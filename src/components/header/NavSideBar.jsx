import React, { useState } from "react"
import Link from "next/link"
import { GiHamburgerMenu } from "react-icons/gi"
import { CgClose } from "react-icons/cg"
import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"
import datas from "/src/datas/categories.json"

const NavSideBar = () => {
  const [state, setState] = useState({
    left: false,
  })

  const toggleDrawer = (anchor, open) => () => {
    setState({ ...state, [anchor]: open })
  }

  const list = (anchor) => (
    <Box
      className="sideBar h-screen flex flex-col text-white"
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className="flex items-center pt-2 mb-2">
        <button
          className="closeMenuIcon transition-all p-2 text-2xl rounded-full ml-4 mr-2"
          onClick={toggleDrawer(anchor, false)}
        >
          <CgClose />
        </button>
        <p className="font-bold underline">Catégories :</p>
      </div>
      <Link href={"/articles"}>
        <a className="transition-all pl-4 py-1 hover:pl-6">Tous les articles</a>
      </Link>
      {datas.map((item) => (
        <Link key={item.id} href={`/categories/${item.id}`}>
          <a className="transition-all pl-4 py-1 hover:pl-6">{item.name}</a>
        </Link>
      ))}
    </Box>
  )

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <button
            className="menuIcon p-2 text-2xl rounded-full mr-4 transition-all"
            onClick={toggleDrawer(anchor, true)}
          >
            <GiHamburgerMenu />
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

export default NavSideBar
