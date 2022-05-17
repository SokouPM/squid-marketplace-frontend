import Link from "next/link"

const AccountNav = ({ userId, selected }) => {
  return (
    <nav className="flex items-center justify-between w-full">
      <Link href={`/users/${userId}`}>
        <a
          className={`border-x border-primary w-full text-center py-5 my-5 transition-all ${
            selected === 1 && "bg-gray-200"
          } hover:bg-gray-200`}
        >
          Mes informations
        </a>
      </Link>
      <Link href={`/users/${userId}/payment-card`}>
        <a
          className={`border-x border-primary w-full text-center py-5 my-5 transition-all ${
            selected === 2 && "bg-gray-200"
          } hover:bg-gray-200`}
        >
          Ma carte de paiement
        </a>
      </Link>
      <Link href={`/users/${userId}/orders`}>
        <a
          className={`border-x border-primary w-full text-center py-5 my-5 transition-all ${
            selected === 3 && "bg-gray-200"
          } hover:bg-gray-200`}
        >
          Mes commandes
        </a>
      </Link>
      <Link href={`/users/${userId}/change-password`}>
        <a
          className={`border-x border-primary w-full text-center py-5 my-5 transition-all ${
            selected === 4 && "bg-gray-200"
          } hover:bg-gray-200`}
        >
          Modifier mon mot de passe
        </a>
      </Link>{" "}
      <Link href={`/administration`}>
        <a className="border-x border-primary w-full text-center py-5 my-5 transition-all hover:bg-gray-200">
          Administration
        </a>
      </Link>
    </nav>
  )
}

export default AccountNav
