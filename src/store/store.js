import { configureStore } from "@reduxjs/toolkit";
import carSlice from "./features/carSlice";
import searchSlice from "./features/searchSlice";

export const store = configureStore({
  reducer: {
    cars: carSlice,
    search: searchSlice,
  },
});
