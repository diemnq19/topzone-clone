import { Card } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ image, title, price, percentDiscount, unit, id, brand }) => {
  const navigate = useNavigate();
  return (
    <Card
      hoverable
      cover={<img src={image} alt={title} />}
      className="w-fit max-w-[280px] text-center bg-black/70 border-none hover:bg-black/20 pt-12"
      onClick={() => navigate(`/${brand.toLowerCase()}/${id}`)}
    >
      <Card.Meta
        title={<h2 className="text-white whitespace-normal">{title}</h2>}
        description={
          <p className="text-white/80 tracking-widest">
            <span className={`${+percentDiscount ? "line-through" : ""}`}>
              {price.toLocaleString("en-US")}
              <span className="">{unit}</span>
            </span>
            {+percentDiscount !== 0 && (
              <span className="ml-2">
                {((price * (100 - percentDiscount)) / 100).toLocaleString(
                  "vi-vn"
                )}
                <span className="">{unit}</span>
              </span>
            )}
          </p>
        }
      />
    </Card>
  );
};

export default ProductCard;
