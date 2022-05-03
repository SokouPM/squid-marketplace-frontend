import Link from "next/link"
import swal from "sweetalert"
import users from "../../../datas/users.json"

const UsersList = () => {
  const usersId = 1

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
              <td className="pl-3 border-l">
                {item.firstName} {item.LastName}
              </td>
              <td className="pl-3">{item.mail}</td>
              <td className="pl-3">
                {item.adress} {item.postalCode}, {item.city}
              </td>
              <td className="pl-3">
                {item.isAdmin ? "Administrateur" : "Utilisateur"}
              </td>
              <td className="flex items-center justify-center border-x p-1">
                {!item.isAdmin || usersId === item.id ? (
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

                {item.isAdmin && usersId !== item.id ? (
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
                        title: `Vous êtes sûr de vouloir supprimer l'utilisateur "${item.firstName} ${item.LastName}" ?`,
                        text: "Cette action est définitive !",
                        icon: "warning",
                        buttons: ["Non", "Oui"],
                        dangerMode: true,
                      }).then((willDelete) => {
                        if (willDelete) {
                          swal({
                            title: `L'utilisateur "${item.firstName} ${item.LastName}" à été supprimée`,
                            icon: "success",
                          })
                          setTimeout(() => {
                            alert(`deleted user : ${item.id}`) // TODO
                          }, 1000)
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
