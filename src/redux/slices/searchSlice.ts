import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type SearchSliceState = {
  searchValue: string;
};

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

export const selectSearch = (state: RootState) => state.search;

// Action creators are generated for each case reducer function
export const { clear, update } = searchSlice.actions;

export default searchSlice.reducer;
