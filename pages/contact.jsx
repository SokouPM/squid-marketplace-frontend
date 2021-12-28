import Page from "../src/components/Pages";
import styles from "../styles/Contact.module.css";

const Contact = () => {
  return (
    <Page>
      <div className={styles.contactPage}>
        <form action="#">
          <div className={styles.formGroup}>
            <label htmlFor="name">Nom</label>
            <input
              type="text"
              id="name"
              name="name"
              maxLength="150"
              pattern="[A-Za-zÀ-ÿ ]{1,150}"
              required="required"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="mail">Email</label>
            <input
              type="mail"
              id="mail"
              name="mail"
              maxLength="150"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
              required="required"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="subject">Sujet</label>
            <input
              type="text"
              id="subject"
              name="subject"
              maxLength="150"
              pattern="[A-Za-zÀ-ÿ ]{1,150}"
              required="required"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              maxLength="150"
              pattern="[A-Za-zÀ-ÿ0-9 ]{1,150}"
              required="required"
            ></textarea>
          </div>
          <button>Envoyer</button>
        </form>
      </div>
    </Page>
  );
};

export default Contact;
