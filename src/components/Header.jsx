import Image from "next/image";
import Link from "next/link";
import NavSideBar from "./NavSideBar";
import { AiFillCaretDown } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { GiSquidHead } from "react-icons/gi";
import styles from "../../styles/components/Header.module.css";

const Header = () => {
  let isVisible = false;

  return (
    <header>
      <div className={styles.headerContent}>
        <NavSideBar />

        <Link href="/">
          <a className={styles.logo}>
            <Image src="/logo.png" alt="logo" width={60} height={50} />
            <h1>Squid MarketPlace</h1>
          </a>
        </Link>
      </div>

      <form className={styles.searchBar}>
        <input type="text"></input>
        <button>
          <FaSearch />
        </button>
      </form>

      <div className={styles.headerContent}>
        <a className={styles.connectButton}>
          <GiSquidHead /> Se connecter
        </a>

        <div className={styles.chart}>
          <p>Panier</p> <div className={styles.chartCount}>0</div>
          <AiFillCaretDown />
        </div>
      </div>
    </header>
  );
};

export default Header;
