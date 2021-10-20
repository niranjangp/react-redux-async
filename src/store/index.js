import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cart-slice";
import uiSlice from "./ui-slice";

const store = configureStore({
    reducer: { uiStore: uiSlice.reducer, cartStore: cartSlice.reducer }
});

export default store;