// store/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserState = {
  email: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
  avatar: string;
  errors: {
    email?: string | null;
    password?: string | null;
    passwordConfirm?: string | null;
    nickname?: string | null;
    avatar?: string | null;
  }
}

const initialState: UserState = {
  email: "",
  password: "",
  passwordConfirm: "",
  nickname: "",
  avatar: "",
  errors: {}
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setPasswordConfirm: (state, action: PayloadAction<string>) => {
      state.passwordConfirm = action.payload;
    },
    setNickname: (state, action: PayloadAction<string>) => {
      state.nickname = action.payload;
    },
    setAvatar: (state, action: PayloadAction<string>) => {
      state.avatar = action.payload;
    },
    setErrors(state, action: PayloadAction<Partial<UserState['errors']>>) {
      state.errors = { ...state.errors, ...action.payload };
    },
    setAvatarError(state, action: PayloadAction<string | undefined>) {
      state.errors.avatar = action.payload;
    },
    updateUser: (state, action: PayloadAction<Partial<UserState>>) => {
      // ペイロードで渡された部分状態のみを更新
      Object.assign(state, action.payload);
    },
  },
});

export const { setEmail, setPassword, setPasswordConfirm, setNickname, setAvatar, setErrors, setAvatarError, updateUser } = userSlice.actions;
export default userSlice.reducer;
