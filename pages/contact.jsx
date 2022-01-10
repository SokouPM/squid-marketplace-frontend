import Page from "/src/components/Pages";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import FormField from "/src/components/body/FormField";
import styles from "/styles/Contact.module.css";

const Contact = () => {
  const displayingErrorMessagesSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Le champ doit contenir minimum 2 caractères !")
      .max(150, "Le champ doit contenir maximum 150 caractères !")
      .matches(
        /^[a-zA-Z\s]*$/,
        "Le champ ne doit pas contenir de nombre ou de caractères spéciaux !"
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
              name: "",
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
                    id="name"
                    name="name"
                    placeholder="Votre prénom"
                    errorType={errors.name}
                    touchedType={touched.name}
                  />
                  <FormField
                    style={styles.normalField}
                    label="Nom"
                    id="name"
                    name="name"
                    placeholder="Votre nom"
                    errorType={errors.name}
                    touchedType={touched.name}
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
