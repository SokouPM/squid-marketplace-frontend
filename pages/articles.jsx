import Layout from "../src/components/Layout"
import ArticleList from "../src/components/body/ArticleList"
import ArticleSort from "../src/components/body/ArticleSort"

const ArticlesPage = () => {
  return (
    <Layout
      page="Articles"
      diplayheader={1}
      diplaybreadcrumbs={1}
      diplayfooter={1}
    >
      <div className="border rounded mb-5">
        <ArticleSort />
        <ArticleList />
      </div>
    </Layout>
  )
}

export default ArticlesPage
