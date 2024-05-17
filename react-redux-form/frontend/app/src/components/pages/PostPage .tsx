import React from "react";
import ArticlePostForm from "../organisms/PostForm";
import TokenChecker from "../organisms/TokenChecker";

const ArticlePostPage: React.FC = () => {
  return(
    <div>
      <TokenChecker />
      <ArticlePostForm />
    </div>
  )
};

export default ArticlePostPage;