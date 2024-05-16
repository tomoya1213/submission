import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({ children, ...props }) => (
  <button {...props} className="text-white font-semibold tracking-wider bg-indigo-500 enabled:hover:bg-violet-600 py-2 px-4 rounded block mt-7">
    {children}
  </button>
);

export default Button;