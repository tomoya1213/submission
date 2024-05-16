import React from "react";

type ErrorProps = React.HTMLAttributes<HTMLElement> & {
  children: React.ReactNode;
};

const Error: React.FC<ErrorProps> = ({ children, ...props }) => (
  <div {...props} className="text-red-500">
    {children}
  </div>
);

export default Error;
