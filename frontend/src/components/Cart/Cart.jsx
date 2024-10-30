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

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );


  const shippingCharges = subtotal > 1000 ? 0 : 200;
  const tax = subtotal * 0.18;
  const totalPrice = subtotal + tax + shippingCharges;


  const increaseQuantity = (id, quantity, stock, size) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty, size));
  };

  const decreaseQuantity = (id, quantity, size) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty, size));
  };

  const deleteCartItems = (id, size) => {
    dispatch(removeItemsFromCart(id, size));
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
          <h1 className="lg:text-3xl lg:xl mt-4 font-bold ">My Cart</h1>
          <div className="flex w-full gap-12 flex-col lg:flex-row ">
            <div className="left w-full lg:w-[75%] ">
              <div className=" w-full text-[0.775rem] md:text-[1rem] rounded border-b-2 border-stone-200 grid grid-cols-5 justify-items-center justify-center mt-10 pb-3 text-black/30 font-normal">
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

            <div className="right text-center w-full lg:w-[25%] bg-gray-200/25 mt-10  border-2 rounded-md px-9">
              <h2 className=" mt-4 font-medium lg:text-lg mb-10">
                Summary
              </h2>
              
              <div className="flex text-small items-center mt-3 justify-between">
                <p className=" font-medium">Subtotal:</p>
                <p>Rs. {subtotal}</p>
              </div>
              <div className="flex text-small items-center mt-3 justify-between">
                <p className=" font-medium">Discount(0):</p>
                <p>Rs. {0}</p>
              </div>
              <div className="flex text-small items-center mt-3 justify-between">
                <p className=" font-medium">Shipping Charge:</p>
                <p>Rs. {shippingCharges}</p>
              </div>
              <div className="flex text-small items-center mt-3 justify-between">
                <p className=" font-medium">GST:</p>
                <p>Rs. {tax}</p>
              </div>

              <div className="flex text-md items-center justify-between border-t-2 mt-8 py-2 mb-4">
                <p className="text-small font-medium">Total: </p>
                <p>Rs. {totalPrice}</p>
              </div>

              <div className="checkout w-full flex items-center justify-center mb-6 mt-8">
                <button onClick={checkoutHandler} className="bg-accentColor hover:bg-[#FF3C00] py-1 lg:py-2 rounded-full w-full text-md lg:text-lg font-semibold text-white ">
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
