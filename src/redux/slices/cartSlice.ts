import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../store.ts"
import {calTotalPrice} from "../../utils/calTotalPrice.ts";
import {getCartFromLocalStorage} from "../../utils/getCartFromLocalStorage.ts";

export  interface cartSliseState{
  id:string;
  title:string;
  type:string;
  size:string;
  price:number;
  count:number;
  imageUrl:string;
}
interface cartitemState{
  totalPrice:number;
  categoryId:number;
  items: cartSliseState[];
}
const DataLS = getCartFromLocalStorage()
const initialState:cartitemState = {
  categoryId: 0,
  totalPrice: DataLS.totalPrice,
  items: DataLS.items || [],
};

const cartSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addItem(state, action) {
      //   state.items.push(action.payload);
      //   state.totalPrice = state.items.reduce((sum, obj) => obj.price + sum, 0);
      const findItem = state?.items?.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = state?.items?.reduce(
        (sum, obj) => obj.price * obj.count + sum,
        0
      );

    },
    minusItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.count--;
      }
    },
    removeItem(state, action) {
      state.items = state?.items.filter((obj) => obj.id !== action.payload);
      state.totalPrice = calTotalPrice(state.items);
    },
    clearItems(state, action) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const selectorCart = (state:RootState) => state.cart;
export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;
export default cartSlice.reducer;
