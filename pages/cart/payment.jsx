import Layout from "../../src/components/Layout"
import CartNav from "../../src/components/body/cart/CartNav"

const PaymentPage = () => {
  return (
    <Layout
      page="Paiement"
      diplayheader={1}
      diplaybreadcrumbs={1}
      diplayfooter={1}
    >
      <CartNav cartStepNb={3} />
      <h2 className="text-center text-2xl my-5">Paiement</h2>
      <div>Todo stripe</div>
    </Layout>
  )
}

export default PaymentPage
