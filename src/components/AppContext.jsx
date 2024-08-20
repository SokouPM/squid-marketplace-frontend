import { createContext, useCallback, useEffect, useState } from "react"
import { supabase } from "../utils/supabase"

const AppContext = createContext({})

export const AppContextProvider = (props) => {
  const { pageComponent: Page, router, ...otherProps } = props

  const [session, setSession] = useState()
  const [cartTotalArticle, setCartTotalArticle] = useState(0)

  const initSession = useCallback(async (token) => {
    if (!token) {
      setSession(null)

      return
    }

    const jwt = localStorage.getItem("token")

    if (!jwt) {
      return
    }

    const userId = localStorage.getItem("user")

    if (!userId) {
      return
    }

    const { data, error } = await supabase
      .from("customer")
      .select(
        `address, city, id, civility, firstname, lastname, postalCode:postal_code, isAdmin:is_admin`
      )
      .eq("user_id", userId)
      .single()

    const { data: authData, error: authError } = await supabase.auth.getUser(
      jwt
    )

    if (error || authError) {
      return
    }

    setSession(JSON.stringify({ ...data, email: authData.user.email }))
  }, [])

  useEffect(() => {
    const token = localStorage.getItem("token")

    initSession(token)
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

  const signOut = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    localStorage.setItem("cart", JSON.stringify([]))
    setSession(null)
    router.push("/signin")
  }

  // POST local cart to the database when user sign-in
  const addLocalCartToDb = (session) => {
    session
    //! let cart = []
    //! getLogedCustomer().then((data) => {
    //! const sessionId = data.id
    //! if (!localStorage.getItem("cart")) {
    //!   // create local cart if not exist
    //!   localStorage.setItem("cart", JSON.stringify([]))
    //! }
    //! cart = JSON.parse(localStorage.getItem("cart"))
    //! if (cart.length) {
    //!  cart.map((item) => {
    //!    /*api.post(
    //!      `/carts/withQuantity?idCustomer=${sessionId}&idArticle=${item.id}&quantity=${item.quantity}`
    //!    )*/
    //!    // TODO
    //!  })
    //!}
    //! localStorage.setItem("cart", JSON.stringify([]))
    //! })
  }

  const getDbCart = (session) => {
    session
    //! getLogedCustomer().then((data) => {
    //!   const sessionId = data.id
    //!
    //!   // get cart content from database
    //!   // TODO
    //! })
  }

  return (
    <AppContext.Provider
      {...otherProps}
      value={{
        router,
        session,
        cartTotalArticle,
        signOut,
        setCartTotalArticle,
        addLocalCartToDb,
        getDbCart,
      }}
    />
  )
}

export default AppContext
