import { useCallback, useContext } from "react"
import { Form, Formik } from "formik"
import { FiAlertTriangle } from "react-icons/fi"
import AppContext from "../src/components/AppContext"
import * as Yup from "yup"
import Layout from "../src/components/Layout"
import GoHomeLink from "../src/components/body/GoHomeLink"
import AccountRegisterConnectAside from "../src/components/body/AccountRegisterConnectAside"
import FormField from "../src/components/body/FormField"
import PasswordField from "../src/components/body/customFields/PasswordField"

const displayingErrorMessagesSchema = Yup.object().shape({
  mail: Yup.string()
    .email("Le mail est invalide !")
    .required("Le champ est requis !"),
  password: Yup.string().required("Le champ est requis !"),
})

const SignInPage = () => {
  const { signIn, signInError } = useContext(AppContext)
  const handleFormSubmit = useCallback(
    async ({ mail, password }) => {
      return signIn(mail, password)
    },
    [signIn]
  )

  return (
    <Layout page="Connexion" fullheight={1}>
      <div className="signInPage flex flex-col justify-center items-center">
        <GoHomeLink />

        <div className="flex border rounded mb-auto w-4/5 overflow-hidden shadow-md">
          <AccountRegisterConnectAside
            text1="Pas encore inscrit ?"
            link="/signup"
            text2="pour créer un compte."
          />
          <Formik
            initialValues={{
              mail: "",
              password: "",
              rememberMe: false,
            }}
            validationSchema={displayingErrorMessagesSchema}
            onSubmit={handleFormSubmit}
          >
            {({ errors, touched }) => (
              <Form className="w-4/6 p-12">
                <h2 className="text-secondary text-2xl text-center mb-10">
                  Connectez-vous
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
                  placeholder="Votre mot de passe"
                  errorType={errors.password}
                  touchedType={touched.password}
                />
                {signInError && (
                  <div className="w-full mb-7 py-2 bg-red-200 flex items-center justify-center text-red-600 text-center font-bold text-2xl rounded">
                    <FiAlertTriangle className="text-5xl mr-3" />
                    {signInError}
                  </div>
                )}
                <div className="flex items-center justify-evenly w-full">
                  <button
                    className="bg-secondary hover-text-primary hover-bg-tertiary px-10 py-1 rounded-full text-white transition-all"
                    type="submit"
                  >
                    Connexion
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Layout>
  )
}

SignInPage.noSessionOnly = true

export default SignInPage
