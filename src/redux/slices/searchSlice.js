import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
