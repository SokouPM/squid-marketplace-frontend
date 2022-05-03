import Link from "next/link"
import swal from "sweetalert"
import categories from "../../../datas/categories.json"

const CategoriesList = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <table className="w-5/6 mb-5">
        <thead>
          <tr className="bg-slate-500 text-left">
            <th className="border pl-3 p-2 font-bold text-white">Nom</th>
            <th className="border"></th>
          </tr>
        </thead>
        <tbody>
          {categories.map((item, index) => (
            <tr
              key={item.id}
              className={`font-bold ${index % 2 ? "bg-gray-100" : "bg-white"}`}
            >
              <td className="w-5/6 pl-3 border-x">{item.name}</td>
              <td className="flex items-center justify-center border-x p-1">
                <Link
                  href={`/administration/categories/${item.id}/modify`}
                  passHref
                >
                  <button className="p-1 mr-1 w-1/2 rounded bg-blue-600 text-white transition-all hover:bg-blue-300">
                    Modifier
                  </button>
                </Link>
                <button
                  className="p-1 w-1/2 rounded bg-red-600 text-white transition-all hover:bg-red-300"
                  onClick={() => {
                    swal({
                      title: `Vous êtes sûr de vouloir supprimer la catégorie "${item.name}" ?`,
                      text: "Cette action est définitive !",
                      icon: "warning",
                      buttons: ["Non", "Oui"],
                      dangerMode: true,
                    }).then((willDelete) => {
                      if (willDelete) {
                        swal({
                          title: `La catégorie "${item.name}" à été supprimée`,
                          icon: "success",
                        })
                        setTimeout(() => {
                          alert(`deleted cetegory : ${item.id}`) // TODO
                        }, 1000)
                      }
                    })
                  }}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot className="bg-slate-500 text-left">
          <tr>
            <td className="border pl-3 p-2 font-bold text-white">Nom</td>
            <td className="border"></td>
          </tr>
        </tfoot>
      </table>
      <Link href="/administration/categories/add" passHref>
        <button className="p-3 w-1/6 mb-5 rounded bg-green-600 text-white transition-all hover:bg-green-300">
          Ajouter une catégorie
        </button>
      </Link>
    </div>
  )
}

export default CategoriesList
