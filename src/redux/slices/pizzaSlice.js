import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
  //это прсото как комментарий
  "pizza/fetchPizzasStatus",

  async (params) => {
    const { sortValue, sortOrder, categoryValue, searchValue, pageValue } =
      params;
    const categoryTemp = categoryValue ? `&category=${categoryValue}` : "";
    const { data } = await axios.get(
      `https://65309d166c756603295ed4c5.mockapi.io/items?page=${pageValue}&limit=4&sortBy=${sortValue}&order=${sortOrder}${categoryTemp}&search=${searchValue}`
    );
    return await data;
  }
);

const initialState = {
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
  //для всякой херни, достраиваем fetchPizzas
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
      .addCase(fetchPizzas.rejected, (state) => {
        state.items = [];
        state.status = "error";
      });
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;