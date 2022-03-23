import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const getProductBySearch = createAsyncThunk(
    "search/getProductBySearch",
    async (payload, { rejectWithValue }) => {
        try {
            const response = await api.getProductBysearch(payload);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

const SearchSlice = createSlice({
    name: "search",
    initialState: {
        productBySearch: [],
        error: "",
        loading: false,
    },
    reducers: {
        clearProductBySearch: (state, action) => {
            state.productBySearch = []
        }
    },
    extraReducers: {
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

export const { clearProductBySearch } = SearchSlice.actions

export default SearchSlice.reducer;
