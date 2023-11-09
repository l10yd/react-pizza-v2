import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { SearchSliceState } from "./types";

const initialState: SearchSliceState = {
  searchValue: "",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    clear(state) {
      state.searchValue = "";
    },
    update(state, action) {
      state.searchValue = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { clear, update } = searchSlice.actions;

export default searchSlice.reducer;
