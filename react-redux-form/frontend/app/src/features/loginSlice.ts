import { PayloadAction, createSlice } from "@reduxjs/toolkit";


export type LoginState = {
  email: string;
  password: string;
  errors: {
    email?: string | null;
    password?: string | null;
  }
}

const initialState: LoginState = {
  email: "",
  password: "",
  errors: {}
}

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setErrors(state, action: PayloadAction<Partial<LoginState['errors']>>) {
      state.errors = { ...state.errors, ...action.payload };
    },
  },
});

export const { setEmail, setPassword, setErrors } = loginSlice.actions;
export default loginSlice.reducer;