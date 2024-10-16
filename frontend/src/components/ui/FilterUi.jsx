import React from "react";
import SliderUi from "./SliderUi";

const categories = [
  "laptop",
  "footwear",
  "bottom",
  "tops",
  "attire",
  "camera",
  "smartPhone",
  "ipad",
];

const FilterUi = ({ priceHandler, price, setCategory, ratings, ratingHandler }) => {


  return (
    <div className="w-full py-1 lg:px-6 px-2 ">
      <SliderUi handler={priceHandler} value={price} label={"price:"} 
      minVal={0}
      maxVal={25000}
      step={100}
      />
      <div className="my-4">
      <p className="font-medium text-default-900 md:text-[0.965rem] lg:text-medium lg:ml-1">Categories:</p>
      <ul>
        {categories.map((category) => (
          <li
            key={category}
            className=" pl-4 category-link cursor-pointer hover:text-accentColor w-fit lg:font-medium md:font-normal text-default-700 md:text-[0.765rem]"
            onClick={() => setCategory(category)}
          >
            {category}
          </li>
        ))}
      </ul>
      </div>

      <fieldset>
        <SliderUi label={"Ratings Above: "} 
      minVal={0}
      maxVal={5}
      step={1}
      handler={ratingHandler}
      value={ratings}
      />
      </fieldset>
    </div>
  );
};

export default FilterUi;
