import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Layout from "../../../../src/components/Layout"
import CategoryForm from "../../../../src/components/body/admin/CategoryForm"
import CircularProgress from "@mui/material/CircularProgress"

const ModifyCategoryPage = () => {
  const {
    query: { categoryId }
  } = useRouter()

  const [category, setCategory] = useState(null)
  const [apiError, setApiError] = useState(null)

  useEffect(() => {
    if (categoryId && !isNaN(categoryId)) {
      // TODO
    }
  }, [categoryId])

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
          {apiError && <p>{apiError}</p>}
          {category ? (
            <CategoryForm category={category} />
          ) : (
            <div className="flex items-center justify-center mt-20">
              <CircularProgress
                sx={{
                  color: "#cc0023"
                }}
              />
              <p className="ml-3">Chargement du formulaire...</p>
            </div>
          )}
        </>
      ) : (
        <div className="flex items-center justify-center mt-20">
          <CircularProgress
            sx={{
              color: "#cc0023"
            }}
          />
          <p className="ml-3">Chargement du formulaire...</p>
        </div>
      )}
    </Layout>
  )
}

ModifyCategoryPage.private = true
ModifyCategoryPage.administration = true

export default ModifyCategoryPage
