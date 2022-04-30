import Router from "next/router"
import { Form, Formik } from "formik"
import * as Yup from "yup"
import Layout from "../src/components/Layout"
import FormField from "../src/components/body/FormField"

const ContactPage = () => {
  const displayingErrorMessagesSchema = Yup.object().shape({
    firstname: Yup.string()
      .min(2, "Le champ doit contenir minimum 2 caractères !")
      .max(150, "Le champ doit contenir maximum 150 caractères !")
      .matches(
        /^[a-zA-Z\-\s]*$/,
        'Le champ ne doit pas contenir de nombres ou caractère spéciaux sauf "-" !'
      )
      .required("Le champ est requis !"),
    lastname: Yup.string()
      .min(2, "Le champ doit contenir minimum 2 caractères !")
      .max(150, "Le champ doit contenir maximum 150 caractères !")
      .matches(
        /^[a-zA-Z\-\s]*$/,
        'Le champ ne doit pas contenir de nombres ou caractère spéciaux sauf "-" !'
      )
      .required("Le champ est requis !"),
    email: Yup.string()
      .email("Le mail est invalide !")
      .required("Le champ est requis !"),
    subject: Yup.string()
      .min(2, "Le champ doit contenir minimum 2 caractères !")
      .max(150, "Le champ doit contenir maximum 150 caractères !")
      .required("Le champ est requis !"),
    message: Yup.string()
      .min(2, "Le champ doit contenir minimum 2 caractères !")
      .max(500, "Le champ doit contenir maximum 500 caractères !")
      .required("Le champ est requis !"),
  })

  return (
    <Layout
      page="Nous contacter"
      diplayheader={1}
      diplaybreadcrumbs={1}
      diplayfooter={1}
    >
      <div>
        <fieldset className="border border-secondary rounded px-16 py-6">
          <legend className="text-secondary -ml-10 text-xl">
            Contactez-nous
          </legend>

          <Formik
            initialValues={{
              firstname: "",
              lastname: "",
              email: "",
              subject: "",
              message: "",
            }}
            validationSchema={displayingErrorMessagesSchema}
            onSubmit={(values) => {
              alert(JSON.stringify(values, null, 2))
              Router.push("/") // TODO
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="flex justify-between w-full">
                  <FormField
                    style="mb-2 w-full mr-2"
                    label="Prénom"
                    id="firstname"
                    name="firstname"
                    placeholder="Votre prénom"
                    errorType={errors.firstname}
                    touchedType={touched.firstname}
                  />
                  <FormField
                    style="mb-2 w-full ml-2"
                    label="Nom"
                    id="lastname"
                    name="lastname"
                    placeholder="Votre nom"
                    errorType={errors.lastname}
                    touchedType={touched.lastname}
                  />
                </div>
                <div className="flex justify-between w-full">
                  <FormField
                    style="mb-2 w-full mr-2"
                    label="Email"
                    id="email"
                    name="email"
                    placeholder="exemple@mail.com"
                    errorType={errors.email}
                    touchedType={touched.email}
                  />
                  <FormField
                    style="mb-2 w-full ml-2"
                    label="Sujet"
                    id="subject"
                    name="subject"
                    placeholder="Le sujet de votre message"
                    errorType={errors.subject}
                    touchedType={touched.subject}
                  />
                </div>
                <FormField
                  style="mb-2 "
                  label="Message"
                  type="textarea"
                  rows={5}
                  id="message"
                  name="message"
                  placeholder="Votre message"
                  errorType={errors.message}
                  touchedType={touched.message}
                />
                <button
                  className="bg-secondary hover-bg-tertiary hover-text-primary px-10 py-1 rounded-full text-white transition-all"
                  type="submit"
                >
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </fieldset>
      </div>
    </Layout>
  )
}

export default ContactPage
