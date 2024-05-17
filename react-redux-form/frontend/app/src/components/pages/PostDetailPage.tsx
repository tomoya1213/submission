import React from "react";
import MainLayout from "../templates/MainLayout";
import PostDetailForm from "../organisms/PostDetailForm";
import TokenChecker from "../organisms/TokenChecker";

const ArticleDetailPage: React.FC = () => {
  return(
    <div>
      <MainLayout>
        <TokenChecker />
        <PostDetailForm /> 
      </MainLayout>
    </div>
  )
};

export default ArticleDetailPage;