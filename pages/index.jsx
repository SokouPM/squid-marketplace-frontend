import Layout from "/src/components/Layout"
import ArticleList from "/src/components/body/ArticleList"

const Home = () => {
  return (
    <Layout
      page="Accueil"
      diplayheader="true"
      diplayslider="true"
      diplaybreadcrumbs="true"
      diplayfooter="true"
    >
      <ArticleList />
    </Layout>
  )
}

export default Home
