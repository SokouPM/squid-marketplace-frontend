import Link from "next/link"
import styles from "/styles/components/footer.module.css"

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>
        Copyright 2021 - 2022 <br />
        <Link href="/mentions-legales">
          <a>Mentions légales</a>
        </Link>{" "}
        |{" "}
        <Link href="/contact">
          <a>Contact</a>
        </Link>
      </p>
    </footer>
  )
}

export default Footer
