import React from "react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";
const ProductCard = ({ product }) => {
  

  const options = {
    value: product.ratings,
readOnly: true,
    size: "medium",
    precision: 0.5,
  };

  return (
      <Link className="w-[18vmax] h-[23.125vmax] rounded-t" to={`/product/${product._id}`}>
        <div
          className="w-full h-full"
          shadow="sm"
          key={product.name}
          isPressable
          onPress={() => console.log("item pressed")}
        >
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
              <div className="w-full flex justify-between items-center">
                <p className="text-xl text-textColor font-semibold hover:text-black">
                  {product.name}
                </p>
                <p className="flex justify-center items-center gap-2">
                  <p>
                    <Rating {...options}/>
                  </p>
                  <p>
                    <span className="font-medium">({product.numOfReviews})</span>
                  </p>
                </p>
              </div>
              <p className="font-medium mt-2 text-left text-accentColor text-lg hover:text-[#FF3C00]">
                Rs. {product.price}
              </p>
            </div>
          </div>
        </div>
      </Link>
  );
};

export default ProductCard;
