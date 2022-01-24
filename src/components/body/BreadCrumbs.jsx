import Breadcrumbs from "nextjs-breadcrumbs"
import styles from "/styles/components/body/Breadcrumbs.module.css"

const BreadCrumbs = () => {
  return (
    <Breadcrumbs
      containerClassName={styles.breadcrumbs}
      useDefaultStyle={true}
      rootLabel="Accueil"
    />
  )
}

export default BreadCrumbs
