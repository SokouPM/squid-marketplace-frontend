import Layout from "../src/components/Layout"
import HomeArticleList from "../src/components/body/HomeArticleList"

const HomePage = () => {
  return (
    <Layout
      page="Accueil"
      diplayheader={1}
      diplaybanner={1}
      diplaybreadcrumbs={1}
      homelink="Produits populaires"
      diplayfooter={1}
    >
      <HomeArticleList />
    </Layout>
  )
}

export default HomePage
