import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
} from "../constants/cartConstants";
const apiUrl = import.meta.env.VITE_API_URL;
import axios from "axios";

// Add to the Cart
export const addItemsToCart =
  (id, quantity, size) => async (dispatch, getState) => {
    const { data } = await axios.get(
      `${apiUrl}/api/v1/product/${id}`
    );
    const variant = data.product.variants.find((itm) => itm.size === size);
    dispatch({
      type: ADD_TO_CART,
      payload: {
        product: id,
        name: data.product.name,
        price: variant.shoocartPrice,
        size: size,
        stock: variant.stock,
        image: data.product.images[0].url,
        quantity,
      },
    });

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };

// REMOVE FROM CART
export const removeItemsFromCart = (id, size) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_CART_ITEM,
    payload: {
      productId: id,
      size,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// SAVE SHIPPING INFO
export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });

  localStorage.setItem("shippingInfo", JSON.stringify(data));
};
