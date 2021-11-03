import { configureStore } from '@reduxjs/toolkit';
import itemsReducer from './items';
import authReducer from './auth';
import userReducer from './user';

const store = configureStore({
  reducer: {
    items: itemsReducer,
    auth: authReducer,
    user: userReducer,
  },
});

export default store;
