import React from "react";
import MainLayout from "../templates/MainLayout";
import LoginForm from "../organisms/LoginForm";

const LoginPage: React.FC = () => {
  return(
    <div>
      <MainLayout>
        <LoginForm />
      </MainLayout>
    </div>
  )
};

export default LoginPage;