
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:"cart",
    initialState:{
        items: {}
    },
    reducers:{
        AddToCart: (state, action) => {
             const id = action.payload
             if(state.items[id]){
                state.items[id] += 1 
             }else{
                state.items[id] = 1
             }
        },
        RemoveFromCart: (state, action) => {
            const id = action.payload
            
                state.items[id] -= 1
            

        },
         ClearCart: (state) => {
      state.items = {};
    }

    }
})

export const {AddToCart, RemoveFromCart, ClearCart} = cartSlice.actions
export default cartSlice.reducer;