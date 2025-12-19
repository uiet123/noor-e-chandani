import { createSlice } from "@reduxjs/toolkit";

const customProductSlice = createSlice({
    name: "customCandles",
    initialState: {
        customCandles : []
    },
    reducers: {
        AddCustomCandle: (state, action) =>  {
            state.customCandles = action.payload
        }
    }

})

export const {AddCustomCandle} = customProductSlice.actions;
export default customProductSlice.reducer