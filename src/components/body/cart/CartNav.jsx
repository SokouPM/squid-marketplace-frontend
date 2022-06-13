const CartNav = ({ cartStepNb }) => {
  return (
    <div className="flex items-center justify-evenly w-1/2 mx-auto mb-4">
      <p
        className={`border ${
          cartStepNb === 1
            ? "bg-secondary text-white border-secondary"
            : "border"
        } rounded-full px-4 py-2`}
      >
        1
      </p>
      <hr className="h-1 w-full" />
      <p
        className={`border ${
          cartStepNb === 2
            ? "bg-secondary text-white border-secondary"
            : "border"
        } rounded-full px-4 py-2`}
      >
        2
      </p>
      <hr className="h-1 w-full" />
      <p
        className={`border ${
          cartStepNb === 3
            ? "bg-secondary text-white border-secondary"
            : "border"
        } rounded-full px-4 py-2`}
      >
        3
      </p>
      <hr className="h-1 w-full" />
      <p
        className={`border ${
          cartStepNb === 4
            ? "bg-secondary text-white border-secondary"
            : "border"
        } rounded-full px-4 py-2`}
      >
        4
      </p>
    </div>
  )
}

export default CartNav
