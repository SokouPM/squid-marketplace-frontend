import Link from "next/link"
import Image from "next/image"
import NavSideBar from "./header/NavSideBar"
import { MdAccountCircle } from "react-icons/md"
import { RiShoppingCartLine } from "react-icons/ri"
import SearchBar from "./header/SearchBar"
import styles from "/styles/components/header.module.css"

const Header = () => {
  return (
    <header className={styles.header}>
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
        <Link href="/connexion">
          <a className={styles.connectButton}>
            <MdAccountCircle /> <p>Se connecter</p>
          </a>
        </Link>

        <div className={styles.chart}>
          <RiShoppingCartLine />
          <div className={styles.chartCount}>0</div>
        </div>
      </div>
    </header>
  )
}

export default Header
