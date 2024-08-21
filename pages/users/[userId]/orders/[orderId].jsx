/* eslint-disable @next/next/no-img-element */
// TODO

import Link from "next/link"
import { useContext, useEffect, useState } from "react"
import { useRouter } from "next/router"
import CircularProgress from "@mui/material/CircularProgress"
import { FiAlertTriangle } from "react-icons/fi"
import Layout from "../../../../src/components/Layout"
import AccountNav from "../../../../src/components/body/AccountNav"
import AppContext from "../../../../src/components/AppContext"
import { supabase } from "../../../../src/utils/supabase"

const OrderDetailPage = () => {
  const {
    query: { userId, orderId },
  } = useRouter()

  const { session, router } = useContext(AppContext)
  const [user, setUser] = useState(null)
  const [apiError, setApiError] = useState(null)
  const [order, setOrder] = useState(null)

  let accountId = null

  if (session) {
    accountId = JSON.parse(session).id
  }

  useEffect(() => {
    if (session && userId && !isNaN(userId)) {
      setUser(JSON.parse(session))
    }
  }, [userId, session])

  useEffect(() => {
    const getOrderById = async () => {
      const { data, error } = await supabase
        .from("order")
        .select(
          `cart,
          totalPrice:total_price,
          deliveryDate:delivery_date,
          shipmentStatus:shipment_status,
          customerFirstname:customer_firstname,
          customerLastname:customer_lastname,
          customerAddress:customer_address,
          customerPostalCode:customer_postal_code,
          customerCity:customer_city,`
        )
        .eq("customer_id", accountId)
        .eq("id", orderId)

      error && setApiError(error.message)
      data && setOrder(data)
    }

    if (orderId && !isNaN(orderId)) {
      getOrderById()
    }
  }, [accountId, orderId, userId])

  if (userId && accountId && Number(userId) !== accountId) {
    router.push(`/users/${accountId}/orders/${orderId}`)

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
      page="Détail de commande"
      diplayheader={1}
      diplaybreadcrumbs={1}
      diplayfooter={1}
    >
      <AccountNav
        userId={userId}
        userIsAdmin={user && user.isAdmin}
        selected={2}
      />
      <h2 className="text-center text-3xl mb-5 font-bold">
        Détails de la commande smp.{orderId}
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
          {order && userId ? (
            <section className="border rounded w-3/4 p-5 mx-auto mb-5">
              <div className="mb-3 flex items-center justify-between text-3xl">
                {order.shipmentStatus === "Livré" ? (
                  <p className="font-bold">
                    Livré le {new Date(order.deliveryDate).toLocaleDateString()}
                  </p>
                ) : (
                  <p className="font-bold">{order.shipmentStatus}</p>
                )}
                <p>{order.totalPrice} €</p>
              </div>
              <div className="mb-3 text-xl">
                <p className="text-2xl font-bold">Adresse de facturation</p>
                <p>
                  {renderCivility(user.civility)} {order.firstname}{" "}
                  {order.lastname}
                </p>
                <p>
                  {order.customerAddress} {order.customerPostalCode},{" "}
                  {order.customerCity}
                </p>
              </div>
              <div className="mb-2 flex items-end justify-between">
                <p className="font-bold text-2xl">Détail de votre commande</p>
                <Link href={`/users/${userId}/orders/${order.id}/download`}>
                  <a className="py-2 px-6 w-max rounded-full bg-secondary text-white whitespace-nowrap transition-all hover-text-primary hover-bg-tertiary">
                    Télécharger la facture
                  </a>
                </Link>
              </div>
              <table className="w-full mx-auto">
                <thead>
                  <tr>
                    <th className="w-2/6 border"></th>
                    <th className="w-2/6 border">Nom</th>
                    <th className="w-1/6 border">Quantité</th>
                    <th className="w-1/6 border">Prix</th>
                  </tr>
                </thead>
                <tbody>
                  {order.cart.map((item, index) => (
                    <tr
                      key={index}
                      className={`font-bold border ${
                        index % 2 ? "bg-gray-100" : "bg-white"
                      }`}
                    >
                      <td className="border-x text-center font-normal flex">
                        <img
                          src={item.imagePresArticle}
                          alt="squid market place article"
                          height="200"
                        />
                      </td>
                      <td className="border-x text-center font-normal">
                        {item.nameArticle}
                      </td>
                      <td className="border-x text-center font-normal">
                        {item.quantity}
                      </td>
                      <td className="border-x text-center font-normal">
                        {item.priceWhenBuying}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
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

OrderDetailPage.private = true

export default OrderDetailPage
