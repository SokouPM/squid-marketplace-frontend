import Image from "next/image"
import Link from "next/link"
import styles from "/styles/components/body/AccountRegConAside.module.css"

const AccountRegisterConnectAside = (props) => {
  return (
    <aside className={styles.mainBlock}>
      <span className={styles.logo}>
        <Image src="/logoBig.png" alt="logo" width={180} height={150} />
      </span>

      <p className="registerText">
        {props.text1} <br />
        <Link href={props.link}>
          <a>Cliquez ici</a>
        </Link>{" "}
        {props.text2}
      </p>
    </aside>
  )
}

export default AccountRegisterConnectAside
