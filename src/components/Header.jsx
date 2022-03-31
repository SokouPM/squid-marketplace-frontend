import Link from "next/link"
import Image from "next/image"
import NavSideBar from "./header/NavSideBar"
import { MdAccountCircle } from "react-icons/md"
import { RiShoppingCartLine } from "react-icons/ri"
import SearchBar from "./header/SearchBar"

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

        <div className="hover-bg-secondary text-primary p-2 ml-5 rounded-full bg-white relative transition-all hover:text-white">
          <RiShoppingCartLine className="text-2xl" />
          <div className="bg-secondary h-5 w-5 text-white flex items-center justify-center rounded-full absolute -top-2 -right-1">
            0
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
