import { useState } from "react"
import Slider from "@mui/material/Slider"
import { ImCross } from "react-icons/im"
import Layout from "../src/components/Layout"
import ArticleList from "../src/components/body/ArticleList"
import colors from "../src/datas/colors"

function valuetext(value) {
  return `${value}`
}

const ArticlesPage = () => {
  const [value, setValue] = useState([20, 37])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Layout
      page="Articles"
      diplayheader={1}
      diplaybreadcrumbs={1}
      diplayfooter={1}
    >
      <div className="border rounded mb-5">
        <div className="w-full flex items-center justify-center border-2 rounded border-secondary py-2 px-8">
          <div className="w-1/3 mr-4">
            <Slider
              getAriaLabel={() => "Gamme de prix"}
              value={value}
              onChange={handleChange}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
            />
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
              className="w-full p-2 rounded cursor-pointer"
            >
              <option value="ascendingPrice">Prix croissant</option>
              <option value="decreasingPrice">Prix décroissant</option>
              <option value="name">Nom</option>
              <option value="note">Note Client</option>
            </select>
          </div>
        </div>

        <ArticleList />
      </div>
    </Layout>
  )
}

export default ArticlesPage
