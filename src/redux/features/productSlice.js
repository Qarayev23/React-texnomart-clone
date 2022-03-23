import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const getProducts = createAsyncThunk(
  "product/getProducts",
  async (__, { rejectWithValue }) => {
    try {
      const response = await api.getProducts();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const filterByPrice = createAsyncThunk(
  "product/filterByPrice",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.filterByPrice(payload);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getProduct = createAsyncThunk(
  "product/getProduct",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getProduct(id);
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
    product: {},
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
    [filterByPrice.pending]: (state, action) => {
      state.loading = true;
    },
    [filterByPrice.fulfilled]: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },
    [filterByPrice.rejected]: (state, action) => {
      state.loading = false;
    },
    [getProduct.pending]: (state, action) => {
      state.loading = true;
    },
    [getProduct.fulfilled]: (state, action) => {
      state.loading = false;
      state.product = action.payload;
    },
    [getProduct.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export default productSlice.reducer;
