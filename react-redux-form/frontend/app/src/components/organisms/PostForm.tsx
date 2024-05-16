import React, { useEffect } from "react";
import FormGroup from "../molecules/FormGroup";
import Button from "../atoms/Button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { validateNewPostContent, validateNewPostTitle } from "./Validate";
import { setContent, setErrors, setTitle } from "../../features/postSlice";
import axios from "axios";
import { useNavigate } from "react-router";

const ArticlePostForm: React.FC = () => {
  const dispatch = useDispatch();
  const post = useSelector((state: RootState) => state.post); // Reduxストアからユーザーステートを取得
  const userName = useSelector((state: RootState) => state.auth.userName); // ログインユーザーの名前を取得
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  
  const isFormValid = () => {
    return post.title && post.content && Object.values(post.errors).every(error => !error);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const titleError = validateNewPostTitle(value); // バリデーションを呼び出す
    dispatch(setTitle(value));
    dispatch(setErrors({ ...post.errors, title: titleError || null }));
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const contentError = validateNewPostContent(value); // バリデーションを呼び出す
    dispatch(setContent(value));
    dispatch(setErrors({ ...post.errors, content: contentError || null }));
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/"); // ログインされていない場合はトップページーじにリダイレクト
      return;
    }
  },[isLoggedIn, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/articles", {
        title: post.title,
        content: post.content,
        name: userName, // ユーザー名をaxiosリクエストに含める
      });
      // リクエストが成功した場合の処理
      if (response.status === 201) {
        const userData = response.data;
        Object.keys(userData).forEach(key => {
          localStorage.setItem(key, userData[key]);
        });
    }} catch (error) {
      // リクエストが失敗した場合の処理
      if (axios.isAxiosError(error)) {
        // サーバーエラーの場合
        navigate("/"); // TOPページへ遷移
        alert("サーバーエラーが発生しました。");
      } else {
        // その他のエラーの場合
        console.error("APIリクエストエラー:", error);
      }
    }
    // フォームをクリアする処理
    dispatch(setTitle(''));
    dispatch(setContent(''));
  };


  return (
    <form onSubmit={handleSubmit} className="max-w-5xl mx-auto p-4">
      <h1 className="text-center text-3xl my-6">新規投稿</h1>
      <FormGroup 
      style={{ border: "1px solid",width: "30%" }}
      type = "text"
      name = "title"
      placeholder = "タイトル"
      as = "input"
      value={post.title} 
      onChange={handleTitleChange}
      error={post.errors.title || undefined}
      />
      <FormGroup 
      style={{ border: "1px solid black",height: "200px" }}
      type = "text"
      name = "content"
      label="記事内容"
      as = "textarea"
      value={post.content} 
      onChange={handleContentChange}
      error={post.errors.content || undefined}
      />
      <div className="margin-left mt-4">
        <Button
        className="ml-auto"
        type="submit"
        disabled={!isFormValid()}
        >
          投稿する
        </Button>
        </div>
    </form>
  );
};

export default ArticlePostForm;
