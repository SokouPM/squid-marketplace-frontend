import React, { useState } from "react"
import Link from "next/link"
import { GiHamburgerMenu } from "react-icons/gi"
import { CgClose } from "react-icons/cg"
import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"
import NavCategoriesList from "./NavCategoryList"

const NavSideBar = () => {
  const [state, setState] = useState({
    left: false,
  }) // side of the sidebar

  const toggleDrawer = (anchor, open) => () => {
    setState({ ...state, [anchor]: open })
  }

  const list = (anchor) => (
    <Box
      className="bg-primary h-screen flex flex-col text-white"
      sx={{ width: 250 }}
      onClick={toggleDrawer(anchor, false)}
    >
      <div className="flex items-center pt-2 mb-2">
        <button
          className="hover-bg-secondary transition-all p-2 text-2xl rounded-full ml-4 mr-2"
          onClick={toggleDrawer(anchor, false)}
        >
          <CgClose />
        </button>
        <p className="font-bold underline">Catégories :</p>
      </div>
      <Link href={"/articles"}>
        <a className="hover-text-secondary transition-all pl-4 py-1 hover:pl-6 hover:bg-black/30">
          Tous les articles
        </a>
      </Link>
      <NavCategoriesList />
    </Box>
  )

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <button
            className="hover-bg-secondary p-2 text-2xl rounded-full mr-4 transition-all"
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
