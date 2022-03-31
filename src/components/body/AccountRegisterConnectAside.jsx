import Image from "next/image"
import Link from "next/link"

const AccountRegisterConnectAside = (props) => {
  return (
    <aside className="bg-secondary flex flex-col items-center justify-center w-2/6">
      <span>
        <Image src="/logoBig.png" alt="logo" width={180} height={150} />
      </span>

      <p className="text-white font-bold text-center text-lg">
        {props.text1} <br />
        <Link href={props.link}>
          <a className="underline">Cliquez ici</a>
        </Link>{" "}
        {props.text2}
      </p>
    </aside>
  )
}

export default AccountRegisterConnectAside
