import Layout from "../../../src/components/Layout"
import UserForm from "../../../src/components/body/admin/UserForm"

const AddArticlePage = () => {
  return (
    <Layout
      page="Administration / Ajouter un utilisateur"
      fullwidth={1}
      diplayadminheader={1}
      diplayfooter={1}
    >
      <h2 className="my-5 text-3xl text-center font-bold">
        Ajouter un utilisateur
      </h2>
      <UserForm />
    </Layout>
  )
}

export default AddArticlePage
