import Link from "next/link"
import swal from "sweetalert"
import orders from "../../../datas/orders.json"

const OrdersList = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <table className="mb-5">
        <thead>
          <tr className="bg-slate-500 text-left">
            <th className="border pl-3 p-2 font-bold text-white">
              N° de commande
            </th>
            <th className="border pl-3 p-2 font-bold text-white">Prix</th>
            <th className="border"></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((item, index) => (
            <tr
              key={item.id}
              className={`font-bold ${index % 2 ? "bg-gray-100" : "bg-white"}`}
            >
              <td className="w-1/6 pl-3 border-x">smp.{item.id}</td>
              <td className="p-3 border-x whitespace-nowrap">{item.price} €</td>
              <td className="flex items-center justify-center border-x p-1">
                <Link
                  href={`/administration/orders/${item.id}/download`}
                  passHref
                >
                  <button className="p-1 mr-1 w-1/2 rounded bg-blue-600 text-white transition-all hover:bg-blue-300">
                    Télécharger la facture
                  </button>
                </Link>
                <button
                  className="p-1 w-1/2 rounded bg-red-600 text-white transition-all hover:bg-red-300"
                  onClick={() => {
                    swal({
                      title: `Vous êtes sûr de vouloir supprimer la commande "smp.${item.id}" ?`,
                      text: "Cette action est définitive !",
                      icon: "warning",
                      buttons: ["Non", "Oui"],
                      dangerMode: true,
                    }).then((willDelete) => {
                      if (willDelete) {
                        swal({
                          title: `La commande "smp.${item.id}" à été supprimée`,
                          icon: "success",
                        })
                        setTimeout(() => {
                          alert(`deleted order : ${item.id}`) // TODO
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
            <th className="border pl-3 p-2 font-bold text-white">
              N° de commande
            </th>
            <th className="border pl-3 p-2 font-bold text-white">Prix</th>
            <td className="border"></td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}

export default OrdersList
