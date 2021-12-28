import Image from "next/image";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
// import { ImCross } from "react-icons/im";
import { AiFillCaretDown } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { IoPersonCircleSharp } from "react-icons/io5";
import styles from "../../styles/components/Header.module.css";

const Header = () => {
  return (
    <header>
      <div className={styles.headerContent}>
        <div className={styles.menuIcon}>
          <GiHamburgerMenu />
        </div>

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
          <IoPersonCircleSharp /> Se connecter
        </a>

        <div className={styles.chart}>
          <p>Panier</p> <div className={styles.chartCount}>0</div>
          {/* <i className="fas fa-caret-down"></i> */}
          <AiFillCaretDown />
        </div>
      </div>
    </header>
  );
};

export default Header;
