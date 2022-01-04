import Breadcrumbs from "nextjs-breadcrumbs";
import styles from "/styles/components/body/Breadcrumbs.module.css";

const BreadCrumbs = () => {
  //sqdcqs
  return (
    <Breadcrumbs
      containerClassName={styles.breadcrumbs}
      useDefaultStyle={true}
      rootLabel="Accueil"
    />
  );
};

export default BreadCrumbs;
