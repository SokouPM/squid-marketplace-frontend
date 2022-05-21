import Layout from "../src/components/Layout"
import ArticleList from "../src/components/body/ArticleList"
const ArticlesPage = () => {
  return (
    <Layout
      page="Mentions légales"
      diplayheader={1}
      diplaybreadcrumbs={1}
      diplayfooter={1}
    >
      <ArticleList />
    </Layout>
  )
}

export default ArticlesPage
