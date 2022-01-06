import Link from "next/link";
import { BsArrowLeftSquareFill } from "react-icons/bs";
import styles from "/styles/components/body/GoHomeLink.module.css";

const GoHomeLink = () => {
  return (
    <Link href="/">
      <a className={styles.goHomeLink}>
        <BsArrowLeftSquareFill /> Revenir à la page d&apos;accueil
      </a>
    </Link>
  );
};

export default GoHomeLink;
