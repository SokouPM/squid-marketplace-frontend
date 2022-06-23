import { useState, useEffect, useContext } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import Layout from "../../src/components/Layout"
import CartNav from "../../src/components/body/cart/CartNav"
import CheckoutForm from "../../src/components/body/stripe/ChekoutForm"
import AppContext from "../../src/components/AppContext"

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

const PaymentPage = () => {
  const [clientSecret, setClientSecret] = useState("")
  const { session } = useContext(AppContext)

  let accountId = null

  if (session) {
    accountId = JSON.parse(session).id
  }

  useEffect(() => {
    if (accountId) {
      // Create PaymentIntent as soon as the page loads
      fetch(
        `https://test-bash-squid.herokuapp.com/create-payment-intent?idCustomer=${accountId}`,
        {
          // wait back endpoint
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("jwt"),
          },
          // body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
        }
      )
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret))
    }
  }, [accountId])

  const appearance = {
    theme: "stripe",
  }
  const options = {
    clientSecret,
    appearance,
  }

  return (
    <Layout
      page="Paiement"
      diplayheader={1}
      diplaybreadcrumbs={1}
      diplayfooter={1}
    >
      <CartNav cartStepNb={3} />
      <h2 className="text-center text-2xl my-5">Paiement</h2>
      <div>
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        )}
      </div>
    </Layout>
  )
}

PaymentPage.private = true

export default PaymentPage
