import { Card } from "antd";
import { data as CardData } from "../../constant/imageCard";
import { useNavigate } from "react-router-dom";

const MenuCard = () => {
    const navigate = useNavigate()
  return (
    <div className="flex flex-wrap w-full justify-center gap-4 pb-20">
      {CardData.map((data, index) => (
        <Card
          key={index}
          hoverable
          cover={<img src={data.image} alt={data.title} />}
          className="md:w-[200px] max-sm:w-[100px]  text-center bg-black/70 border-none text-white hover:bg-black/20"
          onClick={() => navigate(`/${data.title.toLowerCase()}`)}
        >
          <p>{data.title}</p>
        </Card>
      ))}
    </div>
  );
};

export default MenuCard;
