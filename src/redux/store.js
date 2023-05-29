import { configureStore } from "@reduxjs/toolkit";
import jobSlice from "./Slice/JobSlice";

const store = configureStore({
  reducer: {
    jobs: jobSlice.reducer,
  },
});

export default store;