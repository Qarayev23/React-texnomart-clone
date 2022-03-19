import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./features/productSlice";
import cartSlice from "./features/cartSlice";
import searchSlice from "./features/searchSlice";

export default configureStore({
  reducer: {
    productSlice,
    cartSlice,
    searchSlice
  },
});
