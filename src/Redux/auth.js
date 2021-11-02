import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  isLoggedIn: false,
  localId: null,
  admin: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  reducers: {
    signIn(state, action) {
      state.isLoggedIn = true;
      state.localId = action.payload.localId;
    },
    signOut(state) {
      state.isLoggedIn = false;
      state.localId = null;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
