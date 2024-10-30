import React, { useState } from "react";
import DeleteForeverSharpIcon from "@mui/icons-material/DeleteForeverSharp";
import { Link } from "react-router-dom";

const CartCard = ({
  item,
  deleteCartItems,
  decreaseQuantity,
  increaseQuantity,
}) => {
  return (
    <div className="w-full border-b-1 sm:border-b-2 border-b-stone-200 justify-items-center grid grid-cols-5 justify-center py-2 mt-2 rounded">
      <div className="img rounded-lg">
        <img
          src={item.image}
          alt=""
          className="w-[80%] rounded-lg sm:h-24 sm:min-h-24 h-12"
        />
      </div>
      <div className="name pt-2 text-black text-[0.675rem] md:text-[1rem]">
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <h3>Size: <span className="text-black/60">{item.size}</span></h3>
      </div>

      <div className="flex text-black items-start justify-between pt-2">
        <div className="sm:rounded-3xl rounded-full flex overflow-hidden sm:border-2 border-1 bg-white">
          <button
            onClick={(e) => decreaseQuantity(item.product, item.quantity, item.size)}
            className="sm:px-2 sm:py-1 bg-bgColor hover:bg-stone-100 sm:text-lg p-1 text-[0.775rem] md:text-[1rem]"
          >
            -
          </button>
          <input
            type="number"
            readOnly
            className="outline-none w-4 sm:w-14 text-center text-[0.875rem] sm:text-lg"
            value={item.quantity}
          />
          <button
            onClick={(e) =>
              increaseQuantity(item.product, item.quantity, item.stock, item.size)
            }
            className="sm:px-2 sm:py-1 bg-bgColor hover:bg-stone-100 sm:text-lg p-1 text-[0.775rem]"
          >
            +
          </button>
        </div>
      </div>
      <div className="total text-black text-[0.675rem] md:text-[1rem] pt-2">
        <p>
          <p>Rs. {item.price * item.quantity}</p>
        </p>
      </div>
      <div
        className="action text-black pt-1 w-fit h-fit"
        onClick={(e) => deleteCartItems(item.product)}
      >
        <DeleteForeverSharpIcon className="cursor-pointer" />
      </div>
    </div>
  );
};

export default CartCard;
