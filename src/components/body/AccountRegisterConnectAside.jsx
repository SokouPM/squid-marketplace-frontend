import Image from "next/image";
import Link from "next/link";
import styles from "/styles/components/body/AccountRegConAside.module.css";

const AccountRegisterConnectAside = (props) => {
  return (
    <aside className={styles.mainBlock}>
      <Image src="/logo.png" alt="logo" width={180} height={150} />
      <p className="registerText">
        {props.text1} <br />
        <Link href={props.link}>
          <a>Cliquez ici</a>
        </Link>{" "}
        {props.text2}
      </p>
    </aside>
  );
};

export default AccountRegisterConnectAside;
