import { useState } from "react"
import Slider from "@mui/material/Slider"
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
        <div className="w-full flex items-center border-2 rounded border-secondary py-2">
          <div className="w-2/3 flex items-center justify-evenly">
            <Slider
              getAriaLabel={() => "Gamme de prix"}
              value={value}
              onChange={handleChange}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
              className="w-4/12"
            />
            <select name="color" className="w-3/12">
              <option value={null}>Couleur</option>
              {colors.map((item, index) => (
                <option key={index} value={item.value}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="w-1/3 flex items-center justify-center">
            <select name="sorting" className="w-3/6">
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
