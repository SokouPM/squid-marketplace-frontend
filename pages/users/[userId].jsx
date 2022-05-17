import { useRouter } from "next/router"
import Link from "next/link"
import React from "react"
import CircularProgress from "@mui/material/CircularProgress"
import Layout from "../../src/components/Layout"
import user from "../../src/datas/user.json"
import AccountNav from "../../src/components/body/AccountNav"

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
      <AccountNav userId={userId} selected={1} />
      <h2 className="text-center text-3xl mb-5 font-bold">Mes informations</h2>
      {user && userId ? (
        <div className="flex flex-col items-center justify-center">
          <div className="border rounded w-3/4 mx-auto p-5 mb-10 text-2xl">
            <p className="mb-5">
              {user.civility} {user.firstName} {user.lastName}
            </p>
            <p className="mb-5">{user.email}</p>
            <p className="mb-5">{user.address}</p>
            <p>
              {user.postalCode}, {user.city}
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
    </Layout>
  )
}

export default UserInformationsPage
