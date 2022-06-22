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
    value: 100000000000,
    money: 100000000000,
  },
  reducers: {
    // updateCount: (state, action) => {
    //   const { id, count} = action.payload;
    //    //her bir ürünün id'si ile item'ın id'si eşitse item'ı buluruz(her bir ürünümüz).
    //   const item = state.items.find(x => x.id === id);
    //   console.log('items', state.items);
    //   console.log('item', item);
    //   item.count = count;
    //   let price = 0;
    //   state.items.map((x) => {
    //     //  Fiyat = miktar * ücret
    //     price += Number(x.count) * Number(x.productPrice);
    //   });
    //   //para = ilk değer - fiyat
    //   state.value = Number(state.money) - Number(price);
    // },
  },
  extraReducers: {
    [fetchProducts.fulfilled]: (state, action) => {
      state.items = action.payload;
      // console.log("action.payload ", action.payload); //action.payload items'da gelen {} içindeki ürünlerimiz.
      // const { id, count } = action.payload;
      // const item = state.items.find((x) => x.id === id);
      // item.count = count;
      // console.log("items", state.items);
      // console.log("item", item);
    },
  },
});


export const updateCount = (state, action) => {
  const { id, count } = action.payload;
  const item = state.items.find((x) => x.id === id);
  item.count = count;
  console.log("items", state.items);
  console.log("item", item);
  let price = 0;
  state.items.map((x) => {
    //  Fiyat = miktar * ücret
    price += Number(x.count) * Number(x.productPrice);
  });
  //para = ilk değer - fiyat
  state.value = Number(state.money) - Number(price);
};

// export const {updateCount} = productsSlice.actions;
export default productsSlice.reducer;
