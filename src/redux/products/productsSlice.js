import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk("products/getProducts", async () => { 
  const res = await axios(`${process.env.REACT_APP_API_BASE_ENDPOINT}/spendMoneyJSON`);
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
    isLoading: false,
  },
  reducers: {
    updateCount: (state, action) => {
      const {id, count} = action.payload;

       //her bir ürünün id'si ile item'ın id'si eşitse item'ı buluruz(her bir ürünümüz).
      const item = state.items.find(item => item.id === id).count;  //item.id denk değilse id'ye filtre  icine eklenecek.
      console.log('items', state.items);
      console.log('item', item);
      state.items.count = count;
      
      let price = 0;
      state.items.map((item) => { //map'de olur.
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
      // console.log('action.payload ', action.payload); //action.payload items'da gelen {} içindeki ürünlerimiz.
    },

  },
});

export const {updateCount} = productsSlice.actions;
export default productsSlice.reducer;
