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
    value: 100000000000,
    money: 100000000000,
  },
  reducers: {
    updateCount: (state, action) => {
      const { id, count } = action.payload;
      const x = fetchProducts.find((item) => item.id === id);
      x.count = count;
      let price = 0;

      fetchProducts.map((item) => {
        //  Fiyat = miktar * ücret
        price += Number(item.count) * Number(item.productPrice);
      });
      //para = ilk değer - fiyat
      state.value = Number(state.money) - Number(price);
    },
  },

  extraReducers: {
    [fetchProducts.fulfilled]: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const {updateCount} = productsSlice.actions;
export default productsSlice.reducer;
