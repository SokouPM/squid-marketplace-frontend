import Link from "next/link";
import Image from "next/image";
import Page from "/src/components/Pages";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import FormField from "../src/components/body/FormField";
import PasswordField from "../src/components/body/customFields/PasswordField";
import GoogleButton from "../src/components/body/GoogleButton";
import FacebookButton from "../src/components/body/FacebookButton";
import styles from "/styles/Register.module.css";

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
    passwordConfirm: Yup.string()
      .oneOf(
        [Yup.ref("password"), null],
        "Les mots de passe doivent correspondre"
      )
      .required("Le champ est requis !"),
  });

  return (
    <Page>
      <div className={styles.registerPage}>
        <div className={styles.connectRegisterWindow}>
          <Formik
            initialValues={{
              email: "",
              password: "",
              passwordConfirm: "",
            }}
            validationSchema={displayingErrorMessagesSchema}
            onSubmit={(values) => {
              alert(JSON.stringify(values, null, 2)); // TODO
            }}
          >
            {({ errors, touched }) => (
              <Form className={styles.registerSide}>
                <h2>Créez un compte</h2>
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
                <FormField
                  style={styles.normalField}
                  label="Confirmer le mot de passe"
                  type={PasswordField}
                  id="passwordConfirm"
                  name="passwordConfirm"
                  placeholder="Identique au mot de passe"
                  errorType={errors.passwordConfirm}
                  touchedType={touched.passwordConfirm}
                />
                <button type="submit">Inscription</button>
                <span className={styles.or}>---- ou ----</span>
                <GoogleButton />
                <FacebookButton />
              </Form>
            )}
          </Formik>
          <div className={styles.connectSide}>
            <Image src="/logo.png" alt="logo" width={200} height={160} />
            <p className="registerText">
              Vous avez compte ? <br />
              <Link href="/connexion">
                <a>Cliquez ici</a>
              </Link>{" "}
              pour vous connecter
            </p>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default connexion;
