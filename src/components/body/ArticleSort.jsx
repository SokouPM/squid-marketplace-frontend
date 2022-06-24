import { useState, useEffect } from "react"
import Slider from "@mui/material/Slider"
import { ImCross } from "react-icons/im"
import ArticleList from "./ArticleList"

const sortArticles = (
  articlesArray,
  sortType,
  colorSelected,
  priceFilterValues
) => {
  // price / name sorting
  if (articlesArray) {
    switch (sortType) {
      case "ascendingPrice":
        articlesArray.sort((a, b) => {
          return a.price - b.price
        })

        break

      case "decreasingPrice":
        articlesArray.sort((a, b) => {
          return b.price - a.price
        })

        break

      case "name":
        articlesArray.sort((a, b) => {
          if (a.name < b.name) {
            return -1
          }

          if (a.name > b.name) {
            return 1
          }

          return 0
        })

        break

      default:
        break
    }
  }

  // color sorting
  if (colorSelected && articlesArray) {
    articlesArray = articlesArray.filter((ell) => {
      return ell.color === colorSelected
    })
  }

  if (priceFilterValues && articlesArray) {
    articlesArray = articlesArray.filter((ell) => {
      return (
        ell.price >= priceFilterValues[0] && ell.price <= priceFilterValues[1]
      )
    })
  }

  return articlesArray
}

const ArticleSort = ({ articlesArray, apiError }) => {
  const [slideValues, setSlideValues] = useState([0, 100])
  const [sort, setSort] = useState("ascendingPrice")
  const [colorSelected, setColorSelected] = useState(null)
  const colors = [
    { value: "red", name: "Rouge", taiwindClass: "bg-red-600" },
    { value: "orange", name: "Orange", taiwindClass: "bg-orange-500" },
    { value: "yellow", name: "Jaune", taiwindClass: "bg-yellow-300" },
    { value: "green", name: "Vert", taiwindClass: "bg-green-600" },
    { value: "blue", name: "Bleu", taiwindClass: "bg-blue-600" },
    { value: "violet", name: "Violet", taiwindClass: "bg-violet-600" },
    { value: "rose", name: "Rose", taiwindClass: "bg-rose-400" },
    { value: "brown", name: "Maron", taiwindClass: "bg-yellow-900" },
    { value: "gray", name: "Gris", taiwindClass: "bg-gray-400" },
    { value: "white", name: "Blanc", taiwindClass: "bg-white" },
    { value: "black", name: "Noir", taiwindClass: "bg-black" },
  ]

  let maxPrice = 0
  let minPrice = Infinity

  if (articlesArray) {
    articlesArray.map((item) => {
      if (maxPrice < item.price) {
        maxPrice = item.price
      }

      if (minPrice > item.price) {
        minPrice = item.price
      }
    })
  }

  useEffect(() => {
    setSlideValues([minPrice, maxPrice])
  }, [maxPrice, minPrice])

  const handleSlideChange = (event, newValue) => {
    setSlideValues(newValue)
  }

  const sortedArticlesArray = sortArticles(
    articlesArray,
    sort,
    colorSelected,
    slideValues
  )

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
                value={slideValues}
                onChange={handleSlideChange}
                valueLabelDisplay="auto"
                min={minPrice || 0}
                max={maxPrice || 100}
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
                  onChange={(e) => {
                    setColorSelected(e.target.value)
                  }}
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
                onChange={(e) => {
                  setColorSelected(e.target.value)
                }}
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
              onChange={(e) => {
                setSort(e.target.value)
              }}
            >
              <option value="ascendingPrice">Prix croissant</option>
              <option value="decreasingPrice">Prix décroissant</option>
              <option value="name">Nom</option>
            </select>
          </div>
        </div>
      </div>

      <ArticleList sortedArticles={sortedArticlesArray} apiError={apiError} />
    </>
  )
}

export default ArticleSort
