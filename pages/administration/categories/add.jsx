import Layout from "../../../src/components/Layout"
import CategoryForm from "../../../src/components/body/admin/CategoryForm"

const AddCategoryPage = () => {
  return (
    <Layout
      page="Administration / Ajouter une categorie"
      fullwidth={1}
      diplayadminheader={1}
      diplayfooter={1}
    >
      <h2 className="my-5 text-3xl text-center font-bold">
        Ajouter une categorie
      </h2>
      <CategoryForm />
    </Layout>
  )
}

AddCategoryPage.private = true
AddCategoryPage.administration = true

export default AddCategoryPage
