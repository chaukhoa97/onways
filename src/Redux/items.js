import { createSlice } from '@reduxjs/toolkit';

const items = createSlice({
  name: 'items',
  initialState: { items: [] },
  reducers: {
    update(state, action) {
      state.items += action.payload;
    },
  },
});

export const itemsActions = items.actions;
export default items.reducer;
