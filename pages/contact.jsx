import Page from "/src/components/Pages";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import FiAlertTriangle from "react-icons/fi";
import styles from "/styles/Contact.module.css";

const Contact = () => {
  const DisplayingErrorMessagesSchema = Yup.object().shape({
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
      .max(150, "Le champ doit contenir maximum 150 caractères !")
      .required("Le champ est requis !"),
  });

  return (
    <Page>
      <div className={styles.contactPage}>
        <Formik
          initialValues={{
            name: "",
            email: "",
            subject: "",
            message: "",
          }}
          validationSchema={DisplayingErrorMessagesSchema}
          onSubmit={(values) => {
            alert(JSON.stringify(values, null, 2));
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className={styles.formGroup}>
                <label htmlFor="name">Nom</label>
                <div className={styles.formLine}>
                  <Field id="name" name="name" />
                  {touched.name && errors.name && (
                    <div className={styles.errorField}>{errors.name}</div>
                  )}
                </div>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <div className={styles.formLine}>
                  <Field id="email" name="email" />
                  {touched.email && errors.email && (
                    <div className={styles.errorField}>{errors.email}</div>
                  )}
                </div>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="subject">Sujet</label>
                <div className={styles.formLine}>
                  <Field id="subject" name="subject" />
                  {touched.subject && errors.subject && (
                    <div className={styles.errorField}>{errors.subject}</div>
                  )}
                </div>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="message">Message</label>
                <Field as="textarea" id="message" name="message" />
                {touched.message && errors.message && (
                  <div className={styles.errorFieldII}>{errors.message}</div>
                )}
              </div>
              <button type="submit">Submit</button>
            </Form>
          )}
        </Formik>
      </div>
    </Page>
  );
};

export default Contact;
