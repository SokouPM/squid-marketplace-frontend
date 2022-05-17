import { Form, Formik, Field } from "formik"
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
    .min(1000000000000000n, "Le numéro n'est pas valide !")
    .max(9999999999999999n, "Le numéro n'est pas valide !")
    .required("Le champ est requis !"),
  cryptogram: Yup.number()
    .typeError("Le cryptogramme doit être un nombre")
    .min(100, "Le cryptogramme doit contenir 3 chiffres !")
    .max(999, "Le cryptogramme doit contenir 3 chiffres !")
    .required("Le champ est requis !"),
})

const monthRender = () => {
  const monthTab = []

  for (let i = 1; i <= 12; i++) {
    const name = i < 10 ? `0${i}` : i.toString()
    monthTab.push({ name: name, value: i })
  }

  return (
    <Field
      name="month"
      as="select"
      className="px-4 py-3 mr-2 rounded cursor-pointer font-bold "
    >
      {monthTab.map((item, index) => (
        <option key={index} value={item.value} name="role">
          {item.name}
        </option>
      ))}
    </Field>
  )
}

const yearRender = () => {
  const yearTab = []
  const actualYear = new Date().getFullYear()

  for (let i = actualYear; i <= actualYear + 10; i++) {
    yearTab.push(i)
  }

  return (
    <Field
      name="year"
      as="select"
      className="px-4 py-3 ml-2 rounded cursor-pointer font-bold "
    >
      {yearTab.map((item, index) => (
        <option key={index} value={item} name="role">
          {item}
        </option>
      ))}
    </Field>
  )
}

const AccountForm = () => {
  return (
    <Formik
      initialValues={{
        name: "",
        number: "",
        month: "01",
        year: new Date().getFullYear(),
        cryptogram: "",
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

          <div className="flex items-start justify-center w-5/6 mb-5">
            <div className="flex flex-col items-left justify-center w-4/6">
              <label htmlFor="category">Date d'expiration</label>
              <div className="w-1/2 flex items-center mr-5">
                {monthRender()}/{yearRender()}
              </div>
            </div>
            <FormField
              style="w-2/6 flex-1"
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
