import Layout from "../../src/components/Layout"
import ArticlesList from "../../src/components/body/admin/ArticlesList"

const ArticlesAdminPage = () => {
  return (
    <Layout
      page="Administration / Articles"
      fullwidth={1}
      diplayadminheader={1}
      diplayfooter={1}
    >
      <h2 className="my-5 text-3xl text-center font-bold">
        Liste des articles
      </h2>
      <ArticlesList />
    </Layout>
  )
}

ArticlesAdminPage.private = true
ArticlesAdminPage.administration = true

export default ArticlesAdminPage
