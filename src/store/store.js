import {configureStore} from "@reduxjs/toolkit"
import cartReducer from "./cartSlice"
import userReducer from "./userSlice"
import collectionReducer from "./collectionSlice"
import productReducer from "./productSlice"
const store = configureStore({
    reducer: {
        cart: cartReducer,
        user: userReducer,
        collection: collectionReducer,
        product: productReducer
    }
})

export default store