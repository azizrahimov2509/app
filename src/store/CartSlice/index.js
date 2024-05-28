import { createSlice } from "@reduxjs/toolkit";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("cart");
    return serializedState
      ? JSON.parse(serializedState)
      : { items: [], addedItemIds: [] };
  } catch (e) {
    console.error("Could not load state", e);
    return { items: [], addedItemIds: [] };
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("cart", serializedState);
  } catch (e) {
    console.error("Could not save state", e);
  }
};

const initialState = loadState();

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, { payload }) => {
      const existingProduct = state.items.find(
        (item) => item.id === payload.id
      );
      if (existingProduct) {
        existingProduct.count += 1;
      } else {
        state.items.push({ ...payload, count: 1 });
        state.addedItemIds.push(payload.id);
      }
      saveState(state);
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
