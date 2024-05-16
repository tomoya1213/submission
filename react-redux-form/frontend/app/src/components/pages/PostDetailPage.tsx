import React from "react";
import MainLayout from "../templates/MainLayout";
import PostDetailForm from "../molecules/PostDetailForm";

const ArticleDetailPage: React.FC = () => {
  return(
    <div>
      <MainLayout>
        <PostDetailForm /> 
      </MainLayout>
    </div>
  )
};

export default ArticleDetailPage;