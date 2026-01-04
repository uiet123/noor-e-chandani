import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: {},       
    customItems: [], 
  },

  reducers: {
   
 AddToCart: (state, action) => {
  const payload = action.payload;

  // backward compatible (normal products)
  if (typeof payload === "string") {
    if (state.items[payload]) {
      state.items[payload] += 1;
    } else {
      state.items[payload] = 1;
    }
    return;
  }

  const { variantKey, productId, color, fragrance } = payload;

  if (state.items[variantKey]) {
    state.items[variantKey].quantity += 1;
  } else {
    state.items[variantKey] = {
      productId,
      quantity: 1,
      color: color || "Default",
      fragrance: fragrance || "Default",
    };
  }
},


   RemoveFromCart: (state, action) => {
  const key = action.payload;

  if (!state.items[key]) return;

  if (typeof state.items[key] === "number") {
    // normal product
    state.items[key] -= 1;
    if (state.items[key] <= 0) {
      delete state.items[key];
    }
  } else {
    // variant product
    state.items[key].quantity -= 1;
    if (state.items[key].quantity <= 0) {
      delete state.items[key];
    }
  }
},


    // =========================
    // CUSTOM PRODUCTS
    // =========================
    AddCustomItem: (state, action) => {
      const newItem = action.payload;

      // 🔥 create unique signature (best practice)
      const signature = JSON.stringify(newItem.customDetails);

      const existing = state.customItems.find(
        (item) => item.signature === signature
      );

      if (existing) {
        // same customization found → update quantity
        existing.quantity += newItem.quantity;
      } else {
        // add signature for future comparison
        state.customItems.push({
          ...newItem,
          signature,
        });
      }
    },

    RemoveCustomItem: (state, action) => {
      const index = action.payload;
      const item = state.customItems[index];

      if (!item) return;

      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.customItems.splice(index, 1);
      }
    },

    ClearCart: (state) => {
      state.items = {};
      state.customItems = [];
    },
  },
});

export const {
  AddToCart,
  RemoveFromCart,
  AddCustomItem,
  RemoveCustomItem,
  ClearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
