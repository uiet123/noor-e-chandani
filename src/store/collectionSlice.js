import { createSlice } from "@reduxjs/toolkit";

const collectionSlice = createSlice({
    name: "collection",
    initialState: {
        collections: [],
        loading: true
    },
    reducers: {
        setCollections: (state, action) => {
            state.collections = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        }
    }

})

export const { setCollections, setLoading } = collectionSlice.actions;
export default collectionSlice.reducer;