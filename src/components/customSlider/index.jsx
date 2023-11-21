import { Carousel } from "antd";
import { data as images } from "../../constant/imageSlider";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import "./customSlider.css";

const CustomSlider = () => {
  // todo: click to navigate to route
  return (
    <Carousel
      autoplay
      autoplaySpeed={2000}
      swipeToSlide={true}
      dots={{ className: "h-4" }}
      arrows
      prevArrow={<LeftOutlined />}
      nextArrow={<RightOutlined />}
      rootClassName="custom-slider pb-20"
    >
      {images.map((image, index) => (
        <div key={index}>
          <img src={image.image} className="w-full max-h-[500px]" />
        </div>
      ))}
    </Carousel>
  );
};

export default CustomSlider;
