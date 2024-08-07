import { createContext, useCallback, useEffect, useState } from "react"

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
    // Redirects the user if he's not logged in and if the page is private
    if (session === null && Page.private) {
      router.push(`/signin?redirect=${encodeURIComponent(router.asPath)}`)
    }
  }, [Page.private, router, session])

  useEffect(() => {
    // Redirects the user if he's logged in and if the page is only available non-logged-in users (signin and signup pages).
    if (session !== null && session !== undefined && Page.noSessionOnly) {
      router.push("/")
    }
  }, [Page.noSessionOnly, router, session])

  useEffect(() => {
    // Redirects the user if he's not logged or not administrator in and if the page is only accessible for administrators
    if (session && Page.administration) {
      const isAdmin = JSON.parse(session).isAdmin

      if (!isAdmin) {
        router.push("/")
      }
    }
  }, [Page.administration, router, session])

  const signIn = useCallback(
    async (mail, password) => {
      try {
        // const { data } = await api.post("auth/connection", {
        //   mail,
        //   password,
        // })
        // TODO
        setSignInError(null) // remove signin error message
        localStorage.setItem("jwt", data)
        const {
          query: { redirect }, // get redirect param from url if exist
        } = router

        if (redirect) {
          router.push(decodeURIComponent(redirect))
        } else {
          router.push("/")
        }

        initSession(data) // run session with jwt
      } catch (err) {
        if (err.response.status === 404) {
          err.response.data = { error: "Email incorrect" }
        }

        setSignInError(err.response.data.error)
      }
    },
    [initSession, router]
  )

  const signUp = useCallback(
    async (mail, password) => {
      try {
        // await api.post("auth/inscription", { mail, password })
        router.push("/signin")
        // TODO
        setSignUpError(null) // remove signup error message
      } catch (err) {
        setSignUpError(err.response.data.error) // remove signup error message
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

  // POST local cart to database when user sign-in
  const addLocalCartToDb = (session) => {
    let cart = []
    const sessionId = JSON.parse(session).id

    if (!localStorage.getItem("cart")) {
      // create local cart if not exist
      localStorage.setItem("cart", JSON.stringify([]))
    }

    cart = JSON.parse(localStorage.getItem("cart"))

    if (cart.length) {
      cart.map((item) => {
        /*api.post(
          `/carts/withQuantity?idCustomer=${sessionId}&idArticle=${item.id}&quantity=${item.quantity}`
        )*/
        // TODO
      })
    }

    localStorage.setItem("cart", JSON.stringify([]))
  }

  const getDbCart = (session) => {
    // get cart content from database
    const sessionId = JSON.parse(session).id

    api.get(`/carts/byCustomer?idCustomer=${sessionId}`).then((response) => {
      let localCart = []
      let cartArticlesNb = 0

      for (const key in response.data) {
        cartArticlesNb += response.data[key].article.price
        localCart.push({
          id: response.data[key].article.id,
          price: response.data[key].article.price,
          quantity: response.data[key].quantity,
        })
      }

      setCartTotalArticle(cartArticlesNb)
      localStorage.setItem("cart", JSON.stringify(localCart))
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
