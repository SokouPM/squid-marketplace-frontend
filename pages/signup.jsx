import { useCallback, useContext } from "react"
import { Form, Formik } from "formik"
import { FiAlertTriangle } from "react-icons/fi"
import * as Yup from "yup"
import AppContext from "../src/components/AppContext"
import Layout from "../src/components/Layout"
import GoHomeLink from "../src/components/body/GoHomeLink"
import AccountRegisterConnectAside from "../src/components/body/AccountRegisterConnectAside"
import FormField from "../src/components/body/FormField"
import PasswordField from "../src/components/body/customFields/PasswordField"

const displayingErrorMessagesSchema = Yup.object().shape({
  mail: Yup.string()
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
  passwordConfirm: Yup.string()
    .oneOf(
      [Yup.ref("password"), null],
      "Les mots de passe doivent correspondre"
    )
    .required("Le champ est requis !"),
})

const SignUpPage = () => {
  const { signUp, signUpError } = useContext(AppContext)

  const handleFormSubmit = useCallback(
    async ({ mail, password }) => {
      return signUp(mail, password)
    },
    [signUp]
  )

  return (
    <Layout page="Inscription" fullheight={1}>
      <div className="signUpPage flex flex-col justify-center items-center">
        {signUpError ? (
          <div className="w-full mb-7 py-2 bg-red-200 flex items-center justify-center text-red-600 text-center font-bold text-2xl rounded">
            <FiAlertTriangle className="text-5xl mr-3" />
            {signUpError}
          </div>
        ) : null}
        <GoHomeLink />
        <div className="flex border rounded mb-auto w-4/5 overflow-hidden shadow-md">
          <Formik
            initialValues={{
              mail: "",
              password: "",
              passwordConfirm: "",
            }}
            validationSchema={displayingErrorMessagesSchema}
            onSubmit={handleFormSubmit}
          >
            {({ errors, touched }) => (
              <Form className="w-4/6 p-10">
                <h2 className="text-secondary text-2xl text-center mb-10">
                  Créez un compte
                </h2>
                <FormField
                  style="mb-5"
                  label="Email"
                  id="mail"
                  name="mail"
                  placeholder="exemple@mail.com"
                  errorType={errors.mail}
                  touchedType={touched.mail}
                />
                <FormField
                  style="mb-5"
                  label="Mot de passe"
                  type={PasswordField}
                  id="password"
                  name="password"
                  placeholder="1 majuscule, 1 minuscule, 1 nombre et entre 6 et 50 caractères"
                  errorType={errors.password}
                  touchedType={touched.password}
                />
                <FormField
                  style="mb-10"
                  label="Confirmer le mot de passe"
                  type={PasswordField}
                  id="passwordConfirm"
                  name="passwordConfirm"
                  placeholder="Identique au mot de passe"
                  errorType={errors.passwordConfirm}
                  touchedType={touched.passwordConfirm}
                />
                <div className="w-full flex items-center justify-center">
                  <button
                    className="bg-secondary hover-text-primary hover-bg-tertiary px-10 py-1 rounded-full text-white transition-all"
                    type="submit"
                  >
                    Inscription
                  </button>
                </div>
              </Form>
            )}
          </Formik>
          <AccountRegisterConnectAside
            text1="Vous avez déjà un compte ?"
            link="/signin"
            text2="pour vous connecter."
          />
        </div>
      </div>
    </Layout>
  )
}

SignUpPage.noSessionOnly = true

export default SignUpPage
