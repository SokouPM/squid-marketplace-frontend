import Layout from "../src/components/Layout"
import ArticleList from "../src/components/body/ArticleList"

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
      <ArticleList limit={4} />
    </Layout>
  )
}

export default HomePage
