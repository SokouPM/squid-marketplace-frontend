import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Layout from "../../../../src/components/Layout"
import CategoryForm from "../../../../src/components/body/admin/CategoryForm"
import CircularProgress from "@mui/material/CircularProgress"
import { supabase } from "../../../../src/utils/supabase"

const ModifyCategoryPage = () => {
  const {
    query: { categoryName },
  } = useRouter()

  const [category, setCategory] = useState(null)
  const [apiError, setApiError] = useState(null)

  useEffect(() => {
    if (categoryName) {
      getCategoryByName()
    }
  }, [categoryName])

  const getCategoryByName = async () => {
    const { data, error } = await supabase
      .from("category")
      .select("name")
      .eq("name", categoryName)
      .single()

    error && setApiError(error.message)
    data && setCategory(data)
  }

  return (
    <Layout
      page="Administration / Modifier une categorie"
      fullwidth={1}
      diplayadminheader={1}
      diplayfooter={1}
    >
      {categoryName && (
        <>
          <h2 className="my-5 text-3xl text-center font-bold">
            Modifier la categorie "{categoryName}"
          </h2>
          {apiError && <p>{apiError}</p>}
          {category ? (
            <CategoryForm category={category} />
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
        </>
      )}
    </Layout>
  )
}

ModifyCategoryPage.private = true
ModifyCategoryPage.administration = true

export default ModifyCategoryPage
