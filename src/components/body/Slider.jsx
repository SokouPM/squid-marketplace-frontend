import { Splide, SplideSlide } from "@splidejs/react-splide"
import "@splidejs/splide/dist/css/splide.min.css"

const Slider = () => {
  return (
    <Splide
      options={{
        type: "loop",
        padding: "10rem",
        height: "30rem",
        focus: "center",
        autoplay: true,
      }}
    >
      <SplideSlide>
        <img src="https://place-hold.it/1600x600" alt="Image 1" />
      </SplideSlide>
    </Splide>
  )
}

export default Slider
