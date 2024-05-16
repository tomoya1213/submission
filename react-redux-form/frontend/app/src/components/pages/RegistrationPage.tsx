import React from "react";
import MainLayout from "../templates/MainLayout";
import RegistrationForm from "../organisms/RegistrationForm";

const RegistrationPage: React.FC = () => {
  return(
    <div>
      <MainLayout>
        <RegistrationForm />
      </MainLayout>
    </div>
  )
};

export default RegistrationPage;