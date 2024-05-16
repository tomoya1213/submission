import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux'; // combineReducersを追加
import authReducer from "../features/authSlice";
import  userReducer  from '../features/userSlice';
import loginReducer from '../features/loginSlice';
import postReducer from '../features/postSlice';
import postDetailReducer from "../features/postDetailSlice";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// rootReducerを作成
const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  login: loginReducer,
  post: postReducer,
  postDetail: postDetailReducer,
});

// Redux Persistの設定
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

// パーシストされたReducerを作成
const persistedReducer = persistReducer(persistConfig, rootReducer);

// configureStoreを呼び出し、パーシストされたReducerを渡す
const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);
export default store;

export type RootState = ReturnType<typeof store.getState>;
