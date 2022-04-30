import { Form, Formik } from "formik"
import * as Yup from "yup"
import Layout from "../src/components/Layout"
import GoHomeLink from "../src/components/body/GoHomeLink"
import AccountRegisterConnectAside from "../src/components/body/AccountRegisterConnectAside"
import FormField from "../src/components/body/FormField"
import PasswordField from "../src/components/body/customFields/PasswordField"

const SignUpPage = () => {
  const displayingErrorMessagesSchema = Yup.object().shape({
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
    passwordConfirm: Yup.string()
      .oneOf(
        [Yup.ref("password"), null],
        "Les mots de passe doivent correspondre"
      )
      .required("Le champ est requis !"),
  })

  return (
    <Layout page="Inscription" fullheight={1}>
      <div className="signUpPage flex flex-col justify-center items-center">
        <GoHomeLink />
        <div className="flex border rounded mb-auto w-4/5 overflow-hidden shadow-md">
          <Formik
            initialValues={{
              email: "",
              password: "",
              passwordConfirm: "",
            }}
            validationSchema={displayingErrorMessagesSchema}
            onSubmit={(values) => {
              alert(JSON.stringify(values, null, 2)) // TODO
            }}
          >
            {({ errors, touched }) => (
              <Form className="w-4/6 p-10">
                <h2 className="text-secondary text-2xl text-center mb-10">
                  Créez un compte
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
                  placeholder="1 majuscule, 1 minuscule, 1 nombre et entre 6 et 50 caractères"
                  errorType={errors.password}
                  touchedType={touched.password}
                />
                <FormField
                  style="mb-5"
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
                <div className="flex flex-col items-center justify-center">
                  <span className="mt-5 text-gray-400">---- ou ----</span>
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

export default SignUpPage
