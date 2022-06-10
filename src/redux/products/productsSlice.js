import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    const res = await axios(
      `${process.env.REACT_APP_API_BASE_ENDPOINT}/spendMoneyJSON`
    ); 
    console.log(res.data);
    return res.data;
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
  },
  reducers: {},

  extraReducers: {
      [fetchProducts.fulfilled]: (state, action) => {
          state.items = action.payload;
      }
  }
});

export default productsSlice.reducer;
