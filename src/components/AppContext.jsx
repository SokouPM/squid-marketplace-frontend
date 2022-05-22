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
      router.push(`/signin?redirect=${encodeURIComponent(location.pathname)}`)
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
        localStorage.setItem("jwt", data)
        initSession(data)

        const {
          query: { redirect },
        } = router

        if (redirect) {
          router.push(decodeURIComponent(redirect))
        }
      } catch (err) {
        setSignInError(err.response.data)
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
        setSignUpError(err.response.data.error)
      }
    },
    [router]
  )

  const signOut = () => {
    localStorage.clear()
    setSession(null)
    router.push("/signin")
  }

  if (!session && Page.private) {
    return null
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
      }}
    />
  )
}

export default AppContext
