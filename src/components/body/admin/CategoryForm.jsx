import { useCallback, useContext } from "react"
import { Form, Formik } from "formik"
import * as Yup from "yup"
import AppContext from "../../AppContext"
import api from "../../services/api"
import FormField from "../FormField"

const displayingErrorMessagesSchema = Yup.object().shape({
  name: Yup.string()
    .required("Le champ est requis !")
    .min(3, "Minimum 3 caractères")
    .max(40, "Maximum 40 caractères"),
})

const CategoriesForm = ({ category }) => {
  const { router } = useContext(AppContext)

  const handleFormSubmit = useCallback(
    async ({ name }) => {
      category
        ? await api.put(`/category/byId?id=${category.id}`, { name })
        : await api.post("/category", { name })
      router.push("/administration/categories")
    },
    [category, router]
  )

  return (
    <Formik
      initialValues={{
        name: category ? category.name : "",
      }}
      validationSchema={displayingErrorMessagesSchema}
      onSubmit={handleFormSubmit}
    >
      {({ errors, touched }) => (
        <Form className="w-4/6 p-12 border mx-auto flex flex-col items-center justify-center rounded">
          <FormField
            style="w-5/6 mb-5"
            label="Nom de la catégorie"
            id="name"
            name="name"
            placeholder="Canapé"
            errorType={errors.name}
            touchedType={touched.name}
          />
          {category ? (
            <button
              type="submit"
              className="p-2 mr-1 w-32 rounded bg-blue-600 text-white transition-all hover:bg-blue-300"
            >
              Modifier
            </button>
          ) : (
            <button
              type="submit"
              className="p-2 mr-1 w-32 rounded bg-green-600 text-white transition-all hover:bg-green-300"
            >
              Ajouter
            </button>
          )}
        </Form>
      )}
    </Formik>
  )
}

export default CategoriesForm
