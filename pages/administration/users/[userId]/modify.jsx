import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import CircularProgress from "@mui/material/CircularProgress"
import AppContext from "../../../../src/components/AppContext"
import Layout from "../../../../src/components/Layout"
import UserForm from "../../../../src/components/body/admin/UserForm"

const ModifyUserPage = () => {
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

  if (user && user.admin && user.id !== accountId) {
    router.back()
  }

  return (
    <Layout
      page="Administration / Modifier un utilisateur"
      fullwidth={1}
      diplayadminheader={1}
      diplayfooter={1}
    >
      {userId ? (
        <>
          <h2 className="my-5 text-3xl text-center font-bold">
            Modifier l'utilisateur "{userId}"
          </h2>
          {apiError && <p>{apiError}</p>}
          {user ? (
            <UserForm user={user} />
          ) : (
            <div className="flex items-center justify-center mt-20">
              <CircularProgress
                sx={{
                  color: "#cc0023"
                }}
              />
              <p className="ml-3">Chargement du formulaire...</p>
            </div>
          )}
        </>
      ) : (
        <div className="flex items-center justify-center mt-20">
          <CircularProgress
            sx={{
              color: "#cc0023"
            }}
          />
          <p className="ml-3">Chargement du formulaire...</p>
        </div>
      )}
    </Layout>
  )
}

ModifyUserPage.private = true
ModifyUserPage.administration = true

export default ModifyUserPage
