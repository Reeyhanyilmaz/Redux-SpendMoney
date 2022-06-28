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
    oldMoney: 100000000000, //paramız (100 milyon).
    newMoney: 100000000000, //değişen paramızın değeri.
    receiptItems: [],
    receiptMoney: 0,

  },
  reducers: {
    handleChange: (state, action) => {
      const { id, count, newCount } = action.payload;
      console.log("action", action);
      console.log("action.payload ", action.payload);
      console.log("id, count, newCount", id, count, newCount);

      const item = state.items.find((item) => item.id === id);
      console.log("item", item);

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
          // state.oldMoney = state.newMoney; //bunu yazmazsak diğer item aldığımızda tekrar 100 milyondan fiyat düşüyor.
        }
      } else { //satış
        state.newMoney = state.oldMoney + totalPrice;
        item.count = newCount;
        // state.oldMoney = state.newMoney; //bunu yazmazsak diğer item satışında 100 milyona ekleme yapıyor. 
        //Tekrar tekrar parayı 100 milyon yapma paramız eksilen/azalan para miktarındna hesaplama yap diyoruz burada.   
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
