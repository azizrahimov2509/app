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
    increment: (state, { payload }) => {
      const item = state.items.find((item) => item.id === payload.id);
      if (item) {
        item.count += 1;
      }
      saveState(state);
    },
    decrement: (state, { payload }) => {
      const item = state.items.find((item) => item.id === payload.id);
      if (item) {
        item.count -= 1;
        if (item.count < 1) {
          state.items = state.items.filter((item) => item.id !== payload.id);
          state.addedItemIds = state.addedItemIds.filter(
            (id) => id !== payload.id
          );
        }
      }
      saveState(state);
    },
    removeFromCart: (state, { payload }) => {
      state.items = state.items.filter((item) => item.id !== payload.id);
      state.addedItemIds = state.addedItemIds.filter((id) => id !== payload.id);
      saveState(state);
    },
  },
});

export const { addToCart, increment, decrement, removeFromCart } =
  cartSlice.actions;
export default cartSlice.reducer;
