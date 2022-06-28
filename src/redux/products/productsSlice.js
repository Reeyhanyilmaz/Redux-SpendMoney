import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const res = await axios(
      `${process.env.REACT_APP_API_BASE_ENDPOINT}/spendMoneyJSON`
    );
    return res.data;
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    oldMoney: 100000000000, //paramız (100 milyar).
    newMoney: 100000000000, //değişen paramızın değeri.
    receiptItems: [],
    receiptMoney: 0,

  },
  reducers: {
    handleChange: (state, action) => {
      const { id, count, newCount } = action.payload;

      const item = state.items.find((item) => item.id === id);

      state.oldMoney = state.newMoney;

      const countDifference = newCount - count; //count adedimiz , newCount basınca değişecek değerimiz.

      const totalPrice = Number(item.productPrice) * Math.abs(countDifference);

      if (countDifference > 0) { //alım
        if (totalPrice > state.newMoney) {
          alert("You don't have enough money!");
          return; //işlem yapma
        } else {
          state.newMoney = state.oldMoney - totalPrice;
          item.count = newCount;
        }
      } else { //satış
        state.newMoney = state.oldMoney + totalPrice;
        item.count = newCount;
      }

      //for receipt part*******************************************        
      const newReceiptItems = state.items.filter(item => item.count > 0); // receiptitems öğelerini bulduk
      state.receiptItems = newReceiptItems;

      let total = 0;
      newReceiptItems.map((newReceiptItem) => {
        let itemTotal = Number(newReceiptItem.count) * Number(newReceiptItem.productPrice)
        total += itemTotal
      })
      state.receiptMoney = total;

    },
  },
  extraReducers: {
    [fetchProducts.fulfilled]: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { handleChange } = productsSlice.actions;
export default productsSlice.reducer;
