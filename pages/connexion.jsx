import Page from "/src/components/Pages";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import FormField from "../src/components/body/FormField";
import PasswordField from "../src/components/body/customFields/PasswordField";
import CheckboxField from "../src/components/body/customFields/CheckboxField";
import GoogleButton from "../src/components/body/GoogleButton";
import FacebookButton from "../src/components/body/FacebookButton";
import styles from "/styles/Connect.module.css";

const connexion = () => {
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
  });

  return (
    <Page>
      <div className={styles.connectPage}>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={displayingErrorMessagesSchema}
          onSubmit={(values) => {
            alert(JSON.stringify(values, null, 2)); // TODO
            router.push({ pathname: "/" });
          }}
        >
          {({ errors, touched }) => (
            <Form>
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
                label="Mot de passe"
                type={PasswordField}
                id="password"
                name="password"
                placeholder="1 majuscule, 1 minuscule, 1 nombre et entre 6 et 50 caractères"
                errorType={errors.password}
                touchedType={touched.password}
              />
              <div className={styles.formRow}>
                <FormField
                  style={styles.checkboxField}
                  label="Se souvenir de moi"
                  type={CheckboxField}
                  id="rememberMe"
                  name="rememberMe"
                />
                <button type="submit">Connexion</button>
              </div>
              <GoogleButton />
              <FacebookButton />
            </Form>
          )}
        </Formik>
      </div>
    </Page>
  );
};

export default connexion;
