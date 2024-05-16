import React from "react";
import MainLayout from "../templates/MainLayout";
import ChangeForm from "../organisms/ChangeForm";

const ArticleChangePage: React.FC = () => {
  return(
    <div>
      <MainLayout>
        <ChangeForm />
      </MainLayout>
    </div>
  )
};

export default ArticleChangePage;