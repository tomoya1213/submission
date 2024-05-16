import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PostState {
  article_id: string;
  title: string;
  content: string;
  errors: {
    title?: string | null;
    content?: string | null;
  }
}

const initialState: PostState = {
  article_id: "",
  title: "",
  content: "",
  errors: {}
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setArticleId: (state, action: PayloadAction<string>) => {
      state.article_id = action.payload;
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setContent: (state, action: PayloadAction<string>) => {
      state.content = action.payload;
    },
    setErrors(state, action: PayloadAction<Partial<PostState['errors']>>) {
      state.errors = { ...state.errors, ...action.payload };
    },
  }
});

export const { setArticleId, setTitle, setContent, setErrors } = postSlice.actions;
export default postSlice.reducer;