import { Form, Formik, Field } from "formik"
import * as Yup from "yup"
import Layout from "../src/components/Layout"
import GoHomeLink from "../src/components/body/GoHomeLink"
import AccountRegisterConnectAside from "../src/components/body/AccountRegisterConnectAside"
import FormField from "../src/components/body/FormField"
import PasswordField from "../src/components/body/customFields/PasswordField"

const SignInPage = () => {
  const displayingErrorMessagesSchema = Yup.object().shape({
    email: Yup.string()
      .email("Le mail est invalide !")
      .required("Le champ est requis !"),
    password: Yup.string().required("Le champ est requis !"),
  })

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
              email: "",
              password: "",
              rememberMe: false,
            }}
            validationSchema={displayingErrorMessagesSchema}
            onSubmit={(values) => {
              alert(JSON.stringify(values, null, 2)) // TODO
            }}
          >
            {({ errors, touched }) => (
              <Form className="w-4/6 p-12">
                <h2 className="text-secondary text-2xl text-center mb-10">
                  Connectez-vous
                </h2>
                <FormField
                  style="mb-5"
                  label="Email"
                  id="email"
                  name="email"
                  placeholder="exemple@mail.com"
                  errorType={errors.email}
                  touchedType={touched.email}
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
                <div className="flex items-center justify-evenly w-full">
                  <label className="cursor-pointer select-none">
                    <Field className="mr-2" type="checkbox" name="rememberMe" />
                    Se souvenir de moi
                  </label>
                  <button
                    className="bg-secondary hover-text-primary hover-bg-tertiary px-10 py-1 rounded-full text-white transition-all"
                    type="submit"
                  >
                    Connexion
                  </button>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <span className="mt-5 text-gray-400">---- ou ----</span>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Layout>
  )
}

export default SignInPage
