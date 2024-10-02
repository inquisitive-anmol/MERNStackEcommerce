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
    <div className="w-full border-b-2 border-b-stone-200 justify-items-center grid grid-cols-5 justify-center py-2 mt-2 rounded">
      <div className="img rounded-lg">
        <img
          src={item.image}
          alt=""
          className="w-full rounded-lg h-24 min-h-24"
        />
      </div>
      <div className="name pt-2 text-black">
        <Link to={`/product/${item.product}`}>{item.name}</Link>
      </div>

      <div className="flex text-black items-start justify-between pt-2">
        <div className="rounded-3xl flex overflow-hidden border-2 bg-white">
        <button
            onClick={(e) => decreaseQuantity(item.product, item.quantity)}
            className="px-2 py-1 bg-bgColor hover:bg-stone-100 text-lg"
          >
            -
          </button>
          <input
            type="number"
            readOnly
            className="outline-none w-16 text-center text-lg"
            value={item.quantity}
          />
           <button
            onClick={(e) =>
              increaseQuantity(item.product, item.quantity, item.stock)
            }
            className="px-2 py-1 bg-bgColor hover:bg-stone-100 text-lg"
          >
            +
          </button>
        </div>
      </div>
      <div className="total text-black pt-2">
        <p>
          <p>Rs. {item.price * item.quantity}</p>
        </p>
      </div>
      <div
        className="action text-black pt-2 w-fit h-fit"
        onClick={(e) => deleteCartItems(item.product)}
      >
        <DeleteForeverSharpIcon className="cursor-pointer" />
      </div>
    </div>
  );
};

export default CartCard;
