import Head from "next/head"
import Image from "next/image"
import Header from "./Header"
import AdminHeader from "./AdminHeader"
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
      {props.diplayheader && <Header />}
      {props.diplayadminheader && <AdminHeader />}
      {props.diplaybanner && (
        <div className="w-full bg-blue-900 flex items-center justify-center">
          <Image
            src="/banner.png"
            alt="squid market place banner"
            width={1900}
            height={434}
          />
        </div>
      )}
      <main
        className={`px-10 py-2 mx-auto bg-white ${
          props.fullwidth ? "min-w-screen" : "w-4/5"
        } ${props.fullheight && "min-h-screen"}`}
      >
        {props.diplaybreadcrumbs && <BreadCrumbs pagelink={props.pagelink} />}
        {children}
      </main>
      {props.diplayfooter && <Footer />}
    </div>
  )
}

export default Layout
