import { useRouter } from "next/router"
import Link from "next/link"
import { useContext, useEffect, useState } from "react"
import CircularProgress from "@mui/material/CircularProgress"
import Layout from "../../src/components/Layout"
import AccountNav from "../../src/components/body/AccountNav"
import AppContext from "../../src/components/AppContext"

const UserInformationsPage = () => {
  const {
    query: { userId },
  } = useRouter()

  const { session, router } = useContext(AppContext)
  const [user, setUser] = useState(null)

  let accountId = null

  if (session) {
    accountId = JSON.parse(session).id
  }

  useEffect(() => {
    if (session && userId && !isNaN(userId)) {
      setUser(JSON.parse(session))
    }
  }, [userId, session])

  if (userId && accountId && Number(userId) !== accountId) {
    router.push(`/users/${accountId}`)

    return null
  }

  const renderCivility = (civility) => {
    switch (civility) {
      case "male":
        return "M."

      case "female":
        return "Mme."

      case "other":
        return "Mx."

      default:
        return ""
    }
  }

  return (
    <Layout
      page="Mes informations"
      diplayheader={1}
      diplaybreadcrumbs={1}
      diplayfooter={1}
    >
      <AccountNav
        userId={userId}
        userIsAdmin={user && user.isAdmin}
        selected={1}
      />
      <h2 className="text-center text-3xl mb-5 font-bold">Mes informations</h2>
      <div>
        {user ? (
          <div className="flex flex-col items-center justify-center">
            <div className="border rounded w-3/4 mx-auto p-5 mb-10 text-2xl">
              <p className="mb-5">
                {renderCivility(user.civility)}{" "}
                {user.firstname || "Pas de prénom"}{" "}
                {user.lastname || "Pas de nom"}
              </p>
              <p className="mb-5">{user.mail}</p>
              <p className="mb-5">{user.address || "Pas d'adresse"}</p>
              <p>
                {user.postalCode || "Pas de code postal"},{" "}
                {user.city || "Pas de ville"}
              </p>
            </div>

            <Link href={`/users/${userId}/modify`}>
              <a className="bg-secondary hover-text-primary hover-bg-tertiary px-10 py-2 rounded-full text-white transition-all">
                Modifier mes informations
              </a>
            </Link>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <CircularProgress
              sx={{
                color: "#cc0023",
              }}
            />
            <p className="ml-3">Chargement des informations...</p>
          </div>
        )}
      </div>
    </Layout>
  )
}

UserInformationsPage.private = true

export default UserInformationsPage
