import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const res = await axios(
      `${process.env.REACT_APP_API_BASE_ENDPOINT}/spendMoneyJSON`
    );
    // console.log("res.data",res.data);
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
      state.oldMoney = state.newMoney; //satma ve alma işleminde tekrardan 100 milyardan işlem yapma eksilen paradan işlem yapması için.

      console.log("action", action);
      console.log("action.payload ", action.payload);
      console.log("id, count, newCount", id, count, newCount);

      const item = state.items.find((item) => item.id === id);
      console.log("item", item);

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
      state.receiptItems = state.items.filter((item) => item.count > 0);
       
      //total değerini verecek kısım.
      countDifference > 0 ? state.receiptMoney += totalPrice : state.receiptMoney -= totalPrice;          
    },
  },
  extraReducers: {
    [fetchProducts.fulfilled]: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { handleChange} = productsSlice.actions;
export default productsSlice.reducer;
