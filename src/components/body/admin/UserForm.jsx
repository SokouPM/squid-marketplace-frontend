import { Form, Formik, Field } from "formik"
import * as Yup from "yup"
import PasswordField from "../customFields/PasswordField"
import FormField from "../FormField"

const CategoriesList = ({ user }) => {
  let displayingErrorMessagesSchema

  user
    ? (displayingErrorMessagesSchema = Yup.object().shape({
        email: Yup.string()
          .email("Le mail est invalide !")
          .required("Le champ est requis !"),
        password: Yup.string()
          .min(6, "Le mot de passe doit contenir minimum 6 caractères !")
          .max(50, "Le mot de passe doit contenir maximum 50 caractères !")
          .matches(
            /^.*(?=.*[a-z]).*$/g,
            "Le mot de passe doit contenir au moins 1 minuscule !"
          )
          .matches(
            /^.*(?=.*[A-Z]).*$/g,
            "Le mot de passe doit contenir au moins 1 majuscule !"
          )
          .matches(
            /^.*(?=.*[0-9]).*$/g,
            "Le mot de passe doit contenir au moins 1 chiffre !"
          ),
      }))
    : (displayingErrorMessagesSchema = Yup.object().shape({
        email: Yup.string()
          .email("Le mail est invalide !")
          .required("Le champ est requis !"),
        password: Yup.string()
          .min(6, "Le mot de passe doit contenir minimum 6 caractères !")
          .max(50, "Le mot de passe doit contenir maximum 50 caractères !")
          .matches(
            /^.*(?=.*[a-z]).*$/g,
            "Le mot de passe doit contenir au moins 1 minuscule !"
          )
          .matches(
            /^.*(?=.*[A-Z]).*$/g,
            "Le mot de passe doit contenir au moins 1 majuscule !"
          )
          .matches(
            /^.*(?=.*[0-9]).*$/g,
            "Le mot de passe doit contenir au moins 1 chiffre !"
          )
          .required("Le champ est requis !"),
      }))

  return (
    <Formik
      initialValues={{
        email: user ? user.email : "",
        password: "",
        isAdmin: user ? user.isAdmin : false,
      }}
      validationSchema={displayingErrorMessagesSchema}
      onSubmit={(values) => {
        alert(JSON.stringify(values, null, 2)) // TODO
      }}
    >
      {({ errors, touched }) => (
        <Form className="w-4/6 p-12 border mx-auto flex flex-col items-center justify-center rounded">
          <FormField
            style="w-5/6 mb-5"
            label="Email"
            id="email"
            name="email"
            placeholder="exemple@mail.com"
            errorType={errors.email}
            touchedType={touched.email}
          />
          <FormField
            style="w-5/6 mb-5"
            label="Mot de passe"
            type={PasswordField}
            id="password"
            name="password"
            placeholder="Votre mot de passe"
            errorType={errors.password}
            touchedType={touched.password}
          />
          <div className="w-5/6 mb-5 select-none">
            <label className="mb-5 cursor-pointer">
              <Field className="mr-2" type="checkbox" name="isAdmin" />
              Administrateur
            </label>
          </div>

          {user ? (
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
