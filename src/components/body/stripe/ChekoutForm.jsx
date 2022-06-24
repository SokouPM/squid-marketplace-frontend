import { useEffect, useState, useContext } from "react"
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"
import AppContext from "../../AppContext"
import api from "../../services/api"

const CheckoutForm = () => {
  const stripe = useStripe()
  const elements = useElements()

  const { session, router } = useContext(AppContext)
  const [message, setMessage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  let accountId = null

  if (session) {
    accountId = JSON.parse(session).id
  }

  useEffect(() => {
    if (!stripe) {
      return
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    )

    if (!clientSecret) {
      return
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!")

          if (accountId) {
            api.post(`/confirmOrder?idCustomer=${accountId}`)
          }

          router.push("/cart/order-confirmation")

          break

        case "processing":
          setMessage("Your payment is processing.")

          break

        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.")

          break

        default:
          setMessage("Something went wrong.")

          break
      }
    })
  }, [accountId, router, stripe])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return
    }

    setIsLoading(true)

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url:
          "https://squid-marketplace-frontend.vercel.app/cart/payment",
      },
    })

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message)
    } else {
      setMessage("An unexpected error occurred.")
    }

    setIsLoading(false)
  }

  return (
    <form
      id="payment-form"
      onSubmit={handleSubmit}
      className="w-2/3 mx-auto border rounded p-5"
    >
      <PaymentElement id="payment-element" />
      <div className="w-full flex items-center justify-center">
        <button
          disabled={isLoading || !stripe || !elements}
          id="submit"
          className="mx-auto mt-5 bg-secondary hover-bg-tertiary hover-text-primary px-10 py-1 rounded-full text-white transition-all"
        >
          <span id="button-text">
            {isLoading ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              "Confirmer le paiement"
            )}
          </span>
        </button>
      </div>
      {/* Show any error or success messages */}
      {message && (
        <div id="payment-message" className="text-center">
          {message}
        </div>
      )}
    </form>
  )
}

export default CheckoutForm
