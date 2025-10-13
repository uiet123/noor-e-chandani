import { createSlice } from "@reduxjs/toolkit";

const collectionSlice = createSlice({
    name: "collection",
    initialState: {
        collections: []
    },
    reducers: {
        setCollections: (state, action) => {
            state.collections = action.payload;
        }
    }

})

export const { setCollections } = collectionSlice.actions;
export default collectionSlice.reducer;