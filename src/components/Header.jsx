import Image from "next/image";
import Link from "next/link";
import NavSideBar from "./header/NavSideBar";
import { AiFillCaretDown } from "react-icons/ai";
import { GiSquidHead } from "react-icons/gi";
import styles from "/styles/components/header.module.css";
import SearchBar from "./header/SearchBar";

const Header = () => {
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

      <SearchBar />

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
