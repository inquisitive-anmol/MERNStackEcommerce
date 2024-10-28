import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";
const ProductCard = ({ product }) => {
  const options = {
    value: product.ratings,
    readOnly: true,
    size: "small",
    precision: 0.5,
  };

  return (
    <Link
      className="w-[20vmax] lg:w-[15vmax] rounded-t pb-2"
      to={`/product/${product._id}`}
    >
      <div className="w-full h-full" shadow="sm" key={product.name} isPressable>
        <div className="overflow-visible p-0">
          <img
            shadow="sm"
            radius="lg"
            width="100%"
            alt={product.name}
            className="w-full object-cover h-[16.125vmax] bg-center bg-cover rounded-t"
            src={product.images[0].url}
          />
        </div>
        <div className="text-small justify-between items-center">
          <div className="w-full flex flex-col justify-center items-start">
            <div className="w-full flex flex-col justify-between lg:gap-1 items-start px-1">
              <p className="text-lg text-textColor font-semibold hover:text-black">
                {product.name}
              </p>
              <p className="flex justify-center items-center">
                <p className="flex justify-center items-center">
                  <Rating {...options} />
                </p>
                <p className="flex justify-center items-center">
                  <span className="font-normal">({product.numOfReviews})</span>
                </p>
              </p>
            </div>
            <p className="font-normal text-left lg:mt-1 text-accentColor text-md lg:text-lg hover:text-[#FF3C00] pl-1">
              Rs. {product.variants[0].shoocartPrice}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
