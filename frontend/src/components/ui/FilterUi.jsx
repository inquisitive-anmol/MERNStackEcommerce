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
    <div className="w-full p-1 px-3">
      <SliderUi handler={priceHandler} value={price} label={"price"} 
      minVal={0}
      maxVal={25000}
      step={100}
      />
      <div className="my-4">
      <p className="font-medium text-default-900 text-medium">Categories:</p>
      <ul>
        {categories.map((category) => (
          <li
            key={category}
            className=" pl-4 category-link cursor-pointer hover:text-accentColor w-fit font-medium text-default-900 text-medium"
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
