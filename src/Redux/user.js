import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const INITIAL_STATE = {
  databaseId: '',
  localId: '',
  isAdmin: false,
  firstName: '',
  lastName: '',
  phone: '',
  cart: [],
  orders: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {
    setUser: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    signout: () => {
      return INITIAL_STATE;
    },
    addToCart: (state, action) => {
      const product = action.payload;
      const productIndex = state.cart.findIndex((p) => p.id === product.id);
      if (productIndex > -1) {
        state.cart[productIndex].quantity += 1;
      } else {
        product.quantity = 1;
        state.cart.push(product);
      }
    },
    removeFromCart: (state, action) => {
      const product = action.payload;
      const productIndex = state.cart.findIndex((p) => p.id === product.id);
      if (productIndex > -1) {
        state.cart[productIndex].quantity -= 1;
        if (state.cart[productIndex].quantity === 0) {
          state.cart.splice(productIndex, 1);
        }
      }
    },
    removeAllFromCart: (state) => {
      state.cart = [];
    },
    addOrder: (state, action) => {
      state.orders.push(action.payload);
    },
    removeOrder: (state, action) => {
      state.orders = state.orders.filter(
        (order) => order.id !== action.payload.id
      );
    },
  },
});

export const syncUser = (localId) => {
  return async (dispatch) => {
    axios
      .get(`users.json?orderBy="localId"&equalTo="${localId}"`)
      .then((res) => {
        Object.entries(res.data).forEach(([key, value]) => {
          dispatch(userActions.setUser(value));
        });
      });
  };
};

export const userActions = userSlice.actions;
export default userSlice.reducer;
