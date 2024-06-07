import { createSlice } from '@reduxjs/toolkit';
import Cookie from 'js-cookie';

const initialState = {
  isLoggedIn: false,
  userInfo: {},
};

export const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.userInfo = action.payload;
    },
    setAuth: (state, action) => {
      state.isLoggedIn = true;
    },
    removeAuth: () => {
      state = initialState;
      state.isLoggedIn = false;
    },
  }
});


export const { setAuth, removeAuth, setProfile } = auth.actions;
export const getLoginStatus = (state) => state.auth.isLoggedIn;
export const getUserInfo = (state) => state.auth.userInfo;

export default auth.reducer;