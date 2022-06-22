import { createContext, useCallback, useEffect, useState } from "react"
import api from "./services/api"

const AppContext = createContext({})

export const AppContextProvider = (props) => {
  const { pageComponent: Page, router, ...otherProps } = props

  const [session, setSession] = useState()
  const [signInError, setSignInError] = useState(null)
  const [signUpError, setSignUpError] = useState(null)
  const [cartTotalArticle, setCartTotalArticle] = useState(0)

  const initSession = useCallback((jwt) => {
    if (!jwt) {
      setSession(null)

      return
    }

    const [, payload] = jwt.split(".")
    const session = atob(payload)

    setSession(session)
  }, [])

  useEffect(() => {
    const jwt = localStorage.getItem("jwt")

    initSession(jwt)
  }, [initSession])

  useEffect(() => {
    if (session === null && Page.private) {
      router.push(`/signin?redirect=${encodeURIComponent(router.asPath)}`)
    }
  }, [Page.private, router, session])

  useEffect(() => {
    if (session !== null && session !== undefined && Page.noSessionOnly) {
      router.push("/")
    }
  }, [Page.noSessionOnly, Page.private, router, session])

  const signIn = useCallback(
    async (mail, password) => {
      try {
        const { data } = await api.post("auth/connection", { mail, password })
        setSignInError(null)

        const {
          query: { redirect },
        } = router

        if (redirect) {
          router.push(decodeURIComponent(redirect))
        } else {
          router.push("/")
        }

        localStorage.setItem("jwt", data)
        initSession(data)

        const [, payload] = data.split(".")
        const session = atob(payload)

        addLocalCartToDb(session)
        getDbCart(session)
      } catch (err) {
        setSignInError("Email ou mot de passe invalide")
      }
    },
    [initSession, router]
  )

  const signUp = useCallback(
    async (mail, password) => {
      try {
        await api.post("auth/inscription", { mail, password })
        router.push("/signin")
        setSignUpError(null)
      } catch (err) {
        setSignUpError(err.response.data)
      }
    },
    [router]
  )

  const signOut = () => {
    localStorage.removeItem("jwt")
    localStorage.setItem("cart", JSON.stringify([]))
    setSession(null)
    router.push("/signin")
  }

  const addLocalCartToDb = (session) => {
    let cart = []
    const sessionId = JSON.parse(session).id

    if (!localStorage.getItem("cart")) {
      localStorage.setItem("cart", JSON.stringify([]))
    }

    cart = JSON.parse(localStorage.getItem("cart"))

    if (cart.length) {
      cart.map((item) => {
        api.post(
          `/carts/withQuantity?idCustomer=${sessionId}&idArticle=${item.id}&quantity=${item.quantity}`
        )
      })
    }

    localStorage.setItem("cart", JSON.stringify([]))
  }

  const getDbCart = (session) => {
    const sessionId = JSON.parse(session).id

    api.get(`/carts/byCustomer?idCustomer=${sessionId}`).then((response) => {
      let newCart = []
      let cartArticlesNb = 0

      for (const key in response.data) {
        cartArticlesNb += response.data[key].article.price
        newCart.push({
          id: response.data[key].article.id,
          price: response.data[key].article.price,
          quantity: response.data[key].quantity,
        })
      }

      setCartTotalArticle(cartArticlesNb)
      localStorage.setItem("cart", JSON.stringify(newCart))
    })
  }

  return (
    <AppContext.Provider
      {...otherProps}
      value={{
        router,
        session,
        signInError,
        signUpError,
        cartTotalArticle,
        signIn,
        signUp,
        signOut,
        setCartTotalArticle,
        addLocalCartToDb,
        getDbCart,
      }}
    />
  )
}

export default AppContext
