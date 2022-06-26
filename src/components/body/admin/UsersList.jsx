import Link from "next/link"
import { useState, useEffect, useContext } from "react"
import swal from "sweetalert"
import CircularProgress from "@mui/material/CircularProgress"
import { FiAlertTriangle } from "react-icons/fi"
import AppContext from "../../AppContext"
import api from "../../services/api"

const UsersList = () => {
  const { router, session } = useContext(AppContext)
  const [users, setUsers] = useState(null)
  const [apiError, setApiError] = useState(null)

  let accountId = null

  if (session) {
    accountId = JSON.parse(session).id
  }

  useEffect(() => {
    api
      .get("/customer")
      .then((response) => setUsers(response.data))
      .catch((err) => {
        if (err.response.status === 404) {
          err.response.data = { error: "Non trouvé" }
        }

        setApiError(err.response.data.error)
      })
  }, [])

  const deleteUser = async (accountId) => {
    await api.delete(`/customer?id=${accountId}`)
    setTimeout(() => {
      router.reload()
    }, 1000)
  }

  if (apiError) {
    return (
      <div className="w-full flex items-center justify-center mt-10 p-5 bg-red-200 rounded">
        <p className="text-3xl font-bold flex items-center justify-center text-red-600">
          <FiAlertTriangle className="text-5xl mr-3" />
          {apiError}
        </p>
      </div>
    )
  }

  if (!users) {
    return (
      <div className="flex items-center justify-center">
        <CircularProgress
          sx={{
            color: "#cc0023",
          }}
        />
        <p className="ml-3">Chargement des utilisateurs...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <table className="w-5/6 mb-5">
        <thead>
          <tr className="bg-slate-500 text-left">
            <th className="border pl-3 p-2 font-bold text-white">Nom</th>
            <th className="border pl-3 p-2 font-bold text-white">E-mail</th>
            <th className="border pl-3 p-2 font-bold text-white">Adresse</th>
            <th className="border pl-3 p-2 font-bold text-white">Rôle</th>
            <th className="border"></th>
          </tr>
        </thead>
        <tbody>
          {users.map((item, index) => (
            <tr
              key={item.id}
              className={`font-bold ${index % 2 ? "bg-gray-100" : "bg-white"}`}
            >
              {item.firstName && item.name ? (
                <td className="pl-3 border-l">
                  {item.firstName} {item.name}
                </td>
              ) : (
                <td className="pl-3 border-l text-red-600">Pas de nom</td>
              )}

              <td className="pl-3">{item.mail}</td>
              {item.address && item.postalCode && item.city ? (
                <td className="pl-3">
                  {item.address} {item.postalCode}, {item.city}
                </td>
              ) : (
                <td className="pl-3 text-red-600">Pas encore d'adresse</td>
              )}
              <td className="pl-3">
                {item.admin ? "Administrateur" : "Utilisateur"}
              </td>
              <td className="flex items-center justify-center border-x p-1">
                {!item.admin || accountId === item.id ? (
                  <Link
                    href={`/administration/users/${item.id}/modify`}
                    passHref
                  >
                    <button className="p-1 mr-1 w-1/2 rounded bg-blue-600 text-white transition-all hover:bg-blue-300">
                      Modifier
                    </button>
                  </Link>
                ) : (
                  <button
                    className="p-1 mr-1 w-1/2 rounded bg-blue-300 text-white cursor-not-allowed"
                    title="Vous ne pouvez pas modifier un autre administrateur"
                  >
                    Modifier
                  </button>
                )}

                {item.admin && accountId !== item.id ? (
                  <button
                    className="p-1 w-1/2 rounded bg-red-300 text-white cursor-not-allowed"
                    title="Vous ne pouvez pas supprimer un autre administrateur"
                  >
                    Supprimer
                  </button>
                ) : (
                  <button
                    className="p-1 w-1/2 rounded bg-red-600 text-white transition-all hover:bg-red-300"
                    onClick={() => {
                      swal({
                        title: `Vous êtes sûr de vouloir supprimer l'utilisateur "${item.mail}" ?`,
                        text: "Cette action est définitive !",
                        icon: "warning",
                        buttons: ["Non", "Oui"],
                        dangerMode: true,
                      }).then((willDelete) => {
                        if (willDelete) {
                          swal({
                            title: `L'utilisateur "${item.mail}" à été supprimée`,
                            icon: "success",
                          })
                          deleteUser(item.id)
                        }
                      })
                    }}
                  >
                    Supprimer
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot className="bg-slate-500 text-left">
          <tr>
            <td className="border pl-3 p-2 font-bold text-white">Nom</td>
            <td className="border pl-3 p-2 font-bold text-white">E-mail</td>
            <td className="border pl-3 p-2 font-bold text-white">Adresse</td>
            <td className="border pl-3 p-2 font-bold text-white">Rôle</td>
            <td className="border"></td>
          </tr>
        </tfoot>
      </table>
      <Link href="/administration/users/add" passHref>
        <button className="p-3 w-1/6 mb-5 rounded bg-green-600 text-white transition-all hover:bg-green-300">
          Ajouter un utilisateur
        </button>
      </Link>
    </div>
  )
}

export default UsersList
