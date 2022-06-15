import { useRouter } from "next/router"
import Link from "next/link"
import { useState, useEffect, useContext } from "react"
import CircularProgress from "@mui/material/CircularProgress"
import { FiAlertTriangle } from "react-icons/fi"
import Layout from "../../src/components/Layout"
import api from "../../src/components/services/api"
import AccountNav from "../../src/components/body/AccountNav"
import AppContext from "../../src/components/AppContext"

const UserInformationsPage = () => {
  const {
    query: { userId },
  } = useRouter()

  const { session, router } = useContext(AppContext)
  const [user, setUser] = useState(null)
  const [apiError, setApiError] = useState(null)

  let accountId = null

  if (session) {
    accountId = JSON.parse(session).id
  }

  useEffect(() => {
    if (userId && !isNaN(userId)) {
      api
        .get(`/customer/byId?id=${userId}`)
        .then((response) => setUser(response.data))
        .catch((error) =>
          setApiError(error.response ? error.response.data : error.message)
        )
    }
  }, [userId])

  if (userId && accountId && userId != accountId) {
    router.push(`/users/${accountId}`)

    return null
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
        userIsAdmin={user && user.admin}
        selected={1}
      />
      <h2 className="text-center text-3xl mb-5 font-bold">Mes informations</h2>
      {apiError ? (
        <div className="w-full flex items-center justify-center mt-10 p-5 bg-red-200 rounded">
          <p className="text-3xl font-bold flex items-center justify-center text-red-600">
            <FiAlertTriangle className="text-5xl mr-3" />
            {apiError}
          </p>
        </div>
      ) : (
        <div>
          {user ? (
            <div className="flex flex-col items-center justify-center">
              <div className="border rounded w-3/4 mx-auto p-5 mb-10 text-2xl">
                <p className="mb-5">
                  {user.civility || null} {user.firstName || "Pas de prénom"}{" "}
                  {user.name || "Pas de nom"}
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
      )}
    </Layout>
  )
}

export default UserInformationsPage
