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
    whoseSpend: [
      {
        name: "Bill Gates",
        src: "https://neal.fun/spend/billgates.jpg",
      },
      {
        name: "Elon Musk",
        src: "https://digitalage.com.tr/wp-content/uploads/2020/11/elon-musk-en-zenginler-listesinde-ikinci-oldu.jpg",
      },
      {
        name: "Murk Zuckerberg",
        src: "https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2014/11/11/1415707285492/c1c88f68-1f3d-48ce-8095-eece19f8510e-2060x1405.jpeg?width=445&quality=45&auto=format&fit=max&dpr=2&s=16e4ffd60cf2644c800df63e9251e581",
      },
      {
        name: "Jeff Bezos",
        src: "https://andystalman.com/as/wp-content/uploads/jeff-bezos-image-1-1200x600.jpg",
      },
    ],
    selectedUser: {
      name: "Bill Gates",
      src: "https://neal.fun/spend/billgates.jpg",
    },
    noMoney: false,
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

      if (countDifference > 0) {//alım
            if (totalPrice > state.newMoney || state.newMoney === 0 || state.newMoney < Number(item.productPrice)) {
              state.noMoney = true;
              return; //işlem yapma
            } else {
              state.newMoney = state.oldMoney - totalPrice;
              item.count = newCount;
            }
      } else {
        //satış
        state.newMoney = state.oldMoney + totalPrice;
        item.count = newCount;
      }

      //for receipt part*******************************************
      state.receiptItems = state.items.filter((item) => item.count > 0);

      //total değerini verecek kısım.
      countDifference > 0
        ? (state.receiptMoney += totalPrice)
        : (state.receiptMoney -= totalPrice);
    },
    changeSelectedUser: (state, action) => {
      const selected = state.whoseSpend.find(
        (user) => user.name === action.payload
      );
      state.selectedUser = selected;
    },
  },
  extraReducers: {
    [fetchProducts.fulfilled]: (state, action) => {
      state.items = action.payload;
    },
  },
});


export const { handleChange, changeSelectedUser } = productsSlice.actions;
export default productsSlice.reducer;
