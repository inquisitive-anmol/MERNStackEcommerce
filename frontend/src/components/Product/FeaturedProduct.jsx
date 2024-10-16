import React from "react";
import ProductCard from "../ui/ProductCard";
import CardSkeleton from "../ui/CardSkeleton";

const FeaturedProduct = ({ loading, products, title, className }) => {
  return (
    <>
      <div
        className={`text-gray-700 w-full flex justify-center items-center flex-col p-1 ${className}`}
      >
        <h1 className="font-semibold text-xl text-textColor">{title}</h1>
        <div className="w-[50%] md:w-[35%] h-px mt-2 mb-10 bg-black/75"></div>

        {loading ? (
          <div className="w-full p-2 flex items-center justify-evenly">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </div>
        ) : (
          <div className="w-full lg:px-12 lg:mt-4 mb-10 p-1 px-3 md:px-5 flex flex-wrap justify-evenly items-center gap-3 ">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
        )}
      </div>
    </>
  );
};

export default FeaturedProduct;
