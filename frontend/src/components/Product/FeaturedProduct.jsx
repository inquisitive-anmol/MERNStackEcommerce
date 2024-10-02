import React from "react";
import ProductCard from "../ui/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import CardSkeleton from "../ui/CardSkeleton";

const FeaturedProduct = ({loading, products, title, className}) => {


  return (
    <>
            <div className={`text-gray-700 w-full flex justify-center items-center flex-col p-1 ${className}`}>
            <h1 className="font-semibold text-2xl text-textColor">
            {title}
          </h1>
          <div className="w-[30%] h-px mt-2 mb-10 bg-black"></div>

      {loading ? (
            <div className="w-full p-2 flex items-center justify-evenly">
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </div>
      ) : (
          
          <div className="w-full lg:px-7 p-4 flex flex-wrap justify-center items-center gap-5 ">
            {products &&
              products.map((product) => <ProductCard key={product._id} product={product} />)}
          </div>
      )}
      </div>
    </>
  );
};

export default FeaturedProduct;
