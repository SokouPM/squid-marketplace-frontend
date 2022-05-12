import { Form, Formik } from "formik"
import * as Yup from "yup"
import FormField from "./FormField"

const displayingErrorMessagesSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Le champ doit contenir minimum 2 caractères !")
    .max(150, "Le champ doit contenir maximum 150 caractères !")
    .matches(
      /^[a-zA-Z\-\s]*$/,
      'Le champ ne doit pas contenir de nombres ou caractère spéciaux sauf "-" !'
    )
    .required("Le champ est requis !"),
  number: Yup.number()
    .typeError("Doit être un nombre")
    .required("Le champ est requis !"),
  cryptogram: Yup.number()
    .typeError("Le cryptogramme doit être un nombre")
    .min(100, "Le cryptogramme doit contenir 3 chiffres !")
    .max(999, "Le cryptogramme doit contenir 3 chiffres !")
    .required("Le champ est requis !"),
})

const AccountForm = ({ card }) => {
  return (
    <Formik
      initialValues={{
        name: card ? card.name : "",
        number: card ? card.number : "",
        cryptogram: card ? card.cryptogram : "",
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
            label="Nom de la carte"
            id="name"
            name="name"
            placeholder="John Doe"
            errorType={errors.name}
            touchedType={touched.name}
          />

          <FormField
            style="w-5/6 mb-5"
            label="Numéro de la carte"
            id="number"
            name="number"
            placeholder="1234567891011121"
            errorType={errors.number}
            touchedType={touched.number}
          />

          <div className="flex items-center justify-center w-5/6 mb-5">
            <div className="w-1/2 flex flex-col items-start mr-5">
              <label htmlFor="expirationDate">Date de validité</label>
              <input
                type="date"
                name="expirationDate"
                id="expirationDate"
                className={`border-2 rounded py-1 px-2 w-full ${
                  errors.number && touched.number && "border-red-600"
                }`}
              />
            </div>

            <FormField
              style="w-1/2 flex-1"
              label="Cryptogramme"
              id="cryptogram"
              name="cryptogram"
              placeholder="Doe"
              errorType={errors.cryptogram}
              touchedType={touched.cryptogram}
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
