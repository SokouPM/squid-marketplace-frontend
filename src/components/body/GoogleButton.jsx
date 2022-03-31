import React from "react"
import { GoogleLogin } from "react-google-login"
import styles from "/styles/SocialNetworkButton.module.css"

const GoogleButton = () => {
  const CLIENT_ID = "TODO"

  const responseGoogle = () => {}

  return (
    <GoogleLogin
      className={styles.googleButton}
      clientId={CLIENT_ID}
      buttonText="Se connecter avec Google"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      isSignedIn={true}
      cookiePolicy={"single_host_origin"}
    />
  )
}

export default GoogleButton
