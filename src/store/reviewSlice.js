import { createSlice } from "@reduxjs/toolkit";

const reviewSlice = createSlice({
  name: "review",
  initialState: {
    review: [],
  },
  reducers: {
    AddReview: (state, action) => {
      state.review = action.payload;
    },
  },
});

export const { AddReview } = reviewSlice.actions;
export default reviewSlice.reducer;




