import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import CircularProgress from "@mui/material/CircularProgress"
import { FiAlertTriangle } from "react-icons/fi"
import Layout from "../../../src/components/Layout"
import AccountNav from "../../../src/components/body/AccountNav"
import AccountForm from "../../../src/components/body/AccountForm"
import AppContext from "../../../src/components/AppContext"

const UserInformationsPage = () => {
  const {
    query: { userId }
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
      // TODO
    }
  }, [userId])

  if (userId && accountId && userId != accountId) {
    router.push(`/users/${accountId}/modify`)

    return null
  }

  return (
    <Layout
      page="Modifier mes informations"
      diplayheader={1}
      diplaybreadcrumbs={1}
      diplayfooter={1}
    >
      <AccountNav
        userId={userId}
        userIsAdmin={user && user.admin}
        selected={1}
      />
      <h2 className="text-center text-3xl mb-5 font-bold">
        Modifier mes informations
      </h2>
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
            <AccountForm user={user} />
          ) : (
            <div className="flex items-center justify-center">
              <CircularProgress
                sx={{
                  color: "#cc0023"
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

UserInformationsPage.private = true

export default UserInformationsPage
