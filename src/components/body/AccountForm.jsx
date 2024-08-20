import { useCallback, useContext } from "react"
import { Field, Form, Formik } from "formik"
import * as Yup from "yup"
import AppContext from "../AppContext"
import FormField from "../body/FormField"

const displayingErrorMessagesSchema = Yup.object().shape({
  civility: Yup.string().required("Le champ est requis !"),
  firstName: Yup.string()
    .min(2, "Le champ doit contenir minimum 2 caractères !")
    .max(50, "Le champ doit contenir maximum 50 caractères !")
    .matches(
      /^[a-zA-Z\-\s]*$/,
      'Le champ ne doit pas contenir de nombres ou caractère spéciaux sauf "-" !'
    )
    .required("Le champ est requis !"),
  name: Yup.string()
    .min(2, "Le champ doit contenir minimum 2 caractères !")
    .max(50, "Le champ doit contenir maximum 50 caractères !")
    .matches(
      /^[a-zA-Z\-\s]*$/,
      'Le champ ne doit pas contenir de nombres ou caractère spéciaux sauf "-" !'
    )
    .required("Le champ est requis !"),
  address: Yup.string()
    .min(2, "Le champ doit contenir minimum 2 caractères !")
    .max(150, "Le champ doit contenir maximum 150 caractères !")
    .required("Le champ est requis !"),
  city: Yup.string()
    .min(2, "Le champ doit contenir minimum 2 caractères !")
    .max(150, "Le champ doit contenir maximum 150 caractères !")
    .required("Le champ est requis !"),
  postalCode: Yup.number()
    .typeError("Le code postal doit être un nombre")
    .min(0, "Le code postal doit être supérieur ou égal à 0")
    .max(999999, "Le code postal doit être inférieur ou égal à 999999")
    .required("Le champ est requis !"),
})

const AccountForm = ({ user }) => {
  const { router } = useContext(AppContext)

  const handleFormSubmit = useCallback(
    async ({ civility, firstName, name, address, city, postalCode }) => {
      // TODO
      civility, firstName, name, address, city, postalCode
      router.reload()
    },
    [router]
  )

  return (
    <Formik
      initialValues={{
        civility: user.civility ? user.civility : "M.",
        firstName: user.firstname ? user.firstname : "",
        name: user.lastname ? user.lastname : "",
        address: user.address ? user.address : "",
        city: user.city ? user.city : "",
        postalCode: user.postalCode ? user.postalCode : "",
      }}
      validationSchema={displayingErrorMessagesSchema}
      onSubmit={handleFormSubmit}
    >
      {({ errors, touched }) => (
        <Form className="w-4/6 mb-10 p-12 border mx-auto flex flex-col items-center justify-center rounded">
          <div className="mb-5 w-5/6 flex items-center justify-left">
            <label htmlFor="civility" className="mr-5">
              Civilité :
            </label>
            <div role="civility">
              <label className="mr-2 cursor-pointer select-none">
                <Field
                  className="mr-1"
                  type="radio"
                  name="civility"
                  value="male"
                />
                M.
              </label>
              <label className="cursor-pointer select-none">
                <Field
                  className="mr-1"
                  type="radio"
                  name="civility"
                  value="female"
                />
                Mme.
              </label>
            </div>
          </div>

          <div className="flex items-center justify-center w-5/6 mb-5">
            <FormField
              style="w-3/6 mr-2"
              label="Prénom"
              id="firstName"
              name="firstName"
              placeholder="John"
              errorType={errors.firstName}
              touchedType={touched.firstName}
            />

            <FormField
              style="w-3/6 ml-2"
              label="Nom"
              id="name"
              name="name"
              placeholder="Doe"
              errorType={errors.name}
              touchedType={touched.name}
            />
          </div>

          <div className="flex items-center justify-center w-5/6 mb-5">
            <FormField
              style="w-6/10 flex-2  mr-5"
              label="Adresse"
              id="address"
              name="address"
              placeholder="5 du petit moulin"
              errorType={errors.address}
              touchedType={touched.address}
            />

            <FormField
              style="w-2/10 flex-1 mr-5"
              label="Ville"
              id="city"
              name="city"
              placeholder="Paris"
              errorType={errors.city}
              touchedType={touched.city}
            />

            <FormField
              style="w-2/10 flex-1"
              label="Code postal"
              id="postalCode"
              name="postalCode"
              placeholder="75000"
              errorType={errors.postalCode}
              touchedType={touched.postalCode}
            />
          </div>

          <button
            type="submit"
            className="bg-secondary hover-text-primary hover-bg-tertiary px-10 py-2 rounded-full text-white transition-all"
          >
            Valider
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default AccountForm
