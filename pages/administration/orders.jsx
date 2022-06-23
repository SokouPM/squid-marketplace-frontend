import Layout from "../../src/components/Layout"
import OrdersList from "../../src/components/body/admin/OrdersList"
const OrdersAdminPage = () => {
  return (
    <Layout
      page="Administration / Sous-catégories"
      fullwidth={1}
      diplayadminheader={1}
      diplayfooter={1}
    >
      <h2 className="my-5 text-3xl text-center font-bold">
        Liste des factures
      </h2>
      <OrdersList />
    </Layout>
  )
}

OrdersAdminPage.private = true
OrdersAdminPage.administration = true

export default OrdersAdminPage
