import { generatePageNo } from "@/utils/imports";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalCars: null,
  hitCount: null,
  cars: [],
  page: 1,
  pageNoArr: [1],
};

export const carSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    currentPage: (state, actions) => {
      state.page = parseInt(actions.payload);
    },
    setHitCount: (state, action) => {
      state.hitCount = parseInt(action.payload);
    },
    setTotalCars: (state, actions) => {
      state.totalCars = actions.payload;
    },
    setCars: (state, actions) => {
      state.cars = actions.payload;
    },
    setPageNoArr: (state, action) => {
      state.pageNoArr = generatePageNo(action.payload);
    },
  },
});

export const { setTotalCars, currentPage, setPageNoArr, setHitCount, setCars } =
  carSlice.actions;

export default carSlice.reducer;
