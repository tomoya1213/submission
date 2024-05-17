import React from "react";
import MainLayout from "../templates/MainLayout";
import TopForm from "../organisms/TopForm";
import TokenChecker from "../organisms/TokenChecker";

const TopPage: React.FC = () => {
  return(
    <div>
      <MainLayout>
        <TokenChecker />
        <TopForm />
      </MainLayout>
    </div>
  )
};

export default TopPage;