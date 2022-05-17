import Link from "next/link"
import { useContext } from "react"
import AppContext from "../AppContext"

const BreadCrumbs = ({ homelink }) => {
  const { router } = useContext(AppContext)
  const pathTab = router.asPath.split("/")
  pathTab[0] = homelink ? homelink : "Accueil"

  let link = ""

  return (
    <ul className="flex items-center font-bold text-xl text-secondary border-b-2 border-secondary py-2 mb-3">
      {pathTab.map((item, index) => (
        <li key={index} className="flex items-center">
          {index !== 0 && item !== "" && <span className="mx-2">/</span>}
          <Link href={index !== 0 ? (link += `/${item}`) : "/"}>
            <a className="capitalize">{item}</a>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default BreadCrumbs
