import Breadcrumbs from "nextjs-breadcrumbs"
import styles from "/styles/Breadcrumbs.module.css"

const BreadCrumbs = () => {
  return (
    <Breadcrumbs containerClassName={styles.breadcrumbs} rootLabel="Home" />
  )
}

export default BreadCrumbs
