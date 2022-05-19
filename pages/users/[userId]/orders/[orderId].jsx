import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import CircularProgress from "@mui/material/CircularProgress"
import Layout from "../../../../src/components/Layout"
import AccountNav from "../../../../src/components/body/AccountNav"
import order from "../../../../src/datas/order"

const OrderDetailPage = () => {
  const {
    query: { userId, orderId },
  } = useRouter()

  return (
    <Layout
      page="Détail de commande"
      diplayheader={1}
      diplaybreadcrumbs={1}
      diplayfooter={1}
    >
      <AccountNav userId={userId} selected={3} />
      <h2 className="text-center text-3xl mb-5 font-bold">
        Détails de la commande smp.{orderId}
      </h2>
      {order && userId ? (
        <section className="border rounded w-3/4 p-5 mx-auto mb-5">
          <div className="mb-3 flex items-center justify-between text-3xl">
            {order.deliveryStatus === "Livré" ? (
              <p className="font-bold">
                Livré le {new Date(order.deliveryDate).toLocaleDateString()}
              </p>
            ) : (
              <p className="font-bold">{order.deliveryStatus}</p>
            )}
            <p>{order.totalPrice} €</p>
          </div>
          <div className="mb-3 text-xl">
            <p className="text-2xl font-bold">Adresse de facturation</p>
            <p>
              {order.firstName} {order.lastName}
            </p>
            <p>{order.address}</p>
            <p>
              {order.postalCode} {order.city}
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
              {order.articles.map((item, index) => (
                <tr
                  key={index}
                  className={`font-bold border ${
                    index % 2 ? "bg-gray-100" : "bg-white"
                  }`}
                >
                  <td className="border-x text-center font-normal flex">
                    <Image
                      src={item.images[0]}
                      alt="squid market place article"
                      width={500 / 1.5}
                      height={300 / 1.5}
                    />
                  </td>
                  <td className="border-x text-center font-normal">
                    {item.name}
                  </td>
                  <td className="border-x text-center font-normal">
                    {item.quantity}
                  </td>
                  <td className="border-x text-center font-normal">
                    {item.price}
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
    </Layout>
  )
}

export default OrderDetailPage
