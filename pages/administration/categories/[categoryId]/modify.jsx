import { useRouter } from "next/router"
import Layout from "../../../../src/components/Layout"
import CategoryForm from "../../../../src/components/body/admin/CategoryForm"
import category from "../../../../src/datas/category"
import CircularProgress from "@mui/material/CircularProgress"

const ModifyCategoryPage = () => {
  const {
    query: { categoryId },
  } = useRouter()

  return (
    <Layout
      page="Administration / Modifier une categorie"
      fullwidth={1}
      diplayadminheader={1}
      diplayfooter={1}
    >
      {categoryId ? (
        <>
          <h2 className="my-5 text-3xl text-center font-bold">
            Modifier la categorie "{categoryId}"
          </h2>
          <CategoryForm category={category} />
        </>
      ) : (
        <div className="flex items-center justify-center mt-20">
          <CircularProgress
            sx={{
              color: "#cc0023",
            }}
          />
          <p className="ml-3">Chargement du formulaire...</p>
        </div>
      )}
    </Layout>
  )
}

export default ModifyCategoryPage
