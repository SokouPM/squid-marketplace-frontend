import Link from "next/link"
import { BsArrowLeftSquareFill } from "react-icons/bs"

const GoHomeLink = () => {
  return (
    <Link href="/">
      <a className="text-gray-500 flex items-center justify-center hover:underline mb-24">
        <BsArrowLeftSquareFill className="mr-3" /> Revenir à la page
        d&apos;accueil
      </a>
    </Link>
  )
}

export default GoHomeLink
