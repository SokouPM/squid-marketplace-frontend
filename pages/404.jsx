import Link from "next/link"
import Image from "next/image"
import Layout from "../src/components/Layout"

const NotFoundPage = () => {
  return (
    <Layout page="404" fullheight={1}>
      <div className="pt-6 flex flex-col items-center justify-center text-4xl font-bold">
        <Image
          src="/not_found.png"
          alt="logo page non trouvé squid"
          width={450}
          height={530}
        />
        <p className="mt-5">Oups, la page demandée n'existe pas.</p>
        <p>
          <Link href="/">
            <a className="text-secondary hover:underline">Cliquez ici</a>
          </Link>{" "}
          pour revenir sur la page d'accueil
        </p>
      </div>
    </Layout>
  )
}

export default NotFoundPage
