import Layout from "../../src/components/Layout"
import CategoriesList from "../../src/components/body/admin/CategoriesList"

const CategoriesAdminPage = () => {
  return (
    <Layout
      page="Administration / Catégories"
      fullwidth={1}
      diplayadminheader={1}
      diplayfooter={1}
    >
      <h2 className="my-5 text-3xl text-center font-bold">
        Liste des catégories
      </h2>
      <CategoriesList />
    </Layout>
  )
}

CategoriesAdminPage.private = true
CategoriesAdminPage.administration = true

export default CategoriesAdminPage
