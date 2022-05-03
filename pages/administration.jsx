import Link from "next/link"
import { useState } from "react"
import { MdOutlineCategory, MdOutlineArticle } from "react-icons/md"
import { FiUsers } from "react-icons/fi"
import Layout from "../src/components/Layout"

const AdministrationPage = () => {
  const [info, setInfo] = useState(null)

  return (
    <Layout
      page="Administration"
      fullwidth={1}
      diplayadminheader={1}
      diplayfooter={1}
    >
      <div className="flex flex-col items-center justify-center my-10 pb-10 border-b-2">
        <div className="flex items-center justify-center w-1/2">
          <Link href="/administration/categories">
            <a
              onMouseEnter={() => {
                setInfo(
                  "Ajouter, modifier, supprimer ou afficher la liste des catégories"
                )
              }}
              onMouseLeave={() => {
                setInfo(null)
              }}
              className="flex items-center justify-center border-2 rounded-lg w-1/2 py-4 m-3 text-lg bg-blue-500 text-white transition-all hover:scale-110 hover:drop-shadow-xl"
            >
              <MdOutlineCategory className="text-3xl mr-2" />
              Gestion des catégories
            </a>
          </Link>
          <Link href="/administration/invoices">
            <a
              onMouseEnter={() => {
                setInfo("Afficher la liste des factures")
              }}
              onMouseLeave={() => {
                setInfo(null)
              }}
              className="flex items-center justify-center border-2 rounded-lg w-1/2 py-4 m-3 text-lg bg-blue-500 text-white transition-all hover:scale-110 hover:drop-shadow-xl"
            >
              <MdOutlineCategory className="text-3xl mr-2" />
              Gestion des factures
            </a>
          </Link>
        </div>
        <div className="flex items-center justify-center w-1/2">
          <Link href="/administration/articles">
            <a
              onMouseEnter={() => {
                setInfo(
                  "Ajouter, modifier, supprimer ou afficher la liste des articles"
                )
              }}
              onMouseLeave={() => {
                setInfo(null)
              }}
              className="flex items-center justify-center border-2 rounded-lg w-1/2 py-4 m-3 text-lg bg-blue-500 text-white transition-all hover:scale-110 hover:drop-shadow-xl"
            >
              <MdOutlineArticle className="text-3xl mr-2" />
              Gestion des articles
            </a>
          </Link>
          <Link href="/administration/users">
            <a
              onMouseEnter={() => {
                setInfo(
                  "Ajouter, modifier, supprimer ou afficher la liste des utilisateurs"
                )
              }}
              onMouseLeave={() => {
                setInfo(null)
              }}
              className="flex items-center justify-center border-2 rounded-lg w-1/2 py-4 m-3 text-lg bg-blue-500 text-white transition-all hover:scale-110 hover:drop-shadow-xl"
            >
              <FiUsers className="text-3xl mr-2" />
              Gestion des utilisateurs
            </a>
          </Link>
        </div>
      </div>

      {info && <div className="text-center text-2xl font-bold">{info}</div>}
    </Layout>
  )
}

export default AdministrationPage
