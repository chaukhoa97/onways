import { configureStore } from '@reduxjs/toolkit';
import itemsReducer from './items';
import authReducer from './auth';

const store = configureStore({
  reducer: {
    items: itemsReducer,
    auth: authReducer,
  },
});

export default store;
