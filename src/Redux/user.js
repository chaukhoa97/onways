import { createSlice, current } from '@reduxjs/toolkit';
import axios from 'axios';
import { message } from 'antd';

const INITIAL_STATE = {
  databaseId: '',
  localId: '',
  isAdmin: false,
  firstName: '',
  lastName: '',
  phone: '',
  cart: { items: [] },
  orders: [],
  wishList: [],
  addresses: [],
};

const addToCartSuccess = () => {
  message.success('Thêm vào giỏ hàng thành công!');
};

const addToCartFailure = () => {
  message.error('Bạn không thể thêm vào giỏ hàng khi chưa đăng nhập!');
};

const addToWishListFailure = () => {
  message.error(
    'Bạn không thể thêm vào danh sách yêu thích khi chưa đăng nhập!'
  );
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
      const cartItems = state.cart.items;
      const isLoggedIn = state.localId !== '';
      if (isLoggedIn) {
        addToCartSuccess();
        const productIndex = cartItems.findIndex(
          (p) => p.data.id === action.payload.id
        );
        if (productIndex === -1) {
          state.cart.items = [
            ...cartItems,
            { data: { ...action.payload, count: 1 } },
          ];
        } else {
          cartItems[productIndex].data.count += 1;
        }
      } else {
        addToCartFailure();
      }
    },
    changeCartCount: (state, action) => {
      const cartItems = state.cart.items;
      const productIndex = cartItems.findIndex(
        (p) => p.data.id === action.payload.id
      );
      cartItems[productIndex].data.count = action.payload.count;
    },
    removeFromCart: (state, action) => {
      const cartItems = state.cart.items;
      const productIndex = cartItems.findIndex(
        (p) => p.data.id === action.payload.id
      );
      cartItems.splice(productIndex, 1);
    },
    addToWishlist: (state, action) => {
      const wishList = state.wishList;
      const isLoggedIn = state.localId !== '';
      if (isLoggedIn) {
        if (wishList.includes(action.payload)) {
          state.wishList = wishList.filter((id) => id !== action.payload);
        } else {
          state.wishList = [...wishList, action.payload];
        }
      } else {
        addToWishListFailure();
      }
    },
    addToOrder: (state, action) => {
      const orders = state.orders;
      const isLoggedIn = state.localId !== '';
      if (isLoggedIn) {
        state.orders = [...orders, action.payload];
        state.cart = INITIAL_STATE.cart;
      }
    },
    updateOrder(state, action) {
      const orders = state.orders;
      const orderIndex = orders.findIndex(
        (order) => order.id === action.payload.id
      );
      console.log(current(state.orders[orderIndex]));
      orders[orderIndex].status = action.payload.status;
    },
    deleteOrder: (state, action) => {
      const orders = state.orders;
      const orderIndex = orders.findIndex((o) => o.id === action.payload);
      orders.splice(orderIndex, 1);
    },
    addAddress: (state, action) => {
      state.addresses = [
        ...state.addresses,
        { ...action.payload, edit: true, add: true },
      ];
    },
    updateAddress: (state, action) => {
      const addressIndex = state.addresses.findIndex(
        (a) => a.id === action.payload.id
      );
      state.addresses[addressIndex] = action.payload;
    },
    removeAddress: (state, action) => {
      state.addresses = state.addresses.filter((a) => a.id !== action.payload);
    },
    updateProfile: (state, action) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.phone = action.payload.phone;
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
