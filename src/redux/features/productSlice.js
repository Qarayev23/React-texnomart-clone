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

export const getProductBySearch = createAsyncThunk(
  "product/getProductBySearch",
  async (value, { rejectWithValue }) => {
    try {
      const response = await api.getProductBysearch(value);
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
    productBySearch: [],
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
    [getProductBySearch.pending]: (state, action) => {
      state.loading = true;
    },
    [getProductBySearch.fulfilled]: (state, action) => {
      state.loading = false;
      state.productBySearch = action.payload;
    },
    [getProductBySearch.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export default productSlice.reducer;
