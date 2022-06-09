import Layout from "../../src/components/Layout"
import CartNav from "../../src/components/body/CartNav"

const CartPage = () => {
  return (
    <Layout
      page="Adresse de livraison"
      diplayheader={1}
      diplaybreadcrumbs={1}
      diplayfooter={1}
    >
      <CartNav cartStepNb={2} />
      <h2 className="text-center text-2xl my-5">Adresse de livraison</h2>
    </Layout>
  )
}

export default CartPage
