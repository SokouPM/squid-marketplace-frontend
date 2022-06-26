import { GiSquid } from "react-icons/gi"

const StockRender = ({ stockNumber }) => {
  const alertLimitNb = 10

  if (stockNumber > alertLimitNb) {
    return (
      <p className="flex items-center justify-end font-bold text-green-700">
        <GiSquid className="mr-1 text-xl" /> En stock
      </p>
    )
  }

  if (stockNumber <= alertLimitNb && stockNumber > 0) {
    return (
      <p className="flex items-center justify-end font-bold text-yellow-500">
        <GiSquid className="mr-1 text-xl" /> Plus que {stockNumber} en stock
      </p>
    )
  }

  if (stockNumber <= 0) {
    return (
      <p className="flex items-center justify-end font-bold text-red-600">
        <GiSquid className="mr-1 text-xl" /> L’article n’est plus disponible
      </p>
    )
  }
}

export default StockRender
