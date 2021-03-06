import Link from "next/link"
import Image from "next/image"
import { useContext } from "react"
import { IoCaretBackOutline } from "react-icons/io5"
import AppContext from "./AppContext"

const AdminHeader = () => {
  const { session } = useContext(AppContext)

  let accountEmail = null

  if (session) {
    accountEmail = JSON.parse(session).email
  }

  return (
    <header className="bg-primary flex items-center justify-between px-4">
      <Link href="/administration">
        <a className="flex items-center justify-center text-white">
          <Image src="/logo.png" alt="logo" width={60} height={50} />
          <h1>
            Squid MarketPlace{" "}
            <span className="text-sm underline">administration</span>
          </h1>
        </a>
      </Link>

      <div className="flex items-center justify-center text-white text-3xl">
        Bienvenue {accountEmail}
      </div>

      <div className="flex items-center justify-center text-white text-xl">
        <Link href="/">
          <a className="flex items-center justify-center border p-2 rounded hover-text-primary hover:bg-white transition-all">
            <IoCaretBackOutline className="mr-2" />
            <p>Retourner sur le site</p>
          </a>
        </Link>
      </div>
    </header>
  )
}

export default AdminHeader
