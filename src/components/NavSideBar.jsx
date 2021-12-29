import * as React from "react";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import datas from "../datas/categories.json";
import styles from "../../styles/components/Header.module.css";

const NavSideBar = () => {
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => () => {
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      className={styles.sideBar}
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <p>Categories de meubles</p>
      {datas.map((item) => (
        <Link
          key={item.id}
          href={`/${item.name
            .normalize("NFD")
            .replace(/\s+/g, "-")
            .replace(/[\u0300-\u036f]/g, "")}`}
        >
          <a>{item.name}</a>
        </Link>
      ))}
    </Box>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <button
            className={styles.menuIcon}
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
  );
};

export default NavSideBar;
