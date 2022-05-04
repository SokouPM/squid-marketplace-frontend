import { Form, Formik, Field } from "formik"
import * as Yup from "yup"
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
    .max(99999, "Le prix doit être inférieur ou égal à 99999")
    .required("Le champ est requis !"),
  stock: Yup.number()
    .typeError("Le stock doit être un nombre")
    .min(0, "Le stock doit être supérieur ou égal à 0")
    .max(99999, "Le stock doit être inférieur ou égal à 99999")
    .required("Le champ est requis !"),
})

const CategoriesList = ({ article }) => {
  return (
    <Formik
      initialValues={{
        name: article ? article.name : "",
        description: article ? article.description : "",
        price: article ? article.price : 0,
        stock: article ? article.stock : 0,
      }}
      validationSchema={displayingErrorMessagesSchema}
      onSubmit={(values) => {
        alert(JSON.stringify(values, null, 2)) // TODO
      }}
    >
      {({ errors, touched }) => (
        <Form className="w-5/6 p-12 border mx-auto flex flex-col items-center justify-center rounded">
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
                  <option key={item.id} value={item.id} name="role">
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
          TODO FILE INPUT
          {article ? (
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

export default CategoriesList
