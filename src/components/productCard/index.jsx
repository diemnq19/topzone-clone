import { Card } from "antd";
import React from "react";

const ProductCard = ({ image, title, price, percentDiscount, unit }) => {
  return (
    <Card
      hoverable
      cover={<img src={image} alt={title} />}
      className="w-fit max-w-[280px] text-center bg-black/70 border-none hover:bg-black/20 pt-12"
    >
      <Card.Meta
        title={<h2 className="text-white whitespace-normal">{title}</h2>}
        description={
          <p className="text-white/80 tracking-widest">
            <span className={`${percentDiscount ? "line-through" : ""}`}>
              {price.toLocaleString("vi-vn")}
              <span className="underline">{unit}</span>
            </span>
            {percentDiscount !== 0 && (
              <span className="ml-2">
                {((price * (100 - percentDiscount)) / 100).toLocaleString(
                  "vi-vn"
                )}
                <span className="underline">{unit}</span>
              </span>
            )}
          </p>
        }
      />
    </Card>
  );
};

export default ProductCard;
