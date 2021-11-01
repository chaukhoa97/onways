import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = { data: [] };

const itemsSlice = createSlice({
  name: 'items',
  initialState: INITIAL_STATE,
  reducers: {
    update(state, action) {
      state.data = action.payload;
    },
  },
});

export const itemsActions = itemsSlice.actions;
export default itemsSlice.reducer;
