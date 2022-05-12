import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/router"
import React from "react"
import CircularProgress from "@mui/material/CircularProgress"
import Layout from "../../../src/components/Layout"
import creditCard from "../../../src/datas/creditCard.json"
import AccountNav from "../../../src/components/body/AccountNav"

const formatCardNumber = (number) => {
  const formatNumber = number.toString().replace(/(\d{6})+/g, "")
  let dotString = ""

  for (let i = 1; i <= number.toString().length - 4; i++) {
    dotString += "•"

    if (i % 4 == 0) {
      dotString += " "
    }
  }

  return `${dotString} ${formatNumber}`
}

const formatCardExpirationDate = (date) => {
  let formatDate = new Date(date).toLocaleDateString("fr")
  formatDate = formatDate.substring(3)

  return formatDate
}

const UserInformationsPage = () => {
  const {
    query: { userId },
  } = useRouter()

  return (
    <Layout
      page="Ma carte de paiement"
      diplayheader={1}
      diplaybreadcrumbs={1}
      diplayfooter={1}
    >
      <AccountNav userId={userId} />
      <h2 className="text-center text-3xl mb-5 font-bold">
        Ma carte de paiement
      </h2>
      {creditCard && userId ? (
        <div className="flex flex-col items-center justify-center">
          <div className="w-3/4 mx-auto flex items-center justify-evenly text-2xl p-5 border rounded mb-5">
            <div>
              <Image
                src="/cardBank.png"
                alt="Credit Card"
                width={378}
                height={268}
              ></Image>
            </div>
            <div>
              <p className="mb-3">
                <span className="font-bold">Nom sur la carte :</span>{" "}
                {creditCard.firstName} {creditCard.lastName}
              </p>
              <p className="mb-3">
                <span className="font-bold">N° de la carte :</span>{" "}
                {formatCardNumber(creditCard.number)}
              </p>
              <p className="mb-3">
                <span className="font-bold">Date d'expiration :</span>{" "}
                {formatCardExpirationDate(creditCard.expirationDate)}
              </p>
            </div>
          </div>
          <Link href={`/users/${userId}/payment-card/modify`}>
            <a className="bg-secondary hover-text-primary hover-bg-tertiary px-10 py-2 rounded-full text-white transition-all">
              Modifier ma carte
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
