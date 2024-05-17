import React from "react";
import MainLayout from "../templates/MainLayout";
import PostListForm from "../organisms/PostListForm";
import TokenChecker from "../organisms/TokenChecker";

const ArticleListPage: React.FC = () => {
  return(
    <div>
      <MainLayout>
      <TokenChecker />
        <PostListForm />
      </MainLayout>
    </div>
  )
};

export default ArticleListPage;