import Layout from "../src/components/Layout"
import CartNav from "../src/components/body/cart/CartNav"
import CartPageArticles from "../src/components/body/cart/CartPageArticles"

const CartPage = () => {
  return (
    <Layout
      page="Panier"
      diplayheader={1}
      diplaybreadcrumbs={1}
      diplayfooter={1}
    >
      <CartNav cartStepNb={1} />
      <h2 className="text-center text-2xl my-5">Votre panier</h2>
      <CartPageArticles />
    </Layout>
  )
}

export default CartPage
