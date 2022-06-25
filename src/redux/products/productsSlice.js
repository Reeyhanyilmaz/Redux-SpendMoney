import axios from "axios";
import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";

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
    money: 100000000000,
    initialMoney:100000000000,
  },
  reducers: { 
    updateCount: (state, action) => {
     
      if(state.items !== [] || state.items !== undefined){
        const {id,count} = action.payload;
        const item = state.items.find((x) => x.id === id);
        console.log('item', item);
        item.count = count;
      }
      // console.log('items :>> ', state.items);
      // // const item = state.items.find((x) => x.id === action.payload.id);
      // console.log('item', item);
      // item.count = action.payload.count;
      // const item = state.items.find((x) => x.id === id);
            // item.count=count;
            let price=0;

          state.items.map((tmp)=>{
              //  Fiyat = miktar * ücret
              return price += Number(tmp.count) * Number(tmp.productPrice);
            });
             // para = ilk değer - fiyat
          return state.money= Number(state.initialMoney)-Number(price);
    },

    // handleChange: (state, action) => {
    //   const { id, count} = action.payload;
    //   //  her bir ürünün id'si ile item'ın id'si eşitse item'ı buluruz(her bir ürünümüz).
    //   const item = state.items.find(x => x.id === id);
    //   const oldCount = item.count;
    //   const difference = count - oldCount;
    //   const degisecekMiktar = Number(item.productPrice) * Math.abs(difference);
    //   console.log('items', state.items);    
    //   console.log('item', item);

    //    if(difference >0){
    //     state.value = Number(state.value) - Number(degisecekMiktar);
    //    }else{
    //     state.value = Number(state.value) + Number(degisecekMiktar);
    //    }
    // },
    // updateCount: (state, action) => {
    //   const { id, count} = action.payload;
    //   //  her bir ürünün id'si ile item'ın id'si eşitse item'ı buluruz(her bir ürünümüz).
    //   const item = state.items.find(x => x.id === id);
    //   item.count = count;
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

export const {updateCount, handleChange} = productsSlice.actions;
export default productsSlice.reducer;
