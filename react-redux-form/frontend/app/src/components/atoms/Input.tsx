import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputProps> = (props) => (
  <input {...props} className="border-2 w-full peer ..."/>
);

export default Input;
