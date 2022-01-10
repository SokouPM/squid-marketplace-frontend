import Page from "/src/components/Pages";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import FormField from "/src/components/body/FormField";
import styles from "/styles/Contact.module.css";

const Contact = () => {
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
  });

  return (
    <Page>
      <div className={styles.contactPage}>
        <fieldset>
          <legend>Contactez-nous</legend>

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
              alert(JSON.stringify(values, null, 2)); // TODO
              router.push({ pathname: "/" });
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <div className={styles.formLine}>
                  <FormField
                    style={styles.normalField}
                    label="Prénom"
                    id="firstname"
                    name="firstname"
                    placeholder="Votre prénom"
                    errorType={errors.firstname}
                    touchedType={touched.firstname}
                  />
                  <FormField
                    style={styles.normalField}
                    label="Nom"
                    id="lastname"
                    name="lastname"
                    placeholder="Votre nom"
                    errorType={errors.lastname}
                    touchedType={touched.lastname}
                  />
                </div>
                <div className={styles.formLine}>
                  <FormField
                    style={styles.normalField}
                    label="Email"
                    id="email"
                    name="email"
                    placeholder="exemple@mail.com"
                    errorType={errors.email}
                    touchedType={touched.email}
                  />
                  <FormField
                    style={styles.normalField}
                    label="Sujet"
                    id="subject"
                    name="subject"
                    placeholder="Le sujet de votre message"
                    errorType={errors.subject}
                    touchedType={touched.subject}
                  />
                </div>
                <FormField
                  style={styles.normalField}
                  label="Message"
                  type="textarea"
                  id="message"
                  name="message"
                  placeholder="Votre message"
                  errorType={errors.message}
                  touchedType={touched.message}
                />
                <button type="submit">Submit</button>
              </Form>
            )}
          </Formik>
        </fieldset>
      </div>
    </Page>
  );
};

export default Contact;
