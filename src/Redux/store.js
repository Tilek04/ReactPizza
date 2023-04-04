import { configureStore } from "@reduxjs/toolkit";
import filter from "./slices/filterSlice";
import card from "./slices/cardSlice";


export const store = configureStore({
  reducer: {
    filter, 
    card,
    // Это первый slice
  },
});
