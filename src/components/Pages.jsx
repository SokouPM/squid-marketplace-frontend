import Head from "next/head";
import { useRouter } from "next/router";
import Header from "./Header";
import BreadCrumbs from "./body/BreadCrumbs";
import Footer from "./Footer";

const Page = (props) => {
  const { children, ...otherProps } = props;
  const router = useRouter();

  const componentRender = (component) => {
    {
      if (
        router.pathname !== "/404" &&
        router.pathname !== "/connexion" &&
        router.pathname !== "/inscription"
      ) {
        return component;
      }
    }
  };

  return (
    <div {...otherProps}>
      <Head>
        <title>
          {router.pathname === "/"
            ? "Accueil"
            : router.pathname.substring(1).charAt(0).toUpperCase() +
              router.pathname.slice(2).replace("-", " ")}{" "}
          - Squid MarketPlace
        </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {componentRender(<Header />)}
      <main>
        {componentRender(<BreadCrumbs />)}
        {children}
      </main>
      {componentRender(<Footer />)}
    </div>
  );
};

export default Page;
