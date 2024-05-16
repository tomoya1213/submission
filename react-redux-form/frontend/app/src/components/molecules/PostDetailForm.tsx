import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { setPostDetail } from "../../features/postDetailSlice";

const PostDetailForm: React.FC = () => {
  const post = useSelector((state: RootState) => state.postDetail.post);
  const dispatch = useDispatch();
  const { article_id } = useParams();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/api/articles/${article_id}`);
        console.log(article_id);
        dispatch(setPostDetail(response.data));
      } catch (error) {
        console.error("404:記事の取得に失敗しました", error);
        navigate("/404");
      }
    };

    if (!isLoggedIn) {
      navigate("/"); // ログインされていない場合はトップページにリダイレクト
    } else {
      fetchPost();
    }
  }, [isLoggedIn, navigate, dispatch, article_id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-center text-3xl my-6">投稿詳細画面</h1>
      <div className="border">
        <h2>投稿者: {post.name}</h2>
        <p>タイトル：{post.title}</p>
        <p>内容：{post.content}</p>
      </div>
    </div>
  );
};

export default PostDetailForm;
