import { useCallback, useState } from "react"
import { Form, Formik } from "formik"
import { FiAlertTriangle } from "react-icons/fi"
import * as Yup from "yup"
import Layout from "../src/components/Layout"
import GoHomeLink from "../src/components/body/GoHomeLink"
import AccountRegisterConnectAside from "../src/components/body/AccountRegisterConnectAside"
import FormField from "../src/components/body/FormField"
import PasswordField from "../src/components/body/customFields/PasswordField"
import { supabase } from "../src/utils/supabase"

const displayingErrorMessagesSchema = Yup.object().shape({
  mail: Yup.string()
    .email("Le mail est invalide !")
    .required("Le champ est requis !"),
  password: Yup.string().required("Le champ est requis !"),
})

const SignInPage = () => {
  const [signInError, setSignInError] = useState(null)

  const handleFormSubmit = useCallback(
    async (values) => {
      const signInWithEmail = async (email, password) => {
        signInError && setSignInError(null)

        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        error && setSignInError(error.message)

        if (data) {
          const { access_token, user } = data.session
          localStorage.setItem("token", access_token)
          localStorage.setItem("user", user.id)
          localStorage.removeItem(
            `sb-${
              process.env.NEXT_PUBLIC_SUPABASE_URL.split("//")[1].split(".")[0]
            }-auth-token`
          )
          window.location.href = "/"
        }
      }

      await signInWithEmail(values.mail, values.password)
    },
    [signInError] // This dependency array is simplified.
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
              mail: "admin@squid.fr",
              password: "1Az!",
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
