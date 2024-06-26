import React from "react";
import MainLayout from "../templates/MainLayout";
import MyForm from "../organisms/MyForm";
import TokenChecker from "../organisms/TokenChecker";

const MyPage: React.FC = () => {
  return(
    <div>
      <MainLayout>
        <TokenChecker />
        <MyForm />
      </MainLayout>
    </div>
  )
};

export default MyPage;
