import {configureStore} from "@reduxjs/toolkit"
import cartReducer from "./cartSlice"
import userReducer from "./userSlice"
import collectionReducer from "./collectionSlice"
import productReducer from "./productSlice"
import orderReducer from "./orderSlice"
const store = configureStore({
    reducer: {
        cart: cartReducer,
        user: userReducer,
        collection: collectionReducer,
        product: productReducer,
        orders: orderReducer
    }
})

export default store