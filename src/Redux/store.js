import { configureStore } from "@reduxjs/toolkit";
import filter from "./slices/filterSlice";
import card from "./slices/cardSlice";
import pizza from "./slices/pizzaSlice";

export const store = configureStore({
  reducer: {
    filter,
    card,
    pizza,
    // Это первый slice
  },
});
