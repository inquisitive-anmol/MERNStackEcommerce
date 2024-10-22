import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  productsReducer,
  productDetailReducer,
  newReviewReducer,
  newProductReducer,
  productReducer,
  productReviewsReducer,
  reviewReducer,
} from "./reducers/productReducers";
import {
  allUsersReducer,
  forgotPasswordReducer,
  profileReducer,
  userDetailsReducer,
  userReducer,
} from "./reducers/userReducers";
import { cartReducers } from "./reducers/cartReducers";
import {
  allOrdersReducer,
  myOrdersReducer,
  newOrderReducer,
  orderDetailsReducer,
  orderReducer,
} from "./reducers/OrderReducers";

const reducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducers,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
  newReview: newReviewReducer,
  newProduct: newProductReducer,
  product: productReducer,
  allOrders: allOrdersReducer,
  order: orderReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  productReviews: productReviewsReducer,
  review: reviewReducer
});

let initialState = {
  // cart: {
  //   cartItems: localStorage.getItem("cartItems")
  //     ? JSON.parse(localStorage.getItem("cartItems"))
  //     : [],
  //   shippingInfo: localStorage.getItem("shippingInfo")
  //     ? JSON.parse(localStorage.getItem("shippingInfo"))
  //     : {},
  // },
};

const store = configureStore({
  reducer,
});

export default store;
