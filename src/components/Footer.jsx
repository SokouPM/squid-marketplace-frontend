import Link from "next/link"

const Footer = () => {
  return (
    <footer className="bg-primary flex items-center justify-center text-white text-center">
      <p>
        Copyright 2021 - 2022 <br />
        <Link href="/legal-notice">
          <a className="hover:underline">Mentions légales</a>
        </Link>{" "}
        |{" "}
        <Link href="/contact">
          <a className="hover:underline">Contact</a>
        </Link>
      </p>
    </footer>
  )
}

export default Footer
