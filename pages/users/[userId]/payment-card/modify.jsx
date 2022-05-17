import { useRouter } from "next/router"
import React from "react"
import CircularProgress from "@mui/material/CircularProgress"
import Layout from "../../../../src/components/Layout"
import AccountNav from "../../../../src/components/body/AccountNav"
import CreditCardForm from "../../../../src/components/body/CreditCardForm"

const UserInformationsPage = () => {
  const {
    query: { userId },
  } = useRouter()

  return (
    <Layout
      page="Modifier ma carte de paiement"
      diplayheader={1}
      diplaybreadcrumbs={1}
      diplayfooter={1}
    >
      <AccountNav userId={userId} selected={2} />
      <h2 className="text-center text-3xl mb-5 font-bold">
        Changer ma carte de paiement
      </h2>
      {userId ? (
        <CreditCardForm selected={2} />
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
