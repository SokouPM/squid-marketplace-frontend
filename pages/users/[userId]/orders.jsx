import { useRouter } from "next/router"
import Link from "next/link"
import { useState, useEffect, useContext } from "react"
import CircularProgress from "@mui/material/CircularProgress"
import { FiAlertTriangle } from "react-icons/fi"
import Layout from "../../../src/components/Layout"
import AccountNav from "../../../src/components/body/AccountNav"
import orders from "../../../src/datas/orders"
import api from "../../../src/components/services/api"
import AppContext from "../../../src/components/AppContext"

const UserOrdersPage = () => {
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
        .catch(() => setApiError("Erreur de chargement"))
    }
  }, [userId])

  if (userId && accountId && userId != accountId) {
    router.push(`/users/${accountId}/orders`)

    return null
  }

  return (
    <Layout
      page="Mes commandes"
      diplayheader={1}
      diplaybreadcrumbs={1}
      diplayfooter={1}
    >
      <AccountNav
        userId={userId}
        userIsAdmin={user && user.admin}
        selected={2}
      />
      <h2 className="text-center text-3xl mb-5 font-bold">Mes commandes</h2>
      {apiError ? (
        <div className="w-full flex items-center justify-center mt-10 p-5 bg-red-200 rounded">
          <p className="text-3xl font-bold flex items-center justify-center text-red-600">
            <FiAlertTriangle className="text-5xl mr-3" />
            {apiError}
          </p>
        </div>
      ) : (
        <div>
          {orders && userId ? (
            <table className="w-2/3 mx-auto">
              <thead className="border">
                <tr>
                  <th className="border-x">N° de la commande</th>
                  <th className="border-x">Etat / date de livraison</th>
                  <th className="border-x">Prix total</th>
                  <th className="border-x"></th>
                </tr>
              </thead>
              <tbody className="border">
                {orders.map(
                  (item, index) =>
                    index < 5 && (
                      <tr
                        key={index}
                        className={`font-bold ${
                          index % 2 ? "bg-gray-100" : "bg-white"
                        }`}
                      >
                        <td className="border-x text-center font-normal w-1/3">
                          smp.{item.id}
                        </td>
                        <td className="border-x text-center font-normal w-1/3">
                          {item.deliveryStatus === "Livré" ? (
                            <p>
                              Livré le{" "}
                              {new Date(item.deliveryDate).toLocaleDateString()}
                            </p>
                          ) : (
                            <p>{item.deliveryStatus}</p>
                          )}
                        </td>
                        <td className="border-x text-center font-normal w-1/3">
                          {item.price} €
                        </td>
                        <td className="border-x text-center font-normal py-2">
                          <Link href={`/users/${userId}/orders/${item.id}`}>
                            <a className="py-2 px-6 w-max rounded-full bg-secondary text-white whitespace-nowrap transition-all hover-text-primary hover-bg-tertiary">
                              Voir le détail {">>>"}
                            </a>
                          </Link>
                        </td>
                      </tr>
                    )
                )}
              </tbody>
            </table>
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

UserOrdersPage.private = true

export default UserOrdersPage
