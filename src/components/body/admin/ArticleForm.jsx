/* eslint-disable @next/next/no-img-element */
import Link from "next/link"
import { useState, useContext, useCallback, useEffect } from "react"
import { Form, Formik, Field } from "formik"
import * as Yup from "yup"
import CircularProgress from "@mui/material/CircularProgress"
import { ImCross } from "react-icons/im"
import { FiAlertTriangle } from "react-icons/fi"
import AppContext from "../../AppContext"
import FormField from "../FormField"
import api from "../../services/api"
import colors from "../../../datas/colors.json"

const displayingErrorMessagesSchema = Yup.object().shape({
  name: Yup.string()
    .required("Le champ est requis !")
    .min(3, "Minimum 3 caractères")
    .max(150, "Maximum 150 caractères"),
  description: Yup.string()
    .required("Le champ est requis !")
    .min(3, "Minimum 3 caractères")
    .max(300, "Maximum 300 caractères"),
  price: Yup.number()
    .typeError("Le prix doit être un nombre")
    .min(1, "Le prix doit être supérieur ou égal à 1")
    .max(999999, "Le prix doit être inférieur ou égal à 999999")
    .required("Le champ est requis !"),
  category: Yup.string().required("Le champ est requis !"),
  color: Yup.string().required("Le champ est requis !"),
  stock: Yup.number()
    .typeError("Le stock doit être un nombre")
    .min(0, "Le stock doit être supérieur ou égal à 0")
    .max(999999, "Le stock doit être inférieur ou égal à 999999")
    .required("Le champ est requis !"),
})

