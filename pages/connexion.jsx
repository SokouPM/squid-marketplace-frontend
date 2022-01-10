import Page from "/src/components/Pages";
import { Form, Formik } from "formik";
import * as Yup from "yup";
// Custom components
import GoHomeLink from "/src/components/body/GoHomeLink";
import AccountRegisterConnectAside from "/src/components/body/AccountRegisterConnectAside";
import FormField from "/src/components/body/FormField";
import PasswordField from "/src/components/body/customFields/PasswordField";
import CheckboxField from "/src/components/body/customFields/CheckboxField";
import GoogleButton from "/src/components/body/GoogleButton";
import FacebookButton from "/src/components/body/FacebookButton";
// Style
import styles from "/styles/Connect.module.css";

const connexion = () => {
  const displayingErrorMessagesSchema = Yup.object().shape({
    email: Yup.string()
      .email("Le mail est invalide !")
      .required("Le champ est requis !"),
    password: Yup.string().required("Le champ est requis !"),
  });

  return (
    <Page>
      <div className={styles.connectPage}>
        <GoHomeLink />
        <div className={styles.connectRegisterWindow}>
          <AccountRegisterConnectAside
            text1="Pas encore inscrit ?"
            link="/inscription"
            text2="pour créer un compte."
          />
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={displayingErrorMessagesSchema}
            onSubmit={(values) => {
              alert(JSON.stringify(values, null, 2)); // TODO
            }}
          >
            {({ errors, touched }) => (
              <Form className={styles.connectSide}>
                <h2>Connectez-vous</h2>
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
                  placeholder="Votre mot de passe"
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
                <span className={styles.or}>---- ou ----</span>
                <GoogleButton />
                <FacebookButton />
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Page>
  );
};

export default connexion;
