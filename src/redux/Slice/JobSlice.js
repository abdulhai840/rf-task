import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "jobs",
  initialState: [],
  reducers: {
    addJob: (state, action) => {
      state.push(action.payload);
    },
    removeJob: (state, action) => {
      return state.filter((job) => job.id !== action.payload);
    },
  },
});

export default jobSlice;
