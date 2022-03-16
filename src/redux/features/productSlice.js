import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const getProducts = createAsyncThunk(
  "product/getProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getProducts();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    error: "",
    loading: false,
  },
  extraReducers: {
    [getProducts.pending]: (state, action) => {
      state.loading = true;
    },
    [getProducts.fulfilled]: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },
    [getProducts.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export default productSlice.reducer;
