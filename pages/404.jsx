import Page from "/src/components/Pages";
import Image from "next/image";
import Link from "next/link";
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
        <p>Oups, la page demandée n&apos;existe pas.</p>
        <p>
          <Link href="/">
            <a>Cliquez ici</a>
          </Link>{" "}
          pour revenir sur la page d&apos;accueil
        </p>
      </div>
    </Page>
  );
};

export default NotFound;
