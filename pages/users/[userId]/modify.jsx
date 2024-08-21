import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import CircularProgress from "@mui/material/CircularProgress"
import Layout from "../../../src/components/Layout"
import AccountNav from "../../../src/components/body/AccountNav"
import AccountForm from "../../../src/components/body/AccountForm"
import AppContext from "../../../src/components/AppContext"

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
        userIsAdmin={user && user.isAdmin}
        selected={1}
      />
      <h2 className="text-center text-3xl mb-5 font-bold">
        Modifier mes informations
      </h2>

      <div>
        {user ? (
          <AccountForm user={user} />
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
