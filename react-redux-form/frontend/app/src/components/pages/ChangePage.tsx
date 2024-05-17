import React from "react";
import MainLayout from "../templates/MainLayout";
import ChangeForm from "../organisms/ChangeForm";
import TokenChecker from "../organisms/TokenChecker";

const ArticleChangePage: React.FC = () => {
  return(
    <div>
      <MainLayout>
        <TokenChecker />
        <ChangeForm />
      </MainLayout>
    </div>
  )
};

export default ArticleChangePage;