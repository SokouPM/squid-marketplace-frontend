import Header from "./Header";
import BreadCrumbs from "./BreadCrumbs";
import Footer from "./Footer";
import { useRouter } from "next/router";

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
