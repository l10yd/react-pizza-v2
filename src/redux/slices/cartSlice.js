import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPrice: 0,
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    /*addItem(state, action) {
      state.items.push(action.payload);
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price + sum;
      }, 0);
    },*/
    addItem(state, action) {
      console.log(action.payload.id);
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    minusItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem && findItem.count !== 1) {
        findItem.count--;
      }
    },
    deleteItem(state, action) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
    updateCart(state, action) {
      Object.keys(action.payload).forEach((key) => {
        if (key in state) {
          state[key] = action.payload[key];
        }
      });
    },
    newCart(state, action) {
      return action.payload;
    },
  },
});

//кастомные селекторы, чтобы не писать одно и то же в разных компонентах
export const selectCart = (state) => state.cart;
//единственный полезный селектор
export const selectCartItemById = (id) => (state) =>
  state.cart.items.find((obj) => obj.id === id);

// Action creators are generated for each case reducer function
export const { addItem, deleteItem, minusItem, clearItems } = cartSlice.actions;

/* Пример использования
dispatch(updatecart({ sortValue: "date", sortOrder: "desc" })); */

export default cartSlice.reducer;
