import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addItemsToCart,
  removeItemsFromCart,
} from "../../reduxStore/actions/cartAction";
import { Link, useNavigate } from "react-router-dom";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import Typography from "@mui/material/Typography";
import CartCard from "./CartCard";
import CallMadeIcon from "@mui/icons-material/CallMade";
import MetaData from "../layout/MetaData";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  document.lala = cartItems;
  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/login', { state: { from: '/shipping' } });
  };

  return (
    <div className="w-full px-10 mb-10">
      <MetaData title="My Cart"/>
      {cartItems.length === 0 ? (
        <div className="emptyCart w-full h-96 flex items-center justify-center flex-col">
          <RemoveShoppingCartIcon fontSize="large" />

          <Typography>No Product in Your Cart</Typography>
          <Link to="/products" className="underline text-accentColor">
            View Products
            <CallMadeIcon fontSize="inherit" />
          </Link>
        </div>
      ) : (
        <>
          <h1 className="text-3xl mt-4 font-bold ">My Cart</h1>
          <div className="flex w-full gap-12 ">
            <div className="left w-[75%] ">
              <div className=" w-full rounded border-b-2 border-stone-200 grid grid-cols-5 justify-items-center justify-center mt-10 pb-3 text-black/30 font-medium">
                <p className="col-span-2">Product Name</p>
                <p className="">Quantity</p>
                <p className="">Total</p>
                <p className="">Remove</p>
              </div>
              {cartItems &&
                cartItems.map((item) => (
                  <div className="w-full">
                    <CartCard
                      item={item}
                      key={item.product}
                      deleteCartItems={deleteCartItems}
                      decreaseQuantity={decreaseQuantity}
                      increaseQuantity={increaseQuantity}
                    />
                  </div>
                ))}
            </div>

            <div className="right w-[25%] bg-gray-200/25 mt-10  border-2 rounded-md px-14">
              <h2 className="text-center mt-4 font-medium text-lg mb-10">
                Summary
              </h2>
              {/* <div className="cupon"></div> */}
              <div className="flex items-center mt-1 justify-between">
                <p className="font-medium">Sub Total:</p>
                <p>{cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)}</p>
              </div>
              <div className="flex items-center mt-1 justify-between">
                <p className="font-medium">Discount(0):</p>
                <p>{0}</p>
              </div>
              <div className="flex items-center mt-1 justify-between">
                <p className="font-medium">Delivery Fee:</p>
                <p>{0}</p>
              </div>

              <div className="flex items-center justify-between border-t-2 mt-8 py-2 mb-4">
                <p className="font-medium">Gross Total: </p>
                <p>{cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)}</p>
              </div>

              <div className="checkout w-full flex items-center justify-center mb-6 mt-8">
                <button onClick={checkoutHandler} className="bg-accentColor hover:bg-[#FF3C00] py-2 rounded-full w-full text-lg font-semibold text-white ">
                Check Out
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
