import Layout from "/src/components/Layout"
import ArticleList from "/src/components/body/ArticleList"

const HomePage = () => {
  return (
    <Layout
      page="Accueil"
      diplayheader="true"
      diplaybanner="true"
      diplaybreadcrumbs="true"
      diplayfooter="true"
    >
      <ArticleList limit={4} />
    </Layout>
  )
}

export default HomePage
