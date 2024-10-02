import { configureStore, combineReducers} from '@reduxjs/toolkit'
import {productReducers, productDetailReducers} from './reducers/productReducers';
import { forgotPasswordReducers, userReducers } from './reducers/userReducers';
import { profileReducers } from './reducers/profileReducers';
import { cartReducers }  from "./reducers/cartReducers";
import { myOrdersReducer, newOrderReducer } from './reducers/OrderReducers';


const reducer = combineReducers({
    products: productReducers,
    productDetail: productDetailReducers,
    user: userReducers,
    profile: profileReducers,
    forgotPassword: forgotPasswordReducers,
    cart: cartReducers,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
});

let initialState = {
    // cart: {
        // cartItems: localStorage.getItem("cartItems")
        // ? JSON.parse(localStorage.getItem("cartItems"))
        // : [],
    // },
};

const store = configureStore({
    reducer,
    initialState,
});

export default store;
