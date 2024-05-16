import React from "react";

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  children: React.ReactNode;
};

const Label: React.FC<LabelProps> = ({ children, ...props }) => (
  <label {...props}>
    {children}
  </label>
);

export default Label;