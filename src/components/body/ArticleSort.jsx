import { useState } from "react"
import Slider from "@mui/material/Slider"
import { ImCross } from "react-icons/im"
import ArticleList from "./ArticleList"

function valuetext(value) {
  return `${value}`
}

const ArticleSort = ({ articlesArray, apiError }) => {
  const [value, setValue] = useState([20, 37])
  const colors = [
    { value: "red", name: "Rouge", taiwindClass: "bg-red-600" },
    { value: "orange", name: "Orange", taiwindClass: "bg-orange-600" },
    { value: "yellow", name: "Jaune", taiwindClass: "bg-yellow-400" },
    { value: "green", name: "Vert", taiwindClass: "bg-green-600" },
    { value: "blue", name: "Bleu", taiwindClass: "bg-blue-600" },
    { value: "violet", name: "Violet", taiwindClass: "bg-violet-600" },
    { value: "rose", name: "Rose", taiwindClass: "bg-rose-600" },
    { value: "gray", name: "Gris", taiwindClass: "bg-gray-400" },
    { value: "white", name: "Blanc", taiwindClass: "bg-white" },
    { value: "black", name: "Noir", taiwindClass: "bg-black" },
  ]

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <>
      <div className="border rounded mb-5">
        <div className="w-full flex items-center justify-center border-2 rounded border-secondary py-2 px-8">
          <div className="w-1/3 mr-4">
            <div className="flex items-center justify-between font-bold">
              <p>Prix min.</p>
              <p>Prix max.</p>
            </div>
            <div>
              <Slider
                getAriaLabel={() => "Gamme de prix"}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
              />
            </div>
          </div>

          <div className="mx-4 w-1/4 flex flex-wrap items-center justify-center">
            {colors.map((item, index) => (
              <label key={index} className="cursor-pointer mx-2 my-2">
                <input
                  type="radio"
                  name="color-radio"
                  value={item.value}
                  className="colorRadio hidden"
                />
                <div
                  className={`colorImg h-10 w-10 rounded-full border-2 ${item.taiwindClass} transition-all hover:scale-125`}
                ></div>
              </label>
            ))}
            <label className="cursor-pointer mx-2 my-2">
              <input
                type="radio"
                name="color-radio"
                value={undefined}
                className="colorRadio hidden"
                defaultChecked
              />
              <div className="colorImg h-10 w-10 rounded-full border-2 flex items-center justify-center transition-all hover:border-4 hover:scale-125">
                <ImCross className="text-slate-500" />
              </div>
            </label>
          </div>

          <div className="w-1/3 flex items-center justify-center">
            <select
              name="sorting"
              className="w-full p-2 rounded cursor-pointer bg-gray-200"
            >
              <option value="ascendingPrice">Prix croissant</option>
              <option value="decreasingPrice">Prix décroissant</option>
              <option value="name">Nom</option>
              <option value="note">Note Client</option>
            </select>
          </div>
        </div>
      </div>

      <ArticleList sortedArticles={articlesArray} apiError={apiError} />
    </>
  )
}

export default ArticleSort
