import { createSlice } from '@reduxjs/toolkit';
import { map } from 'lodash';

const initialState = {
  itemList: [],
  lastUpdateItemList: null,
  cart: [],
  total: 0,
  selectedOrderItem: { 
    id: null, 
    name: null, 
    img: null,
    qty: 0,
    unitPrice: 0,
    total: 0,
  }
};

export const order = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setItemList: (state, action) => {
      state.itemList = action.payload;
    },
    setLastUpdateItemList: (state, action) => {
      state.lastUpdateItemList = action.payload;
    },
    setCart: (state, action) => {
      state.cart = action.payload;
      let a = 0;
      map(action.payload, (x) => {
        a += x.total;
      });
      state.total = a;
    },
    setSelectedOrderItem: (state, action) => {
      state.selectedOrderItem = action.payload;
    },
  }
});


export const { setItemList, setLastUpdateItemList, setCart, setSelectedOrderItem } = order.actions;
export const getItemList = (state) => state.order.itemList;
export const getLastUpdateItemList = (state) => state.order.lastUpdateItemList;
export const getCart = (state) => state.order.cart;
export const getTotalPrice = (state) => state.order.total;
export const getSelectedOrderItem = (state) => state?.order?.selectedOrderItem ?? initialState.selectedOrderItem;

export default order.reducer;