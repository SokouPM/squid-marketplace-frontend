import { useRouter } from "next/router"
import Link from "next/link"

const BreadCrumbs = ({ pagelink }) => {
  const router = useRouter()
  const breadcrumbsTab = router.pathname.split("/")
  breadcrumbsTab[0] = pagelink ? pagelink : "Accueil"

  let link = ""

  return (
    <ul className="flex items-center font-bold text-lg text-secondary border-b-2 border-secondary py-1 mb-3">
      {breadcrumbsTab.map((item, index) => (
        <li key={index} className="flex items-center">
          {index !== 0 && item !== "" && <span className="mx-2">/</span>}
          <Link href={index !== 0 ? (link += `/${item}`) : "/"}>
            <a>{item}</a>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default BreadCrumbs
