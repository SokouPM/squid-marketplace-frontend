import { useRouter } from "next/router";
import Header from "./Header";
import BreadCrumbs from "./body/BreadCrumbs";
import Footer from "./Footer";

const Page = (props) => {
  const { children, ...otherProps } = props;
  const router = useRouter();

  return (
    <div {...otherProps}>
      <Header />
      <main>
        {router.pathname !== "/404" && <BreadCrumbs />}
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Page;
