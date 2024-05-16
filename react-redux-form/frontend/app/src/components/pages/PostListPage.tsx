import React from "react";
import MainLayout from "../templates/MainLayout";
import PostListForm from "../organisms/PostListForm";

const ArticleListPage: React.FC = () => {
  return(
    <div>
      <MainLayout>
        <PostListForm />
      </MainLayout>
    </div>
  )
};

export default ArticleListPage;