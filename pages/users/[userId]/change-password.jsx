import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import { Form, Formik } from "formik"
import * as Yup from "yup"
import { FiAlertTriangle } from "react-icons/fi"
import Layout from "../../../src/components/Layout"
import AccountNav from "../../../src/components/body/AccountNav"
import FormField from "../../../src/components/body/FormField"
import PasswordField from "../../../src/components/body/customFields/PasswordField"
import api from "../../../src/components/services/api"

const displayingErrorMessagesSchema = Yup.object().shape({
  oldPassword: Yup.string().required("Le champ est requis !"),
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
  passwordConfirm: Yup.string()
    .oneOf(
      [Yup.ref("password"), null],
      "Les mots de passe doivent correspondre"
    )
    .required("Le champ est requis !"),
})

const UserInformationsPage = () => {
  const {
    query: { userId },
  } = useRouter()

  const [user, setUser] = useState(null)
  const [apiError, setApiError] = useState(null)

  useEffect(() => {
    if (userId && !isNaN(userId)) {
      api
        .get(`/customer/byId?id=${userId}`)
        .then((response) => setUser(response.data))
        .catch((error) =>
          setApiError(error.response ? error.response.data : error.message)
        )
    }
  }, [userId])

  return (
    <Layout
      page="Modifier mon mot de passe"
      diplayheader={1}
      diplaybreadcrumbs={1}
      diplayfooter={1}
    >
      <AccountNav
        userId={userId}
        userIsAdmin={user && user.admin}
        selected={3}
      />
      <h2 className="text-center text-3xl mb-5 font-bold">
        Modifier mon mot de passe
      </h2>
      {apiError ? (
        <div className="w-full flex items-center justify-center mt-10 p-5 bg-red-200 rounded">
          <p className="text-3xl font-bold flex items-center justify-center text-red-600">
            <FiAlertTriangle className="text-5xl mr-3" />
            {apiError}
          </p>
        </div>
      ) : (
        <Formik
          initialValues={{
            oldPassword: "",
            password: "",
          }}
          validationSchema={displayingErrorMessagesSchema}
          onSubmit={(values) => {
            alert(JSON.stringify(values, null, 2)) // TODO
          }}
        >
          {({ errors, touched }) => (
            <Form className="w-4/6 mb-10 p-12 border mx-auto flex flex-col items-center justify-center rounded">
              <FormField
                style="w-5/6 mb-5"
                label="Ancien mot de passe"
                type={PasswordField}
                id="oldPassword"
                name="oldPassword"
                placeholder="Votre ancien mot de passe"
                errorType={errors.oldPassword}
                touchedType={touched.oldPassword}
              />

              <FormField
                style="w-5/6 mb-5"
                label="Nouveau mot de passe"
                type={PasswordField}
                id="password"
                name="password"
                placeholder="1 majuscule, 1 minuscule, 1 nombre et entre 6 et 50 caractères"
                errorType={errors.password}
                touchedType={touched.password}
              />
              <FormField
                style="w-5/6 mb-5"
                label="Confirmer le mot de passe"
                type={PasswordField}
                id="passwordConfirm"
                name="passwordConfirm"
                placeholder="Identique au mot de passe"
                errorType={errors.passwordConfirm}
                touchedType={touched.passwordConfirm}
              />

              <button
                className="bg-secondary hover-text-primary hover-bg-tertiary px-10 py-1 rounded-full text-white transition-all"
                type="submit"
              >
                Valider
              </button>
            </Form>
          )}
        </Formik>
      )}
    </Layout>
  )
}

export default UserInformationsPage
