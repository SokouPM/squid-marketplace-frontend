import Link from "next/link"
import { useContext, useEffect, useState } from "react"
import { FiAlertTriangle } from "react-icons/fi"
import { GiGiantSquid } from "react-icons/gi"
import CircularProgress from "@mui/material/CircularProgress"
import AppContext from "../../AppContext"
import AccountForm from "../AccountForm"

const CartDeliveryAddress = () => {
  const { session, router } = useContext(AppContext)
  const [user, setUser] = useState(null)

  let accountId = null

  if (session) {
    accountId = JSON.parse(session).id
  }

  useEffect(() => {
    if (session) {
      setUser(JSON.parse(session))
    }
  }, [session])

  if (!accountId) {
    return (
      <div className="flex items-center justify-center text-center mt-20 text-xl">
        <GiGiantSquid className="text-8xl text-secondary" />
        <div>
          <p>Vous n'êtes pas connecté</p>
          <Link href={`/signin?redirect=${encodeURIComponent(router.asPath)}`}>
            <a className="font-bold text-secondary hover:underline">
              Cliquez ici pour vous connecter
            </a>
          </Link>
        </div>
      </div>
    )
  }

  if (isNaN(accountId)) {
    return (
      <section>
        <div className="w-full mb-7 py-2 bg-red-200 flex items-center justify-center text-red-600 text-center font-bold text-2xl rounded">
          <FiAlertTriangle className="text-5xl mr-3" /> L'identifiant de
          l'utilisateur est invalide
        </div>
      </section>
    )
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center">
        <CircularProgress
          sx={{
            color: "#cc0023",
          }}
        />
        <p className="ml-3">Chargement...</p>
      </div>
    )
  }

  if (
    !user.civility ||
    !user.name ||
    !user.firstName ||
    !user.address ||
    !user.postalCode ||
    !user.city
  ) {
    return <AccountForm user={user} />
  }

  return (
    <div className="border rounded text-center w-1/3 m-auto p-5">
      <div className="mb-10 text-3xl font-bold">
        <p className="mb-2">
          {user.civility} {user.firstName} {user.name}
        </p>
        <p className="mb-2">{user.address}</p>
        <p className="mb-2">
          {user.postalCode}, {user.city}
        </p>
      </div>
      <Link href="/cart/payment">
        <a className="bg-secondary hover-text-primary hover-bg-tertiary px-10 py-2 rounded-full text-white transition-all">
          Confirmer et payer
        </a>
      </Link>
    </div>
  )
}

export default CartDeliveryAddress
