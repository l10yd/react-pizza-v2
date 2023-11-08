import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { CartItem } from "./cartSlice";

//для initial state
interface PizzaSliceState {
  items: CartItem[];
  status: "loading" | "success" | "error";
}

//еще один, но что поделать
export type FetchPizzasParams = {
  sortValue: string;
  sortOrder: string;
  categoryValue: number | undefined; // Может быть неопределенным
  searchValue: string;
  pageValue: number;
};

export const fetchPizzas = createAsyncThunk(
  /*<CartItem[], FetchPizzasParams> - можно типизировать и так*/
  //это прсото как комментарий
  "pizza/fetchPizzasStatus",

  async (params: FetchPizzasParams) => {
    const { sortValue, sortOrder, categoryValue, searchValue, pageValue } =
      params;
    const categoryTemp = categoryValue ? `&category=${categoryValue}` : "";
    const { data } = await axios.get<CartItem[]>(
      `https://65309d166c756603295ed4c5.mockapi.io/items?page=${pageValue}&limit=4&sortBy=${sortValue}&order=${sortOrder}${categoryTemp}&search=${searchValue}`
    );

    return data as CartItem[];
  }
);

const initialState: PizzaSliceState = {
  items: [],
  status: "loading", //loading, success, error
};

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  //для всякой херни, достраиваем fetchPizzas через builder
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.items = [];
        state.status = "loading";
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "success";
      })
      .addCase(fetchPizzas.rejected, (state, action) => {
        state.items = [];
        state.status = "error";
      });
  },
});

export const selectPizza = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
