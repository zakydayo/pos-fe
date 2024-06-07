import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import authReducer from '../reducers/auth';
import orderReducer from '../reducers/order';

const persistConfig = {
  key: 'pos',
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  order: orderReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);