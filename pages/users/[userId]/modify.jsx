import { useRouter } from "next/router"
import React from "react"
import CircularProgress from "@mui/material/CircularProgress"
import Layout from "../../../src/components/Layout"
import user from "../../../src/datas/user.json"
import AccountNav from "../../../src/components/body/AccountNav"
import AccountForm from "../../../src/components/body/AccountForm"

const UserInformationsPage = () => {
  const {
    query: { userId },
  } = useRouter()

  return (
    <Layout
      page="Mes informations"
      diplayheader={1}
      diplaybreadcrumbs={1}
      diplayfooter={1}
    >
      <AccountNav userId={userId} />
      <h2 className="text-center text-3xl mb-5 font-bold">
        Modifier mes informations
      </h2>
      {user && userId ? (
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
    </Layout>
  )
}

export default UserInformationsPage
