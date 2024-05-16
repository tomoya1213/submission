import React from "react";

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => (
  <div className="container mx-auto p-4 max-w-5xl">{children}</div>
);

export default MainLayout;