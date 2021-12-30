/* eslint-disable react/no-unescaped-entities */
import Page from "/src/components/Pages";
import Image from "next/image";
import styles from "/styles/404.module.css";

const NotFound = () => {
  return (
    <Page>
      <div className={styles.notFoundPage}>
        <Image
          src="/not_found.png"
          alt="logo page non trouvé squid"
          width={450}
          height={530}
        />
        <h2>Oups, la page demandée n'existe pas.</h2>
      </div>
    </Page>
  );
};

export default NotFound;
