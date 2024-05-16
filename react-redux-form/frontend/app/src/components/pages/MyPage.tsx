import React from "react";
import MainLayout from "../templates/MainLayout";
import MyForm from "../organisms/MyForm";

const MyPage: React.FC = () => {
  return(
    <div>
      <MainLayout>
        <MyForm />
      </MainLayout>
    </div>
  )
};

export default MyPage;
