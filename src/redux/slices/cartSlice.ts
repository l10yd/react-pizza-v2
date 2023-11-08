import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

//тип для item - ну да, такой объект получаем
export type CartItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count: number;
};

//интерфейс типизирует только объект (можно и в тип его)
//обычно стейт типизируют интерфейсом, когда есть много вложенных типов
interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
}

const initialState: CartSliceState = {
  totalPrice: 0,
  items: [],
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
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    minusItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem && findItem.count !== 1) {
        findItem.count--;
      }
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

//кастомные селекторы, чтобы не писать одно и то же в разных компонентах
export const selectCart = (state: RootState) => state.cart;
//единственный полезный селектор
export const selectCartItemById = (id: string) => (state: RootState) =>
  state.cart.items.find((obj) => obj.id === id);

export const { addItem, deleteItem, minusItem, clearItems } = cartSlice.actions;

/* Пример использования
dispatch(updatecart({ sortValue: "date", sortOrder: "desc" })); */

export default cartSlice.reducer;
