import Link from "next/link"

const AccountNav = ({ userId }) => {
  return (
    <nav className="flex items-center justify-between w-full">
      <Link href={`/users/${userId}`}>
        <a className="border-r border-primary w-full text-center py-5 my-5 transition-all hover:bg-gray-200">
          Mes informations
        </a>
      </Link>
      <Link href={`/users/${userId}/payment-card`}>
        <a className="border-x border-primary w-full text-center py-5 my-5 transition-all hover:bg-gray-200">
          Ma carte de paiement
        </a>
      </Link>
      <Link href={`/users/${userId}/orders`}>
        <a className="border-x border-primary w-full text-center py-5 my-5 transition-all hover:bg-gray-200">
          Mes commandes
        </a>
      </Link>
      <Link href={`/users/${userId}/change-password`}>
        <a className="border-l border-primary w-full text-center py-5 my-5 transition-all hover:bg-gray-200">
          Modifier mon mot de passe
        </a>
      </Link>
    </nav>
  )
}

export default AccountNav
