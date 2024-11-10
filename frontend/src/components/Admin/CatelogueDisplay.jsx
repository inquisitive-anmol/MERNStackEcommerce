import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";


const CatelogueDisplay = () => {
  const { error, products } = useSelector((state) => state.products);

//   const { error: deleteError, isDeleted } = useSelector(
//     (state) => state.product
//   );

  return (
    <div className="w-[26%] lg:w-full flex flex-col overflow-y-auto border-r-1 border-black/10 h-[50vmax]">
      <h3 className="bg-black/10 w-full border-1 font-semibold border-black/15 rounded p-2 text-center">
        All Products
      </h3>
      {products &&
        products.length > 0 &&
        products.map((item, index) => (
          <Link
            to={`/admin/product/catelogue/${item._id}`}
            key={index}
            className=" border-b-2 border-black/20"
          >
            <div className="flex gap-2">
              <p className="">
                <img className="w-20 h-20" src={item.images[0].url} alt="" />
              </p>
              <div>
                <p>{item.name}</p>
                <p className="text-black/35">{item._id}</p>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default CatelogueDisplay;
