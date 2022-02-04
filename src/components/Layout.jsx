import Head from "next/head"
import Header from "./Header"
import Slider from "./body/Slider"
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
      {props.diplayslider === "true" ? <Slider /> : null}
      <main>
        {props.diplaybreadcrumbs === "true" ? <BreadCrumbs /> : null}
        {children}
      </main>
      {props.diplayfooter === "true" ? <Footer /> : null}
    </div>
  )
}

export default Layout
