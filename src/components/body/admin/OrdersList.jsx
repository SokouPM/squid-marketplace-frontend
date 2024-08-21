import Link from "next/link"
import { useEffect, useState } from "react"
import CircularProgress from "@mui/material/CircularProgress"
import { FiAlertTriangle } from "react-icons/fi"
import { supabase } from "../../../utils/supabase"

const OrdersList = () => {
  const [orders, setOrders] = useState(null)
  const [apiError, setApiError] = useState(null)

  useEffect(() => {
    !orders && getOrders()
  }, [orders])

  const getOrders = async () => {
    const { data, error } = await supabase
      .from("order")
      .select("id, totalPrice:total_price")

    error && setApiError(error.message)
    data && setOrders(data)
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

  if (!orders) {
    return (
      <div className="flex items-center justify-center">
        <CircularProgress
          sx={{
            color: "#cc0023",
          }}
        />
        <p className="ml-3">Chargement des commandes...</p>
      </div>
    )
  }

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
              <td className=" pl-3 border-x whitespace-nowrap">
                {item.totalPrice} €
              </td>
              <td className="flex items-center justify-center border-x">
                <Link href={`/administration/orders/${item.id}/download`}>
                  <a className="p-1 mr-1 w-1/2 rounded bg-blue-600 text-white text-center transition-all hover:bg-blue-300">
                    Télécharger la facture
                  </a>
                </Link>
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