const ArticleForm = ({ article }) => {
  const { router } = useContext(AppContext)

  const [pictureError, setPictureError] = useState(null)
  const [pictureList, setPicturesList] = useState([])
  const [pictureUrl, setPictureUrl] = useState("")

  const [categories, setCategories] = useState(null)
  const [apiError, setApiError] = useState(null)

  useEffect(() => {
    api
      .get("/category")
      .then((response) => setCategories(response.data))
      .catch(() => setApiError("Erreur de chargement"))
  }, [])

  useEffect(() => article && setPicturesList(article.images), [article])

  const handleFormSubmit = useCallback(
    async ({ name, description, category, color, price, stock }) => {
      if (pictureList.length < 2) {
        setPictureError("Vous devez mettre au moins 2 images")

        return
      }

      article
        ? await api.put(`/articles?id=${article.id}`, {
            name,
            description,
            category: { id: category },
            images: pictureList,
            color,
            price,
            stock,
          })
        : await api.post("/articles", {
            name,
            description,
            category: { id: category },
            images: pictureList,
            color,
            price,
            stock,
          })
      router.push("/administration/articles")
    },
    [article, pictureList, router]
  )

  if (apiError) {
    return (
      <div className="w-full flex items-center justify-center mt-10 p-5 bg-red-200 rounded">
        <p className="text-3xl font-bold flex items-center justify-center text-red-600">
          <FiAlertTriangle className="text-5xl mr-3" />
          {apiError}
        </p>
      </div>
    )
  }

  if (!categories) {
    return (
      <div className="w-full flex items-center justify-center mt-10 p-5">
        <CircularProgress
          sx={{
            color: "#cc0023",
          }}
          className="mr-5"
        />
        <p>Chargement des catégories...</p>
      </div>
    )
  }

  if (!categories.length) {
    return (
      <div className="w-full flex items-center justify-center mt-10 p-5">
        <p>
          Veuillez créer des catégories{" "}
          <Link href="/administration/categories">
            <a>ici</a>
          </Link>
        </p>
      </div>
    )
  }

  return (
    <Formik
      initialValues={{
        name: article ? article.name : "",
        description: article ? article.description : "",
        category: article ? article.category.id : categories[0].id,
        color: article ? article.color : "red",
        price: article ? article.price : 0,
        stock: article ? article.stock : 0,
      }}
      validationSchema={displayingErrorMessagesSchema}
      onSubmit={handleFormSubmit}
    >
      {({ errors, touched }) => (
        <Form className="w-5/6 p-12 border mx-auto mb-5 flex flex-col items-center justify-center rounded">
          <FormField
            style="w-5/6 mb-5"
            label="Nom de l'article"
            id="name"
            name="name"
            placeholder="Canapé"
            errorType={errors.name}
            touchedType={touched.name}
          />
          <FormField
            style="w-5/6 mb-5"
            label="Description de l'article"
            id="description"
            name="description"
            type="textarea"
            rows="5"
            errorType={errors.description}
            touchedType={touched.description}
          />
          <div className="w-5/6 flex items-center justify-between mb-5">
            <div className="w-2/5 flex flex-col items-start">
              <label htmlFor="category">Catégorie</label>
              <Field
                className="border-2 cursor-pointer bg-gray-200 rounded py-1 px-2 w-full"
                id="category"
                name="category"
                as="select"
              >
                {categories.map((item) => (
                  <option key={item.id} value={item.id} name="category">
                    {item.name}
                  </option>
                ))}
              </Field>
            </div>
            <div className="w-2/5">
              <label htmlFor="color">Couleur</label>
              <Field
                className="border-2 cursor-pointer bg-gray-200 rounded py-1 px-2 w-full"
                id="color"
                name="color"
                as="select"
              >
                {colors.map((item, index) => (
                  <option key={index} value={item.value} name="color">
                    {item.name}
                  </option>
                ))}
              </Field>
            </div>
          </div>
          <div className="w-5/6 flex items-center justify-between mb-5">
            <FormField
              style="w-2/5"
              label="Prix"
              id="price"
              name="price"
              placeholder="69"
              errorType={errors.price}
              touchedType={touched.price}
            />
            <FormField
              style="w-2/5"
              label="Stock"
              id="stock"
              name="stock"
              placeholder="69"
              errorType={errors.stock}
              touchedType={touched.stock}
            />
          </div>
          <div className="w-5/6 mb-10">
            <label htmlFor="image">
              Ajouter une image à l'article (min. 2 / max. 4)
            </label>
            <div className="flex w-full">
              <Field
                name="image"
                id="image"
                placeholder="Url de l'image"
                className={`w-10/12 border-2 rounded py-1 px-2 ${
                  pictureError && "border-red-600"
                } ${
                  pictureList.length >= 4 && "opacity-25 cursor-not-allowed"
                }`}
                disabled={pictureList.length >= 4 ? true : false}
                onChange={(e) => {
                  setPictureUrl(e.target.value)
                }}
              ></Field>
              {pictureList.length < 4 ? (
                <button
                  className="ml-1 w-2/12 rounded bg-blue-600 text-white transition-all hover:bg-blue-300"
                  onClick={(e) => {
                    e.preventDefault()
                    setPicturesList((arr) => [...arr, { url: pictureUrl }])

                    if (pictureList.length >= 1) {
                      setPictureError(null)
                    }
                  }}
                >
                  + Ajouter l'image
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.preventDefault()
                  }}
                  className="ml-1 w-2/12 rounded bg-blue-300 cursor-not-allowed text-white transition-all"
                >
                  + Ajouter l'image
                </button>
              )}
            </div>
            {pictureError && pictureList.length < 4 && (
              <div className="errorField mt-1 text-red-600">{pictureError}</div>
            )}
          </div>

          <ul className="w-5/6 grid grid-cols-3 place-content-around place-items-center gap-y-5">
            {pictureList.map((item, index) => (
              <li key={index} className="shadow-lg relative">
                <img src={item.url} width="250" alt="product image" />
                <button
                  className="absolute bg-red-600 text-white p-2 rounded-full -right-4 -top-4 transition-all hover:scale-110"
                  onClick={(e) => {
                    e.preventDefault()
                    setPicturesList(
                      pictureList.filter((el, id) => id !== index)
                    )
                  }}
                >
                  <ImCross />
                </button>
              </li>
            ))}
          </ul>
          {article ? (
            <button
              type="submit"
              className="p-2 mt-10 mr-1 w-32 rounded bg-blue-600 text-white transition-all hover:bg-blue-300"
            >
              Modifier
            </button>
          ) : (
            <button
              type="submit"
              className="p-2 mt-10 mr-1 w-32 rounded bg-green-600 text-white transition-all hover:bg-green-300"
            >
              Ajouter
            </button>
          )}
        </Form>
      )}
    </Formik>
  )
}

export default ArticleForm
