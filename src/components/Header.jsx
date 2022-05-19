import Link from "next/link"
import Image from "next/image"
import NavSideBar from "./header/NavSideBar"
import { MdAccountCircle } from "react-icons/md"
import SearchBar from "./header/SearchBar"
import CartBar from "./header/CartBar"

const Header = () => {
  return (
    <header className="bg-primary flex items-center justify-between px-4">
      <div className="flex items-center text-white">
        <NavSideBar />
        <Link href="/">
          <a className="flex items-center justify-center">
            <Image src="/logo.png" alt="logo" width={60} height={50} />
            <h1>Squid MarketPlace</h1>
          </a>
        </Link>
      </div>

      <SearchBar />

      <div className="flex items-center justify-center">
        <Link href="/signin">
          <a className="hover-bg-secondary text-primary py-1 pr-2 pl-1 flex items-center justify-center bg-white rounded-full transition-all hover:text-white">
            <MdAccountCircle className="mr-1 text-2xl" /> <p>Se connecter</p>
          </a>
        </Link>

        <CartBar />
      </div>
    </header>
  )
}

export default Header
