import Image from "next/image"
import { useState } from "react"
import { Form, Formik, Field } from "formik"
import * as Yup from "yup"
import { ImCross } from "react-icons/im"
import FormField from "../FormField"
import categories from "../../../datas/categories.json"

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
    .min(0, "Le prix doit être supérieur ou égal à 0")
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
  const [pictureError, setPictureError] = useState(null)
  const [pictureList, setPicturesList] = useState([])

  const checkAndAddImageOnArray = (file) => {
    const fileExtention = file.type.split("/").pop()

    if (
      fileExtention !== "jpg" &&
      fileExtention !== "jpeg" &&
      fileExtention !== "png"
    ) {
      setPictureError("L'image doit être au format jpeg jpg ou png")

      return true
    }

    if (file.size > 1048576) {
      setPictureError("L'image est supérieure à 1Mo")

      return true
    }

    setPicturesList((arr) => [...arr, file])

    setPictureError(null)
  }

  return (
    <Formik
      initialValues={{
        name: article ? article.name : "",
        description: article ? article.description : "",
        category: article ? article.category : categories[0].id,
        color: article ? article.color : "red",
        price: article ? article.price : 0,
        stock: article ? article.stock : 0,
      }}
      validationSchema={displayingErrorMessagesSchema}
      onSubmit={(values) => {
        if (pictureList.length < 2) {
          setPictureError("Vous devez mettre au moins 2 images")

          return
        }

        alert([JSON.stringify(values, null, 2), pictureList]) // TODO
      }}
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
                className="border-2 rounded py-1 px-2 w-full"
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
                className="border-2 rounded py-1 px-2 w-full"
                id="color"
                name="color"
                as="select"
              >
                <option value="red" name="color">
                  Rouge
                </option>
                <option value="orange" name="color">
                  Orange
                </option>
                <option value="yellow" name="color">
                  Jaune
                </option>
                <option value="green" name="color">
                  Vert
                </option>
                <option value="blue" name="color">
                  Bleu
                </option>
                <option value="purple" name="color">
                  Violet
                </option>
                <option value="pink" name="color">
                  Rose
                </option>
                <option value="gray" name="color">
                  Gris
                </option>
                <option value="white" name="color">
                  Blanc
                </option>
                <option value="Black" name="color">
                  Noir
                </option>
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
            <input
              type="file"
              name="image"
              className={`border-2 rounded py-1 px-2 w-full cursor-pointer ${
                (pictureError && "border-red-600",
                pictureList.length >= 4 && "opacity-25 cursor-not-allowed")
              }`}
              disabled={pictureList.length >= 4 ? true : false}
              onChange={(e) => {
                const isAnError = checkAndAddImageOnArray(
                  e.target.files[0],
                  e.target.value
                )

                if (!isAnError || pictureList.length >= 4) {
                  e.target.value = null
                }
              }}
            />
            {pictureError && pictureList.length < 4 && (
              <div className="errorField mt-1 text-red-600">{pictureError}</div>
            )}
          </div>

          <ul className="w-5/6 grid grid-cols-3 place-content-around place-items-center gap-y-5">
            {pictureList.map((item, index) => (
              <li key={index} className="shadow-lg relative">
                <Image
                  src={URL.createObjectURL(item)}
                  width="250"
                  height="150"
                  alt="product image"
                />
                <button
                  className="absolute bg-red-600 text-white p-2 rounded-full -right-4 -top-4 transition-all hover:scale-110"
                  onClick={(e) => {
                    e.preventDefault()
                    setPicturesList(
                      pictureList.filter((ellement, id) => id !== index)
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
