import Layout from "../../../src/components/Layout"
import ArticleForm from "../../../src/components/body/admin/ArticleForm"

const AddCategoryPage = () => {
  return (
    <Layout
      page="Administration / Ajouter un article"
      fullwidth={1}
      diplayadminheader={1}
      diplayfooter={1}
    >
      <h2 className="my-5 text-3xl text-center font-bold">
        Ajouter un article
      </h2>
      <ArticleForm />
    </Layout>
  )
}

export default AddCategoryPage
