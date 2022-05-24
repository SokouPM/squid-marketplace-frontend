import Link from "next/link"
import { useContext } from "react"
import Image from "next/image"
import NavSideBar from "./header/NavSideBar"
import { MdAccountCircle } from "react-icons/md"
import { RiLogoutBoxFill } from "react-icons/ri"
import SearchBar from "./header/SearchBar"
import CartBar from "./header/CartBar"
import AppContext from "../components/AppContext"

const Header = () => {
  const { session, signOut } = useContext(AppContext)

  let user = null

  if (session) {
    user = JSON.parse(session)
  }

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
        {user ? (
          <div className="flex items-center justify-center">
            <button
              className="mr-1 text-2xl hover-bg-secondary text-primary py-1 pr-2 pl-1 flex items-center justify-center bg-white rounded-full transition-all hover:text-white"
              onClick={signOut}
            >
              <RiLogoutBoxFill />
            </button>
            <Link href={`/users/${user.id}/orders`}>
              <a className="hover-bg-secondary text-primary py-1 pr-2 pl-1 flex items-center justify-center bg-white rounded-full transition-all hover:text-white">
                <MdAccountCircle className="mr-1 text-2xl" />
                <p>{user.email}</p>
              </a>
            </Link>
          </div>
        ) : (
          <Link href="/signin">
            <a className="hover-bg-secondary text-primary py-1 pr-2 pl-1 flex items-center justify-center bg-white rounded-full transition-all hover:text-white">
              <MdAccountCircle className="mr-1 text-2xl" /> <p>Se connecter</p>
            </a>
          </Link>
        )}

        <CartBar />
      </div>
    </header>
  )
}

export default Header
