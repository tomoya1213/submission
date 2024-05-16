import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PostDetailState {
  post: any;
}

const initialState: PostDetailState = {
  post: {},
};

const postDetailSlice = createSlice({
  name: "postDetail",
  initialState,
  reducers: {
    setPostDetail: (state, action: PayloadAction<any>) => {
      state.post = action.payload;
    },
  },
});

export const { setPostDetail } = postDetailSlice.actions;

export default postDetailSlice.reducer;