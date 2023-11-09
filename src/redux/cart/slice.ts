import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { getCartFromLS } from "../../utils/getCartFromLS";
import { calcTotalPrice } from "../../utils/calcTotalPrice";
import { CartSliceState, CartItem } from "./types";

//загрузка из localStorage
const { items, totalPrice } = getCartFromLS();
const initialState: CartSliceState = {
  totalPrice,
  items,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = calcTotalPrice(state.items);
    },
    minusItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem && findItem.count !== 1) {
        findItem.count--;
      }
      state.totalPrice = calcTotalPrice(state.items);
    },
    deleteItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
    /*PayloadAction<Partial<CartSliceState>> говорит, что действие принимает объект, который может иметь любые ключи, 
    присутствующие в CartSliceState, и все эти ключи являются необязательными*/
    updateCart(state, action: PayloadAction<Partial<CartSliceState>>) {
      return { ...state, ...action.payload };
    },
    //а вот тут уже передается весь объект, поэтому весь тип
    newCart(state, action: PayloadAction<CartSliceState>) {
      return action.payload;
    },
  },
});

export const { addItem, deleteItem, minusItem, clearItems } = cartSlice.actions;

/* Пример использования
dispatch(updatecart({ sortValue: "date", sortOrder: "desc" })); */

export default cartSlice.reducer;
