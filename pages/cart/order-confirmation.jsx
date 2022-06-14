import Link from "next/link"
import { GiSquid } from "react-icons/gi"
import Layout from "../../src/components/Layout"
import CartNav from "../../src/components/body/cart/CartNav"

const orderConfirmationPage = () => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify([]))
  }

  return (
    <Layout
      page="Confirmation de commande"
      diplayheader={1}
      diplaybreadcrumbs={1}
      diplayfooter={1}
    >
      <CartNav cartStepNb={4} />
      <div className="mt-20 mb-5 flex flex-col items-center justify-center">
        <div className="flex items-center justify-center mb-2">
          <GiSquid className="text-secondary text-4xl mr-2" />
          <h2 className="font-bold text-3xl">Confirmation de votre commande</h2>
        </div>
        <Link href="/">
          <a className="font-bold text-2xl text-secondary hover:underline">
            Cliquez ici pour retourner à l'accueil
          </a>
        </Link>
      </div>
    </Layout>
  )
}

export default orderConfirmationPage
