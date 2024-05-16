// authSlice.ts
import { createSlice } from "@reduxjs/toolkit";

export type AuthState = {
  isLoggedIn: boolean;
  userName: string | null; // ユーザー名の状態を追加
};

const initialState: AuthState = {
  isLoggedIn: false,
  userName: null, // 初期状態はnull
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userName = null; // ログアウト時にユーザー名もnullにリセット
    },
    setUserName: (state, action: { payload: string }) => { // setUserNameアクションを追加
      state.userName = action.payload || null; // nullチェック
    },
  },
});

export const { login, logout, setUserName } = authSlice.actions;

export default authSlice.reducer;
