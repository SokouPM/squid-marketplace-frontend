import Head from "next/head"
import Image from "next/image"
import Header from "./Header"
import BreadCrumbs from "./body/BreadCrumbs"
import Footer from "./Footer"

const Layout = (props) => {
  const { children, ...otherProps } = props

  return (
    <div {...otherProps}>
      <Head>
        <title>{props.page} - Squid MarketPlace</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Site de vente en ligne de meubles" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {props.diplayheader === "true" ? <Header /> : null}
      {props.diplaybanner === "true" ? (
        <Image
          src="/banner.png"
          alt="squid market place banner"
          width={1900}
          height={434}
        />
      ) : null}
      <main className="w-4/5 px-10 py-2 mx-auto bg-white">
        {props.diplaybreadcrumbs === "true" ? <BreadCrumbs /> : null}
        {children}
      </main>
      {props.diplayfooter === "true" ? <Footer /> : null}
    </div>
  )
}

export default Layout
