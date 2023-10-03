import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  q: "",
  searchPage: 1,
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    currentSearchPage: (state, actions) => {
      state.searchPage = parseInt(actions.payload);
    },
    setQuery: (state, action) => {
      state.q = action.payload;
    },
  },
});

export const { currentSearchPage, setQuery } = searchSlice.actions;

export default searchSlice.reducer;
