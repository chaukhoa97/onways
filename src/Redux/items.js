import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = { dbItems: [], showedItems: [] };

const itemsSlice = createSlice({
  name: 'items',
  initialState: INITIAL_STATE,
  reducers: {
    firstFetch(state, action) {
      state.dbItems = action.payload;
      state.showedItems = action.payload;
    },
    filter(state, action) {
      if (action.payload.category.length > 0) {
        state.showedItems = state.dbItems.filter((item) => {
          return action.payload.category.includes(item.category);
        });
      } else {
        state.showedItems = state.dbItems;
      }
      state.showedItems = state.showedItems.filter((item) => {
        return item.rating.rate >= action.payload.rate;
      });
      switch (action.payload.priceRange) {
        case 0:
          state.showedItems = state.showedItems.filter(
            (item) => item.price < 20
          );
          break;
        case 1:
          state.showedItems = state.showedItems.filter((item) => {
            return item.price >= 20 && item.price <= 100;
          });
          break;
        case 2:
          state.showedItems = state.showedItems.filter((item) => {
            return item.price >= 100 && item.price <= 500;
          });
          break;
        case 3:
          state.showedItems = state.showedItems.filter((item) => {
            return item.price >= 500;
          });
          break;
        default:
          return;
      }
    },
    sort(state, action) {
      switch (action.payload) {
        default:
          state.showedItems.sort((a, b) => b.rating.count - a.rating.count);
          break;
        case 'rate':
          state.showedItems.sort((a, b) => b.rating.rate - a.rating.rate);
          break;
        case 'asc':
          state.showedItems.sort((a, b) => a.price - b.price);
          break;
        case 'desc':
          state.showedItems.sort((a, b) => b.price - a.price);
          break;
      }
    },
  },
});

export const itemsActions = itemsSlice.actions;
export default itemsSlice.reducer;
