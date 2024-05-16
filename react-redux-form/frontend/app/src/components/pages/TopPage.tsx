import React from "react";
import MainLayout from "../templates/MainLayout";
import TopForm from "../organisms/TopForm";

const TopPage: React.FC = () => {
  return(
    <div>
      <MainLayout>
        <TopForm />
      </MainLayout>
    </div>
  )
};

export default TopPage;