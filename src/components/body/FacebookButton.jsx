import FacebookLogin from "react-facebook-login"
import { FaFacebookSquare } from "react-icons/fa"
import styles from "/styles/components/body/SocialNetworkButton.module.css"

const FacebookButton = () => {
  const CLIENT_ID = "TODO"

  const responseFacebook = () => {}

  return (
    <FacebookLogin
      appId={CLIENT_ID}
      autoLoad={true}
      icon={<FaFacebookSquare />}
      textButton="Se connecter avec Facebook"
      fields="name,email,picture"
      size="small"
      cssClass={styles.facebookButton}
      callback={responseFacebook}
    />
  )
}

export default FacebookButton
