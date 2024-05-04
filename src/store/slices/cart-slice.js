import { v4 as uuidv4 } from "uuid";
import cogoToast from "cogo-toast";
const { createSlice } = require("@reduxjs/toolkit");

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
  },
  reducers: {
    addToCart(state, action) {
      const product = action.payload;

      state.cartItems.find((item) => item.id === product.id);
      state.cartItems.push({
        ...product,
        quantity: product.quantity ? product.quantity : 1,
        cartItemId: uuidv4(),
      });

      cogoToast.success("Added To Cart", { position: "bottom-left" });
    },

    deleteFromCart(state, action) {
      state.cartItems = state.cartItems.filter(
        (item) => item.cartItemId !== action.payload
      );
      cogoToast.error("Removed From Cart", { position: "bottom-left" });
    },
    
    deleteAllFromCart(state) {
      state.cartItems = [];
    },

    updateCartItems(state, action) {
      state.cartItems = action.payload;
    },

  },
});

export const {
  addToCart,
  deleteFromCart,
  decreaseQuantity,
  deleteAllFromCart,
  updateCartItems,
} = cartSlice.actions;
export default cartSlice.reducer;
