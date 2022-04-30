import Layout from "/src/components/Layout"
import UsersList from "../../src/components/body/admin/UsersList"

const SubCategoriesAdminPage = () => {
  return (
    <Layout
      page="Administration / Utilisateurs"
      fullwidth={1}
      diplayadminheader={1}
      diplayfooter={1}
    >
      <h2 className="my-5 text-3xl text-center font-bold">
        Liste des utilisateurs
      </h2>
      <UsersList />
    </Layout>
  )
}

export default SubCategoriesAdminPage
